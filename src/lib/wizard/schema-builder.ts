import { z } from "zod";
import type { FieldDef } from "@/lib/field-library";

// ============================================================
// Dynamic Schema Builder
// ============================================================
// Converts an array of FieldDef objects into a Zod object schema
// at runtime. The wizard hook calls this once per step to get
// the validation schema for the currently visible fields.
// ============================================================

/** Build a single Zod schema entry from a FieldDef's validation rules */
function fieldToZod(field: FieldDef): z.ZodType {
  const v = field.validation;

  // Checkbox-group fields store string arrays
  if (field.type === "checkbox-group") {
    let schema = z.array(z.string());
    if (v.minItems) {
      schema = schema.min(v.minItems, `Select at least ${v.minItems}`);
    }
    if (v.required && !v.minItems) {
      schema = schema.min(1, "Please select at least one option");
    }
    return schema;
  }

  // All other field types are strings
  let schema = z.string();

  if (v.required) {
    schema = schema.min(1, "This field is required");
  }
  if (v.minLength) {
    schema = schema.min(v.minLength, `Must be at least ${v.minLength} characters`);
  }
  if (v.maxLength) {
    schema = schema.max(v.maxLength, `Must be at most ${v.maxLength} characters`);
  }
  if (v.pattern) {
    schema = schema.regex(new RegExp(v.pattern.regex), v.pattern.message);
  }

  // Non-required string fields should accept empty strings
  if (!v.required) {
    return schema.optional();
  }

  return schema;
}

/**
 * Build a Zod object schema from an array of FieldDef objects.
 * Keys use the field's `id` (e.g. "contact.fullName") so all
 * fields across groups live in a flat namespace — no collisions
 * because ids are globally unique.
 */
export function buildSchema(fields: FieldDef[]): z.ZodObject<Record<string, z.ZodType>> {
  const shape: Record<string, z.ZodType> = {};

  for (const field of fields) {
    shape[field.id] = fieldToZod(field);
  }

  return z.object(shape);
}

/**
 * Build the combined schema for multiple steps' worth of fields.
 * Useful for final "submit all" validation across the entire form.
 */
export function buildFullSchema(allFields: FieldDef[]): z.ZodObject<Record<string, z.ZodType>> {
  return buildSchema(allFields);
}
