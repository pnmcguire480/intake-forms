"use client";

interface StepNavigationProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  isSubmitting: boolean;
  onBack: () => void;
  onNext: () => Promise<void>;
}

/**
 * Back / Next / Submit button bar for wizard navigation.
 * Shows a loading spinner on submit, hides Back on step 1.
 */
export function StepNavigation({
  isFirstStep,
  isLastStep,
  isSubmitting,
  onBack,
  onNext,
}: StepNavigationProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
      <div className="flex items-center justify-between gap-4">
        {/* Back button */}
        {!isFirstStep ? (
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-all duration-200 disabled:opacity-50"
          >
            Back
          </button>
        ) : (
          <div />
        )}

        {/* Next / Submit button */}
        <button
          type="button"
          onClick={onNext}
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className={`px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-all duration-200 shadow-sm hover:shadow
            ${
              isSubmitting
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-brand-600 hover:bg-brand-700 active:bg-brand-800"
            }`}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Sending...
            </span>
          ) : isLastStep ? (
            "Submit Questionnaire"
          ) : (
            "Next Step"
          )}
        </button>
      </div>
    </div>
  );
}
