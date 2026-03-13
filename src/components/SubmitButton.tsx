"use client";

interface SubmitButtonProps {
  isSubmitting: boolean;
  isValid: boolean;
}

export function SubmitButton({ isSubmitting, isValid }: SubmitButtonProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
      <button
        type="submit"
        disabled={isSubmitting || !isValid}
        className={`w-full py-3 px-6 rounded-lg text-white font-medium text-sm transition-all duration-200
          ${
            isSubmitting || !isValid
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-brand-600 hover:bg-brand-700 active:bg-brand-800 shadow-sm hover:shadow"
          }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
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
        ) : (
          "Submit Questionnaire"
        )}
      </button>
      {!isValid && (
        <p className="mt-2 text-xs text-gray-500 text-center">
          Please complete all required fields before submitting.
        </p>
      )}
    </div>
  );
}
