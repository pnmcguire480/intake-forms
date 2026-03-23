import type { FieldGroupId } from "@/lib/field-library";

// ============================================================
// Rule Engine
// ============================================================
// Maps the user's Step 2 answers (primaryGoal + additionalNeeds)
// to the Step 3 conditional field groups they should see.
// ============================================================

/** Mapping from an additionalNeeds checkbox value to a Step 3 group id */
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

/** Maps primaryGoal radio values to the equivalent need values */
const GOAL_TO_NEEDS: Record<string, string[]> = {
  "sell-online": ["sell-products"],
  "book-services": ["book-appointments"],
  "showcase-work": ["show-portfolio"],
  "share-info": [],
  "donations-members": ["accept-donations", "member-area"],
  "something-else": [],
};

/**
 * Maps a category slug (from the home page) to the keyNeeds values
 * that should be pre-selected when the wizard loads with ?type=slug.
 */
export const CATEGORY_TO_NEEDS: Record<string, string[]> = {
  restaurant: ["food-ordering"],
  "small-business": ["book-appointments"],
  ecommerce: ["sell-products"],
  portfolio: ["show-portfolio"],
  nonprofit: ["accept-donations"],
  "real-estate": ["property-listings"],
  healthcare: ["patient-intake"],
  construction: ["book-appointments", "multiple-locations"],
  fitness: ["book-appointments", "member-area"],
  events: ["manage-events"],
  custom: ["other"],
};

/**
 * Combines the primaryGoal radio value and additionalNeeds checkbox
 * values into a single array of need keys that NEED_TO_GROUP can map.
 */
export function resolveNeeds(
  primaryGoal: string | undefined,
  additionalNeeds: string[],
): string[] {
  const goalNeeds = primaryGoal ? (GOAL_TO_NEEDS[primaryGoal] ?? []) : [];
  return [...goalNeeds, ...additionalNeeds];
}

/**
 * Given a list of need keys, return the Step 3 FieldGroupIds the
 * user should see. Deduplicates and ignores unknown values.
 *
 * This is the same function as before — it still maps need strings
 * to group ids. The caller (useWizard) now passes the combined
 * output of resolveNeeds() instead of raw keyNeeds.
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
