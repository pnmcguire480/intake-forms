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
  // 1. About You
  contactName: z.string().min(1, "Your name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  businessName: z.string().optional(),
  role: z.string().min(1, "Tell us what you do"),
  // 2. Your Work
  creativeField: z.string().min(1, "Please select your field"),
  yearsOfExperience: z.string().min(1, "Please select your experience level"),
  workDescription: z.string().min(10, "Give us at least a couple sentences about your work"),
  idealClient: z.string().optional(),
  notableWork: z.string().optional(),
  // 3. Portfolio Content
  portfolioSize: z.string().min(1, "Please select how many pieces you want to show"),
  contentTypes: z.array(z.string()).min(1, "Please select at least one content type"),
  hasWorkReady: z.string().min(1, "Please let us know where things stand"),
  wantCaseStudies: z.string().min(1, "Please select an option"),
  // 4. Your Process & Services
  servicesOffered: z.string().min(10, "List at least a couple of services"),
  yourProcess: z.string().optional(),
  hasPricing: z.string().min(1, "Please select a pricing approach"),
  // 5. Website Features
  wantedFeatures: z.array(z.string()).min(1, "Please select at least one feature"),
  // 6. Current Online Presence
  hasExistingSite: z.string().min(1, "Please select an option"),
  existingSiteUrl: z.string().optional(),
  socialMedia: z.string().optional(),
  currentPainPoints: z.string().optional(),
  // 7. Branding & Style
  brandVibe: z.string().min(1, "Describe the vibe you're going for"),
  brandColors: z.string().optional(),
  hasLogo: z.string().min(1, "Please select an option"),
  hasHeadshot: z.string().min(1, "Please select an option"),
  competitors: z.string().optional(),
  // 8. Timeline & Budget
  timeline: z.string().min(1, "Please select a timeline"),
  budget: z.string().min(1, "Please select a budget range"),
  additionalNotes: z.string().optional(),
  _hp_website: z.string().optional(),
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
      title="Portfolio & Personal Site Questionnaire"
      subtitle="Your work deserves a home that does it justice. Tell us about what you create, how you work, and what you want your site to feel like — we'll handle the rest."
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
          {/* Honeypot */}
          <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}>
            <input type="text" autoComplete="off" tabIndex={-1} {...register("_hp_website")} />
          </div>

          {/* 1. About You */}
          <FormSection title="About You">
            <div className="grid md:grid-cols-2 gap-5">
              <FormField label="Your name" required error={errors.contactName}>
                <TextInput registration={register("contactName")} placeholder="e.g., Jane Doe" error={errors.contactName} />
              </FormField>
              <FormField label="Email" required error={errors.email}>
                <TextInput registration={register("email")} type="email" placeholder="you@example.com" error={errors.email} />
              </FormField>
              <FormField label="Phone (optional)" error={errors.phone}>
                <TextInput registration={register("phone")} type="tel" placeholder="(555) 123-4567" error={errors.phone} />
              </FormField>
              <FormField label="Your name or brand name" error={errors.businessName}>
                <TextInput registration={register("businessName")} placeholder="e.g., Jane Doe Photography, Studio Ink" error={errors.businessName} />
              </FormField>
            </div>
            <FormField label="What do you do?" required error={errors.role}>
              <TextInput registration={register("role")} placeholder="e.g., Photographer, Graphic Designer, Architect, Writer..." error={errors.role} />
            </FormField>
          </FormSection>

          {/* 2. Your Work */}
          <FormSection title="Your Work" description="Help us understand what you create and who you create it for.">
            <FormField label="What's your creative field?" required error={errors.creativeField}>
              <SelectInput
                registration={register("creativeField")}
                error={errors.creativeField}
                options={[
                  { value: "photography", label: "Photography" },
                  { value: "graphic-visual-design", label: "Graphic / visual design" },
                  { value: "web-ui-design", label: "Web / UI design" },
                  { value: "illustration-art", label: "Illustration / art" },
                  { value: "architecture", label: "Architecture" },
                  { value: "interior-design", label: "Interior design" },
                  { value: "videography-film", label: "Videography / film" },
                  { value: "writing-copywriting", label: "Writing / copywriting" },
                  { value: "music-audio", label: "Music / audio" },
                  { value: "fashion", label: "Fashion" },
                  { value: "crafts-handmade", label: "Crafts / handmade" },
                  { value: "consulting", label: "Consulting" },
                  { value: "freelance-developer", label: "Freelance developer" },
                  { value: "other", label: "Other" },
                ]}
              />
            </FormField>
            <FormField label="How long have you been doing this?" required error={errors.yearsOfExperience}>
              <SelectInput
                registration={register("yearsOfExperience")}
                error={errors.yearsOfExperience}
                options={[
                  { value: "just-starting", label: "Just getting started" },
                  { value: "1-2", label: "1-2 years" },
                  { value: "3-5", label: "3-5 years" },
                  { value: "5-10", label: "5-10 years" },
                  { value: "10+", label: "10+ years" },
                ]}
              />
            </FormField>
            <FormField label="Describe the kind of work you do" required error={errors.workDescription}>
              <TextArea
                registration={register("workDescription")}
                placeholder="What projects excite you? What do clients hire you for?"
                rows={4}
                error={errors.workDescription}
              />
            </FormField>
            <FormField label="Who's your ideal client?" error={errors.idealClient}>
              <TextArea
                registration={register("idealClient")}
                placeholder="e.g., 'Small businesses needing brand identity,' 'Couples wanting wedding photography...'"
                rows={3}
                error={errors.idealClient}
              />
            </FormField>
            <FormField label="Any awards, publications, or notable clients?" error={errors.notableWork}>
              <TextArea
                registration={register("notableWork")}
                placeholder="Don't be shy — this is what builds credibility"
                rows={3}
                error={errors.notableWork}
              />
            </FormField>
          </FormSection>

          {/* 3. Portfolio Content */}
          <FormSection title="Portfolio Content" description="Let's figure out what you'll be showcasing and how ready it is.">
            <FormField label="How many pieces do you want in your portfolio?" required error={errors.portfolioSize}>
              <SelectInput
                registration={register("portfolioSize")}
                error={errors.portfolioSize}
                options={[
                  { value: "under-10", label: "Under 10 pieces" },
                  { value: "10-25", label: "10-25" },
                  { value: "25-50", label: "25-50" },
                  { value: "50-100", label: "50-100" },
                  { value: "100+", label: "100+" },
                ]}
              />
            </FormField>
            <FormField label="What types of content will you feature?" required error={errors.contentTypes}>
              <CheckboxGroup
                registration={register("contentTypes")}
                error={errors.contentTypes}
                options={[
                  { value: "photos-images", label: "Photos / images" },
                  { value: "videos", label: "Videos" },
                  { value: "written-work", label: "Written work / articles" },
                  { value: "case-studies", label: "Case studies" },
                  { value: "before-after", label: "Before & after" },
                  { value: "audio-music", label: "Audio / music" },
                  { value: "3d-renders", label: "3D renders / models" },
                  { value: "live-links", label: "Live project links" },
                  { value: "downloadable-pdfs", label: "Downloadable PDFs" },
                ]}
              />
            </FormField>
            <FormField label="Is your portfolio content ready to go?" required error={errors.hasWorkReady}>
              <RadioGroup
                registration={register("hasWorkReady")}
                error={errors.hasWorkReady}
                options={[
                  { value: "yes-organized", label: "Yes — all organized and ready" },
                  { value: "mostly", label: "Mostly — needs some editing" },
                  { value: "need-to-gather", label: "I need to create / gather it" },
                  { value: "need-help-curating", label: "I need help curating" },
                ]}
              />
            </FormField>
            <FormField label="Would you like individual case study pages for key projects?" required error={errors.wantCaseStudies}>
              <RadioGroup
                registration={register("wantCaseStudies")}
                error={errors.wantCaseStudies}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "maybe-later", label: "Maybe later" },
                  { value: "no", label: "No" },
                ]}
              />
            </FormField>
          </FormSection>

          {/* 4. Your Process & Services */}
          <FormSection title="Your Process & Services" description="Understanding how you work helps us build a site that attracts the right clients.">
            <FormField label="What services do you offer?" required error={errors.servicesOffered}>
              <TextArea
                registration={register("servicesOffered")}
                placeholder="e.g., 'Brand identity packages, headshot sessions, website redesigns...'"
                rows={4}
                error={errors.servicesOffered}
              />
            </FormField>
            <FormField label="How do you typically work with clients?" error={errors.yourProcess}>
              <TextArea
                registration={register("yourProcess")}
                placeholder="Walk us through it — from first contact to delivering the final work"
                rows={4}
                error={errors.yourProcess}
              />
            </FormField>
            <FormField label="How do you want to handle pricing on the site?" required error={errors.hasPricing}>
              <RadioGroup
                registration={register("hasPricing")}
                error={errors.hasPricing}
                options={[
                  { value: "show-prices", label: "Show prices on site" },
                  { value: "ranges-only", label: "Ranges only" },
                  { value: "request-quote", label: "Request a quote" },
                  { value: "prefer-not", label: "Prefer not to list pricing" },
                ]}
              />
            </FormField>
          </FormSection>

          {/* 5. Website Features */}
          <FormSection title="Website Features" description="Pick everything that sounds useful — we'll help you prioritize.">
            <FormField label="What features do you want on your site?" required error={errors.wantedFeatures}>
              <CheckboxGroup
                registration={register("wantedFeatures")}
                error={errors.wantedFeatures}
                options={[
                  { value: "filterable-gallery", label: "Filterable portfolio gallery" },
                  { value: "project-pages", label: "Individual project pages" },
                  { value: "testimonials", label: "Client testimonials" },
                  { value: "about-bio", label: "About / bio page" },
                  { value: "services-pricing", label: "Services & pricing" },
                  { value: "contact-form", label: "Contact / inquiry form" },
                  { value: "blog-journal", label: "Blog or journal" },
                  { value: "resume-cv", label: "Resume / CV download" },
                  { value: "client-portal", label: "Client portal / proofing" },
                  { value: "social-feed", label: "Social media feed" },
                  { value: "newsletter", label: "Newsletter signup" },
                  { value: "shop-prints", label: "Shop / prints for sale" },
                  { value: "scheduling", label: "Scheduling / booking" },
                  { value: "video-reel", label: "Video reel / showreel" },
                ]}
              />
            </FormField>
          </FormSection>

          {/* 6. Current Online Presence */}
          <FormSection title="Current Online Presence" description="Where can people find you right now?">
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
            <FormField label="Current website URL (if you have one)" error={errors.existingSiteUrl}>
              <TextInput registration={register("existingSiteUrl")} placeholder="https://..." error={errors.existingSiteUrl} />
            </FormField>
            <FormField label="Social media profiles" error={errors.socialMedia}>
              <TextArea
                registration={register("socialMedia")}
                placeholder="Drop your Instagram, Behance, Dribbble, LinkedIn, or any other profiles"
                rows={3}
                error={errors.socialMedia}
              />
            </FormField>
            <FormField label="What's not working with your current online presence?" error={errors.currentPainPoints}>
              <TextArea
                registration={register("currentPainPoints")}
                placeholder="e.g., 'My site looks outdated,' 'I can't update it myself,' 'It doesn't show up on Google...'"
                rows={3}
                error={errors.currentPainPoints}
              />
            </FormField>
          </FormSection>

          {/* 7. Branding & Style */}
          <FormSection title="Branding & Style" description="Help us nail the look and feel before we start designing.">
            <FormField label="What vibe are you going for?" required error={errors.brandVibe}>
              <TextArea
                registration={register("brandVibe")}
                placeholder="Minimal and clean? Bold and artistic? Warm and inviting? Dark and moody?"
                rows={3}
                error={errors.brandVibe}
              />
            </FormField>
            <FormField label="Do you have brand colors in mind?" error={errors.brandColors}>
              <TextInput registration={register("brandColors")} placeholder="e.g., Black and white, navy and gold, earth tones..." error={errors.brandColors} />
            </FormField>
            <FormField label="Do you have a logo?" required error={errors.hasLogo}>
              <RadioGroup
                registration={register("hasLogo")}
                error={errors.hasLogo}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no-need-one", label: "No — I need one" },
                  { value: "no-dont-need", label: "No — and I don't need one" },
                ]}
              />
            </FormField>
            <FormField label="Do you have a professional headshot?" required error={errors.hasHeadshot}>
              <RadioGroup
                registration={register("hasHeadshot")}
                error={errors.hasHeadshot}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "have-good-one", label: "No, but I have a good one" },
                  { value: "need-one", label: "I need one" },
                ]}
              />
            </FormField>
            <FormField label="Any portfolios or sites you admire?" error={errors.competitors}>
              <TextArea
                registration={register("competitors")}
                placeholder="Paste URLs or describe what you like — we want to understand your taste"
                rows={3}
                error={errors.competitors}
              />
            </FormField>
          </FormSection>

          {/* 8. Timeline & Budget */}
          <FormSection title="Timeline & Budget">
            <FormField label="When do you need the site?" required error={errors.timeline}>
              <SelectInput
                registration={register("timeline")}
                error={errors.timeline}
                options={[
                  { value: "asap", label: "As soon as possible" },
                  { value: "1month", label: "Within 1 month" },
                  { value: "2-3months", label: "2-3 months" },
                  { value: "flexible", label: "Flexible / no rush" },
                ]}
              />
            </FormField>
            <FormField label="Budget range" required error={errors.budget}>
              <SelectInput
                registration={register("budget")}
                error={errors.budget}
                options={[
                  { value: "under-1k", label: "Under $1,000" },
                  { value: "1k-3k", label: "$1,000 - $3,000" },
                  { value: "3k-5k", label: "$3,000 - $5,000" },
                  { value: "5k-10k", label: "$5,000 - $10,000" },
                  { value: "10k+", label: "$10,000+" },
                  { value: "unsure", label: "Not sure yet" },
                ]}
              />
            </FormField>
            <FormField label="Anything else we should know?" error={errors.additionalNotes}>
              <TextArea
                registration={register("additionalNotes")}
                placeholder="Questions, concerns, wild ideas — we're all ears"
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
