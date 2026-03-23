"use client";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  hasStep2: boolean;
}

const STEP_LABELS = ["Your Info", "Your Needs", "Design & Wrap-up"];

/**
 * Progress bar showing the user's position in the wizard.
 * Skips the Step 2 dot when hasStep2 is false (per step-skipping rule).
 */
export function StepIndicator({
  currentStep,
  totalSteps: _totalSteps,
  hasStep2,
}: StepIndicatorProps) {
  const visibleSteps = hasStep2
    ? [1, 2, 3]
    : [1, 3];

  const visibleTotal = visibleSteps.length;
  const visibleIndex = visibleSteps.indexOf(currentStep);
  const progressPercent =
    visibleTotal <= 1 ? 100 : (visibleIndex / (visibleTotal - 1)) * 100;

  return (
    <div className="space-y-3">
      {/* Step dots and labels */}
      <div className="flex justify-between items-center">
        {visibleSteps.map((stepNum, idx) => {
          const isActive = stepNum === currentStep;
          const isCompleted = visibleSteps.indexOf(currentStep) > idx;

          return (
            <div key={stepNum} className="flex flex-col items-center gap-1.5">
              <div
                {...(isActive ? { "aria-current": "step" as const } : {})}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                  ${
                    isActive
                      ? "bg-brand-600 text-white shadow-sm"
                      : isCompleted
                        ? "bg-brand-100 text-brand-700"
                        : "bg-gray-100 text-gray-400"
                  }`}
              >
                {isCompleted ? (
                  <svg
                    className="w-4 h-4"
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
                ) : (
                  idx + 1
                )}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block ${
                  isActive ? "text-brand-700" : "text-gray-400"
                }`}
              >
                {STEP_LABELS[stepNum - 1]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          role="progressbar"
          aria-valuenow={visibleIndex + 1}
          aria-valuemin={1}
          aria-valuemax={visibleTotal}
          className="h-full bg-brand-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Mobile step label */}
      <p className="text-xs text-gray-500 text-center sm:hidden">
        Step {visibleIndex + 1} of {visibleTotal}:{" "}
        {STEP_LABELS[currentStep - 1]}
      </p>
    </div>
  );
}
