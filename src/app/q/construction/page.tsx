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
  companyName: z.string().min(1, "Company name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  tradeType: z.string().min(1, "Please select your trade or service type"),
  serviceArea: z.string().min(1, "Please describe your service area"),
  clientType: z.string().min(1, "Please select an option"),
  yearsInBusiness: z.string().min(1, "Please select years in business"),
  hasExistingSite: z.string().min(1, "Please select an option"),
  existingSiteUrl: z.string().optional(),
  wantedFeatures: z.array(z.string()).min(1, "Please select at least one feature"),
  hasBranding: z.string().min(1, "Please select an option"),
  brandFeel: z.string().min(1, "Please select a brand feel"),
  timeline: z.string().min(1, "Please select a timeline"),
  budget: z.string().min(1, "Please select a budget range"),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const FORM_NAME = "construction-intake";

export default function ConstructionForm() {
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
      title="Construction & Home Services Questionnaire"
      subtitle="Tell us about your trade so we can build a website that brings in more jobs."
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

          <FormSection title="Contact Information" description="How can we reach you?">
            <div className="grid md:grid-cols-2 gap-5">
              <FormField label="Company Name" required error={errors.companyName}>
                <TextInput registration={register("companyName")} placeholder="e.g., Ace Roofing & Construction" error={errors.companyName} />
              </FormField>
              <FormField label="Contact Name" required error={errors.contactName}>
                <TextInput registration={register("contactName")} placeholder="e.g., John Smith" error={errors.contactName} />
              </FormField>
              <FormField label="Email" required error={errors.email}>
                <TextInput registration={register("email")} type="email" placeholder="you@example.com" error={errors.email} />
              </FormField>
              <FormField label="Phone" required error={errors.phone}>
                <TextInput registration={register("phone")} type="tel" placeholder="(555) 123-4567" error={errors.phone} />
              </FormField>
            </div>
          </FormSection>

          <FormSection title="About Your Business" description="Help us understand your trade and service area.">
            <FormField label="Trade / Service Type" required error={errors.tradeType}>
              <SelectInput
                registration={register("tradeType")}
                error={errors.tradeType}
                options={[
                  { value: "general-contractor", label: "General Contractor" },
                  { value: "plumbing", label: "Plumbing" },
                  { value: "electrical", label: "Electrical" },
                  { value: "hvac", label: "HVAC" },
                  { value: "roofing", label: "Roofing" },
                  { value: "landscaping", label: "Landscaping" },
                  { value: "painting", label: "Painting" },
                  { value: "remodeling", label: "Remodeling" },
                  { value: "other", label: "Other" },
                ]}
              />
            </FormField>
            <FormField label="Service Area" required error={errors.serviceArea}>
              <TextInput registration={register("serviceArea")} placeholder="e.g., Greater Houston area, Dallas-Fort Worth metro..." error={errors.serviceArea} />
            </FormField>
            <FormField label="Do you serve residential, commercial, or both?" required error={errors.clientType}>
              <RadioGroup
                registration={register("clientType")}
                error={errors.clientType}
                options={[
                  { value: "residential", label: "Residential" },
                  { value: "commercial", label: "Commercial" },
                  { value: "both", label: "Both" },
                ]}
              />
            </FormField>
            <FormField label="Years in Business" required error={errors.yearsInBusiness}>
              <SelectInput
                registration={register("yearsInBusiness")}
                error={errors.yearsInBusiness}
                options={[
                  { value: "new", label: "Just starting out" },
                  { value: "1-3", label: "1-3 years" },
                  { value: "3-5", label: "3-5 years" },
                  { value: "5-10", label: "5-10 years" },
                  { value: "10+", label: "10+ years" },
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
                  { value: "no", label: "No" },
                ]}
              />
            </FormField>
            <FormField label="Existing Website URL (if applicable)" error={errors.existingSiteUrl}>
              <TextInput registration={register("existingSiteUrl")} placeholder="https://..." error={errors.existingSiteUrl} />
            </FormField>
          </FormSection>

          <FormSection title="Website Features" description="What should your website include?">
            <FormField label="Desired Features" required error={errors.wantedFeatures}>
              <CheckboxGroup
                registration={register("wantedFeatures")}
                error={errors.wantedFeatures}
                options={[
                  { value: "project-gallery", label: "Project gallery / before & after photos" },
                  { value: "estimate-form", label: "Free estimate request form" },
                  { value: "service-area-map", label: "Service area map" },
                  { value: "reviews", label: "Customer reviews / testimonials" },
                  { value: "licensing", label: "Licensing & insurance info" },
                  { value: "emergency-badge", label: "Emergency / 24-hr service badge" },
                  { value: "blog", label: "Blog" },
                  { value: "careers", label: "Careers / hiring page" },
                  { value: "social", label: "Social media links" },
                  { value: "contact-form", label: "Contact form" },
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
                  { value: "full", label: "Yes — logo, colors, and fonts ready" },
                  { value: "partial", label: "Partial — I have a logo but need help with the rest" },
                  { value: "none", label: "No — I need branding help" },
                ]}
              />
            </FormField>
            <FormField label="What feel should your website have?" required error={errors.brandFeel}>
              <RadioGroup
                registration={register("brandFeel")}
                error={errors.brandFeel}
                options={[
                  { value: "rugged", label: "Rugged & tough" },
                  { value: "professional", label: "Clean & professional" },
                  { value: "modern", label: "Modern & sleek" },
                  { value: "friendly", label: "Friendly & approachable" },
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
