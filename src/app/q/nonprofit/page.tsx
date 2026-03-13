"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormShell } from "@/components/FormShell";
import { FormSection } from "@/components/FormSection";
import { FormField, TextInput, TextArea, SelectInput, CheckboxGroup, RadioGroup } from "@/components/FormField";
import { SubmitButton } from "@/components/SubmitButton";
import { submitForm } from "@/lib/submit";

const schema = z.object({
  orgName: z.string().min(1, "Organization name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  orgType: z.string().min(1, "Please select your organization type"),
  missionStatement: z.string().min(1, "Please describe your mission"),
  targetAudience: z.string().min(1, "Please describe your target audience"),
  hasExistingSite: z.string().min(1, "Please select an option"),
  existingSiteUrl: z.string().optional(),
  goals: z.array(z.string()).min(1, "Please select at least one goal"),
  wantedFeatures: z.array(z.string()).min(1, "Please select at least one feature"),
  hasLogo: z.string().min(1, "Please select an option"),
  brandDescription: z.string().optional(),
  timeline: z.string().min(1, "Please select a timeline"),
  budget: z.string().min(1, "Please select a budget range"),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const FORM_NAME = "nonprofit-intake";

export default function NonprofitForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  return (
    <FormShell
      title="Nonprofit / Organization Questionnaire"
      subtitle="Help us understand your organization and what you need from your website."
      formName={FORM_NAME}
    >
      {({ onSubmitSuccess }) => (
        <form
          name={FORM_NAME}
          onSubmit={handleSubmit(async (data) => {
            await submitForm(FORM_NAME, data);
            onSubmitSuccess();
          })}
          className="space-y-6"
        >
          {/* Hidden Netlify form field */}

          <FormSection title="Contact Information" description="How can we reach you?">
            <div className="grid md:grid-cols-2 gap-5">
              <FormField label="Organization Name" required error={errors.orgName}>
                <TextInput registration={register("orgName")} placeholder="e.g., Hope Community Church" error={errors.orgName} />
              </FormField>
              <FormField label="Contact Name" required error={errors.contactName}>
                <TextInput registration={register("contactName")} placeholder="e.g., Jane Doe" error={errors.contactName} />
              </FormField>
              <FormField label="Email" required error={errors.email}>
                <TextInput registration={register("email")} type="email" placeholder="you@example.com" error={errors.email} />
              </FormField>
              <FormField label="Phone" required error={errors.phone}>
                <TextInput registration={register("phone")} type="tel" placeholder="(555) 123-4567" error={errors.phone} />
              </FormField>
            </div>
          </FormSection>

          <FormSection title="About Your Organization">
            <FormField label="Organization Type" required error={errors.orgType}>
              <SelectInput
                registration={register("orgType")}
                error={errors.orgType}
                options={[
                  { value: "church", label: "Church / Place of Worship" },
                  { value: "charity", label: "Charity / Nonprofit" },
                  { value: "association", label: "Association / Professional Group" },
                  { value: "community", label: "Community Group" },
                  { value: "other", label: "Other" },
                ]}
              />
            </FormField>
            <FormField label="Mission Statement" required error={errors.missionStatement}>
              <TextArea
                registration={register("missionStatement")}
                placeholder="Briefly describe your organization's mission and purpose..."
                error={errors.missionStatement}
              />
            </FormField>
            <FormField label="Target Audience" required error={errors.targetAudience}>
              <TextArea
                registration={register("targetAudience")}
                placeholder="Who are you trying to reach? e.g., local families, donors, volunteers..."
                rows={3}
                error={errors.targetAudience}
              />
            </FormField>
          </FormSection>

          <FormSection title="Current Web Presence">
            <FormField label="Do you have an existing website?" required error={errors.hasExistingSite}>
              <RadioGroup
                registration={register("hasExistingSite")}
                error={errors.hasExistingSite}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No, this is brand new" },
                ]}
              />
            </FormField>
            <FormField label="Existing Website URL (if applicable)" error={errors.existingSiteUrl}>
              <TextInput registration={register("existingSiteUrl")} placeholder="https://..." error={errors.existingSiteUrl} />
            </FormField>
          </FormSection>

          <FormSection title="Website Goals" description="What do you want your website to accomplish?">
            <FormField label="Primary Goals" required error={errors.goals}>
              <CheckboxGroup
                registration={register("goals")}
                error={errors.goals}
                options={[
                  { value: "awareness", label: "Raise awareness about our cause" },
                  { value: "donations", label: "Accept online donations" },
                  { value: "volunteers", label: "Recruit volunteers" },
                  { value: "events", label: "Promote events" },
                  { value: "communication", label: "Communicate with members" },
                  { value: "resources", label: "Share resources and information" },
                ]}
              />
            </FormField>
          </FormSection>

          <FormSection title="Website Features" description="What features do you need?">
            <FormField label="Desired Features" required error={errors.wantedFeatures}>
              <CheckboxGroup
                registration={register("wantedFeatures")}
                error={errors.wantedFeatures}
                options={[
                  { value: "donations", label: "Donation integration" },
                  { value: "eventCalendar", label: "Event calendar" },
                  { value: "volunteerSignup", label: "Volunteer sign-up form" },
                  { value: "newsletter", label: "Newsletter / email sign-up" },
                  { value: "blog", label: "Blog / News updates" },
                  { value: "memberPortal", label: "Member portal / login area" },
                  { value: "gallery", label: "Photo / video gallery" },
                  { value: "socialMedia", label: "Social media integration" },
                  { value: "contactForm", label: "Contact form" },
                  { value: "staffDirectory", label: "Staff / leadership directory" },
                ]}
              />
            </FormField>
          </FormSection>

          <FormSection title="Content & Branding">
            <FormField label="Do you have a logo and brand guidelines?" required error={errors.hasLogo}>
              <RadioGroup
                registration={register("hasLogo")}
                error={errors.hasLogo}
                options={[
                  { value: "yes", label: "Yes, we have a logo and brand guidelines" },
                  { value: "logoOnly", label: "We have a logo but no formal guidelines" },
                  { value: "no", label: "No, we need branding help" },
                ]}
              />
            </FormField>
            <FormField label="Describe the look and feel you're going for" error={errors.brandDescription}>
              <TextArea
                registration={register("brandDescription")}
                placeholder="e.g., Warm and welcoming, professional and trustworthy, modern and vibrant..."
                rows={3}
                error={errors.brandDescription}
              />
            </FormField>
          </FormSection>

          <FormSection title="Timeline & Budget">
            <FormField label="When do you need the site?" required error={errors.timeline}>
              <SelectInput
                registration={register("timeline")}
                error={errors.timeline}
                options={[
                  { value: "asap", label: "As soon as possible" },
                  { value: "1month", label: "Within 1 month" },
                  { value: "2-3months", label: "2-3 months" },
                  { value: "flexible", label: "Flexible / No rush" },
                ]}
              />
            </FormField>
            <FormField label="Budget Range" required error={errors.budget}>
              <SelectInput
                registration={register("budget")}
                error={errors.budget}
                options={[
                  { value: "under1k", label: "Under $1,000" },
                  { value: "1k-3k", label: "$1,000 - $3,000" },
                  { value: "3k-5k", label: "$3,000 - $5,000" },
                  { value: "5k-10k", label: "$5,000 - $10,000" },
                  { value: "10k+", label: "$10,000+" },
                  { value: "unsure", label: "Not sure yet" },
                ]}
              />
            </FormField>
          </FormSection>

          <FormSection title="Anything Else?">
            <FormField label="Additional notes or questions" error={errors.additionalNotes}>
              <TextArea
                registration={register("additionalNotes")}
                placeholder="Anything else you'd like us to know..."
                rows={4}
                error={errors.additionalNotes}
              />
            </FormField>
          </FormSection>

          <SubmitButton isSubmitting={isSubmitting} isValid={isValid} />
        </form>
      )}
    </FormShell>
  );
}
