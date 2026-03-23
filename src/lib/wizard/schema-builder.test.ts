
import { buildSchema } from "./schema-builder";
import type { FieldDef } from "@/lib/field-library";

function makeField(overrides: Partial<FieldDef> & { id: string }): FieldDef {
  return {
    groupId: "contact",
    type: "text",
    label: "Test",
    validation: {},
    sortOrder: 1,
    ...overrides,
  };
}

describe("buildSchema", () => {
  it("accepts valid data for a required text field", () => {
    const schema = buildSchema([
      makeField({ id: "contact.fullName", validation: { required: true } }),
    ]);
    const result = schema.safeParse({ "contact.fullName": "Jane" });
    expect(result.success).toBe(true);
  });

  it("rejects empty string for a required text field", () => {
    const schema = buildSchema([
      makeField({ id: "contact.fullName", validation: { required: true } }),
    ]);
    const result = schema.safeParse({ "contact.fullName": "" });
    expect(result.success).toBe(false);
  });

  it("allows empty string for an optional text field", () => {
    const schema = buildSchema([
      makeField({ id: "contact.phone", validation: { required: false } }),
    ]);
    const result = schema.safeParse({ "contact.phone": "" });
    expect(result.success).toBe(true);
  });

  it("validates checkbox-group with minItems", () => {
    const schema = buildSchema([
      makeField({
        id: "business-needs.keyNeeds",
        type: "checkbox-group",
        validation: { required: true, minItems: 1 },
      }),
    ]);

    expect(
      schema.safeParse({ "business-needs.keyNeeds": ["sell-products"] }).success,
    ).toBe(true);

    expect(
      schema.safeParse({ "business-needs.keyNeeds": [] }).success,
    ).toBe(false);
  });

  it("validates maxLength constraint", () => {
    const schema = buildSchema([
      makeField({ id: "f", validation: { required: true, maxLength: 5 } }),
    ]);
    expect(schema.safeParse({ f: "abcdef" }).success).toBe(false);
    expect(schema.safeParse({ f: "abc" }).success).toBe(true);
  });

  it("validates regex pattern", () => {
    const schema = buildSchema([
      makeField({
        id: "email",
        validation: {
          required: true,
          pattern: {
            regex: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
            message: "Invalid email",
          },
        },
      }),
    ]);
    expect(schema.safeParse({ email: "bad" }).success).toBe(false);
    expect(schema.safeParse({ email: "a@b.com" }).success).toBe(true);
  });

  it("builds schema from multiple fields", () => {
    const schema = buildSchema([
      makeField({ id: "a", validation: { required: true } }),
      makeField({ id: "b", validation: { required: false } }),
    ]);
    expect(schema.safeParse({ a: "val" }).success).toBe(true);
    expect(schema.safeParse({}).success).toBe(false);
  });
});
