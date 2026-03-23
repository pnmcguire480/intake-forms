import type { FieldGroup } from "../types";

export const businessNeedsGroup: FieldGroup = {
  id: "business-needs",
  label: "What Does Your Site Need to Do?",
  description:
    "Check everything that applies — this helps us tailor the next set of questions to your project.",
  sortOrder: 3,
  step: 1,
  fields: [
    {
      id: "business-needs.keyNeeds",
      groupId: "business-needs",
      type: "checkbox-group",
      label: "Key needs",
      options: [
        { value: "sell-products", label: "Sell products online" },
        { value: "book-appointments", label: "Book appointments or services" },
        { value: "show-portfolio", label: "Showcase a portfolio of work" },
        { value: "member-area", label: "Offer a members-only area" },
        { value: "manage-events", label: "Manage events or ticketing" },
        { value: "publish-content", label: "Publish articles, blogs, or news" },
        { value: "multiple-locations", label: "Highlight multiple locations" },
        { value: "accept-donations", label: "Accept donations" },
        { value: "food-ordering", label: "Handle food menus or ordering" },
        { value: "patient-intake", label: "Collect patient or client intake forms" },
        { value: "property-listings", label: "Display property or real-estate listings" },
        { value: "online-courses", label: "Offer online courses or training" },
        { value: "saas-marketing", label: "Market a software product (SaaS)" },
        { value: "other", label: "Something else (describe below)" },
      ],
      validation: { required: true, minItems: 1 },
      layout: "full",
      sortOrder: 1,
    },
    {
      id: "business-needs.otherNeeds",
      groupId: "business-needs",
      type: "textarea",
      label: "Tell us more about what you need",
      placeholder: "For example: manage employee schedules, integrate with accounting software...",
      validation: { required: true, maxLength: 1000 },
      rows: 3,
      layout: "full",
      sortOrder: 2,
      conditionalOn: {
        fieldId: "business-needs.keyNeeds",
        values: ["other"],
      },
    },
  ],
};
