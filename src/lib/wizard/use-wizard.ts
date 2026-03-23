"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import {
  getGroupsByStep,
  getGroupById,
  type FieldGroup,
  type FieldDef,
} from "@/lib/field-library";
import { resolveStep2Groups, CATEGORY_TO_NEEDS } from "@/lib/rule-engine";
import { buildSchema } from "./schema-builder";

/**
 * Flatten nested form values (created by RHF's dot-path register)
 * back into dotted-key entries that match our Zod schema shape.
 *   { contact: { fullName: "Jane" } } → { "contact.fullName": "Jane" }
 */
export function flattenValues(
  obj: Record<string, unknown>,
  prefix = "",
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (
      value !== null &&
      value !== undefined &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      Object.assign(
        result,
        flattenValues(value as Record<string, unknown>, fullKey),
      );
    } else {
      result[fullKey] = value;
    }
  }
  return result;
}

// ============================================================
// useWizard Hook
// ============================================================
// Manages the 3-step wizard lifecycle:
//   Step 1 → universal groups (contact, project-type, business-needs)
//   Step 2 → conditional groups chosen by the rule engine
//   Step 3 → universal groups (design, closing)
//
// A single useForm() instance holds ALL field values across all
// steps. Per-step validation is done by re-setting the resolver
// when the step changes, so only the current step's fields are
// validated on "Next".
// ============================================================

export type WizardStep = 1 | 2 | 3;

export interface WizardState {
  /** Current step number */
  step: WizardStep;
  /** Field groups visible on the current step */
  groups: FieldGroup[];
  /** All fields for the current step (flattened from groups) */
  fields: FieldDef[];
  /** React Hook Form instance — shared across all steps */
  form: UseFormReturn<Record<string, unknown>>;
  /** Total number of steps (always 3) */
  totalSteps: 3;
  /** Whether the user is on the final step */
  isLastStep: boolean;
  /** Whether Step 2 has any groups (if not, skip it) */
  hasStep2: boolean;
  /** Validate current step fields, then advance. Returns true if valid. */
  goNext: () => Promise<boolean>;
  /** Go back one step (no validation) */
  goBack: () => void;
  /** All field values across every step */
  getAllValues: () => Record<string, unknown>;
  /** Clear saved progress from sessionStorage */
  clearProgress: () => void;
}

const STORAGE_KEY = "wizard-progress";
const DEBOUNCE_MS = 400;

export function useWizard(categoryType?: string): WizardState {
  const [step, setStep] = useState<WizardStep>(1);
  const restoredRef = useRef(false);
  const prefilledRef = useRef(false);

  // --- Step 1 & 3 groups are static ---
  const step1Groups = useMemo(() => getGroupsByStep(1), []);
  const step3Groups = useMemo(() => getGroupsByStep(3), []);

  // --- Single form instance for the entire wizard ---
  const form = useForm<Record<string, unknown>>({
    mode: "onTouched",
    defaultValues: {},
  });

  // --- Pre-fill keyNeeds from ?type= query param ---
  useEffect(() => {
    if (prefilledRef.current || !categoryType) return;
    const needs = CATEGORY_TO_NEEDS[categoryType];
    if (needs && needs.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (form as any).setValue("business-needs.keyNeeds", needs);
    }
    prefilledRef.current = true;
  }, [categoryType, form]);

  // --- Resolve Step 2 groups from current keyNeeds selections ---
  const rawNeeds = form.watch("business-needs.keyNeeds");
  const watchedNeeds = Array.isArray(rawNeeds) ? rawNeeds : [];

  const step2GroupIds = useMemo(
    () => resolveStep2Groups(watchedNeeds),
    [JSON.stringify(watchedNeeds)],
  );

  const step2Groups = useMemo(
    () =>
      step2GroupIds
        .map((id) => getGroupById(id))
        .filter((g): g is FieldGroup => g !== undefined),
    [step2GroupIds],
  );

  const hasStep2 = step2Groups.length > 0;

  // --- Current step's groups and fields ---
  const groups = useMemo(() => {
    if (step === 1) return step1Groups;
    if (step === 2) return step2Groups;
    return step3Groups;
  }, [step, step1Groups, step2Groups, step3Groups]);

  const fields = useMemo(
    () => groups.flatMap((g) => g.fields),
    [groups],
  );

  // --- Per-step Zod schema (for trigger validation) ---
  const stepSchema = useMemo(() => buildSchema(fields), [fields]);

  const isLastStep = step === 3;

  // --- Navigation ---
  /** Validate current step. Returns true if valid. Advances step if not last. */
  const goNext = useCallback(async (): Promise<boolean> => {
    // Flatten nested RHF values to dotted keys matching the Zod schema
    const flat = flattenValues(form.getValues());
    const result = stepSchema.safeParse(flat);

    if (!result.success) {
      // Set errors on the form so the UI shows them
      for (const issue of result.error.issues) {
        const key = issue.path.join(".");
        form.setError(key, { type: "manual", message: issue.message });
      }
      return false;
    }

    // Advance to next step
    if (step === 1) {
      setStep(hasStep2 ? 2 : 3);
    } else if (step === 2) {
      setStep(3);
    }
    // If step === 3, the caller handles submission
    return true;
  }, [step, stepSchema, form, hasStep2]);

  const goBack = useCallback(() => {
    if (step === 3) {
      setStep(hasStep2 ? 2 : 1);
    } else if (step === 2) {
      setStep(1);
    }
  }, [step, hasStep2]);

  const getAllValues = useCallback(
    () => form.getValues(),
    [form],
  );

  // --- Clear saved progress ---
  const clearProgress = useCallback(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // sessionStorage unavailable (e.g. SSR or private browsing limits)
    }
  }, []);

  // --- Restore progress on mount ---
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { step: WizardStep; values: Record<string, unknown> };
        if (saved.values && typeof saved.values === "object") {
          form.reset(saved.values);
        }
        if ([1, 2, 3].includes(saved.step)) {
          setStep(saved.step);
        }
      }
    } catch {
      // ignore parse errors or missing sessionStorage
    }
    restoredRef.current = true;
  }, []);

  // --- Save progress on step change ---
  useEffect(() => {
    if (!restoredRef.current) return;
    try {
      const data = JSON.stringify({ step, values: form.getValues() });
      sessionStorage.setItem(STORAGE_KEY, data);
    } catch {
      // ignore quota errors
    }
  }, [step, form]);

  // --- Save progress on form value changes (debounced) ---
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const subscription = form.watch(() => {
      if (!restoredRef.current) return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        try {
          const data = JSON.stringify({ step, values: form.getValues() });
          sessionStorage.setItem(STORAGE_KEY, data);
        } catch {
          // ignore quota errors
        }
      }, DEBOUNCE_MS);
    });
    return () => {
      clearTimeout(timer);
      subscription.unsubscribe();
    };
  }, [form, step]);

  return {
    step,
    groups,
    fields,
    form,
    totalSteps: 3,
    isLastStep,
    hasStep2,
    goNext,
    goBack,
    getAllValues,
    clearProgress,
  };
}
