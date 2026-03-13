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
  businessName: z.string().min(1, "Business or agency name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  role: z.string().min(1, "Please select your role"),
  serviceArea: z.string().min(1, "Please describe your service area"),
  specialization: z.array(z.string()).min(1, "Please select at least one specialization"),
  hasExistingSite: z.string().min(1, "Please select an option"),
  existingSiteUrl: z.string().optional(),
  mlsProvider: z.string().optional(),
  wantedFeatures: z.array(z.string()).min(1, "Please select at least one feature"),
  hasBranding: z.string().min(1, "Please select an option"),
  stylePreference: z.string().min(1, "Please select a style preference"),
  timeline: z.string().min(1, "Please select a timeline"),
  budget: z.string().min(1, "Please select a budget range"),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const FORM_NAME = "real-estate-intake";

export default function RealEstateForm() {
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
      title="Real Estate Website Questionnaire"
      subtitle="Help us understand your real estate business and what you need from your website."
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
              <FormField label="Business / Agency Name" required error={errors.businessName}>
                <TextInput registration={register("businessName")} placeholder="e.g., Summit Realty Group" error={errors.businessName} />
              </FormField>
              <FormField label="Your Name" required error={errors.contactName}>
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

          <FormSection title="About Your Business" description="Tell us about your real estate practice.">
            <FormField label="Your Role" required error={errors.role}>
              <SelectInput
                registration={register("role")}
                error={errors.role}
                options={[
                  { value: "agent", label: "Individual Agent" },
                  { value: "broker", label: "Broker / Brokerage" },
                  { value: "team", label: "Real Estate Team" },
                  { value: "property-manager", label: "Property Manager" },
                  { value: "developer", label: "Real Estate Developer" },
                ]}
              />
            </FormField>
            <FormField label="Service Area" required error={errors.serviceArea}>
              <TextInput
                registration={register("serviceArea")}
                placeholder="e.g., Greater Denver Metro, Orange County CA"
                error={errors.serviceArea}
              />
            </FormField>
            <FormField label="Specialization" required error={errors.specialization}>
              <CheckboxGroup
                registration={register("specialization")}
                error={errors.specialization}
                options={[
                  { value: "residential", label: "Residential" },
                  { value: "commercial", label: "Commercial" },
                  { value: "luxury", label: "Luxury" },
                  { value: "rentals", label: "Rentals" },
                  { value: "land", label: "Land" },
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
            <FormField label="MLS Provider" error={errors.mlsProvider}>
              <TextInput
                registration={register("mlsProvider")}
                placeholder="e.g., REcolorado, CRMLS, Bright MLS"
                error={errors.mlsProvider}
              />
            </FormField>
          </FormSection>

          <FormSection title="Website Features" description="What do you need your website to do?">
            <FormField label="Desired Features" required error={errors.wantedFeatures}>
              <CheckboxGroup
                registration={register("wantedFeatures")}
                error={errors.wantedFeatures}
                options={[
                  { value: "idx-mls", label: "IDX / MLS integration" },
                  { value: "property-search", label: "Property search" },
                  { value: "virtual-tours", label: "Virtual tours" },
                  { value: "mortgage-calculator", label: "Mortgage calculator" },
                  { value: "neighborhood-guides", label: "Neighborhood guides" },
                  { value: "agent-profiles", label: "Agent profiles" },
                  { value: "testimonials", label: "Client testimonials" },
                  { value: "blog", label: "Blog" },
                  { value: "lead-capture", label: "Lead capture forms" },
                  { value: "crm-integration", label: "CRM integration" },
                  { value: "market-reports", label: "Market reports" },
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
                  { value: "yes", label: "Yes, I have established branding" },
                  { value: "partial", label: "Partial — I have some assets" },
                  { value: "no", label: "No, I need branding help" },
                ]}
              />
            </FormField>
            <FormField label="Style Preference" required error={errors.stylePreference}>
              <SelectInput
                registration={register("stylePreference")}
                error={errors.stylePreference}
                options={[
                  { value: "modern-minimal", label: "Modern & Minimal" },
                  { value: "luxury-elegant", label: "Luxury & Elegant" },
                  { value: "warm-inviting", label: "Warm & Inviting" },
                  { value: "bold-professional", label: "Bold & Professional" },
                  { value: "classic-traditional", label: "Classic & Traditional" },
                  { value: "unsure", label: "Not sure yet" },
                ]}
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
