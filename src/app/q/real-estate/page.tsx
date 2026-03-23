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
  businessName: z.string().min(1, "Your business or team name is required"),
  role: z.string().optional(),
  // 2. Your Business
  agentType: z.string().min(1, "Please select what best describes you"),
  specialization: z.array(z.string()).min(1, "Please select at least one specialization"),
  yearsInBusiness: z.string().min(1, "Please select how long you've been in real estate"),
  serviceAreas: z.string().min(1, "Please tell us where you work"),
  teamSize: z.string().optional(),
  yourStory: z.string().optional(),
  // 3. Listings & IDX
  wantIDX: z.string().min(1, "Please select an option"),
  currentMLS: z.string().optional(),
  listingFocus: z.string().min(1, "Please select your focus"),
  averageListingPrice: z.string().optional(),
  // 4. Lead Generation
  howLeadsArrive: z.array(z.string()).min(1, "Please select at least one"),
  currentCRM: z.string().optional(),
  wantLeadCapture: z.string().min(1, "Please select an option"),
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

const FORM_NAME = "real-estate-intake";

export default function RealEstateForm() {
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
      title="Real Estate Website Questionnaire"
      subtitle="Whether you're an independent agent, a team leader, or running a brokerage, we want to build a site that actually brings you business. Fill out what you can — skip what you don't know yet."
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
                <TextInput registration={register("contactName")} placeholder="e.g., Maria Santos" error={errors.contactName} />
              </FormField>
              <FormField label="Business or Team Name" required error={errors.businessName}>
                <TextInput registration={register("businessName")} placeholder="e.g., Santos Realty Group, Keller Williams Lakewood" error={errors.businessName} />
              </FormField>
              <FormField label="Email" required error={errors.email}>
                <TextInput registration={register("email")} type="email" placeholder="you@example.com" error={errors.email} />
              </FormField>
              <FormField label="Phone" required error={errors.phone}>
                <TextInput registration={register("phone")} type="tel" placeholder="(555) 123-4567" error={errors.phone} />
              </FormField>
            </div>
            <FormField label="Your role" error={errors.role}>
              <TextInput registration={register("role")} placeholder="e.g., Lead Agent, Broker/Owner, Team Lead, Marketing Director..." error={errors.role} />
            </FormField>
          </FormSection>

          {/* -- 2. YOUR BUSINESS -- */}
          <FormSection title="Your Business" description="Help us understand how you operate so we build a site that fits your workflow.">
            <FormField label="What best describes you?" required error={errors.agentType}>
              <RadioGroup
                registration={register("agentType")}
                error={errors.agentType}
                options={[
                  { value: "individual-agent", label: "Individual agent" },
                  { value: "team-group", label: "Team/group" },
                  { value: "brokerage", label: "Brokerage" },
                  { value: "property-management", label: "Property management company" },
                  { value: "investor", label: "Real estate investor" },
                  { value: "developer", label: "Developer" },
                  { value: "other", label: "Other" },
                ]}
              />
            </FormField>
            <FormField label="What types of real estate do you focus on?" required error={errors.specialization}>
              <CheckboxGroup
                registration={register("specialization")}
                error={errors.specialization}
                options={[
                  { value: "residential-sales", label: "Residential sales" },
                  { value: "commercial", label: "Commercial" },
                  { value: "luxury", label: "Luxury/high-end" },
                  { value: "new-construction", label: "New construction" },
                  { value: "land-lots", label: "Land/lots" },
                  { value: "multi-family", label: "Multi-family" },
                  { value: "vacation-rental", label: "Vacation/rental properties" },
                  { value: "foreclosures-auctions", label: "Foreclosures/auctions" },
                ]}
              />
            </FormField>
            <div className="grid md:grid-cols-2 gap-5">
              <FormField label="How long have you been in real estate?" required error={errors.yearsInBusiness}>
                <SelectInput
                  registration={register("yearsInBusiness")}
                  error={errors.yearsInBusiness}
                  options={[
                    { value: "not-yet", label: "Just getting started" },
                    { value: "under-1", label: "Less than a year" },
                    { value: "1-3", label: "1\u20133 years" },
                    { value: "3-5", label: "3\u20135 years" },
                    { value: "5-10", label: "5\u201310 years" },
                    { value: "10-20", label: "10\u201320 years" },
                    { value: "20-plus", label: "20+ years" },
                  ]}
                />
              </FormField>
              <FormField label="How many agents on your team?" error={errors.teamSize}>
                <TextInput registration={register("teamSize")} placeholder="e.g., Just me, 4 agents, 25+ agents" error={errors.teamSize} />
              </FormField>
            </div>
            <FormField label="What areas do you serve?" required error={errors.serviceAreas}>
              <TextArea
                registration={register("serviceAreas")}
                placeholder="e.g., 'Greater Denver metro, Boulder County, mountain communities'"
                rows={2}
                error={errors.serviceAreas}
              />
            </FormField>
            <FormField label="How did you get into real estate?" error={errors.yourStory}>
              <TextArea
                registration={register("yourStory")}
                placeholder="Career change? Family business? Built a team from scratch? Your story is what makes people choose you over the next agent — give us the real version..."
                rows={4}
                error={errors.yourStory}
              />
            </FormField>
          </FormSection>

          {/* -- 3. LISTINGS & IDX -- */}
          <FormSection title="Listings & IDX" description="IDX lets you show live MLS listings on your own website so buyers can search properties without leaving your site.">
            <FormField label="Do you want MLS/IDX property listings on your website?" required error={errors.wantIDX}>
              <RadioGroup
                registration={register("wantIDX")}
                error={errors.wantIDX}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                  { value: "not-sure", label: "Not sure what that is" },
                ]}
              />
            </FormField>
            <FormField label="What MLS board are you part of?" error={errors.currentMLS}>
              <TextInput
                registration={register("currentMLS")}
                placeholder="e.g., 'REcolorado, Bright MLS, CRMLS...'"
                error={errors.currentMLS}
              />
            </FormField>
            <FormField label="Is your business more buyer-focused, seller-focused, or both?" required error={errors.listingFocus}>
              <RadioGroup
                registration={register("listingFocus")}
                error={errors.listingFocus}
                options={[
                  { value: "buyer-focused", label: "Buyer-focused" },
                  { value: "seller-focused", label: "Seller-focused" },
                  { value: "both", label: "Both equally" },
                ]}
              />
            </FormField>
            <FormField label="What's your typical listing price range?" error={errors.averageListingPrice}>
              <TextInput
                registration={register("averageListingPrice")}
                placeholder="e.g., '$250K-$600K range'"
                error={errors.averageListingPrice}
              />
            </FormField>
          </FormSection>

          {/* -- 4. LEAD GENERATION -- */}
          <FormSection title="Lead Generation" description="Where are your leads coming from now, and how do you manage them?">
            <FormField label="Where do your leads come from?" required error={errors.howLeadsArrive}>
              <CheckboxGroup
                registration={register("howLeadsArrive")}
                error={errors.howLeadsArrive}
                options={[
                  { value: "zillow-trulia", label: "Zillow/Trulia" },
                  { value: "realtor-com", label: "Realtor.com" },
                  { value: "google-search", label: "Google search" },
                  { value: "social-media", label: "Social media" },
                  { value: "referrals", label: "Referrals" },
                  { value: "open-houses", label: "Open houses" },
                  { value: "paid-ads", label: "Paid ads" },
                  { value: "other", label: "Other" },
                ]}
              />
            </FormField>
            <FormField label="What CRM do you use?" error={errors.currentCRM}>
              <TextInput
                registration={register("currentCRM")}
                placeholder="e.g., 'Follow Up Boss, KVCore, LionDesk, none yet...'"
                error={errors.currentCRM}
              />
            </FormField>
            <FormField label="Do you want lead capture on the website?" required error={errors.wantLeadCapture}>
              <RadioGroup
                registration={register("wantLeadCapture")}
                error={errors.wantLeadCapture}
                options={[
                  { value: "yes-forms-popups", label: "Yes \u2014 forms and popups" },
                  { value: "yes-contact-only", label: "Yes \u2014 just a contact form" },
                  { value: "not-sure", label: "Not sure" },
                ]}
              />
            </FormField>
          </FormSection>

          {/* -- 5. WEBSITE FEATURES -- */}
          <FormSection title="Website Features" description="Check everything you'd want on the new site. Don't worry about what's realistic yet — just tell us the wish list.">
            <FormField label="What features do you need?" required error={errors.wantedFeatures}>
              <CheckboxGroup
                registration={register("wantedFeatures")}
                error={errors.wantedFeatures}
                options={[
                  { value: "idx-search", label: "IDX property search" },
                  { value: "featured-listings", label: "Featured listings" },
                  { value: "neighborhood-guides", label: "Neighborhood/area guides" },
                  { value: "market-reports", label: "Market reports/stats" },
                  { value: "mortgage-calculator", label: "Mortgage calculator" },
                  { value: "virtual-tours", label: "Virtual tours/3D walkthroughs" },
                  { value: "agent-bios", label: "Agent/team bios" },
                  { value: "testimonials", label: "Client testimonials" },
                  { value: "blog", label: "Blog or market updates" },
                  { value: "home-valuation", label: "Seller home valuation tool" },
                  { value: "buyer-resources", label: "Buyer resources page" },
                  { value: "newsletter", label: "Newsletter signup" },
                  { value: "contact-form", label: "Contact form" },
                  { value: "office-map", label: "Location/office map" },
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
                placeholder="List your Facebook, Instagram, LinkedIn, YouTube, TikTok, etc. Paste URLs if you have them."
                rows={3}
                error={errors.socialMedia}
              />
            </FormField>
            <FormField label="What's frustrating about your current setup?" error={errors.currentPainPoints}>
              <TextArea
                registration={register("currentPainPoints")}
                placeholder="e.g., 'My brokerage site doesn't rank on Google,' 'I'm paying for Zillow leads but have nowhere to send them,' 'My site looks like every other agent's template...'"
                rows={3}
                error={errors.currentPainPoints}
              />
            </FormField>
          </FormSection>

          {/* -- 7. BRANDING & STYLE -- */}
          <FormSection title="Branding & Style" description="How should your website look and feel to buyers and sellers?">
            <FormField label="What's the vibe of your brand?" required error={errors.brandVibe}>
              <TextArea
                registration={register("brandVibe")}
                placeholder="Describe it like you'd describe it to a friend: luxury and polished, warm and neighborhood-y, modern and data-driven, friendly and approachable, bold and high-energy..."
                rows={3}
                error={errors.brandVibe}
              />
            </FormField>
            <FormField label="Brand colors (if you have them)" error={errors.brandColors}>
              <TextInput registration={register("brandColors")} placeholder="e.g., Navy and gold, black and white, earth tones..." error={errors.brandColors} />
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
                  { value: "pro-headshots-property", label: "Pro headshots & property photos" },
                  { value: "some-professional", label: "Some professional" },
                  { value: "phone-only", label: "Phone photos only" },
                  { value: "need-photography", label: "Need photography" },
                ]}
              />
            </FormField>
            <FormField label="Any agent or brokerage websites you admire?" error={errors.competitors}>
              <TextArea
                registration={register("competitors")}
                placeholder="Paste URLs or describe what you like about them. Doesn't have to be real estate \u2014 we just want to know what catches your eye."
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
                placeholder="Upcoming listing launches, brokerage rebrands, specific integrations you need, anything at all..."
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
