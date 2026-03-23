
import { flattenValues } from "./use-wizard";

describe("flattenValues", () => {
  it("flattens a simple nested object", () => {
    expect(
      flattenValues({ contact: { fullName: "Jane", email: "j@e.com" } }),
    ).toEqual({
      "contact.fullName": "Jane",
      "contact.email": "j@e.com",
    });
  });

  it("preserves arrays (does not flatten them)", () => {
    const result = flattenValues({
      "business-needs": { keyNeeds: ["sell-products", "other"] },
    });
    expect(result["business-needs.keyNeeds"]).toEqual([
      "sell-products",
      "other",
    ]);
  });

  it("handles deeply nested paths", () => {
    expect(flattenValues({ a: { b: { c: "deep" } } })).toEqual({
      "a.b.c": "deep",
    });
  });

  it("returns empty object for empty input", () => {
    expect(flattenValues({})).toEqual({});
  });

  it("preserves null and undefined values", () => {
    const result = flattenValues({ a: { x: null, y: undefined } });
    expect(result).toEqual({ "a.x": null, "a.y": undefined });
  });

  it("handles mixed nested and flat keys", () => {
    const result = flattenValues({
      topLevel: "val",
      nested: { child: "val2" },
    });
    expect(result).toEqual({
      topLevel: "val",
      "nested.child": "val2",
    });
  });
});
