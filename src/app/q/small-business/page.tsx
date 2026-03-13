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
  industry: z.string().min(1, "Please describe your industry"),
  businessDescription: z.string().min(10, "Please describe what your business does"),
  targetAudience: z.string().min(1, "Please describe your target audience"),
  hasExistingSite: z.string().min(1, "Please select an option"),
  existingSiteUrl: z.string().optional(),
  siteGoals: z.array(z.string()).min(1, "Please select at least one goal"),
  wantedPages: z.array(z.string()).min(1, "Please select at least one page"),
  wantedFeatures: z.array(z.string()).min(1, "Please select at least one feature"),
  brandStatus: z.string().min(1, "Please select an option"),
  competitors: z.string().optional(),
  timeline: z.string().min(1, "Please select a timeline"),
  budget: z.string().min(1, "Please select a budget range"),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const FORM_NAME = "small-business-intake";

export default function SmallBusinessForm() {
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
      title="Small Business Website Questionnaire"
      subtitle="Let's get your business online with a site that works as hard as you do."
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

          <FormSection title="Contact Information" description="How can we reach you?">
            <div className="grid md:grid-cols-2 gap-5">
              <FormField label="Business Name" required error={errors.businessName}>
                <TextInput registration={register("businessName")} placeholder="e.g., Smith Plumbing LLC" error={errors.businessName} />
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
            <FormField label="Industry / Type of Business" required error={errors.industry}>
              <TextInput registration={register("industry")} placeholder="e.g., Plumbing, Landscaping, Consulting..." error={errors.industry} />
            </FormField>
            <FormField label="What does your business do?" required error={errors.businessDescription}>
              <TextArea
                registration={register("businessDescription")}
                placeholder="Describe your services, products, and what sets you apart from competitors..."
                rows={4}
                error={errors.businessDescription}
              />
            </FormField>
            <FormField label="Who is your target audience?" required error={errors.targetAudience}>
              <TextArea
                registration={register("targetAudience")}
                placeholder="e.g., Homeowners in the Dallas area, small businesses, young professionals..."
                rows={3}
                error={errors.targetAudience}
              />
            </FormField>
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

          <FormSection title="Website Goals" description="What should your website do for your business?">
            <FormField label="Primary goals" required error={errors.siteGoals}>
              <CheckboxGroup
                registration={register("siteGoals")}
                error={errors.siteGoals}
                options={[
                  { value: "credibility", label: "Establish credibility & professionalism" },
                  { value: "leads", label: "Generate leads / inquiries" },
                  { value: "info", label: "Provide information about services" },
                  { value: "seo", label: "Show up in Google searches" },
                  { value: "booking", label: "Allow online booking / scheduling" },
                  { value: "sell", label: "Sell products online" },
                  { value: "showcase", label: "Showcase past work / portfolio" },
                ]}
              />
            </FormField>
          </FormSection>

          <FormSection title="Pages & Features">
            <FormField label="What pages do you need?" required error={errors.wantedPages}>
              <CheckboxGroup
                registration={register("wantedPages")}
                error={errors.wantedPages}
                options={[
                  { value: "home", label: "Home" },
                  { value: "about", label: "About Us" },
                  { value: "services", label: "Services" },
                  { value: "gallery", label: "Gallery / Portfolio" },
                  { value: "testimonials", label: "Testimonials" },
                  { value: "contact", label: "Contact" },
                  { value: "faq", label: "FAQ" },
                  { value: "blog", label: "Blog" },
                  { value: "pricing", label: "Pricing" },
                  { value: "team", label: "Team / Staff" },
                ]}
              />
            </FormField>
            <FormField label="Special features" required error={errors.wantedFeatures}>
              <CheckboxGroup
                registration={register("wantedFeatures")}
                error={errors.wantedFeatures}
                options={[
                  { value: "contact-form", label: "Contact form" },
                  { value: "maps", label: "Google Maps integration" },
                  { value: "reviews", label: "Customer reviews" },
                  { value: "social", label: "Social media integration" },
                  { value: "chat", label: "Live chat" },
                  { value: "newsletter", label: "Email newsletter signup" },
                  { value: "booking", label: "Online scheduling / booking" },
                  { value: "payments", label: "Online payments" },
                ]}
              />
            </FormField>
          </FormSection>

          <FormSection title="Branding">
            <FormField label="Do you have existing branding (logo, colors, fonts)?" required error={errors.brandStatus}>
              <RadioGroup
                registration={register("brandStatus")}
                error={errors.brandStatus}
                options={[
                  { value: "full", label: "Yes — logo, colors, and fonts ready" },
                  { value: "partial", label: "Partial — I have a logo but need help with the rest" },
                  { value: "none", label: "No — I need branding help" },
                ]}
              />
            </FormField>
            <FormField label="Any competitors or sites you admire?" error={errors.competitors}>
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
