import type { FieldGroupId } from "@/lib/field-library";

// ============================================================
// Rule Engine
// ============================================================
// Maps business-needs.keyNeeds checkbox values to the Step 2
// field groups the user should see. Each keyNeed value maps to
// exactly one conditional FieldGroupId. Values with no Step 2
// group (like "other") are silently ignored.
// ============================================================

/** Mapping from a keyNeeds checkbox value to a Step 2 group id */
const NEED_TO_GROUP: Record<string, FieldGroupId> = {
  "sell-products": "ecommerce",
  "book-appointments": "scheduling",
  "show-portfolio": "portfolio",
  "member-area": "membership",
  "manage-events": "events",
  "publish-content": "content",
  "multiple-locations": "location",
  "accept-donations": "nonprofit",
  "food-ordering": "food-service",
  "patient-intake": "healthcare",
  "property-listings": "real-estate",
  "online-courses": "education",
  "saas-marketing": "saas",
};

/**
 * Given the user's keyNeeds selections from Step 1, return the
 * list of Step 2 FieldGroupIds they should see — in the same
 * order the groups appear in the field library (by sortOrder).
 *
 * Deduplicates automatically and ignores values that have no
 * matching group (e.g. "other").
 */
export function resolveStep2Groups(keyNeeds: string[]): FieldGroupId[] {
  const seen = new Set<FieldGroupId>();
  const result: FieldGroupId[] = [];

  for (const need of keyNeeds) {
    const groupId = NEED_TO_GROUP[need];
    if (groupId && !seen.has(groupId)) {
      seen.add(groupId);
      result.push(groupId);
    }
  }

  return result;
}
