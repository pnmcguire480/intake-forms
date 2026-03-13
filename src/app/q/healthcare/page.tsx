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
  practiceName: z.string().min(1, "Practice name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  practiceType: z.string().min(1, "Please select your practice type"),
  providerCount: z.string().min(1, "Please select number of providers"),
  locationCount: z.string().min(1, "Please select number of locations"),
  hasExistingSite: z.string().min(1, "Please select an option"),
  existingSiteUrl: z.string().optional(),
  wantedFeatures: z.array(z.string()).min(1, "Please select at least one feature"),
  hasBranding: z.string().min(1, "Please select an option"),
  styleDescription: z.string().optional(),
  timeline: z.string().min(1, "Please select a timeline"),
  budget: z.string().min(1, "Please select a budget range"),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const FORM_NAME = "healthcare-intake";

export default function HealthcareForm() {
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
      title="Healthcare & Medical Questionnaire"
      subtitle="Help us understand your practice and what you need from your website."
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
              <FormField label="Practice Name" required error={errors.practiceName}>
                <TextInput registration={register("practiceName")} placeholder="e.g., Sunrise Family Medicine" error={errors.practiceName} />
              </FormField>
              <FormField label="Contact Name" required error={errors.contactName}>
                <TextInput registration={register("contactName")} placeholder="e.g., Dr. Jane Smith" error={errors.contactName} />
              </FormField>
              <FormField label="Email" required error={errors.email}>
                <TextInput registration={register("email")} type="email" placeholder="you@example.com" error={errors.email} />
              </FormField>
              <FormField label="Phone" required error={errors.phone}>
                <TextInput registration={register("phone")} type="tel" placeholder="(555) 123-4567" error={errors.phone} />
              </FormField>
            </div>
          </FormSection>

          <FormSection title="About Your Practice">
            <FormField label="Type of Practice" required error={errors.practiceType}>
              <SelectInput
                registration={register("practiceType")}
                error={errors.practiceType}
                options={[
                  { value: "general", label: "General Practice" },
                  { value: "dental", label: "Dental" },
                  { value: "specialist", label: "Specialist" },
                  { value: "mental-health", label: "Mental Health" },
                  { value: "chiropractic", label: "Chiropractic" },
                  { value: "veterinary", label: "Veterinary" },
                  { value: "other", label: "Other" },
                ]}
              />
            </FormField>
            <FormField label="Number of Providers" required error={errors.providerCount}>
              <RadioGroup
                registration={register("providerCount")}
                error={errors.providerCount}
                options={[
                  { value: "solo", label: "Solo practitioner" },
                  { value: "2-5", label: "2-5 providers" },
                  { value: "6-10", label: "6-10 providers" },
                  { value: "10+", label: "10+ providers" },
                ]}
              />
            </FormField>
            <FormField label="Number of Locations" required error={errors.locationCount}>
              <RadioGroup
                registration={register("locationCount")}
                error={errors.locationCount}
                options={[
                  { value: "1", label: "Single location" },
                  { value: "2-3", label: "2-3 locations" },
                  { value: "4+", label: "4+ locations" },
                ]}
              />
            </FormField>
          </FormSection>

          <FormSection title="Current Online Presence">
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

          <FormSection title="Website Features" description="What do you need your website to do?">
            <FormField label="Desired Features" required error={errors.wantedFeatures}>
              <CheckboxGroup
                registration={register("wantedFeatures")}
                error={errors.wantedFeatures}
                options={[
                  { value: "appointment-booking", label: "Online appointment booking" },
                  { value: "patient-portal", label: "Patient portal" },
                  { value: "provider-bios", label: "Provider bios" },
                  { value: "services-pages", label: "Services pages" },
                  { value: "insurance-info", label: "Insurance information" },
                  { value: "patient-forms", label: "Patient forms download" },
                  { value: "telehealth", label: "Telehealth information" },
                  { value: "blog", label: "Blog / Health resources" },
                  { value: "testimonials", label: "Testimonials" },
                  { value: "contact-form", label: "Contact form" },
                  { value: "maps-directions", label: "Maps / Directions" },
                  { value: "hipaa-notice", label: "HIPAA compliance notice" },
                ]}
              />
            </FormField>
          </FormSection>

          <FormSection title="Branding & Style">
            <FormField label="Do you have existing branding (logo, colors, fonts)?" required error={errors.hasBranding}>
              <RadioGroup
                registration={register("hasBranding")}
                error={errors.hasBranding}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "partial", label: "Partially — I have some assets" },
                  { value: "no", label: "No, I need branding help" },
                ]}
              />
            </FormField>
            <FormField label="Describe the style or feel you're going for" error={errors.styleDescription}>
              <TextArea
                registration={register("styleDescription")}
                placeholder="e.g., Clean and modern, warm and welcoming, clinical and professional..."
                error={errors.styleDescription}
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
