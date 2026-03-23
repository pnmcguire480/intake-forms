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
  industry: z.string().min(1, "Please select your industry"),
  businessDescription: z.string().min(10, "Give us at least a couple sentences"),
  yearsInBusiness: z.string().min(1, "Please select how long you've been in business"),
  serviceArea: z.string().min(1, "Please tell us where you serve customers"),
  numberOfEmployees: z.string().min(1, "Please select a team size"),
  yourStory: z.string().optional(),
  // 3. Your Customers
  idealCustomer: z.string().min(10, "Tell us a bit more about your ideal customer"),
  howCustomersFind: z.array(z.string()).min(1, "Please select at least one"),
  currentLeadProcess: z.string().optional(),
  // 4. Services & Scheduling
  servicesList: z.string().min(1, "Please list your main services"),
  hasPricing: z.string().min(1, "Please select an option"),
  wantOnlineBooking: z.string().min(1, "Please select an option"),
  currentSchedulingMethod: z.string().optional(),
  // 5. Website Features
  wantedFeatures: z.array(z.string()).min(1, "Please select at least one feature"),
  // 6. Current Online Presence
  hasExistingSite: z.string().min(1, "Please select an option"),
  existingSiteUrl: z.string().optional(),
  socialMedia: z.string().optional(),
  googleBusinessProfile: z.string().min(1, "Please select an option"),
  currentPainPoints: z.string().optional(),
  // 7. Branding & Style
  brandVibe: z.string().min(1, "Please describe the feel you're going for"),
  brandColors: z.string().optional(),
  hasLogo: z.string().min(1, "Please select an option"),
  hasPhotos: z.string().min(1, "Please select an option"),
  competitors: z.string().optional(),
  // 8. Timeline & Budget
  timeline: z.string().min(1, "Please select a timeline"),
  budget: z.string().min(1, "Please select a budget range"),
  additionalNotes: z.string().optional(),
  _hp_website: z.string().optional(),
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
      subtitle="Tell us about your business, your customers, and what you need from a website. Fill out what you can — don't stress about getting it perfect."
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
          <FormSection title="About You" description="The basics so we can get back to you.">
            <div className="grid md:grid-cols-2 gap-5">
              <FormField label="Your Name" required error={errors.contactName}>
                <TextInput registration={register("contactName")} placeholder="e.g., Sarah Johnson" error={errors.contactName} />
              </FormField>
              <FormField label="Business Name" required error={errors.businessName}>
                <TextInput registration={register("businessName")} placeholder="e.g., Johnson Accounting Services" error={errors.businessName} />
              </FormField>
              <FormField label="Email" required error={errors.email}>
                <TextInput registration={register("email")} type="email" placeholder="you@example.com" error={errors.email} />
              </FormField>
              <FormField label="Phone" required error={errors.phone}>
                <TextInput registration={register("phone")} type="tel" placeholder="(555) 123-4567" error={errors.phone} />
              </FormField>
            </div>
            <FormField label="Your role at the business" error={errors.role}>
              <TextInput registration={register("role")} placeholder="e.g., Owner, Partner, Office Manager..." error={errors.role} />
            </FormField>
          </FormSection>

          {/* -- 2. YOUR BUSINESS -- */}
          <FormSection title="Your Business" description="Help us understand what you do and who you are.">
            <FormField label="What industry are you in?" required error={errors.industry}>
              <SelectInput
                registration={register("industry")}
                error={errors.industry}
                options={[
                  { value: "accounting", label: "Accounting / Financial" },
                  { value: "legal", label: "Legal" },
                  { value: "real-estate", label: "Real Estate Services" },
                  { value: "consulting", label: "Consulting" },
                  { value: "marketing", label: "Marketing / Advertising" },
                  { value: "it-services", label: "IT Services" },
                  { value: "insurance", label: "Insurance" },
                  { value: "cleaning", label: "Cleaning Services" },
                  { value: "auto", label: "Auto Repair / Detailing" },
                  { value: "salon", label: "Salon / Barbershop" },
                  { value: "photography", label: "Photography" },
                  { value: "tutoring", label: "Tutoring / Education" },
                  { value: "pet-services", label: "Pet Services" },
                  { value: "handyman", label: "Handyman / Repair" },
                  { value: "other", label: "Other" },
                ]}
              />
            </FormField>
            <FormField label="Tell us what you do in a couple sentences" required error={errors.businessDescription}>
              <TextArea
                registration={register("businessDescription")}
                placeholder="e.g., 'We do residential and commercial HVAC repair, installations, and seasonal maintenance for the tri-county area...'"
                rows={4}
                error={errors.businessDescription}
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
              <FormField label="How many people on your team?" required error={errors.numberOfEmployees}>
                <SelectInput
                  registration={register("numberOfEmployees")}
                  error={errors.numberOfEmployees}
                  options={[
                    { value: "just-me", label: "Just me" },
                    { value: "2-5", label: "2\u20135" },
                    { value: "6-20", label: "6\u201320" },
                    { value: "20-50", label: "20\u201350" },
                    { value: "50-plus", label: "50+" },
                  ]}
                />
              </FormField>
            </div>
            <FormField label="Where do you serve customers?" required error={errors.serviceArea}>
              <TextArea
                registration={register("serviceArea")}
                placeholder="e.g., 'Greater Pittsburgh area,' 'Nationwide,' 'Online only'"
                rows={2}
                error={errors.serviceArea}
              />
            </FormField>
            <FormField label="How did the business get started?" error={errors.yourStory}>
              <TextArea
                registration={register("yourStory")}
                placeholder="Side hustle that took off? Family trade? Saw a gap in the market? This is the stuff that makes people connect with you — give us the real story..."
                rows={4}
                error={errors.yourStory}
              />
            </FormField>
          </FormSection>

          {/* -- 3. YOUR CUSTOMERS -- */}
          <FormSection title="Your Customers" description="The more we know about who you serve, the better we can design the site to reach them.">
            <FormField label="Who is your ideal customer?" required error={errors.idealCustomer}>
              <TextArea
                registration={register("idealCustomer")}
                placeholder="Describe them — age, location, what they're looking for..."
                rows={3}
                error={errors.idealCustomer}
              />
            </FormField>
            <FormField label="How do customers find you right now?" required error={errors.howCustomersFind}>
              <CheckboxGroup
                registration={register("howCustomersFind")}
                error={errors.howCustomersFind}
                options={[
                  { value: "google", label: "Google search" },
                  { value: "word-of-mouth", label: "Word of mouth" },
                  { value: "social-media", label: "Social media" },
                  { value: "yard-signs", label: "Yard signs / flyers" },
                  { value: "directories", label: "Online directories (Yelp, Angi, etc.)" },
                  { value: "paid-ads", label: "Paid ads" },
                  { value: "other", label: "Other" },
                ]}
              />
            </FormField>
            <FormField label="When someone wants to hire you, what happens next?" error={errors.currentLeadProcess}>
              <TextArea
                registration={register("currentLeadProcess")}
                placeholder="e.g., 'They call, I give a free estimate, then I follow up by email...'"
                rows={3}
                error={errors.currentLeadProcess}
              />
            </FormField>
          </FormSection>

          {/* -- 4. SERVICES & SCHEDULING -- */}
          <FormSection title="Services & Scheduling" description="What you offer and how people book you.">
            <FormField label="List your main services or packages" required error={errors.servicesList}>
              <TextArea
                registration={register("servicesList")}
                placeholder="e.g., 'Tax prep (personal & business), bookkeeping, payroll, new business setup, QuickBooks training...'"
                rows={4}
                error={errors.servicesList}
              />
            </FormField>
            <FormField label="Do you want to show pricing on the site?" required error={errors.hasPricing}>
              <RadioGroup
                registration={register("hasPricing")}
                error={errors.hasPricing}
                options={[
                  { value: "yes", label: "Yes \u2014 show prices on site" },
                  { value: "ranges", label: "Ranges only (e.g., 'Starting at $99')" },
                  { value: "quote", label: "Request a quote" },
                  { value: "unsure", label: "Not sure" },
                ]}
              />
            </FormField>
            <FormField label="Do you want online booking or scheduling on the website?" required error={errors.wantOnlineBooking}>
              <RadioGroup
                registration={register("wantOnlineBooking")}
                error={errors.wantOnlineBooking}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "not-now", label: "Not right now" },
                  { value: "maybe", label: "Maybe later" },
                ]}
              />
            </FormField>
            <FormField label="How do you schedule appointments now?" error={errors.currentSchedulingMethod}>
              <TextInput
                registration={register("currentSchedulingMethod")}
                placeholder="e.g., Phone calls, Calendly, pen and paper..."
                error={errors.currentSchedulingMethod}
              />
            </FormField>
          </FormSection>

          {/* -- 5. WEBSITE FEATURES -- */}
          <FormSection title="Website Features" description="Check everything you'd want on the new site.">
            <FormField label="What features do you need?" required error={errors.wantedFeatures}>
              <CheckboxGroup
                registration={register("wantedFeatures")}
                error={errors.wantedFeatures}
                options={[
                  { value: "service-pages", label: "Service pages with descriptions" },
                  { value: "booking", label: "Online booking / scheduling" },
                  { value: "contact-form", label: "Contact form" },
                  { value: "quote-form", label: "Quote request form" },
                  { value: "gallery", label: "Photo gallery of work" },
                  { value: "testimonials", label: "Customer testimonials / reviews" },
                  { value: "blog", label: "Blog or tips section" },
                  { value: "faq", label: "FAQ page" },
                  { value: "team-page", label: "Team / about page" },
                  { value: "service-area-map", label: "Service area map" },
                  { value: "before-after", label: "Before & after gallery" },
                  { value: "newsletter", label: "Newsletter signup" },
                  { value: "live-chat", label: "Live chat" },
                  { value: "payment-portal", label: "Payment portal" },
                ]}
              />
            </FormField>
          </FormSection>

          {/* -- 6. CURRENT ONLINE PRESENCE -- */}
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
                placeholder="List your Facebook, Instagram, LinkedIn, Nextdoor, etc. Paste URLs if you have them."
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
            <FormField label="What's frustrating about your current setup?" error={errors.currentPainPoints}>
              <TextArea
                registration={register("currentPainPoints")}
                placeholder="e.g., 'Nobody can find us on Google,' 'I'm getting calls at 11pm because there's no way to submit a request online,' 'My nephew built the site five years ago and I can't update it...'"
                rows={3}
                error={errors.currentPainPoints}
              />
            </FormField>
          </FormSection>

          {/* -- 7. BRANDING & STYLE -- */}
          <FormSection title="Branding & Style" description="How should your website look and feel?">
            <FormField label="What's the vibe of your business?" required error={errors.brandVibe}>
              <TextArea
                registration={register("brandVibe")}
                placeholder="Describe it like you'd describe it to a friend: clean and professional, friendly and approachable, modern and techy, rugged and hardworking, warm and personal..."
                rows={3}
                error={errors.brandVibe}
              />
            </FormField>
            <FormField label="Brand colors (if you have them)" error={errors.brandColors}>
              <TextInput registration={register("brandColors")} placeholder="e.g., Navy and gold, green and white, earth tones..." error={errors.brandColors} />
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
            <FormField label="Do you have professional photos of your work or team?" required error={errors.hasPhotos}>
              <RadioGroup
                registration={register("hasPhotos")}
                error={errors.hasPhotos}
                options={[
                  { value: "yes-pro", label: "Yes \u2014 professional photos" },
                  { value: "yes-phone", label: "Yes \u2014 phone photos that look good" },
                  { value: "social-only", label: "Just what's on social media" },
                  { value: "need-photos", label: "No \u2014 I need photography help" },
                ]}
              />
            </FormField>
            <FormField label="Any businesses whose websites you admire?" error={errors.competitors}>
              <TextArea
                registration={register("competitors")}
                placeholder="Paste URLs or describe what you like about them. Doesn't have to be the same industry — we just want to know what catches your eye."
                rows={3}
                error={errors.competitors}
              />
            </FormField>
          </FormSection>

          {/* -- 8. TIMELINE & BUDGET -- */}
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

          {/* -- ANYTHING ELSE -- */}
          <FormSection title="Anything Else?">
            <FormField label="Anything else we should know?" error={errors.additionalNotes}>
              <TextArea
                registration={register("additionalNotes")}
                placeholder="Special requests, pet peeves about other business websites, upcoming changes to your business, anything at all..."
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
