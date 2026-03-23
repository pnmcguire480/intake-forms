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
  // About You
  contactName: z.string().min(1, "Your name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  role: z.string().optional(),
  // Your Practice
  businessName: z.string().min(1, "Practice name is required"),
  practiceType: z.string().min(1, "Please select your practice type"),
  yearsInPractice: z.string().min(1, "Please select how long you've been in practice"),
  numberOfProviders: z.string().min(1, "Please select number of providers"),
  locationCount: z.string().min(1, "Please select number of locations"),
  locationAddress: z.string().optional(),
  officeHours: z.string().optional(),
  // Patients & Services
  specialties: z.string().optional(),
  targetPatients: z.string().optional(),
  insuranceAccepted: z.string().optional(),
  acceptingNewPatients: z.string().min(1, "Please select an option"),
  // Online & Compliance
  wantPatientPortal: z.string().min(1, "Please select an option"),
  wantOnlineBooking: z.string().min(1, "Please select an option"),
  wantTelehealth: z.string().min(1, "Please select an option"),
  wantPatientForms: z.string().min(1, "Please select an option"),
  complianceNeeds: z.array(z.string()).optional(),
  ehrSystem: z.string().optional(),
  // Website Features
  wantedFeatures: z.array(z.string()).min(1, "Please select at least one feature"),
  // Current Online Presence
  hasExistingSite: z.string().min(1, "Please select an option"),
  existingSiteUrl: z.string().optional(),
  socialMedia: z.string().optional(),
  currentPainPoints: z.string().optional(),
  // Branding & Style
  brandVibe: z.string().min(1, "Please describe your style"),
  brandColors: z.string().optional(),
  hasLogo: z.string().min(1, "Please select an option"),
  hasPhotos: z.string().min(1, "Please select an option"),
  competitors: z.string().optional(),
  // Timeline & Budget
  timeline: z.string().min(1, "Please select a timeline"),
  budget: z.string().min(1, "Please select a budget range"),
  additionalNotes: z.string().optional(),
  _hp_website: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const FORM_NAME = "healthcare-intake";

export default function HealthcareForm() {
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
      title="Healthcare & Medical Practice Questionnaire"
      subtitle="Tell us about your practice, your patients, and how you want the world to find you. Fill out what you can — skip anything you're not sure about yet."
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

          {/* ── 1. ABOUT YOU ── */}
          <FormSection title="About You" description="The basics so we can get back to you.">
            <div className="grid md:grid-cols-2 gap-5">
              <FormField label="Your Name" required error={errors.contactName}>
                <TextInput registration={register("contactName")} placeholder="e.g., Dr. Sarah Mitchell" error={errors.contactName} />
              </FormField>
              <FormField label="Email" required error={errors.email}>
                <TextInput registration={register("email")} type="email" placeholder="you@yourpractice.com" error={errors.email} />
              </FormField>
              <FormField label="Phone" required error={errors.phone}>
                <TextInput registration={register("phone")} type="tel" placeholder="(555) 123-4567" error={errors.phone} />
              </FormField>
              <FormField label="Your role at the practice" error={errors.role}>
                <TextInput registration={register("role")} placeholder="e.g., Owner, Office Manager, Marketing Director..." error={errors.role} />
              </FormField>
            </div>
          </FormSection>

          {/* ── 2. YOUR PRACTICE ── */}
          <FormSection title="Your Practice" description="Help us understand the kind of care you provide and how your office runs.">
            <FormField label="Practice Name" required error={errors.businessName}>
              <TextInput registration={register("businessName")} placeholder="e.g., Sunrise Family Medicine, Bright Smiles Dental" error={errors.businessName} />
            </FormField>
            <FormField label="What type of practice is this?" required error={errors.practiceType}>
              <RadioGroup
                registration={register("practiceType")}
                error={errors.practiceType}
                options={[
                  { value: "medical-doctor", label: "Medical / Doctor's Office" },
                  { value: "dental", label: "Dental" },
                  { value: "mental-health", label: "Mental Health / Therapy" },
                  { value: "chiropractic", label: "Chiropractic" },
                  { value: "physical-therapy", label: "Physical Therapy" },
                  { value: "dermatology", label: "Dermatology" },
                  { value: "veterinary", label: "Veterinary" },
                  { value: "wellness-holistic", label: "Wellness / Holistic" },
                  { value: "multi-specialty", label: "Multi-specialty" },
                  { value: "other", label: "Other" },
                ]}
              />
            </FormField>
            <div className="grid md:grid-cols-2 gap-5">
              <FormField label="How long have you been in practice?" required error={errors.yearsInPractice}>
                <SelectInput
                  registration={register("yearsInPractice")}
                  error={errors.yearsInPractice}
                  options={[
                    { value: "not-yet", label: "Haven't opened yet" },
                    { value: "under-1", label: "Less than a year" },
                    { value: "1-5", label: "1\u20135 years" },
                    { value: "5-10", label: "5\u201310 years" },
                    { value: "10-20", label: "10\u201320 years" },
                    { value: "20-plus", label: "20+ years" },
                  ]}
                />
              </FormField>
              <FormField label="How many providers are in your practice?" required error={errors.numberOfProviders}>
                <SelectInput
                  registration={register("numberOfProviders")}
                  error={errors.numberOfProviders}
                  options={[
                    { value: "solo", label: "Solo practitioner" },
                    { value: "2-5", label: "2\u20135 providers" },
                    { value: "6-20", label: "6\u201320 providers" },
                    { value: "20-plus", label: "20+ providers" },
                  ]}
                />
              </FormField>
            </div>
            <FormField label="How many locations do you have?" required error={errors.locationCount}>
              <RadioGroup
                registration={register("locationCount")}
                error={errors.locationCount}
                options={[
                  { value: "1", label: "Single location" },
                  { value: "2-3", label: "2\u20133 locations" },
                  { value: "4+", label: "4+ locations" },
                ]}
              />
            </FormField>
            <FormField label="Address or location info for the website" error={errors.locationAddress}>
              <TextInput registration={register("locationAddress")} placeholder="e.g., 450 Medical Center Dr, Suite 200, Springfield, IL 62701" error={errors.locationAddress} />
            </FormField>
            <FormField label="Office hours" error={errors.officeHours}>
              <TextInput registration={register("officeHours")} placeholder="e.g., Mon\u2013Fri 8am\u20135pm, Sat 9am\u201312pm, closed Sun" error={errors.officeHours} />
            </FormField>
          </FormSection>

          {/* ── 3. PATIENTS & SERVICES ── */}
          <FormSection title="Your Patients & Services" description="Tell us what you do and who you do it for.">
            <FormField label="What services do you provide?" error={errors.specialties}>
              <TextArea
                registration={register("specialties")}
                placeholder="e.g., Family medicine, annual physicals, sports injuries, women's health, diabetes management..."
                rows={3}
                error={errors.specialties}
              />
            </FormField>
            <FormField label="Who are your typical patients?" error={errors.targetPatients}>
              <TextArea
                registration={register("targetPatients")}
                placeholder="e.g., Families with young children, athletes, seniors on Medicare, corporate employees..."
                rows={3}
                error={errors.targetPatients}
              />
            </FormField>
            <FormField label="Which insurance plans do you accept?" error={errors.insuranceAccepted}>
              <TextArea
                registration={register("insuranceAccepted")}
                placeholder="e.g., Blue Cross, Aetna, United, Medicare, Medicaid, cash pay only..."
                rows={3}
                error={errors.insuranceAccepted}
              />
            </FormField>
            <FormField label="Are you currently accepting new patients?" required error={errors.acceptingNewPatients}>
              <RadioGroup
                registration={register("acceptingNewPatients")}
                error={errors.acceptingNewPatients}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                  { value: "waitlist", label: "Waitlist only" },
                ]}
              />
            </FormField>
          </FormSection>

          {/* ── 4. ONLINE & COMPLIANCE NEEDS ── */}
          <FormSection title="Online & Compliance Needs" description="Healthcare websites have unique requirements. Let's figure out what yours needs.">
            <FormField label="Do you want a patient portal on the website?" required error={errors.wantPatientPortal}>
              <RadioGroup
                registration={register("wantPatientPortal")}
                error={errors.wantPatientPortal}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                  { value: "already-have", label: "I already have one \u2014 just need a link to it" },
                  { value: "unsure", label: "Not sure yet" },
                ]}
              />
            </FormField>
            <FormField label="Do you want patients to book appointments online?" required error={errors.wantOnlineBooking}>
              <RadioGroup
                registration={register("wantOnlineBooking")}
                error={errors.wantOnlineBooking}
                options={[
                  { value: "yes", label: "Yes \u2014 build it into the site" },
                  { value: "link-existing", label: "Yes \u2014 link to my existing booking system" },
                  { value: "no", label: "No \u2014 patients call to book" },
                  { value: "unsure", label: "Not sure yet" },
                ]}
              />
            </FormField>
            <FormField label="Do you want telehealth information or scheduling on the site?" required error={errors.wantTelehealth}>
              <RadioGroup
                registration={register("wantTelehealth")}
                error={errors.wantTelehealth}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                  { value: "unsure", label: "Not sure yet" },
                ]}
              />
            </FormField>
            <FormField label="Do you want intake forms patients can fill out on the website?" required error={errors.wantPatientForms}>
              <RadioGroup
                registration={register("wantPatientForms")}
                error={errors.wantPatientForms}
                options={[
                  { value: "yes", label: "Yes \u2014 fillable online forms" },
                  { value: "pdf", label: "Yes \u2014 downloadable PDFs they print and bring" },
                  { value: "no", label: "No \u2014 we handle paperwork in-office" },
                  { value: "unsure", label: "Not sure yet" },
                ]}
              />
            </FormField>
            <FormField label="Do you have any compliance or regulatory needs?" error={errors.complianceNeeds}>
              <CheckboxGroup
                registration={register("complianceNeeds")}
                error={errors.complianceNeeds}
                options={[
                  { value: "hipaa", label: "HIPAA website compliance" },
                  { value: "ada", label: "ADA accessibility" },
                  { value: "phi", label: "PHI handling (protected health information)" },
                  { value: "consent-forms", label: "Consent forms" },
                  { value: "baa", label: "BAA with hosting provider" },
                  { value: "none", label: "None / not sure" },
                ]}
              />
            </FormField>
            <FormField label="What EHR/EMR system do you use?" error={errors.ehrSystem}>
              <TextInput registration={register("ehrSystem")} placeholder="e.g., Epic, Cerner, Athena, DrChrono, SimplePractice, TherapyNotes..." error={errors.ehrSystem} />
            </FormField>
          </FormSection>

          {/* ── 5. WEBSITE FEATURES ── */}
          <FormSection title="Website Features" description="Beyond the clinical stuff, what else should your site do?">
            <FormField label="Check everything you'd like on your website" required error={errors.wantedFeatures}>
              <CheckboxGroup
                registration={register("wantedFeatures")}
                error={errors.wantedFeatures}
                options={[
                  { value: "provider-bios", label: "Provider bios with photos" },
                  { value: "services-pages", label: "Services / conditions pages" },
                  { value: "testimonials", label: "Patient testimonials" },
                  { value: "blog", label: "Blog / health articles" },
                  { value: "contact-form", label: "Contact form" },
                  { value: "location-map", label: "Location map with directions" },
                  { value: "insurance-page", label: "Insurance info page" },
                  { value: "faq", label: "FAQ" },
                  { value: "patient-resources", label: "Patient resources / downloads" },
                  { value: "before-after", label: "Before & after gallery" },
                  { value: "virtual-tour", label: "Virtual tour of the office" },
                ]}
              />
            </FormField>
          </FormSection>

          {/* ── 6. CURRENT ONLINE PRESENCE ── */}
          <FormSection title="Your Current Online Presence" description="Where are patients finding you right now?">
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
            <FormField label="Social media or directory listings" error={errors.socialMedia}>
              <TextArea
                registration={register("socialMedia")}
                placeholder="List your Facebook, Instagram, Google Business, Healthgrades, Zocdoc, Yelp, etc. Paste URLs if you have them."
                rows={3}
                error={errors.socialMedia}
              />
            </FormField>
            <FormField label="What frustrates you about your current web presence?" error={errors.currentPainPoints}>
              <TextArea
                registration={register("currentPainPoints")}
                placeholder="e.g., 'Patients can't find our hours,' 'The site looks outdated,' 'We get calls all day for things that should be on the website,' 'Our Google listing has the wrong address...'"
                rows={3}
                error={errors.currentPainPoints}
              />
            </FormField>
          </FormSection>

          {/* ── 7. BRANDING & STYLE ── */}
          <FormSection title="Branding & Style" description="How should your website look and feel to patients?">
            <FormField label="What's the vibe of your practice?" required error={errors.brandVibe}>
              <TextArea
                registration={register("brandVibe")}
                placeholder="Describe it like you'd describe it to a friend: warm and family-friendly, clean and clinical, modern and high-tech, calming spa-like, cheerful pediatric, professional but approachable..."
                rows={3}
                error={errors.brandVibe}
              />
            </FormField>
            <FormField label="Brand colors (if you have them)" error={errors.brandColors}>
              <TextInput registration={register("brandColors")} placeholder="e.g., Blue and white, teal and gray, earth tones..." error={errors.brandColors} />
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
            <FormField label="Do you have professional photos of your practice and providers?" required error={errors.hasPhotos}>
              <RadioGroup
                registration={register("hasPhotos")}
                error={errors.hasPhotos}
                options={[
                  { value: "yes-pro", label: "Yes \u2014 professional headshots and office photos" },
                  { value: "yes-some", label: "Some \u2014 we have a few but need more" },
                  { value: "phone-only", label: "Just phone photos" },
                  { value: "need-photos", label: "No \u2014 we need photography help" },
                ]}
              />
            </FormField>
            <FormField label="Any medical practice websites you admire?" error={errors.competitors}>
              <TextArea
                registration={register("competitors")}
                placeholder="Paste URLs or describe what you like about them. Even if it's a different specialty \u2014 we want to know what catches your eye."
                rows={3}
                error={errors.competitors}
              />
            </FormField>
          </FormSection>

          {/* ── 8. TIMELINE & BUDGET ── */}
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

          {/* ── 9. ANYTHING ELSE ── */}
          <FormSection title="Anything Else?">
            <FormField label="Anything else we should know?" error={errors.additionalNotes}>
              <TextArea
                registration={register("additionalNotes")}
                placeholder="Special requirements, upcoming practice changes, things you hate on other medical websites, a new provider joining soon, anything at all..."
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
