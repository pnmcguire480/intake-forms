import type { FieldGroup } from "../types";

export const projectTypeGroup: FieldGroup = {
  id: "project-type",
  label: "What Are You Looking For?",
  description: "Help us understand the type of project you need.",
  sortOrder: 2,
  step: 1,
  fields: [
    {
      id: "project-type.whatToBuild",
      groupId: "project-type",
      type: "radio-group",
      label: "What do you want to build?",
      options: [
        { value: "website", label: "Website" },
        { value: "web-app", label: "Web Application" },
        { value: "mobile-app", label: "Mobile App" },
        { value: "plugin", label: "Plugin or Integration" },
        { value: "landing-page", label: "Landing Page" },
        { value: "not-sure", label: "Not sure yet" },
      ],
      validation: { required: true },
      layout: "full",
      sortOrder: 1,
    },
    {
      id: "project-type.isRedesign",
      groupId: "project-type",
      type: "radio-group",
      label: "Is this a new project or a redesign?",
      options: [
        { value: "new", label: "Brand new — starting from scratch" },
        { value: "redesign", label: "Redesign of something existing" },
        { value: "unsure", label: "Not sure yet" },
      ],
      validation: { required: true },
      layout: "full",
      sortOrder: 2,
    },
  ],
};
