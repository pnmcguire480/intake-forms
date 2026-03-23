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
  phone: z.string().min(7, "Please enter a valid phone number"),
  businessName: z.string().min(1, "Business name is required"),
  role: z.string().optional(),
  // 2. Your Business
  tradeType: z.string().min(1, "Please select your trade"),
  yearsInBusiness: z.string().min(1, "Please select how long you've been in business"),
  serviceArea: z.string().min(1, "Please tell us where you work"),
  teamSize: z.string().min(1, "Please select your team size"),
  licensesAndCerts: z.string().optional(),
  yourStory: z.string().optional(),
  // 3. Your Services
  servicesList: z.string().min(1, "Please list your main services"),
  clientType: z.string().min(1, "Please select who you serve"),
  typicalProjectSize: z.string().optional(),
  estimateProcess: z.string().optional(),
  // 4. Website Features
  wantedFeatures: z.array(z.string()).min(1, "Please select at least one feature"),
  // 5. Current Online Presence
  hasExistingSite: z.string().min(1, "Please select an option"),
  existingSiteUrl: z.string().optional(),
  socialMedia: z.string().optional(),
  googleBusinessProfile: z.string().min(1, "Please select an option"),
  currentPainPoints: z.string().optional(),
  // 6. Photos & Branding
  brandVibe: z.string().optional(),
  brandColors: z.string().optional(),
  hasLogo: z.string().min(1, "Please select an option"),
  hasProjectPhotos: z.string().min(1, "Please select an option"),
  competitors: z.string().optional(),
  // 7. Timeline & Budget
  timeline: z.string().min(1, "Please select a timeline"),
  budget: z.string().min(1, "Please select a budget range"),
  // 8. Anything Else
  additionalNotes: z.string().optional(),
  _hp_website: z.string().optional(),
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
      subtitle="Tell us about your trade, your crew, and what kind of website would actually help you get more jobs. Fill out what you can — don't overthink it."
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

          {/* -- 1. ABOUT YOU -- */}
          <FormSection title="About You" description="The basics so we know who we're talking to.">
            <div className="grid md:grid-cols-2 gap-5">
              <FormField label="Your Name" required error={errors.contactName}>
                <TextInput registration={register("contactName")} placeholder="e.g., Mike Hernandez" error={errors.contactName} />
              </FormField>
              <FormField label="Business Name" required error={errors.businessName}>
                <TextInput registration={register("businessName")} placeholder="e.g., Hernandez Roofing & Repairs" error={errors.businessName} />
              </FormField>
              <FormField label="Email" required error={errors.email}>
                <TextInput registration={register("email")} type="email" placeholder="you@example.com" error={errors.email} />
              </FormField>
              <FormField label="Phone" required error={errors.phone}>
                <TextInput registration={register("phone")} type="tel" placeholder="(555) 123-4567" error={errors.phone} />
              </FormField>
            </div>
            <FormField label="Your role at the company" error={errors.role}>
              <TextInput registration={register("role")} placeholder="e.g., Owner, Project Manager, Office Manager..." error={errors.role} />
            </FormField>
          </FormSection>

          {/* -- 2. YOUR BUSINESS -- */}
          <FormSection title="Your Business" description="Help us understand what kind of work you do and where.">
            <FormField label="What's your trade?" required error={errors.tradeType}>
              <SelectInput
                registration={register("tradeType")}
                error={errors.tradeType}
                options={[
                  { value: "general-contractor", label: "General Contractor" },
                  { value: "electrician", label: "Electrician" },
                  { value: "plumber", label: "Plumber" },
                  { value: "hvac", label: "HVAC" },
                  { value: "roofing", label: "Roofing" },
                  { value: "painting", label: "Painting" },
                  { value: "landscaping", label: "Landscaping" },
                  { value: "flooring", label: "Flooring" },
                  { value: "concrete-masonry", label: "Concrete / Masonry" },
                  { value: "remodeling", label: "Remodeling / Renovation" },
                  { value: "handyman", label: "Handyman" },
                  { value: "custom-home-builder", label: "Custom Home Builder" },
                  { value: "commercial-construction", label: "Commercial Construction" },
                  { value: "other", label: "Other" },
                ]}
              />
            </FormField>
            <div className="grid md:grid-cols-2 gap-5">
              <FormField label="How long have you been in business?" required error={errors.yearsInBusiness}>
                <SelectInput
                  registration={register("yearsInBusiness")}
                  error={errors.yearsInBusiness}
                  options={[
                    { value: "not-yet", label: "Haven't launched yet" },
                    { value: "under-1", label: "Less than a year" },
                    { value: "1-3", label: "1\u20133 years" },
                    { value: "3-5", label: "3\u20135 years" },
                    { value: "5-10", label: "5\u201310 years" },
                    { value: "10-20", label: "10\u201320 years" },
                    { value: "20-plus", label: "20+ years" },
                  ]}
                />
              </FormField>
              <FormField label="How big is your crew?" required error={errors.teamSize}>
                <SelectInput
                  registration={register("teamSize")}
                  error={errors.teamSize}
                  options={[
                    { value: "just-me", label: "Just me" },
                    { value: "2-5", label: "2\u20135" },
                    { value: "6-20", label: "6\u201320" },
                    { value: "20-plus", label: "20+" },
                  ]}
                />
              </FormField>
            </div>
            <FormField label="What areas do you serve?" required error={errors.serviceArea}>
              <TextArea
                registration={register("serviceArea")}
                placeholder="e.g., 'Within 30 miles of Columbus, OH'"
                rows={2}
                error={errors.serviceArea}
              />
            </FormField>
            <FormField label="Any licenses, certifications, or bonding info?" error={errors.licensesAndCerts}>
              <TextArea
                registration={register("licensesAndCerts")}
                placeholder="e.g., 'Licensed & insured, EPA Lead-Safe certified, Class A contractor...'"
                rows={3}
                error={errors.licensesAndCerts}
              />
            </FormField>
            <FormField label="How did the business get started?" error={errors.yourStory}>
              <TextArea
                registration={register("yourStory")}
                placeholder="Learned the trade from your dad? Started with a truck and a toolbelt? Left a big company to go independent? This is the stuff that makes people want to hire you — give us the real story..."
                rows={4}
                error={errors.yourStory}
              />
            </FormField>
          </FormSection>

          {/* -- 3. YOUR SERVICES -- */}
          <FormSection title="Your Services" description="What you do, who you do it for, and how you price the work.">
            <FormField label="What services do you offer?" required error={errors.servicesList}>
              <TextArea
                registration={register("servicesList")}
                placeholder="List your main services — e.g., 'Kitchen and bath remodels, deck construction, drywall...'"
                rows={4}
                error={errors.servicesList}
              />
            </FormField>
            <FormField label="Do you work with residential, commercial, or both?" required error={errors.clientType}>
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
            <FormField label="What's a typical project size for you?" error={errors.typicalProjectSize}>
              <TextInput
                registration={register("typicalProjectSize")}
                placeholder="e.g., '$5K-$50K jobs,' 'Small repairs to full builds'"
                error={errors.typicalProjectSize}
              />
            </FormField>
            <FormField label="How does your estimate process work?" error={errors.estimateProcess}>
              <TextArea
                registration={register("estimateProcess")}
                placeholder="e.g., 'Free on-site estimates, usually respond within 24 hours...'"
                rows={3}
                error={errors.estimateProcess}
              />
            </FormField>
          </FormSection>

          {/* -- 4. WEBSITE FEATURES -- */}
          <FormSection title="Website Features" description="Check everything you'd want on the new site.">
            <FormField label="What features do you need?" required error={errors.wantedFeatures}>
              <CheckboxGroup
                registration={register("wantedFeatures")}
                error={errors.wantedFeatures}
                options={[
                  { value: "service-pages", label: "Service pages with descriptions" },
                  { value: "project-gallery", label: "Project photo gallery" },
                  { value: "before-after", label: "Before & after photos" },
                  { value: "quote-form", label: "Request a quote form" },
                  { value: "contact-form", label: "Contact form" },
                  { value: "testimonials", label: "Customer testimonials / reviews" },
                  { value: "service-area-map", label: "Service area map" },
                  { value: "team-page", label: "Team / about page" },
                  { value: "blog", label: "Blog or project updates" },
                  { value: "faq", label: "FAQ" },
                  { value: "financing", label: "Financing info" },
                  { value: "careers", label: "Careers / hiring page" },
                  { value: "emergency-notice", label: "Emergency / 24hr service notice" },
                ]}
              />
            </FormField>
          </FormSection>

          {/* -- 5. CURRENT ONLINE PRESENCE -- */}
          <FormSection title="Your Current Online Presence" description="Where are people finding you right now?">
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
            <FormField label="Current website URL (if you have one)" error={errors.existingSiteUrl}>
              <TextInput registration={register("existingSiteUrl")} placeholder="https://..." error={errors.existingSiteUrl} />
            </FormField>
            <FormField label="Social media accounts" error={errors.socialMedia}>
              <TextArea
                registration={register("socialMedia")}
                placeholder="List your Facebook, Instagram, Nextdoor, Houzz, etc. Paste URLs if you have them."
                rows={3}
                error={errors.socialMedia}
              />
            </FormField>
            <FormField label="Do you have a Google Business Profile?" required error={errors.googleBusinessProfile}>
              <RadioGroup
                registration={register("googleBusinessProfile")}
                error={errors.googleBusinessProfile}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                  { value: "not-sure", label: "Not sure" },
                ]}
              />
            </FormField>
            <FormField label="What's not working about your current setup?" error={errors.currentPainPoints}>
              <TextArea
                registration={register("currentPainPoints")}
                placeholder="e.g., 'Nobody can find us on Google,' 'I'm losing jobs to guys with nicer websites,' 'My site looks like it was built in 2010,' 'People call at all hours because there's no way to request a quote online...'"
                rows={3}
                error={errors.currentPainPoints}
              />
            </FormField>
          </FormSection>

          {/* -- 6. PHOTOS & BRANDING -- */}
          <FormSection title="Photos & Branding" description="How should your website look and feel?">
            <FormField label="What's the vibe of your business?" error={errors.brandVibe}>
              <TextArea
                registration={register("brandVibe")}
                placeholder="Describe it like you'd tell a buddy: tough and dependable, clean and professional, modern and high-end, friendly neighborhood contractor, family-run and trustworthy..."
                rows={3}
                error={errors.brandVibe}
              />
            </FormField>
            <FormField label="Brand colors (if you have them)" error={errors.brandColors}>
              <TextInput registration={register("brandColors")} placeholder="e.g., Red and black, blue and white, earth tones..." error={errors.brandColors} />
            </FormField>
            <FormField label="Do you have a logo file you can send us?" required error={errors.hasLogo}>
              <RadioGroup
                registration={register("hasLogo")}
                error={errors.hasLogo}
                options={[
                  { value: "yes", label: "Yes \u2014 I have the original file" },
                  { value: "screenshot", label: "Only a screenshot or photo of it" },
                  { value: "need-one", label: "I need a new logo" },
                  { value: "no-logo", label: "No logo yet" },
                ]}
              />
            </FormField>
            <FormField label="Do you have photos of your completed projects?" required error={errors.hasProjectPhotos}>
              <RadioGroup
                registration={register("hasProjectPhotos")}
                error={errors.hasProjectPhotos}
                options={[
                  { value: "yes-pro", label: "Yes \u2014 professional photos" },
                  { value: "yes-phone", label: "Yes \u2014 phone photos that look good" },
                  { value: "some", label: "Some, but not enough" },
                  { value: "need-help", label: "No \u2014 I need help with photography" },
                ]}
              />
            </FormField>
            <FormField label="Any contractor websites you think look great?" error={errors.competitors}>
              <TextArea
                registration={register("competitors")}
                placeholder="Paste URLs or describe what you like about them. Doesn't have to be the same trade \u2014 we just want to know what catches your eye."
                rows={3}
                error={errors.competitors}
              />
            </FormField>
          </FormSection>

          {/* -- 7. TIMELINE & BUDGET -- */}
          <FormSection title="Timeline & Budget">
            <div className="grid md:grid-cols-2 gap-5">
              <FormField label="When do you need the site?" required error={errors.timeline}>
                <SelectInput
                  registration={register("timeline")}
                  error={errors.timeline}
                  options={[
                    { value: "asap", label: "As soon as possible" },
                    { value: "1month", label: "Within 1 month" },
                    { value: "2-3months", label: "2\u20133 months" },
                    { value: "flexible", label: "Flexible / No rush" },
                  ]}
                />
              </FormField>
              <FormField label="Budget range" required error={errors.budget}>
                <SelectInput
                  registration={register("budget")}
                  error={errors.budget}
                  options={[
                    { value: "under1k", label: "Under $1,000" },
                    { value: "1k-3k", label: "$1,000 \u2013 $3,000" },
                    { value: "3k-5k", label: "$3,000 \u2013 $5,000" },
                    { value: "5k-10k", label: "$5,000 \u2013 $10,000" },
                    { value: "10k+", label: "$10,000+" },
                    { value: "unsure", label: "Not sure yet" },
                  ]}
                />
              </FormField>
            </div>
          </FormSection>

          {/* -- 8. ANYTHING ELSE -- */}
          <FormSection title="Anything Else?">
            <FormField label="Anything else we should know?" error={errors.additionalNotes}>
              <TextArea
                registration={register("additionalNotes")}
                placeholder="Busy season coming up, specific jobs you want to attract, pet peeves about other contractor websites, anything at all..."
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
