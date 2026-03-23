import { ALL_GROUPS, getGroupsByStep, getGroupById } from "./index";
import type { FieldDef } from "./types";

describe("field library exports", () => {
  it("ALL_GROUPS has 18 groups", () => {
    expect(ALL_GROUPS).toHaveLength(18);
  });

  it("getGroupsByStep(1) returns 1 group (contact)", () => {
    const step1 = getGroupsByStep(1);
    expect(step1).toHaveLength(1);
    expect(step1.map((g) => g.id)).toEqual(["contact"]);
  });

  it("getGroupsByStep(2) returns 2 groups (project-type, business-needs)", () => {
    const step2 = getGroupsByStep(2);
    expect(step2).toHaveLength(2);
    expect(step2.map((g) => g.id)).toEqual([
      "project-type",
      "business-needs",
    ]);
  });

  it("getGroupsByStep(3) returns 13 conditional groups", () => {
    const step3 = getGroupsByStep(3);
    expect(step3).toHaveLength(13);
  });

  it("getGroupsByStep(4) returns 2 groups (design, closing)", () => {
    const step4 = getGroupsByStep(4);
    expect(step4).toHaveLength(2);
    expect(step4.map((g) => g.id)).toEqual(["design", "closing"]);
  });

  it('getGroupById("ecommerce") returns a group with correct id', () => {
    const group = getGroupById("ecommerce");
    expect(group).toBeDefined();
    expect(group!.id).toBe("ecommerce");
  });

  it('getGroupById("nonexistent") returns undefined', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const group = getGroupById("nonexistent" as any);
    expect(group).toBeUndefined();
  });

  it("every field across ALL_GROUPS has a globally unique id", () => {
    const allFields: FieldDef[] = ALL_GROUPS.flatMap((g) => g.fields);
    const ids = allFields.map((f) => f.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("every field has a non-empty label and a validation object", () => {
    const allFields: FieldDef[] = ALL_GROUPS.flatMap((g) => g.fields);
    for (const field of allFields) {
      expect(field.label, `field ${field.id} should have a non-empty label`).toBeTruthy();
      expect(typeof field.label).toBe("string");
      expect(field.label.length).toBeGreaterThan(0);
      expect(field.validation, `field ${field.id} should have a validation object`).toBeDefined();
      expect(typeof field.validation).toBe("object");
    }
  });
});
