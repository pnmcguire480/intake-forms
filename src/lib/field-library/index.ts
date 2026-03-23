import type { FieldGroup, FieldGroupId } from "./types";
import { contactGroup } from "./groups/contact";
import { projectTypeGroup } from "./groups/project-type";
import { businessNeedsGroup } from "./groups/business-needs";
import { ecommerceGroup } from "./groups/ecommerce";
import { schedulingGroup } from "./groups/scheduling";
import { portfolioGroup } from "./groups/portfolio";
import { membershipGroup } from "./groups/membership";
import { eventsGroup } from "./groups/events";
import { contentGroup } from "./groups/content";
import { locationGroup } from "./groups/location";
import { nonprofitGroup } from "./groups/nonprofit";
import { foodServiceGroup } from "./groups/food-service";
import { healthcareGroup } from "./groups/healthcare";
import { realEstateGroup } from "./groups/real-estate";
import { educationGroup } from "./groups/education";
import { saasGroup } from "./groups/saas";
import { designGroup } from "./groups/design";
import { closingGroup } from "./groups/closing";

export type { FieldDef, FieldGroup, FieldGroupId, FieldOption, FieldType, ValidationRule } from "./types";

/** All field groups (universal + conditional), ordered by step then sortOrder */
export const ALL_GROUPS: FieldGroup[] = [
  // Step 1 — Contact info only
  contactGroup,
  // Step 2 — Project type & needs
  projectTypeGroup,
  businessNeedsGroup,
  // Step 3 — Conditional (rule engine selects which appear)
  ecommerceGroup,
  schedulingGroup,
  portfolioGroup,
  membershipGroup,
  eventsGroup,
  contentGroup,
  locationGroup,
  nonprofitGroup,
  foodServiceGroup,
  healthcareGroup,
  realEstateGroup,
  educationGroup,
  saasGroup,
  // Step 4 — Design & wrap-up
  designGroup,
  closingGroup,
];

/** Look up a single group by its id */
export function getGroupById(id: FieldGroupId): FieldGroup | undefined {
  return ALL_GROUPS.find((g) => g.id === id);
}

/** Get all groups assigned to a given wizard step, sorted by sortOrder */
export function getGroupsByStep(step: 1 | 2 | 3 | 4): FieldGroup[] {
  return ALL_GROUPS.filter((g) => g.step === step).sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );
}
