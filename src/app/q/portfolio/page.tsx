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
  fullName: z.string().min(1, "Your name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  profession: z.string().min(1, "Please describe your profession"),
  hasExistingSite: z.string().min(1, "Please select an option"),
  existingSiteUrl: z.string().optional(),
  purpose: z.array(z.string()).min(1, "Please select at least one purpose"),
  contentTypes: z.array(z.string()).min(1, "Please select at least one content type"),
  projectCount: z.string().min(1, "Please select an option"),
  wantedFeatures: z.array(z.string()).min(1, "Please select at least one feature"),
  stylePreference: z.string().min(1, "Please select a style"),
  inspirationSites: z.string().optional(),
  personalBio: z.string().min(10, "Please write a short bio (at least a few sentences)"),
  timeline: z.string().min(1, "Please select a timeline"),
  budget: z.string().min(1, "Please select a budget range"),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const FORM_NAME = "portfolio-intake";

export default function PortfolioForm() {
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
      title="Portfolio / Personal Site Questionnaire"
      subtitle="Let's build a site that showcases your work and tells your story."
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
          <input type="hidden" name="form-name" value={FORM_NAME} />

          <FormSection title="About You">
            <div className="grid md:grid-cols-2 gap-5">
              <FormField label="Full Name" required error={errors.fullName}>
                <TextInput registration={register("fullName")} placeholder="e.g., Jane Doe" error={errors.fullName} />
              </FormField>
              <FormField label="Email" required error={errors.email}>
                <TextInput registration={register("email")} type="email" placeholder="you@example.com" error={errors.email} />
              </FormField>
              <FormField label="Phone (optional)" error={errors.phone}>
                <TextInput registration={register("phone")} type="tel" placeholder="(555) 123-4567" error={errors.phone} />
              </FormField>
              <FormField label="Your Profession / Field" required error={errors.profession}>
                <TextInput registration={register("profession")} placeholder="e.g., Photographer, Designer, Writer..." error={errors.profession} />
              </FormField>
            </div>
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

          <FormSection title="Site Purpose" description="What should your site accomplish?">
            <FormField label="Primary purpose" required error={errors.purpose}>
              <CheckboxGroup
                registration={register("purpose")}
                error={errors.purpose}
                options={[
                  { value: "showcase", label: "Showcase my work" },
                  { value: "attract-clients", label: "Attract new clients" },
                  { value: "resume", label: "Online resume / CV" },
                  { value: "blog", label: "Blog / Writing" },
                  { value: "sell", label: "Sell products or services" },
                  { value: "networking", label: "Professional networking" },
                ]}
              />
            </FormField>
          </FormSection>

          <FormSection title="Your Content">
            <FormField label="What type of content will you feature?" required error={errors.contentTypes}>
              <CheckboxGroup
                registration={register("contentTypes")}
                error={errors.contentTypes}
                options={[
                  { value: "photos", label: "Photography / Images" },
                  { value: "videos", label: "Video" },
                  { value: "writing", label: "Written case studies / Articles" },
                  { value: "design", label: "Design work (UI, graphic, etc.)" },
                  { value: "code", label: "Code / Technical projects" },
                  { value: "music", label: "Music / Audio" },
                  { value: "other", label: "Other" },
                ]}
              />
            </FormField>
            <FormField label="How many projects/pieces do you want to showcase?" required error={errors.projectCount}>
              <RadioGroup
                registration={register("projectCount")}
                error={errors.projectCount}
                options={[
                  { value: "1-5", label: "1-5 (curated highlights)" },
                  { value: "6-15", label: "6-15" },
                  { value: "15-30", label: "15-30" },
                  { value: "30+", label: "30+ (extensive gallery)" },
                ]}
              />
            </FormField>
            <FormField label="Short bio or introduction about yourself" required error={errors.personalBio}>
              <TextArea
                registration={register("personalBio")}
                placeholder="Tell us about yourself, your background, and what makes your work unique..."
                rows={5}
                error={errors.personalBio}
              />
            </FormField>
          </FormSection>

          <FormSection title="Features & Style">
            <FormField label="Desired features" required error={errors.wantedFeatures}>
              <CheckboxGroup
                registration={register("wantedFeatures")}
                error={errors.wantedFeatures}
                options={[
                  { value: "contact-form", label: "Contact form" },
                  { value: "social-links", label: "Social media links" },
                  { value: "testimonials", label: "Client testimonials" },
                  { value: "resume-download", label: "Downloadable resume/CV" },
                  { value: "blog", label: "Blog" },
                  { value: "newsletter", label: "Newsletter signup" },
                  { value: "booking", label: "Booking / Scheduling" },
                  { value: "ecommerce", label: "Online store" },
                ]}
              />
            </FormField>
            <FormField label="Visual style preference" required error={errors.stylePreference}>
              <RadioGroup
                registration={register("stylePreference")}
                error={errors.stylePreference}
                options={[
                  { value: "minimal", label: "Minimal & Clean" },
                  { value: "bold", label: "Bold & Colorful" },
                  { value: "elegant", label: "Elegant & Refined" },
                  { value: "playful", label: "Playful & Creative" },
                  { value: "professional", label: "Corporate & Professional" },
                  { value: "unsure", label: "Not sure — help me decide" },
                ]}
              />
            </FormField>
            <FormField label="Any sites you admire or want to look like?" error={errors.inspirationSites}>
              <TextArea
                registration={register("inspirationSites")}
                placeholder="Paste URLs or describe what you like about them"
                rows={3}
                error={errors.inspirationSites}
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
                  { value: "under500", label: "Under $500" },
                  { value: "500-1500", label: "$500 - $1,500" },
                  { value: "1500-3k", label: "$1,500 - $3,000" },
                  { value: "3k-5k", label: "$3,000 - $5,000" },
                  { value: "5k+", label: "$5,000+" },
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
