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
  businessType: z.string().min(1, "Please select your business type"),
  yearsInBusiness: z.string().min(1, "Please select how long you've been in business"),
  locationCount: z.string().min(1, "Please select an option"),
  locationAddress: z.string().optional(),
  teamSize: z.string().optional(),
  yourStory: z.string().optional(),
  // 3. Classes & Services
  classesOffered: z.string().min(10, "Give us a bit more detail about what you offer"),
  membershipTypes: z.string().min(10, "Tell us about your pricing structure"),
  specialPrograms: z.string().optional(),
  operatingHours: z.string().optional(),
  // 4. How Members Join & Book
  howMembersJoin: z.string().min(1, "Please select an option"),
  currentBookingMethod: z.string().optional(),
  wantOnlineBooking: z.string().min(1, "Please select an option"),
  wantOnlinePayments: z.string().min(1, "Please select an option"),
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
      subtitle="Tell us about your gym, studio, or wellness business and what you need from a website. Fill out what you can — we'll figure out the rest together."
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
                <TextInput registration={register("contactName")} placeholder="e.g., Marcus Rivera" error={errors.contactName} />
              </FormField>
              <FormField label="Business Name" required error={errors.businessName}>
                <TextInput registration={register("businessName")} placeholder="e.g., Iron & Flow Fitness" error={errors.businessName} />
              </FormField>
              <FormField label="Email" required error={errors.email}>
                <TextInput registration={register("email")} type="email" placeholder="you@example.com" error={errors.email} />
              </FormField>
              <FormField label="Phone" required error={errors.phone}>
                <TextInput registration={register("phone")} type="tel" placeholder="(555) 123-4567" error={errors.phone} />
              </FormField>
            </div>
            <FormField label="Your role at the business" error={errors.role}>
              <TextInput registration={register("role")} placeholder="e.g., Owner, Head Trainer, Studio Manager..." error={errors.role} />
            </FormField>
          </FormSection>

          {/* -- 2. YOUR BUSINESS -- */}
          <FormSection title="Your Business" description="Help us understand what kind of fitness or wellness business you run.">
            <FormField label="What type of business is this?" required error={errors.businessType}>
              <SelectInput
                registration={register("businessType")}
                error={errors.businessType}
                options={[
                  { value: "gym", label: "Gym / Fitness center" },
                  { value: "personal-training", label: "Personal training studio" },
                  { value: "yoga-pilates", label: "Yoga / Pilates studio" },
                  { value: "crossfit", label: "CrossFit box" },
                  { value: "martial-arts", label: "Martial arts" },
                  { value: "dance", label: "Dance studio" },
                  { value: "spin-cycling", label: "Spin / cycling" },
                  { value: "swimming-aquatics", label: "Swimming / aquatics" },
                  { value: "wellness-spa", label: "Wellness / spa" },
                  { value: "health-coaching", label: "Health coaching" },
                  { value: "online-fitness", label: "Online fitness" },
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
              <FormField label="How many trainers or instructors?" error={errors.teamSize}>
                <TextInput registration={register("teamSize")} placeholder="e.g., 3 full-time, 5 part-time" error={errors.teamSize} />
              </FormField>
            </div>
            <FormField label="How many locations?" required error={errors.locationCount}>
              <RadioGroup
                registration={register("locationCount")}
                error={errors.locationCount}
                options={[
                  { value: "1", label: "Single location" },
                  { value: "2-5", label: "2\u20135 locations" },
                  { value: "5+", label: "5+ locations" },
                  { value: "online-only", label: "Online only (no physical space)" },
                ]}
              />
            </FormField>
            <FormField label="Location address (if you have a physical space)" error={errors.locationAddress}>
              <TextInput registration={register("locationAddress")} placeholder="e.g., 123 Main St, Austin, TX 78701" error={errors.locationAddress} />
            </FormField>
            <FormField label="How did the business get started?" error={errors.yourStory}>
              <TextArea
                registration={register("yourStory")}
                placeholder="Competed and decided to coach? Opened a garage gym that outgrew the garage? Left a corporate job to follow your passion? This is the stuff members connect with — give us the real story..."
                rows={4}
                error={errors.yourStory}
              />
            </FormField>
          </FormSection>

          {/* -- 3. CLASSES & SERVICES -- */}
          <FormSection title="Classes & Services" description="What do people come to you for?">
            <FormField label="What classes or training programs do you offer?" required error={errors.classesOffered}>
              <TextArea
                registration={register("classesOffered")}
                placeholder="e.g., 'HIIT, yoga, spin classes, 1-on-1 personal training, group bootcamp...'"
                rows={4}
                error={errors.classesOffered}
              />
            </FormField>
            <FormField label="Describe your membership tiers or packages" required error={errors.membershipTypes}>
              <TextArea
                registration={register("membershipTypes")}
                placeholder="e.g., 'Monthly unlimited $59, 10-class pack $120, drop-in $15...'"
                rows={4}
                error={errors.membershipTypes}
              />
            </FormField>
            <FormField label="Any special programs?" error={errors.specialPrograms}>
              <TextArea
                registration={register("specialPrograms")}
                placeholder="e.g., 'Youth fitness, senior wellness, prenatal yoga, corporate wellness...'"
                rows={3}
                error={errors.specialPrograms}
              />
            </FormField>
            <FormField label="Operating hours" error={errors.operatingHours}>
              <TextInput registration={register("operatingHours")} placeholder="e.g., Mon\u2013Fri 5am\u20139pm, Sat 7am\u20132pm, Sun closed" error={errors.operatingHours} />
            </FormField>
          </FormSection>

          {/* -- 4. HOW MEMBERS JOIN & BOOK -- */}
          <FormSection title="How Members Join & Book" description="How do people sign up and get on the schedule today?">
            <FormField label="How do new members typically join?" required error={errors.howMembersJoin}>
              <RadioGroup
                registration={register("howMembersJoin")}
                error={errors.howMembersJoin}
                options={[
                  { value: "walk-in", label: "Walk in" },
                  { value: "phone-email", label: "Phone / email" },
                  { value: "online-signup", label: "Online signup" },
                  { value: "third-party-app", label: "Third-party app" },
                  { value: "not-sure", label: "Not sure" },
                ]}
              />
            </FormField>
            <FormField label="How do people book classes or sessions now?" error={errors.currentBookingMethod}>
              <TextInput
                registration={register("currentBookingMethod")}
                placeholder="e.g., 'Mindbody, Vagaro, phone calls, Instagram DMs...'"
                error={errors.currentBookingMethod}
              />
            </FormField>
            <FormField label="Do you want online booking on the website?" required error={errors.wantOnlineBooking}>
              <RadioGroup
                registration={register("wantOnlineBooking")}
                error={errors.wantOnlineBooking}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "already-have", label: "Already have it (want to keep)" },
                  { value: "not-now", label: "Not right now" },
                ]}
              />
            </FormField>
            <FormField label="Do you want to accept payments online?" required error={errors.wantOnlinePayments}>
              <RadioGroup
                registration={register("wantOnlinePayments")}
                error={errors.wantOnlinePayments}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                  { value: "already-using", label: "Already using (which platform?)" },
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
                  { value: "class-schedule", label: "Class schedule / calendar" },
                  { value: "online-booking", label: "Online class booking" },
                  { value: "membership-signup", label: "Membership signup" },
                  { value: "trainer-bios", label: "Trainer / instructor bios" },
                  { value: "photo-video-gallery", label: "Photo / video gallery" },
                  { value: "virtual-classes", label: "Virtual / on-demand classes" },
                  { value: "blog-tips", label: "Blog or fitness tips" },
                  { value: "testimonials", label: "Testimonials / transformations" },
                  { value: "free-trial", label: "Free trial or first class offer" },
                  { value: "nutrition", label: "Nutrition / meal plans" },
                  { value: "shop", label: "Merchandise / shop" },
                  { value: "location-map", label: "Location map" },
                  { value: "newsletter", label: "Newsletter signup" },
                  { value: "mobile-app", label: "Mobile app integration" },
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
                placeholder="List your Instagram, Facebook, TikTok, YouTube, etc. Paste URLs if you have them."
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
            <FormField label="What's frustrating about your current online setup?" error={errors.currentPainPoints}>
              <TextArea
                registration={register("currentPainPoints")}
                placeholder="e.g., 'People can't find our class schedule,' 'We get DMs at midnight asking about pricing,' 'Our site looks like it was built in 2012,' 'Members don't know we added a new program...'"
                rows={3}
                error={errors.currentPainPoints}
              />
            </FormField>
          </FormSection>

          {/* -- 7. BRANDING & STYLE -- */}
          <FormSection title="Branding & Style" description="How should your website look and feel?">
            <FormField label="What's the vibe of your brand?" required error={errors.brandVibe}>
              <TextArea
                registration={register("brandVibe")}
                placeholder="Describe it like you'd describe it to a friend: high-energy and intense, calm and restorative, community-driven and welcoming, luxury and exclusive, gritty and raw, modern and minimal..."
                rows={3}
                error={errors.brandVibe}
              />
            </FormField>
            <FormField label="Brand colors (if you have them)" error={errors.brandColors}>
              <TextInput registration={register("brandColors")} placeholder="e.g., Black and neon green, earth tones, navy and gold..." error={errors.brandColors} />
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
                  { value: "pro-photos", label: "Professional photos" },
                  { value: "good-phone", label: "Good phone photos" },
                  { value: "social-only", label: "Social media only" },
                  { value: "need-photography", label: "Need photography" },
                ]}
              />
            </FormField>
            <FormField label="Any fitness businesses whose websites you admire?" error={errors.competitors}>
              <TextArea
                registration={register("competitors")}
                placeholder="Paste URLs or describe what you like about them. Doesn't have to be the same type of gym or studio — we just want to know what catches your eye."
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
                placeholder="Upcoming expansion, seasonal promotions, pet peeves about other fitness websites, anything at all..."
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
