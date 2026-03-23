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
  businessName: z.string().min(1, "Organization name is required"),
  role: z.string().optional(),
  // 2. Your Organization
  orgType: z.string().min(1, "Please select your organization type"),
  missionStatement: z.string().min(10, "Give us at least a couple sentences about your mission"),
  yearsActive: z.string().min(1, "Please select how long you've been active"),
  orgSize: z.string().min(1, "Please select your team size"),
  serviceArea: z.string().min(1, "Please tell us where you operate"),
  yourStory: z.string().optional(),
  // 3. Programs & Impact
  programs: z.string().min(1, "Please describe your programs or services"),
  impactNumbers: z.string().optional(),
  upcomingEvents: z.string().optional(),
  // 4. Donations & Fundraising
  acceptsDonations: z.string().min(1, "Please select an option"),
  currentDonationMethod: z.string().optional(),
  wantRecurring: z.string().min(1, "Please select an option"),
  wantFundraiserPages: z.string().min(1, "Please select an option"),
  sponsorshipOpportunities: z.string().min(1, "Please select an option"),
  // 5. Website Features
  wantedFeatures: z.array(z.string()).min(1, "Please select at least one feature"),
  // 6. Current Online Presence
  hasExistingSite: z.string().min(1, "Please select an option"),
  existingSiteUrl: z.string().optional(),
  socialMedia: z.string().optional(),
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

const FORM_NAME = "nonprofit-intake";

export default function NonprofitForm() {
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
      title="Nonprofit & Organization Website Questionnaire"
      subtitle="Tell us about your organization, your mission, and what you need from a website. Fill out what you can — don't stress about getting it perfect."
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
                <TextInput registration={register("contactName")} placeholder="e.g., Maria Gonzalez" error={errors.contactName} />
              </FormField>
              <FormField label="Organization Name" required error={errors.businessName}>
                <TextInput registration={register("businessName")} placeholder="e.g., Helping Hands Community Foundation" error={errors.businessName} />
              </FormField>
              <FormField label="Email" required error={errors.email}>
                <TextInput registration={register("email")} type="email" placeholder="you@example.com" error={errors.email} />
              </FormField>
              <FormField label="Phone" required error={errors.phone}>
                <TextInput registration={register("phone")} type="tel" placeholder="(555) 123-4567" error={errors.phone} />
              </FormField>
            </div>
            <FormField label="Your role" error={errors.role}>
              <TextInput registration={register("role")} placeholder="e.g., Executive Director, Board Chair, Communications..." error={errors.role} />
            </FormField>
          </FormSection>

          {/* -- 2. YOUR ORGANIZATION -- */}
          <FormSection title="Your Organization" description="Help us understand who you are and what drives you.">
            <FormField label="What type of organization are you?" required error={errors.orgType}>
              <SelectInput
                registration={register("orgType")}
                error={errors.orgType}
                options={[
                  { value: "church-religious", label: "Church / Religious organization" },
                  { value: "charity-foundation", label: "Charity / Foundation" },
                  { value: "community-group", label: "Community group" },
                  { value: "trade-professional", label: "Trade / Professional association" },
                  { value: "school-education", label: "School / Education" },
                  { value: "animal-rescue", label: "Animal rescue / Shelter" },
                  { value: "arts-cultural", label: "Arts / Cultural" },
                  { value: "environmental", label: "Environmental" },
                  { value: "youth-mentoring", label: "Youth / Mentoring" },
                  { value: "veteran-services", label: "Veteran services" },
                  { value: "social-services", label: "Social services" },
                  { value: "political-advocacy", label: "Political / Advocacy" },
                  { value: "sports-league", label: "Sports league / Club" },
                  { value: "other", label: "Other" },
                ]}
              />
            </FormField>
            <FormField label="What's your mission?" required error={errors.missionStatement}>
              <TextArea
                registration={register("missionStatement")}
                placeholder="In a few sentences — what does your organization exist to do?"
                rows={4}
                error={errors.missionStatement}
              />
            </FormField>
            <div className="grid md:grid-cols-2 gap-5">
              <FormField label="How long have you been active?" required error={errors.yearsActive}>
                <SelectInput
                  registration={register("yearsActive")}
                  error={errors.yearsActive}
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
              <FormField label="How big is your team?" required error={errors.orgSize}>
                <SelectInput
                  registration={register("orgSize")}
                  error={errors.orgSize}
                  options={[
                    { value: "all-volunteer", label: "All volunteer" },
                    { value: "1-5", label: "1\u20135 staff" },
                    { value: "6-20", label: "6\u201320 staff" },
                    { value: "20-50", label: "20\u201350 staff" },
                    { value: "50-plus", label: "50+ staff" },
                  ]}
                />
              </FormField>
            </div>
            <FormField label="Where do you operate?" required error={errors.serviceArea}>
              <TextArea
                registration={register("serviceArea")}
                placeholder="Local, regional, national, or international?"
                rows={2}
                error={errors.serviceArea}
              />
            </FormField>
            <FormField label="Tell us the founding story" error={errors.yourStory}>
              <TextArea
                registration={register("yourStory")}
                placeholder="What sparked the idea? A personal experience? A community need? This is the kind of story that makes people want to get involved — give us the real version..."
                rows={4}
                error={errors.yourStory}
              />
            </FormField>
          </FormSection>

          {/* -- 3. PROGRAMS & IMPACT -- */}
          <FormSection title="Programs & Impact" description="What you do and the difference it makes.">
            <FormField label="What programs or services do you run?" required error={errors.programs}>
              <TextArea
                registration={register("programs")}
                placeholder="e.g., 'After-school tutoring, food pantry, summer camp, community workshops...'"
                rows={4}
                error={errors.programs}
              />
            </FormField>
            <FormField label="Any impact stats you're proud of?" error={errors.impactNumbers}>
              <TextArea
                registration={register("impactNumbers")}
                placeholder="e.g., 'Served 5,000 meals last year,' '200 kids in our mentoring program,' '15 houses built...'"
                rows={3}
                error={errors.impactNumbers}
              />
            </FormField>
            <FormField label="Any events coming up that the website should promote?" error={errors.upcomingEvents}>
              <TextArea
                registration={register("upcomingEvents")}
                placeholder="e.g., 'Annual gala in October,' 'Volunteer day next month,' '5K fundraiser in the spring...'"
                rows={3}
                error={errors.upcomingEvents}
              />
            </FormField>
          </FormSection>

          {/* -- 4. DONATIONS & FUNDRAISING -- */}
          <FormSection title="Donations & Fundraising" description="How people give to your organization — and how they could.">
            <FormField label="Do you accept donations?" required error={errors.acceptsDonations}>
              <RadioGroup
                registration={register("acceptsDonations")}
                error={errors.acceptsDonations}
                options={[
                  { value: "yes-online-critical", label: "Yes \u2014 online donations are critical" },
                  { value: "yes-mostly-offline", label: "Yes \u2014 but most giving is offline" },
                  { value: "want-to-start", label: "We'd like to start" },
                  { value: "not-applicable", label: "Not applicable" },
                ]}
              />
            </FormField>
            <FormField label="How do people donate now?" error={errors.currentDonationMethod}>
              <TextInput
                registration={register("currentDonationMethod")}
                placeholder="e.g., 'PayPal, check, cash at events, GoFundMe...'"
                error={errors.currentDonationMethod}
              />
            </FormField>
            <FormField label="Do you want a monthly/recurring giving option?" required error={errors.wantRecurring}>
              <RadioGroup
                registration={register("wantRecurring")}
                error={errors.wantRecurring}
                options={[
                  { value: "yes", label: "Yes \u2014 monthly giving option" },
                  { value: "maybe-later", label: "Maybe later" },
                  { value: "no", label: "No" },
                ]}
              />
            </FormField>
            <FormField label="Do you want campaign/fundraiser pages?" required error={errors.wantFundraiserPages}>
              <RadioGroup
                registration={register("wantFundraiserPages")}
                error={errors.wantFundraiserPages}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "not-sure", label: "Not sure" },
                  { value: "no", label: "No" },
                ]}
              />
            </FormField>
            <FormField label="Do you want to list sponsorship opportunities?" required error={errors.sponsorshipOpportunities}>
              <RadioGroup
                registration={register("sponsorshipOpportunities")}
                error={errors.sponsorshipOpportunities}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "not-right-now", label: "Not right now" },
                  { value: "no", label: "No" },
                ]}
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
                  { value: "donate-button", label: "Donate button / form" },
                  { value: "mission-about", label: "Mission & about page" },
                  { value: "programs-services", label: "Programs / services pages" },
                  { value: "events-calendar", label: "Events calendar" },
                  { value: "volunteer-signup", label: "Volunteer signup" },
                  { value: "newsletter-signup", label: "Newsletter signup" },
                  { value: "photo-video-gallery", label: "Photo / video gallery" },
                  { value: "blog-news", label: "Blog or news" },
                  { value: "team-board-directory", label: "Team / board directory" },
                  { value: "impact-report", label: "Impact report / annual report" },
                  { value: "resource-downloads", label: "Resource downloads" },
                  { value: "contact-form", label: "Contact form" },
                  { value: "location-map", label: "Location map" },
                  { value: "social-media-feed", label: "Social media feed" },
                  { value: "job-postings", label: "Job postings" },
                ]}
              />
            </FormField>
          </FormSection>

          {/* -- 6. CURRENT ONLINE PRESENCE -- */}
          <FormSection title="Current Online Presence" description="Where are people finding you right now?">
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
                placeholder="List your Facebook, Instagram, LinkedIn, YouTube, etc. Paste URLs if you have them."
                rows={3}
                error={errors.socialMedia}
              />
            </FormField>
            <FormField label="What's frustrating about your current setup?" error={errors.currentPainPoints}>
              <TextArea
                registration={register("currentPainPoints")}
                placeholder="e.g., 'People can't find our donation page,' 'Our site looks outdated,' 'We can't update it ourselves,' 'Nobody knows we exist online...'"
                rows={3}
                error={errors.currentPainPoints}
              />
            </FormField>
          </FormSection>

          {/* -- 7. BRANDING & STYLE -- */}
          <FormSection title="Branding & Style" description="How should your website look and feel?">
            <FormField label="What's the vibe of your organization?" required error={errors.brandVibe}>
              <TextArea
                registration={register("brandVibe")}
                placeholder="Professional and trustworthy? Warm and community-focused? Bold and urgent? Joyful and hopeful?"
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
            <FormField label="What kind of photos do you have?" required error={errors.hasPhotos}>
              <RadioGroup
                registration={register("hasPhotos")}
                error={errors.hasPhotos}
                options={[
                  { value: "professional", label: "Professional photos" },
                  { value: "good-phone", label: "Good phone photos from events" },
                  { value: "social-only", label: "Social media only" },
                  { value: "need-photography", label: "Need photography" },
                ]}
              />
            </FormField>
            <FormField label="Any nonprofits or organizations whose websites you admire?" error={errors.competitors}>
              <TextArea
                registration={register("competitors")}
                placeholder="Paste URLs or describe what you like about them. Doesn't have to be the same type of org — we just want to know what catches your eye."
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
                placeholder="Upcoming campaigns, grant deadlines, board preferences, anything at all..."
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
