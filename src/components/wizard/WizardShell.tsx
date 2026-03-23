"use client";

import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { useWizard } from "@/lib/wizard/use-wizard";
import { submitForm } from "@/lib/submit";
import { StepIndicator } from "./StepIndicator";
import { StepNavigation } from "./StepNavigation";
import { WizardStep } from "./WizardStep";
import { Honeypot } from "./Honeypot";

const STEP_TITLES: Record<number, { heading: string; subtitle: string }> = {
  1: {
    heading: "Tell us about you",
    subtitle: "Basic contact info and what kind of project you need.",
  },
  2: {
    heading: "Details for your project",
    subtitle: "Answer the questions that match your specific needs.",
  },
  3: {
    heading: "Design & final details",
    subtitle: "Style preferences and anything else we should know.",
  },
};

/**
 * Top-level wizard wrapper. Orchestrates:
 * - Step indicator (progress bar)
 * - Per-step title card
 * - Dynamic sections for the current step
 * - Back/Next/Submit navigation
 * - Success screen after submission
 */
export function WizardShell() {
  const wizard = useWizard();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { heading, subtitle } = STEP_TITLES[wizard.step];

  // Handle Next or Submit depending on current step
  async function handleNext() {
    const valid = await wizard.goNext();
    if (!valid) return;

    if (wizard.isLastStep) {
      // goNext validated; now submit
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        await submitForm("universal-wizard", wizard.getAllValues());
        wizard.clearProgress();
        setSubmitted(true);
      } catch (err) {
        setSubmitError(
          err instanceof Error ? err.message : "Submission failed. Please try again.",
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  // Success state
  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-success"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Thank you!</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Your responses have been sent successfully. I&apos;ll review your
            answers and get back to you soon.
          </p>
          <p className="text-sm text-gray-400">
            No data has been stored on this site. You may close this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...wizard.form}>
      <div role="form" aria-label="Project intake wizard" className="max-w-3xl mx-auto space-y-6">
        <Honeypot />
        {/* Step indicator */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          <StepIndicator
            currentStep={wizard.step}
            totalSteps={wizard.totalSteps}
            hasStep2={wizard.hasStep2}
          />
        </div>

        {/* Title card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {heading}
          </h1>
          <p className="mt-2 text-gray-600">{subtitle}</p>
          <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 bg-brand-50 rounded-lg px-3 py-2">
            <svg
              className="w-4 h-4 text-brand-600 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            All fields marked with{" "}
            <span className="text-error font-medium">*</span> are required.
            Your answers are sent directly via email and are never stored.
          </div>
        </div>

        {/* Current step sections */}
        <WizardStep groups={wizard.groups} />

        {/* Submit error */}
        {submitError && (
          <div aria-live="polite" className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
            {submitError}
          </div>
        )}

        {/* Navigation */}
        <StepNavigation
          isFirstStep={wizard.step === 1}
          isLastStep={wizard.isLastStep}
          isSubmitting={isSubmitting}
          onBack={wizard.goBack}
          onNext={handleNext}
        />
      </div>
    </FormProvider>
  );
}
