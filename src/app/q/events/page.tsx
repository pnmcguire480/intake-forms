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
  serviceArea: z.string().min(1, "Please describe your service area"),
  teamSize: z.string().optional(),
  yourStory: z.string().optional(),
  // 3. Events & Services
  eventTypes: z.array(z.string()).min(1, "Please select at least one event type"),
  servicesList: z.string().min(10, "Give us a bit more detail about your services"),
  averagePriceRange: z.string().optional(),
  eventsPerYear: z.string().min(1, "Please select an option"),
  peakSeason: z.string().optional(),
  // 4. Booking & Inquiries
  howClientsBook: z.string().min(1, "Please select an option"),
  currentPlatforms: z.string().optional(),
  wantOnlineBooking: z.string().min(1, "Please select an option"),
  typicalLeadTime: z.string().optional(),
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

const FORM_NAME = "events-intake";

export default function EventsForm() {
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
      title="Events & Weddings Questionnaire"
      subtitle="Tell us about your events or wedding business and what you need from a website. Fill out what you can — we'll figure out the rest together."
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
                <TextInput registration={register("contactName")} placeholder="e.g., Sarah Mitchell" error={errors.contactName} />
              </FormField>
              <FormField label="Business Name" required error={errors.businessName}>
                <TextInput registration={register("businessName")} placeholder="e.g., Golden Hour Events" error={errors.businessName} />
              </FormField>
              <FormField label="Email" required error={errors.email}>
                <TextInput registration={register("email")} type="email" placeholder="you@example.com" error={errors.email} />
              </FormField>
              <FormField label="Phone" required error={errors.phone}>
                <TextInput registration={register("phone")} type="tel" placeholder="(555) 123-4567" error={errors.phone} />
              </FormField>
            </div>
            <FormField label="Your role at the business" error={errors.role}>
              <TextInput registration={register("role")} placeholder="e.g., Owner, Lead Planner, Venue Manager, Creative Director..." error={errors.role} />
            </FormField>
          </FormSection>

          {/* -- 2. YOUR BUSINESS -- */}
          <FormSection title="Your Business" description="Help us understand what kind of events or wedding business you run.">
            <FormField label="What type of business is this?" required error={errors.businessType}>
              <SelectInput
                registration={register("businessType")}
                error={errors.businessType}
                options={[
                  { value: "wedding-venue", label: "Wedding venue" },
                  { value: "event-venue", label: "Event venue" },
                  { value: "wedding-planner", label: "Wedding planner / coordinator" },
                  { value: "event-planner", label: "Event planner" },
                  { value: "photographer", label: "Photographer" },
                  { value: "videographer", label: "Videographer" },
                  { value: "dj-entertainment", label: "DJ / Entertainment" },
                  { value: "florist", label: "Florist" },
                  { value: "caterer", label: "Caterer" },
                  { value: "bakery-desserts", label: "Bakery / desserts" },
                  { value: "officiant", label: "Officiant" },
                  { value: "rental-company", label: "Rental company" },
                  { value: "photo-booth", label: "Photo booth" },
                  { value: "invitation-stationery", label: "Invitation / stationery" },
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
              <FormField label="How many people on your team?" error={errors.teamSize}>
                <TextInput registration={register("teamSize")} placeholder="e.g., Just me, 3 full-time + 5 day-of staff" error={errors.teamSize} />
              </FormField>
            </div>
            <FormField label="Where do you serve?" required error={errors.serviceArea}>
              <TextArea
                registration={register("serviceArea")}
                placeholder="e.g., 'Greater Nashville area,' 'Travel nationwide'"
                rows={2}
                error={errors.serviceArea}
              />
            </FormField>
            <FormField label="How did you get into this business?" error={errors.yourStory}>
              <TextArea
                registration={register("yourStory")}
                placeholder="Planned your own wedding and fell in love with it? Inherited a family venue? Left corporate to follow your creative side? Couples love this kind of story — give us the real version..."
                rows={4}
                error={errors.yourStory}
              />
            </FormField>
          </FormSection>

          {/* -- 3. EVENTS & SERVICES -- */}
          <FormSection title="Events & Services" description="What kinds of events do you work and what do you bring to them?">
            <FormField label="What types of events do you handle?" required error={errors.eventTypes}>
              <CheckboxGroup
                registration={register("eventTypes")}
                error={errors.eventTypes}
                options={[
                  { value: "weddings", label: "Weddings" },
                  { value: "corporate", label: "Corporate events" },
                  { value: "birthday-milestone", label: "Birthday / milestone parties" },
                  { value: "galas-fundraisers", label: "Galas / fundraisers" },
                  { value: "conferences", label: "Conferences" },
                  { value: "holiday-parties", label: "Holiday parties" },
                  { value: "baby-bridal-showers", label: "Baby / bridal showers" },
                  { value: "rehearsal-dinners", label: "Rehearsal dinners" },
                  { value: "concerts-festivals", label: "Concerts / festivals" },
                  { value: "private-dining", label: "Private dining" },
                  { value: "other", label: "Other" },
                ]}
              />
            </FormField>
            <FormField label="Describe your main services or packages" required error={errors.servicesList}>
              <TextArea
                registration={register("servicesList")}
                placeholder="e.g., 'Full-service planning, day-of coordination, partial planning. We also do destination weddings and elopement packages...'"
                rows={4}
                error={errors.servicesList}
              />
            </FormField>
            <div className="grid md:grid-cols-2 gap-5">
              <FormField label="Average price range" error={errors.averagePriceRange}>
                <TextInput registration={register("averagePriceRange")} placeholder="$2K-$15K" error={errors.averagePriceRange} />
              </FormField>
              <FormField label="How many events per year?" required error={errors.eventsPerYear}>
                <SelectInput
                  registration={register("eventsPerYear")}
                  error={errors.eventsPerYear}
                  options={[
                    { value: "under-10", label: "Under 10" },
                    { value: "10-25", label: "10\u201325" },
                    { value: "25-50", label: "25\u201350" },
                    { value: "50-100", label: "50\u2013100" },
                    { value: "100-plus", label: "100+" },
                  ]}
                />
              </FormField>
            </div>
            <FormField label="When is your peak season?" error={errors.peakSeason}>
              <TextInput registration={register("peakSeason")} placeholder="e.g., 'May through October'" error={errors.peakSeason} />
            </FormField>
          </FormSection>

          {/* -- 4. BOOKING & INQUIRIES -- */}
          <FormSection title="Booking & Inquiries" description="How do clients find you and lock in their date?">
            <FormField label="How do most clients reach you today?" required error={errors.howClientsBook}>
              <RadioGroup
                registration={register("howClientsBook")}
                error={errors.howClientsBook}
                options={[
                  { value: "phone-email", label: "Phone / email" },
                  { value: "contact-form", label: "Contact form" },
                  { value: "third-party", label: "Third-party platform (The Knot, WeddingWire, etc.)" },
                  { value: "social-dms", label: "Social media DMs" },
                  { value: "walk-ins", label: "Walk-ins" },
                  { value: "other", label: "Other" },
                ]}
              />
            </FormField>
            <FormField label="Which platforms are you listed on?" error={errors.currentPlatforms}>
              <TextInput registration={register("currentPlatforms")} placeholder="e.g., 'The Knot, WeddingWire, Thumbtack...'" error={errors.currentPlatforms} />
            </FormField>
            <FormField label="Do you want online booking or inquiry on the website?" required error={errors.wantOnlineBooking}>
              <RadioGroup
                registration={register("wantOnlineBooking")}
                error={errors.wantOnlineBooking}
                options={[
                  { value: "inquiry-form", label: "Yes \u2014 inquiry form" },
                  { value: "full-booking", label: "Yes \u2014 full booking with deposit" },
                  { value: "phone-email-only", label: "No \u2014 phone/email only" },
                  { value: "not-sure", label: "Not sure" },
                ]}
              />
            </FormField>
            <FormField label="How far in advance do clients typically book?" error={errors.typicalLeadTime}>
              <TextInput registration={register("typicalLeadTime")} placeholder="e.g., '6-12 months for weddings, 2-4 weeks for parties'" error={errors.typicalLeadTime} />
            </FormField>
          </FormSection>

          {/* -- 5. WEBSITE FEATURES -- */}
          <FormSection title="Website Features" description="Check everything you'd want on the new site.">
            <FormField label="What features do you need?" required error={errors.wantedFeatures}>
              <CheckboxGroup
                registration={register("wantedFeatures")}
                error={errors.wantedFeatures}
                options={[
                  { value: "photo-gallery", label: "Photo gallery / portfolio" },
                  { value: "video-showcase", label: "Video showcase" },
                  { value: "services-pricing", label: "Services & pricing packages" },
                  { value: "availability-calendar", label: "Availability calendar" },
                  { value: "inquiry-booking-form", label: "Inquiry / booking form" },
                  { value: "testimonials", label: "Client testimonials / reviews" },
                  { value: "blog-recaps", label: "Blog or event recaps" },
                  { value: "virtual-tour", label: "Venue virtual tour" },
                  { value: "faq", label: "FAQ" },
                  { value: "team-about", label: "Team / about page" },
                  { value: "vendor-partnerships", label: "Vendor partnerships page" },
                  { value: "newsletter", label: "Newsletter signup" },
                  { value: "location-map", label: "Location map" },
                  { value: "social-feed", label: "Social media feed" },
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
            <FormField label="Social media & listing profiles" error={errors.socialMedia}>
              <TextArea
                registration={register("socialMedia")}
                placeholder="List your Instagram, Facebook, The Knot, WeddingWire profiles..."
                rows={3}
                error={errors.socialMedia}
              />
            </FormField>
            <FormField label="What's frustrating about your current online setup?" error={errors.currentPainPoints}>
              <TextArea
                registration={register("currentPainPoints")}
                placeholder="e.g., 'Couples can't see our real work,' 'We get tire-kicker inquiries that waste hours,' 'Our site looks outdated compared to the experience we deliver,' 'We're paying The Knot but want our own presence...'"
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
                placeholder="Elegant and romantic? Modern and minimalist? Rustic barn vibes? Luxury black-tie?"
                rows={3}
                error={errors.brandVibe}
              />
            </FormField>
            <FormField label="Brand colors (if you have them)" error={errors.brandColors}>
              <TextInput registration={register("brandColors")} placeholder="e.g., Blush and gold, moody burgundy, classic black and white..." error={errors.brandColors} />
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
            <FormField label="What kind of event photos do you have?" required error={errors.hasPhotos}>
              <RadioGroup
                registration={register("hasPhotos")}
                error={errors.hasPhotos}
                options={[
                  { value: "pro-photos", label: "Professional event photos" },
                  { value: "good-phone", label: "Good phone photos" },
                  { value: "social-only", label: "Social media only" },
                  { value: "need-photography", label: "Need photography" },
                ]}
              />
            </FormField>
            <FormField label="Any event businesses whose websites you admire?" error={errors.competitors}>
              <TextArea
                registration={register("competitors")}
                placeholder="Paste URLs or describe what you like about them. Doesn't have to be the same type of business — we just want to know what catches your eye."
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
                placeholder="Upcoming wedding season rush, a venue expansion, vendor partnerships you want to highlight, pet peeves about other event websites, anything at all..."
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
