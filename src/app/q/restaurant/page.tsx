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
  cuisineType: z.string().min(1, "Please select your cuisine type"),
  locationCount: z.string().min(1, "Please select number of locations"),
  hasExistingSite: z.string().min(1, "Please select an option"),
  existingSiteUrl: z.string().optional(),
  wantedFeatures: z.array(z.string()).min(1, "Please select at least one feature"),
  menuStyle: z.string().min(1, "Please select a menu display preference"),
  brandColors: z.string().optional(),
  brandVibe: z.string().min(1, "Please describe your brand vibe"),
  competitors: z.string().optional(),
  timeline: z.string().min(1, "Please select a timeline"),
  budget: z.string().min(1, "Please select a budget range"),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const FORM_NAME = "restaurant-intake";

export default function RestaurantForm() {
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
      title="Restaurant & Food Service Questionnaire"
      subtitle="Help us understand your restaurant's brand and what you need from your website."
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
          <input type="hidden" name="form-name" value={FORM_NAME} />

          <FormSection title="Contact Information" description="How can we reach you?">
            <div className="grid md:grid-cols-2 gap-5">
              <FormField label="Business Name" required error={errors.businessName}>
                <TextInput registration={register("businessName")} placeholder="e.g., Mario's Trattoria" error={errors.businessName} />
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

          <FormSection title="About Your Restaurant">
            <FormField label="Cuisine Type" required error={errors.cuisineType}>
              <SelectInput
                registration={register("cuisineType")}
                error={errors.cuisineType}
                options={[
                  { value: "american", label: "American" },
                  { value: "italian", label: "Italian" },
                  { value: "mexican", label: "Mexican" },
                  { value: "asian", label: "Asian" },
                  { value: "seafood", label: "Seafood" },
                  { value: "bbq", label: "BBQ / Smokehouse" },
                  { value: "cafe", label: "Cafe / Bakery" },
                  { value: "bar", label: "Bar / Pub" },
                  { value: "finedining", label: "Fine Dining" },
                  { value: "fastcasual", label: "Fast Casual" },
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
                  { value: "menu", label: "Online menu" },
                  { value: "ordering", label: "Online ordering" },
                  { value: "reservations", label: "Reservations / table booking" },
                  { value: "catering", label: "Catering request form" },
                  { value: "gallery", label: "Photo gallery" },
                  { value: "events", label: "Events calendar" },
                  { value: "giftcards", label: "Gift cards" },
                  { value: "reviews", label: "Customer reviews / testimonials" },
                  { value: "blog", label: "Blog / News" },
                  { value: "careers", label: "Careers / Job listings" },
                ]}
              />
            </FormField>
            <FormField label="How should your menu be displayed?" required error={errors.menuStyle}>
              <RadioGroup
                registration={register("menuStyle")}
                error={errors.menuStyle}
                options={[
                  { value: "digital", label: "Fully digital (text on site)" },
                  { value: "pdf", label: "PDF download" },
                  { value: "photos", label: "Photos of menu items" },
                  { value: "unsure", label: "Not sure yet" },
                ]}
              />
            </FormField>
          </FormSection>

          <FormSection title="Branding & Style">
            <FormField label="Brand Colors" error={errors.brandColors}>
              <TextInput registration={register("brandColors")} placeholder="e.g., Red and gold, earth tones, etc." error={errors.brandColors} />
            </FormField>
            <FormField label="Describe the vibe or feeling of your restaurant" required error={errors.brandVibe}>
              <TextArea
                registration={register("brandVibe")}
                placeholder="e.g., Warm and rustic, modern and sleek, family-friendly, upscale..."
                error={errors.brandVibe}
              />
            </FormField>
            <FormField label="Any restaurants whose websites you admire?" error={errors.competitors}>
              <TextArea
                registration={register("competitors")}
                placeholder="Paste URLs or describe what you like about them"
                rows={3}
                error={errors.competitors}
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
