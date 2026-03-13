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
  nameOrBusiness: z.string().min(1, "Name or business name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  industryField: z.string().min(1, "Please describe your industry or field"),
  projectDescription: z.string().min(10, "Please describe what you do and what the site is for"),
  targetAudience: z.string().min(1, "Please describe your target audience"),
  hasExistingSite: z.string().min(1, "Please select an option"),
  existingSiteUrl: z.string().optional(),
  siteGoals: z.array(z.string()).min(1, "Please select at least one goal"),
  wantedPages: z.array(z.string()).min(1, "Please select at least one page"),
  wantedFeatures: z.array(z.string()).min(1, "Please select at least one feature"),
  designStyle: z.string().min(1, "Please select a style"),
  inspirationSites: z.string().optional(),
  brandStatus: z.string().min(1, "Please select an option"),
  contentReadiness: z.string().min(1, "Please select an option"),
  needsPhotography: z.string().min(1, "Please select an option"),
  timeline: z.string().min(1, "Please select a timeline"),
  budget: z.string().min(1, "Please select a budget range"),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const FORM_NAME = "custom-intake";

export default function CustomForm() {
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
      title="Custom Website Questionnaire"
      subtitle="Tell us about your project — no matter the industry, we'll build the right site for you."
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
              <FormField label="Name or Business Name" required error={errors.nameOrBusiness}>
                <TextInput registration={register("nameOrBusiness")} placeholder="e.g., Jane Doe or Acme Corp" error={errors.nameOrBusiness} />
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

          <FormSection title="About Your Project">
            <FormField label="Industry / Field" required error={errors.industryField}>
              <TextInput registration={register("industryField")} placeholder="e.g., Healthcare, Education, Real Estate, Creative Arts..." error={errors.industryField} />
            </FormField>
            <FormField label="Describe what you do and what the site is for" required error={errors.projectDescription}>
              <TextArea
                registration={register("projectDescription")}
                placeholder="Tell us about your business, organization, or project and what you want the website to accomplish..."
                rows={4}
                error={errors.projectDescription}
              />
            </FormField>
            <FormField label="Who is your target audience?" required error={errors.targetAudience}>
              <TextArea
                registration={register("targetAudience")}
                placeholder="e.g., Local families, B2B clients, students, hobbyists..."
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

          <FormSection title="Website Goals" description="What should your website accomplish?">
            <FormField label="Primary goals" required error={errors.siteGoals}>
              <CheckboxGroup
                registration={register("siteGoals")}
                error={errors.siteGoals}
                options={[
                  { value: "online-presence", label: "Establish an online presence" },
                  { value: "generate-leads", label: "Generate leads" },
                  { value: "sell", label: "Sell products or services" },
                  { value: "provide-info", label: "Provide information" },
                  { value: "build-community", label: "Build community" },
                  { value: "bookings", label: "Accept bookings / appointments" },
                  { value: "showcase-work", label: "Showcase work" },
                  { value: "other", label: "Other" },
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
                  { value: "about", label: "About" },
                  { value: "services-products", label: "Services / Products" },
                  { value: "gallery-portfolio", label: "Gallery / Portfolio" },
                  { value: "blog", label: "Blog" },
                  { value: "contact", label: "Contact" },
                  { value: "faq", label: "FAQ" },
                  { value: "testimonials", label: "Testimonials" },
                  { value: "pricing", label: "Pricing" },
                  { value: "team", label: "Team" },
                ]}
              />
            </FormField>
            <FormField label="What features do you need?" required error={errors.wantedFeatures}>
              <CheckboxGroup
                registration={register("wantedFeatures")}
                error={errors.wantedFeatures}
                options={[
                  { value: "contact-form", label: "Contact form" },
                  { value: "social-media", label: "Social media integration" },
                  { value: "newsletter", label: "Newsletter signup" },
                  { value: "scheduling", label: "Online scheduling" },
                  { value: "ecommerce", label: "E-commerce / Payments" },
                  { value: "maps", label: "Maps / Location" },
                  { value: "live-chat", label: "Live chat" },
                  { value: "search", label: "Search" },
                  { value: "member-portal", label: "Member / Client portal" },
                ]}
              />
            </FormField>
          </FormSection>

          <FormSection title="Design Preferences">
            <FormField label="What style best fits your project?" required error={errors.designStyle}>
              <RadioGroup
                registration={register("designStyle")}
                error={errors.designStyle}
                options={[
                  { value: "minimal", label: "Minimal" },
                  { value: "bold", label: "Bold" },
                  { value: "elegant", label: "Elegant" },
                  { value: "playful", label: "Playful" },
                  { value: "professional", label: "Professional" },
                  { value: "not-sure", label: "Not sure" },
                ]}
              />
            </FormField>
            <FormField label="Any websites you admire or want to use as inspiration?" error={errors.inspirationSites}>
              <TextArea
                registration={register("inspirationSites")}
                placeholder="Paste URLs or describe what you like about them"
                rows={3}
                error={errors.inspirationSites}
              />
            </FormField>
            <FormField label="Do you have existing branding (logo, colors, fonts)?" required error={errors.brandStatus}>
              <RadioGroup
                registration={register("brandStatus")}
                error={errors.brandStatus}
                options={[
                  { value: "full", label: "Yes — I have a full brand (logo, colors, fonts)" },
                  { value: "partial", label: "Partial — I have some elements but need help" },
                  { value: "none", label: "No — I need branding help" },
                ]}
              />
            </FormField>
          </FormSection>

          <FormSection title="Content">
            <FormField label="Do you have content ready (text, images, etc.)?" required error={errors.contentReadiness}>
              <RadioGroup
                registration={register("contentReadiness")}
                error={errors.contentReadiness}
                options={[
                  { value: "yes-all", label: "Yes — all content is ready" },
                  { value: "some", label: "Some — I have partial content" },
                  { value: "none", label: "No — I need help creating content" },
                ]}
              />
            </FormField>
            <FormField label="Will you need photography or graphics?" required error={errors.needsPhotography}>
              <RadioGroup
                registration={register("needsPhotography")}
                error={errors.needsPhotography}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                  { value: "maybe", label: "Maybe — not sure yet" },
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
                placeholder="Anything else you'd like us to know about your project..."
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
