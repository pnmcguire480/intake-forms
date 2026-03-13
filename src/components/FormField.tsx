"use client";

import { UseFormRegisterReturn } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormError = any;

interface FormFieldProps {
  label: string;
  error?: FormError;
  required?: boolean;
  children: React.ReactNode;
}

export function FormField({ label, error, required, children }: FormFieldProps) {
  const message = error && "message" in error ? error.message : undefined;
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-error ml-0.5">*</span>}
      </label>
      {children}
      {message && (
        <p className="text-sm text-error flex items-center gap-1 mt-1">
          <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {message}
        </p>
      )}
    </div>
  );
}

interface TextInputProps {
  registration: UseFormRegisterReturn;
  placeholder?: string;
  type?: string;
  error?: FormError;
}

export function TextInput({
  registration,
  placeholder,
  type = "text",
  error,
}: TextInputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      {...registration}
      className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all duration-200 bg-white
        ${error ? "field-error" : "border-gray-300 hover:border-gray-400"}`}
    />
  );
}

interface TextAreaProps {
  registration: UseFormRegisterReturn;
  placeholder?: string;
  rows?: number;
  error?: FormError;
}

export function TextArea({
  registration,
  placeholder,
  rows = 4,
  error,
}: TextAreaProps) {
  return (
    <textarea
      placeholder={placeholder}
      rows={rows}
      {...registration}
      className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all duration-200 bg-white resize-y
        ${error ? "field-error" : "border-gray-300 hover:border-gray-400"}`}
    />
  );
}

interface SelectInputProps {
  registration: UseFormRegisterReturn;
  options: { value: string; label: string }[];
  placeholder?: string;
  error?: FormError;
}

export function SelectInput({
  registration,
  options,
  placeholder = "Select an option...",
  error,
}: SelectInputProps) {
  return (
    <select
      {...registration}
      className={`w-full px-3 py-2.5 border rounded-lg text-sm transition-all duration-200 bg-white
        ${error ? "field-error" : "border-gray-300 hover:border-gray-400"}`}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

interface CheckboxGroupProps {
  options: { value: string; label: string }[];
  registration: UseFormRegisterReturn;
  error?: FormError;
}

export function CheckboxGroup({ options, registration, error }: CheckboxGroupProps) {
  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            value={opt.value}
            {...registration}
            className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
          />
          <span className="text-sm text-gray-700 group-hover:text-gray-900">
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  );
}

interface RadioGroupProps {
  options: { value: string; label: string }[];
  registration: UseFormRegisterReturn;
  error?: FormError;
}

export function RadioGroup({ options, registration, error }: RadioGroupProps) {
  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="radio"
            value={opt.value}
            {...registration}
            className="w-4 h-4 border-gray-300 text-brand-600 focus:ring-brand-500"
          />
          <span className="text-sm text-gray-700 group-hover:text-gray-900">
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  );
}
