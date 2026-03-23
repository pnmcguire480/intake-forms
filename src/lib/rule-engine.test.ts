
import { resolveStep2Groups, resolveNeeds } from "./rule-engine";

describe("resolveStep2Groups", () => {
  it("returns empty array when no needs selected", () => {
    expect(resolveStep2Groups([])).toEqual([]);
  });

  it("maps a single need to its group", () => {
    expect(resolveStep2Groups(["sell-products"])).toEqual(["ecommerce"]);
  });

  it("maps multiple needs in order", () => {
    const result = resolveStep2Groups(["book-appointments", "sell-products"]);
    expect(result).toEqual(["scheduling", "ecommerce"]);
  });

  it("ignores unknown values like 'other'", () => {
    const result = resolveStep2Groups(["sell-products", "other"]);
    expect(result).toEqual(["ecommerce"]);
  });

  it("deduplicates repeated values", () => {
    const result = resolveStep2Groups(["sell-products", "sell-products"]);
    expect(result).toEqual(["ecommerce"]);
  });

  it("maps all 13 known needs", () => {
    const allNeeds = [
      "sell-products",
      "book-appointments",
      "show-portfolio",
      "member-area",
      "manage-events",
      "publish-content",
      "multiple-locations",
      "accept-donations",
      "food-ordering",
      "patient-intake",
      "property-listings",
      "online-courses",
      "saas-marketing",
    ];
    const result = resolveStep2Groups(allNeeds);
    expect(result).toHaveLength(13);
  });
});

describe("resolveNeeds", () => {
  it("returns empty when no goal and no additional needs", () => {
    expect(resolveNeeds(undefined, [])).toEqual([]);
  });

  it("maps sell-online goal to sell-products need", () => {
    expect(resolveNeeds("sell-online", [])).toEqual(["sell-products"]);
  });

  it("maps donations-members goal to two needs", () => {
    expect(resolveNeeds("donations-members", [])).toEqual([
      "accept-donations",
      "member-area",
    ]);
  });

  it("share-info goal produces no needs", () => {
    expect(resolveNeeds("share-info", [])).toEqual([]);
  });

  it("combines goal needs with additional needs", () => {
    const result = resolveNeeds("sell-online", ["manage-events", "publish-content"]);
    expect(result).toEqual(["sell-products", "manage-events", "publish-content"]);
  });

  it("handles unknown goal gracefully", () => {
    expect(resolveNeeds("unknown-value", ["sell-products"])).toEqual(["sell-products"]);
  });

  it("works end-to-end with resolveStep2Groups", () => {
    const needs = resolveNeeds("sell-online", ["food-ordering"]);
    const groups = resolveStep2Groups(needs);
    expect(groups).toEqual(["ecommerce", "food-service"]);
  });
});
