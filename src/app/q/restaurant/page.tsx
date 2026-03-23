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
  // Contact
  businessName: z.string().min(1, "Business name is required"),
  contactName: z.string().min(1, "Your name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  role: z.string().optional(),
  // About the restaurant
  cuisineType: z.string().min(1, "Please select your cuisine type"),
  businessType: z.string().min(1, "Please select your business type"),
  yearsOpen: z.string().min(1, "Please select how long you've been open"),
  locationCount: z.string().min(1, "Please select number of locations"),
  locationAddress: z.string().optional(),
  seatingCapacity: z.string().optional(),
  hoursOfOperation: z.string().optional(),
  yourStory: z.string().optional(),
  // Menu & ordering
  menuStyle: z.string().min(1, "Please select a menu preference"),
  menuHighlights: z.string().optional(),
  dietaryOptions: z.array(z.string()).optional(),
  howCustomersOrder: z.array(z.string()).min(1, "Please select at least one"),
  orderingPlatforms: z.string().optional(),
  wantOnlineOrdering: z.string().min(1, "Please select an option"),
  deliveryZones: z.string().optional(),
  leadTimes: z.string().optional(),
  // Features
  wantedFeatures: z.array(z.string()).min(1, "Please select at least one feature"),
  // Current presence
  hasExistingSite: z.string().min(1, "Please select an option"),
  existingSiteUrl: z.string().optional(),
  socialMedia: z.string().optional(),
  currentPainPoints: z.string().optional(),
  // Branding
  brandColors: z.string().optional(),
  brandVibe: z.string().min(1, "Please describe your vibe"),
  competitors: z.string().optional(),
  hasPhotos: z.string().min(1, "Please select an option"),
  hasLogo: z.string().min(1, "Please select an option"),
  // Timeline & budget
  timeline: z.string().min(1, "Please select a timeline"),
  budget: z.string().min(1, "Please select a budget range"),
  additionalNotes: z.string().optional(),
  _hp_website: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const FORM_NAME = "restaurant-intake";

export default function RestaurantForm() {
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
      title="Restaurant & Food Service Questionnaire"
      subtitle="Tell us about your restaurant, your food, and how you'd like the world to find you. Fill out what you can \u2014 don't stress about getting it perfect."
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

          {/* ── 1. CONTACT ── */}
          <FormSection title="About You" description="The basics so we can get back to you.">
            <div className="grid md:grid-cols-2 gap-5">
              <FormField label="Restaurant / Business Name" required error={errors.businessName}>
                <TextInput registration={register("businessName")} placeholder="e.g., Mario's Trattoria" error={errors.businessName} />
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
            <FormField label="Your role at the business" error={errors.role}>
              <TextInput registration={register("role")} placeholder="e.g., Owner, Manager, Marketing Director..." error={errors.role} />
            </FormField>
          </FormSection>

          {/* ── 2. ABOUT THE RESTAURANT ── */}
          <FormSection title="About Your Restaurant" description="Help us get a feel for who you are and what makes your place special.">
            <div className="grid md:grid-cols-2 gap-5">
              <FormField label="What type of cuisine?" required error={errors.cuisineType}>
                <SelectInput
                  registration={register("cuisineType")}
                  error={errors.cuisineType}
                  options={[
                    { value: "american", label: "American" },
                    { value: "italian", label: "Italian" },
                    { value: "mexican", label: "Mexican / Latin" },
                    { value: "asian", label: "Asian (Chinese, Japanese, Thai, etc.)" },
                    { value: "indian", label: "Indian / South Asian" },
                    { value: "mediterranean", label: "Mediterranean / Middle Eastern" },
                    { value: "seafood", label: "Seafood" },
                    { value: "bbq", label: "BBQ / Smokehouse" },
                    { value: "soul-food", label: "Soul Food / Southern" },
                    { value: "pizza", label: "Pizza" },
                    { value: "fusion", label: "Fusion / Modern" },
                    { value: "cafe", label: "Cafe / Bakery / Desserts" },
                    { value: "bar", label: "Bar / Pub / Brewery" },
                    { value: "finedining", label: "Fine Dining" },
                    { value: "fastcasual", label: "Fast Casual" },
                    { value: "food-truck", label: "Food Truck / Pop-Up" },
                    { value: "other", label: "Other" },
                  ]}
                />
              </FormField>
              <FormField label="What kind of business is this?" required error={errors.businessType}>
                <SelectInput
                  registration={register("businessType")}
                  error={errors.businessType}
                  options={[
                    { value: "dine-in", label: "Dine-in restaurant" },
                    { value: "takeout-only", label: "Takeout / delivery only" },
                    { value: "both", label: "Dine-in + takeout" },
                    { value: "catering", label: "Catering company" },
                    { value: "food-truck", label: "Food truck" },
                    { value: "bakery", label: "Bakery / dessert shop" },
                    { value: "bar", label: "Bar / lounge" },
                    { value: "ghost-kitchen", label: "Ghost kitchen" },
                    { value: "other", label: "Something else" },
                  ]}
                />
              </FormField>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <FormField label="How long have you been open?" required error={errors.yearsOpen}>
                <SelectInput
                  registration={register("yearsOpen")}
                  error={errors.yearsOpen}
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
              <FormField label="Number of locations" required error={errors.locationCount}>
                <RadioGroup
                  registration={register("locationCount")}
                  error={errors.locationCount}
                  options={[
                    { value: "1", label: "Single location" },
                    { value: "2-5", label: "2\u20135 locations" },
                    { value: "5+", label: "5+ locations" },
                  ]}
                />
              </FormField>
            </div>
            <FormField label="Address or location info for the website" error={errors.locationAddress}>
              <TextInput registration={register("locationAddress")} placeholder="e.g., 123 Main St, Anytown, OH 43001" error={errors.locationAddress} />
            </FormField>
            <div className="grid md:grid-cols-2 gap-5">
              <FormField label="Approximate seating capacity" error={errors.seatingCapacity}>
                <TextInput registration={register("seatingCapacity")} placeholder="e.g., 60 indoor, 20 patio" error={errors.seatingCapacity} />
              </FormField>
              <FormField label="Hours of operation" error={errors.hoursOfOperation}>
                <TextInput registration={register("hoursOfOperation")} placeholder="e.g., Tue\u2013Sun 11am\u201310pm, closed Mon" error={errors.hoursOfOperation} />
              </FormField>
            </div>
            <FormField label="Tell us your story" error={errors.yourStory}>
              <TextArea
                registration={register("yourStory")}
                placeholder="How did this place get started? Family tradition, lifelong dream, something else entirely? This is what makes people connect with you \u2014 give us the real story..."
                rows={5}
                error={errors.yourStory}
              />
            </FormField>
          </FormSection>

          {/* ── 3. MENU & ORDERING ── */}
          <FormSection title="Menu & Ordering" description="How people see your food and how they get it.">
            <FormField label="How should your menu be displayed on the website?" required error={errors.menuStyle}>
              <RadioGroup
                registration={register("menuStyle")}
                error={errors.menuStyle}
                options={[
                  { value: "digital", label: "Interactive digital menu (text + photos on the site)" },
                  { value: "pdf", label: "PDF download (upload your existing menu)" },
                  { value: "photos", label: "Photos of each dish with descriptions" },
                  { value: "simple-list", label: "Simple text list with prices" },
                  { value: "unsure", label: "Not sure yet" },
                ]}
              />
            </FormField>
            <FormField label="What are your signature dishes or must-try items?" error={errors.menuHighlights}>
              <TextArea
                registration={register("menuHighlights")}
                placeholder="What do people rave about? What would you put front and center? e.g., 'Our smoked brisket, the loaded nachos, grandma's tiramisu...'"
                rows={3}
                error={errors.menuHighlights}
              />
            </FormField>
            <FormField label="Any dietary accommodations you want to highlight?" error={errors.dietaryOptions}>
              <CheckboxGroup
                registration={register("dietaryOptions")}
                error={errors.dietaryOptions}
                options={[
                  { value: "vegetarian", label: "Vegetarian options" },
                  { value: "vegan", label: "Vegan options" },
                  { value: "gluten-free", label: "Gluten-free options" },
                  { value: "halal", label: "Halal" },
                  { value: "kosher", label: "Kosher" },
                  { value: "allergy-info", label: "Allergy information posted" },
                  { value: "none", label: "None of these" },
                ]}
              />
            </FormField>
            <FormField label="How do customers currently order from you?" required error={errors.howCustomersOrder}>
              <CheckboxGroup
                registration={register("howCustomersOrder")}
                error={errors.howCustomersOrder}
                options={[
                  { value: "walk-in", label: "Walk in / dine in" },
                  { value: "phone", label: "Call to order" },
                  { value: "text", label: "Text to order" },
                  { value: "third-party", label: "DoorDash, Uber Eats, Grubhub, etc." },
                  { value: "own-website", label: "Through our current website" },
                  { value: "social", label: "Facebook / Instagram DMs" },
                  { value: "other", label: "Other" },
                ]}
              />
            </FormField>
            <FormField label="Which third-party platforms are you on?" error={errors.orderingPlatforms}>
              <TextInput registration={register("orderingPlatforms")} placeholder="e.g., DoorDash, Uber Eats, Toast, Square, Grubhub..." error={errors.orderingPlatforms} />
            </FormField>
            <FormField label="Do you want online ordering or reservations on the new website?" required error={errors.wantOnlineOrdering}>
              <RadioGroup
                registration={register("wantOnlineOrdering")}
                error={errors.wantOnlineOrdering}
                options={[
                  { value: "ordering", label: "Yes \u2014 online ordering" },
                  { value: "reservations", label: "Yes \u2014 reservations / table booking" },
                  { value: "both", label: "Both ordering and reservations" },
                  { value: "contact-only", label: "No \u2014 just phone/contact to order" },
                  { value: "unsure", label: "Not sure yet" },
                ]}
              />
            </FormField>
            <FormField label="Do you deliver? If so, what areas?" error={errors.deliveryZones}>
              <TextInput registration={register("deliveryZones")} placeholder="e.g., Within 10 miles of downtown, or 'No delivery'" error={errors.deliveryZones} />
            </FormField>
            <FormField label="Any lead times or advance ordering requirements?" error={errors.leadTimes}>
              <TextInput registration={register("leadTimes")} placeholder="e.g., Catering needs 48hr notice, party trays need 3 days..." error={errors.leadTimes} />
            </FormField>
          </FormSection>

          {/* ── 4. WEBSITE FEATURES ── */}
          <FormSection title="Website Features" description="What else should your website do besides show the menu?">
            <FormField label="Check everything you want on the site" required error={errors.wantedFeatures}>
              <CheckboxGroup
                registration={register("wantedFeatures")}
                error={errors.wantedFeatures}
                options={[
                  { value: "menu", label: "Online menu" },
                  { value: "ordering", label: "Online ordering / checkout" },
                  { value: "reservations", label: "Reservations / table booking" },
                  { value: "catering", label: "Catering request form" },
                  { value: "gallery", label: "Photo gallery" },
                  { value: "events", label: "Events calendar or private dining info" },
                  { value: "giftcards", label: "Gift cards" },
                  { value: "reviews", label: "Customer reviews / testimonials" },
                  { value: "blog", label: "Blog or news updates" },
                  { value: "careers", label: "Careers / job listings" },
                  { value: "loyalty", label: "Loyalty program or rewards" },
                  { value: "newsletter", label: "Email newsletter signup" },
                  { value: "location-map", label: "Map with directions" },
                  { value: "hours", label: "Hours of operation prominently displayed" },
                ]}
              />
            </FormField>
          </FormSection>

          {/* ── 5. CURRENT ONLINE PRESENCE ── */}
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
                placeholder="List your Facebook, Instagram, TikTok, Yelp, Google Business pages, etc. Paste URLs if you have them."
                rows={3}
                error={errors.socialMedia}
              />
            </FormField>
            <FormField label="What's NOT working about your current online setup?" error={errors.currentPainPoints}>
              <TextArea
                registration={register("currentPainPoints")}
                placeholder="e.g., 'People can't find our menu,' 'We keep getting calls asking for hours,' 'Our Facebook is doing all the work and it's not enough...'"
                rows={3}
                error={errors.currentPainPoints}
              />
            </FormField>
          </FormSection>

          {/* ── 6. BRANDING ── */}
          <FormSection title="Branding & Style" description="How should your website look and feel?">
            <FormField label="What's the vibe of your restaurant?" required error={errors.brandVibe}>
              <TextArea
                registration={register("brandVibe")}
                placeholder="Describe it like you'd describe it to a friend: warm and rustic, modern and sleek, family-friendly chaos, upscale date night, laid-back beach bar..."
                rows={3}
                error={errors.brandVibe}
              />
            </FormField>
            <FormField label="Brand colors (if you have them)" error={errors.brandColors}>
              <TextInput registration={register("brandColors")} placeholder="e.g., Red and gold, earth tones, black and white..." error={errors.brandColors} />
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
            <FormField label="Do you have professional photos of your food or restaurant?" required error={errors.hasPhotos}>
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
            <FormField label="Any restaurants whose websites you admire?" error={errors.competitors}>
              <TextArea
                registration={register("competitors")}
                placeholder="Paste URLs or describe what you like about them. Even if it's not the same type of food \u2014 we want to know what catches your eye."
                rows={3}
                error={errors.competitors}
              />
            </FormField>
          </FormSection>

          {/* ── 7. TIMELINE & BUDGET ── */}
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

          {/* ── 8. ANYTHING ELSE ── */}
          <FormSection title="Anything Else?">
            <FormField label="Anything else we should know?" error={errors.additionalNotes}>
              <TextArea
                registration={register("additionalNotes")}
                placeholder="Special requests, things you hate on other restaurant websites, upcoming events or seasonal menus we should plan for, anything at all..."
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
