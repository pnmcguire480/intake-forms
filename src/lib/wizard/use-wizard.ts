"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import {
  getGroupsByStep,
  getGroupById,
  type FieldGroup,
  type FieldDef,
} from "@/lib/field-library";
import { resolveStep2Groups, resolveNeeds, CATEGORY_TO_NEEDS } from "@/lib/rule-engine";
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
// useWizard Hook — 4-step lifecycle
// ============================================================
//   Step 1 → contact info only
//   Step 2 → project type + business needs (primaryGoal + additionalNeeds)
//   Step 3 → conditional groups chosen by the rule engine (skippable)
//   Step 4 → design + closing
// ============================================================

export type WizardStep = 1 | 2 | 3 | 4;

export interface WizardState {
  /** Current step number */
  step: WizardStep;
  /** Field groups visible on the current step */
  groups: FieldGroup[];
  /** All fields for the current step (flattened from groups) */
  fields: FieldDef[];
  /** React Hook Form instance — shared across all steps */
  form: UseFormReturn<Record<string, unknown>>;
  /** Total number of steps */
  totalSteps: 4;
  /** Whether the user is on the final step */
  isLastStep: boolean;
  /** Whether Step 3 has any conditional groups (if not, skip it) */
  hasStep3: boolean;
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

  // --- Static groups per step ---
  const step1Groups = useMemo(() => getGroupsByStep(1), []);
  const step2Groups = useMemo(() => getGroupsByStep(2), []);
  const step4Groups = useMemo(() => getGroupsByStep(4), []);

  // --- Single form instance for the entire wizard ---
  const form = useForm<Record<string, unknown>>({
    mode: "onTouched",
    defaultValues: {},
  });

  // --- Pre-fill from ?type= query param ---
  useEffect(() => {
    if (prefilledRef.current || !categoryType) return;
    const needs = CATEGORY_TO_NEEDS[categoryType];
    if (needs && needs.length > 0) {
      // Pre-select the additionalNeeds checkboxes from the category mapping
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (form as any).setValue("business-needs.additionalNeeds", needs);
    }
    prefilledRef.current = true;
  }, [categoryType, form]);

  // --- Resolve Step 3 groups from primaryGoal + additionalNeeds ---
  const rawGoal = form.watch("business-needs.primaryGoal");
  const primaryGoal = typeof rawGoal === "string" ? rawGoal : undefined;

  const rawAdditional = form.watch("business-needs.additionalNeeds");
  const additionalNeeds = Array.isArray(rawAdditional) ? rawAdditional : [];

  const combinedNeeds = useMemo(
    () => resolveNeeds(primaryGoal, additionalNeeds),
    [primaryGoal, JSON.stringify(additionalNeeds)],
  );

  const step3GroupIds = useMemo(
    () => resolveStep2Groups(combinedNeeds),
    [JSON.stringify(combinedNeeds)],
  );

  const step3Groups = useMemo(
    () =>
      step3GroupIds
        .map((id) => getGroupById(id))
        .filter((g): g is FieldGroup => g !== undefined),
    [step3GroupIds],
  );

  const hasStep3 = step3Groups.length > 0;

  // --- Current step's groups and fields ---
  const groups = useMemo(() => {
    if (step === 1) return step1Groups;
    if (step === 2) return step2Groups;
    if (step === 3) return step3Groups;
    return step4Groups;
  }, [step, step1Groups, step2Groups, step3Groups, step4Groups]);

  const fields = useMemo(
    () => groups.flatMap((g) => g.fields),
    [groups],
  );

  // --- Per-step Zod schema (for trigger validation) ---
  const stepSchema = useMemo(() => buildSchema(fields), [fields]);

  const isLastStep = step === 4;

  // --- Navigation ---
  const goNext = useCallback(async (): Promise<boolean> => {
    const flat = flattenValues(form.getValues());
    const result = stepSchema.safeParse(flat);

    if (!result.success) {
      for (const issue of result.error.issues) {
        const key = issue.path.join(".");
        form.setError(key, { type: "manual", message: issue.message });
      }
      return false;
    }

    // Advance to next step (skip Step 3 if no conditional groups)
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(hasStep3 ? 3 : 4);
    } else if (step === 3) {
      setStep(4);
    }
    // If step === 4, the caller handles submission
    return true;
  }, [step, stepSchema, form, hasStep3]);

  const goBack = useCallback(() => {
    if (step === 4) {
      setStep(hasStep3 ? 3 : 2);
    } else if (step === 3) {
      setStep(2);
    } else if (step === 2) {
      setStep(1);
    }
  }, [step, hasStep3]);

  const getAllValues = useCallback(
    () => form.getValues(),
    [form],
  );

  // --- Clear saved progress ---
  const clearProgress = useCallback(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // sessionStorage unavailable
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
        if ([1, 2, 3, 4].includes(saved.step)) {
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
    totalSteps: 4,
    isLastStep,
    hasStep3,
    goNext,
    goBack,
    getAllValues,
    clearProgress,
  };
}
