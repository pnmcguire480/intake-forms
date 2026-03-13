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
  businessName: z.string().min(1, "Business name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  businessType: z.string().min(1, "Please select your business type"),
  eventTypesServed: z.array(z.string()).min(1, "Please select at least one event type"),
  serviceArea: z.string().min(1, "Please describe your service area"),
  hasExistingSite: z.string().min(1, "Please select an option"),
  existingSiteUrl: z.string().optional(),
  wantedFeatures: z.array(z.string()).min(1, "Please select at least one feature"),
  hasBranding: z.string().min(1, "Please select an option"),
  brandStyle: z.string().min(1, "Please select a style"),
  timeline: z.string().min(1, "Please select a timeline"),
  budget: z.string().min(1, "Please select a budget range"),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const FORM_NAME = "events-intake";

export default function EventsForm() {
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
      title="Events & Weddings Questionnaire"
      subtitle="Help us understand your events business and what you need from your website."
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
              <FormField label="Business Name" required error={errors.businessName}>
                <TextInput registration={register("businessName")} placeholder="e.g., Elegant Events Co." error={errors.businessName} />
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

          <FormSection title="About Your Business" description="Tell us about your events business.">
            <FormField label="Business Type" required error={errors.businessType}>
              <SelectInput
                registration={register("businessType")}
                error={errors.businessType}
                options={[
                  { value: "venue", label: "Venue" },
                  { value: "event-planner", label: "Event Planner" },
                  { value: "photographer", label: "Photographer" },
                  { value: "videographer", label: "Videographer" },
                  { value: "dj-music", label: "DJ / Music" },
                  { value: "florist", label: "Florist" },
                  { value: "caterer", label: "Caterer" },
                  { value: "decorator", label: "Decorator" },
                  { value: "other", label: "Other" },
                ]}
              />
            </FormField>
            <FormField label="Event Types Served" required error={errors.eventTypesServed}>
              <CheckboxGroup
                registration={register("eventTypesServed")}
                error={errors.eventTypesServed}
                options={[
                  { value: "weddings", label: "Weddings" },
                  { value: "corporate", label: "Corporate Events" },
                  { value: "parties", label: "Parties" },
                  { value: "conferences", label: "Conferences" },
                  { value: "festivals", label: "Festivals" },
                  { value: "other", label: "Other" },
                ]}
              />
            </FormField>
            <FormField label="Service Area" required error={errors.serviceArea}>
              <TextInput registration={register("serviceArea")} placeholder="e.g., Greater Chicago area, nationwide, etc." error={errors.serviceArea} />
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
                  { value: "photo-video-gallery", label: "Photo / Video gallery" },
                  { value: "pricing-packages", label: "Pricing packages" },
                  { value: "availability-calendar", label: "Availability calendar" },
                  { value: "inquiry-booking-form", label: "Inquiry / Booking form" },
                  { value: "testimonials", label: "Testimonials" },
                  { value: "vendor-partnerships", label: "Vendor partnerships" },
                  { value: "blog", label: "Blog" },
                  { value: "faq", label: "FAQ" },
                  { value: "social-media-feed", label: "Social media feed" },
                  { value: "virtual-tours", label: "Virtual tours" },
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
                  { value: "yes", label: "Yes" },
                  { value: "partial", label: "Partially" },
                  { value: "no", label: "No, I need branding help" },
                ]}
              />
            </FormField>
            <FormField label="What style best describes your brand?" required error={errors.brandStyle}>
              <SelectInput
                registration={register("brandStyle")}
                error={errors.brandStyle}
                options={[
                  { value: "romantic", label: "Romantic" },
                  { value: "elegant", label: "Elegant" },
                  { value: "modern", label: "Modern" },
                  { value: "rustic", label: "Rustic" },
                  { value: "fun", label: "Fun" },
                  { value: "luxury", label: "Luxury" },
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
