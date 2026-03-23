
import { resolveStep2Groups } from "./rule-engine";

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
