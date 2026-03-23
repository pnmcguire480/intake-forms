"use client";

import type { FieldGroup } from "@/lib/field-library";
import { FormSection } from "@/components/FormSection";
import { DynamicField } from "./DynamicField";

interface DynamicSectionProps {
  group: FieldGroup;
}

/**
 * Renders a FieldGroup as a FormSection card. Fields are laid out
 * in a 2-column grid, respecting each field's `layout` property
 * ("half" = one column, "full" or default = span both columns).
 */
export function DynamicSection({ group }: DynamicSectionProps) {
  const sortedFields = [...group.fields].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );

  return (
    <FormSection title={group.label} description={group.description}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sortedFields.map((field) => (
          <div
            key={field.id}
            className={field.layout === "half" ? "" : "md:col-span-2"}
          >
            <DynamicField field={field} />
          </div>
        ))}
      </div>
    </FormSection>
  );
}
