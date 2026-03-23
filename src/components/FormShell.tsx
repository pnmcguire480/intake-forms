"use client";

import { useState } from "react";

interface FormShellProps {
  title: string;
  subtitle: string;
  formName: string;
  children: (props: {
    onSubmitSuccess: () => void;
  }) => React.ReactNode;
}

export function FormShell({ title, subtitle, formName: _formName, children }: FormShellProps) {
  const [submitted, setSubmitted] = useState(false);

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
          <h2 className="text-2xl font-bold text-gray-900">
            Thank you!
          </h2>
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
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Title card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {title}
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
          All fields marked with <span className="text-error font-medium">*</span> are required.
          Your answers are sent directly via email and are never stored.
        </div>
      </div>

      {/* Form content */}
      {children({ onSubmitSuccess: () => setSubmitted(true) })}
    </div>
  );
}
