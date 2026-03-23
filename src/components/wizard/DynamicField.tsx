"use client";

import { useFormContext } from "react-hook-form";
import type { FieldDef } from "@/lib/field-library";
import {
  FormField,
  TextInput,
  TextArea,
  SelectInput,
  CheckboxGroup,
  RadioGroup,
} from "@/components/FormField";

interface DynamicFieldProps {
  field: FieldDef;
}

/**
 * Traverse a nested error object by dot path.
 * e.g. getNestedError(errors, "contact.fullName") → errors.contact?.fullName
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getNestedError(errors: Record<string, any>, path: string) {
  return path.split(".").reduce((obj, key) => obj?.[key], errors);
}

/**
 * Renders a single FieldDef using the existing FormField/input components.
 * Handles conditionalOn visibility by watching the controlling field.
 */
export function DynamicField({ field }: DynamicFieldProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  // Conditional visibility: hide when the watched field doesn't match
  if (field.conditionalOn) {
    const watchedValue = watch(field.conditionalOn.fieldId);
    // Handle both scalar values (radio/select) and array values (checkbox-group)
    const matches = Array.isArray(watchedValue)
      ? field.conditionalOn.values.some((v) => watchedValue.includes(v))
      : field.conditionalOn.values.includes(watchedValue as string);
    if (!matches) return null;
  }

  const error = getNestedError(errors, field.id);
  const registration = register(field.id);

  const helpTextId = field.helpText ? `${field.id}-help` : undefined;

  return (
    <div aria-invalid={!!error || undefined} aria-describedby={helpTextId}>
      <FormField
        label={field.label}
        error={error}
        required={field.validation.required}
      >
        {field.type === "text" && (
          <TextInput
            registration={registration}
            placeholder={field.placeholder}
            type={field.inputType ?? "text"}
            error={error}
          />
        )}
        {field.type === "textarea" && (
          <TextArea
            registration={registration}
            placeholder={field.placeholder}
            rows={field.rows}
            error={error}
          />
        )}
        {field.type === "select" && field.options && (
          <SelectInput
            registration={registration}
            options={field.options}
            placeholder={field.placeholder}
            error={error}
          />
        )}
        {field.type === "checkbox-group" && field.options && (
          <CheckboxGroup
            registration={registration}
            options={field.options}
            error={error}
          />
        )}
        {field.type === "radio-group" && field.options && (
          <RadioGroup
            registration={registration}
            options={field.options}
            error={error}
          />
        )}
        {field.helpText && (
          <p id={helpTextId} className="text-xs text-gray-500 mt-1">{field.helpText}</p>
        )}
      </FormField>
    </div>
  );
}
