"use client";

import type { FieldGroup } from "@/lib/field-library";
import { DynamicSection } from "./DynamicSection";

interface WizardStepProps {
  groups: FieldGroup[];
}

/**
 * Renders all DynamicSections for the current wizard step.
 * Groups are already sorted by sortOrder from the hook.
 */
export function WizardStep({ groups }: WizardStepProps) {
  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <DynamicSection key={group.id} group={group} />
      ))}
    </div>
  );
}
