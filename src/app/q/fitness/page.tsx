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
  locationCount: z.string().min(1, "Please select number of locations"),
  servicesOffered: z.string().min(1, "Please describe the services you offer"),
  hasExistingSite: z.string().min(1, "Please select an option"),
  existingSiteUrl: z.string().optional(),
  wantedFeatures: z.array(z.string()).min(1, "Please select at least one feature"),
  hasBranding: z.string().min(1, "Please select an option"),
  brandVibe: z.string().min(1, "Please select a brand vibe"),
  timeline: z.string().min(1, "Please select a timeline"),
  budget: z.string().min(1, "Please select a budget range"),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const FORM_NAME = "fitness-intake";

export default function FitnessForm() {
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
      title="Fitness & Wellness Questionnaire"
      subtitle="Help us understand your fitness or wellness business and what you need from your website."
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
                <TextInput registration={register("businessName")} placeholder="e.g., Peak Performance Gym" error={errors.businessName} />
              </FormField>
              <FormField label="Your Name" required error={errors.contactName}>
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

          <FormSection title="About Your Business">
            <FormField label="Business Type" required error={errors.businessType}>
              <SelectInput
                registration={register("businessType")}
                error={errors.businessType}
                options={[
                  { value: "gym", label: "Gym" },
                  { value: "personal-trainer", label: "Personal Trainer" },
                  { value: "yoga-studio", label: "Yoga Studio" },
                  { value: "pilates", label: "Pilates" },
                  { value: "spa", label: "Spa" },
                  { value: "wellness-coaching", label: "Wellness Coaching" },
                  { value: "martial-arts", label: "Martial Arts" },
                  { value: "crossfit", label: "CrossFit" },
                  { value: "other", label: "Other" },
                ]}
              />
            </FormField>
            <FormField label="Number of Locations" required error={errors.locationCount}>
              <RadioGroup
                registration={register("locationCount")}
                error={errors.locationCount}
                options={[
                  { value: "1", label: "Single location" },
                  { value: "2-5", label: "2-5 locations" },
                  { value: "5+", label: "5+ locations" },
                ]}
              />
            </FormField>
            <FormField label="Services Offered" required error={errors.servicesOffered}>
              <TextArea
                registration={register("servicesOffered")}
                placeholder="Describe the services you offer (e.g., personal training, group classes, nutrition coaching...)"
                rows={3}
                error={errors.servicesOffered}
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
                  { value: "class-schedule", label: "Class schedules / timetable" },
                  { value: "online-booking", label: "Online booking" },
                  { value: "membership-signup", label: "Membership signup" },
                  { value: "trainer-profiles", label: "Trainer / staff profiles" },
                  { value: "pricing", label: "Pricing / plans page" },
                  { value: "transformation-gallery", label: "Transformation gallery / before & after" },
                  { value: "testimonials", label: "Client testimonials" },
                  { value: "blog", label: "Blog / tips" },
                  { value: "virtual-classes", label: "Virtual classes info" },
                  { value: "shop", label: "Merchandise / supplement shop" },
                  { value: "contact-form", label: "Contact form" },
                  { value: "social-media", label: "Social media integration" },
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
                  { value: "yes", label: "Yes, I have branding ready" },
                  { value: "partial", label: "Partially (some elements)" },
                  { value: "no", label: "No, I need branding help" },
                ]}
              />
            </FormField>
            <FormField label="What vibe best describes your brand?" required error={errors.brandVibe}>
              <RadioGroup
                registration={register("brandVibe")}
                error={errors.brandVibe}
                options={[
                  { value: "energetic", label: "Energetic" },
                  { value: "calm", label: "Calm" },
                  { value: "luxury", label: "Luxury" },
                  { value: "community", label: "Community" },
                  { value: "motivational", label: "Motivational" },
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
