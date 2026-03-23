// ============================================================
// Field Library Type System
// ============================================================
// These types define the shape of every form field, group, and
// validation rule in the universal intake wizard. The wizard UI
// reads these definitions at runtime to render fields, validate
// input, and assemble dynamic forms.
// ============================================================

/** Input control types supported by the wizard renderer */
export type FieldType =
  | "text"
  | "textarea"
  | "select"
  | "checkbox-group"
  | "radio-group";

/** A single option for select, checkbox-group, or radio-group fields */
export interface FieldOption {
  value: string;
  label: string;
}

/** Validation constraints applied to a field */
export interface ValidationRule {
  /** Field must have a value */
  required?: boolean;
  /** Minimum character length (text/textarea) */
  minLength?: number;
  /** Maximum character length (text/textarea) */
  maxLength?: number;
  /** Regex pattern with a human-readable error message */
  pattern?: { regex: string; message: string };
  /** Minimum selections required (checkbox-group) */
  minItems?: number;
}

/**
 * Show this field only when another field has a matching value.
 * Used for intra-group conditional visibility (e.g., show "existingSiteUrl"
 * only when "hasExistingSite" is "yes").
 */
export interface ConditionalOn {
  /** The id of the field to watch */
  fieldId: string;
  /** Show this field when the watched field's value is in this list */
  values: string[];
}

/**
 * A single form field definition. The wizard renderer reads this
 * to decide what component to render, how to validate it, and
 * where to place it in the layout.
 */
export interface FieldDef {
  /** Unique across the entire library, e.g. "contact.fullName" */
  id: string;
  /** Which group this field belongs to */
  groupId: FieldGroupId;
  /** What input control to render */
  type: FieldType;
  /** Label shown above the input */
  label: string;
  /** Placeholder text inside the input */
  placeholder?: string;
  /** Help text shown below the input */
  helpText?: string;
  /** Choices for select, checkbox-group, or radio-group */
  options?: FieldOption[];
  /** Validation constraints */
  validation: ValidationRule;
  /** HTML input type for text fields: "email", "tel", "url", or "text" (default) */
  inputType?: string;
  /** Row count for textarea fields */
  rows?: number;
  /** Layout width: "half" for 2-column grid, "full" for full width */
  layout?: "half" | "full";
  /** Ordering within the group (lower = earlier) */
  sortOrder: number;
  /** Conditional visibility based on another field's value */
  conditionalOn?: ConditionalOn;
}

/**
 * All possible field group identifiers.
 *
 * Universal groups (everyone sees):
 *   contact, project-type, business-needs, design, closing
 *
 * Conditional groups (rule engine selects based on Step 1 answers):
 *   ecommerce, scheduling, portfolio, membership, events, content,
 *   location, nonprofit, food-service, healthcare, real-estate,
 *   education, saas
 */
export type FieldGroupId =
  // Universal — Step 1
  | "contact"
  | "project-type"
  | "business-needs"
  // Conditional — Step 2
  | "ecommerce"
  | "scheduling"
  | "portfolio"
  | "membership"
  | "events"
  | "content"
  | "location"
  | "nonprofit"
  | "food-service"
  | "healthcare"
  | "real-estate"
  | "education"
  | "saas"
  // Universal — Step 3
  | "design"
  | "closing";

/**
 * A logical grouping of related fields. Rendered as a FormSection
 * in the wizard UI. The `step` property determines which wizard
 * step this group appears in.
 */
export interface FieldGroup {
  /** Matches one of the FieldGroupId values */
  id: FieldGroupId;
  /** Section heading shown in the form */
  label: string;
  /** Optional subtitle below the heading */
  description?: string;
  /** Ordering among groups within the same step (lower = earlier) */
  sortOrder: number;
  /** Which wizard step this group appears in (1, 2, or 3) */
  step: 1 | 2 | 3;
  /** The fields in this group, ordered by their sortOrder */
  fields: FieldDef[];
}
