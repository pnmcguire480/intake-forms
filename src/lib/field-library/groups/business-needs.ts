import type { FieldGroup } from "../types";

export const businessNeedsGroup: FieldGroup = {
  id: "business-needs",
  label: "What Does Your Website Need to Do?",
  description: "Pick the main goal first, then check anything else that applies.",
  sortOrder: 2,
  step: 2,
  fields: [
    {
      id: "business-needs.primaryGoal",
      groupId: "business-needs",
      type: "radio-group",
      label: "What's the main purpose of your website?",
      options: [
        { value: "sell-online", label: "Sell products or take orders online" },
        { value: "book-services", label: "Let people book appointments or request services" },
        { value: "showcase-work", label: "Showcase my work, portfolio, or listings" },
        { value: "share-info", label: "Share information and build trust" },
        { value: "donations-members", label: "Accept donations or manage memberships" },
        { value: "something-else", label: "Something else" },
      ],
      validation: { required: true },
      layout: "full",
      sortOrder: 1,
    },
    {
      id: "business-needs.additionalNeeds",
      groupId: "business-needs",
      type: "checkbox-group",
      label: "Any of these also apply?",
      helpText: "Optional — check as many as you like, or skip this entirely.",
      options: [
        { value: "publish-content", label: "Publish articles, blogs, or news" },
        { value: "manage-events", label: "Manage events or ticketing" },
        { value: "multiple-locations", label: "Highlight multiple locations" },
        { value: "online-courses", label: "Offer online courses or training" },
        { value: "food-ordering", label: "Handle food menus or ordering" },
        { value: "patient-intake", label: "Collect patient or client intake forms" },
        { value: "property-listings", label: "Display property or real-estate listings" },
        { value: "saas-marketing", label: "Market a software product (SaaS)" },
      ],
      validation: { required: false },
      layout: "full",
      sortOrder: 2,
    },
  ],
};
