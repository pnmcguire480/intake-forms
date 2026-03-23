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
  contactName: z.string().min(1, "Your name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  businessName: z.string().min(1, "Business name is required"),
  yearsInBusiness: z.string().min(1, "Please select how long you've been keeping bees"),
  numberOfHives: z.string().min(1, "Please select your hive count"),
  hiveLocations: z.string().min(1, "Please tell us where your hives are"),
  howStarted: z.string().optional(),
  products: z.array(z.string()).min(1, "Please select at least one product"),
  whereSelling: z.array(z.string()).min(1, "Please select at least one"),
  wantOnlineStore: z.string().min(1, "Please select an option"),
  memorableStory: z.string().optional(),
  whatMakesSpecial: z.string().optional(),
  visitorFeeling: z.string().optional(),
  wantedFeatures: z.array(z.string()).min(1, "Please select at least one feature"),
  hasExistingSite: z.string().min(1, "Please select an option"),
  existingSiteUrl: z.string().optional(),
  brandColors: z.string().optional(),
  designStyle: z.string().min(1, "Please select a style"),
  inspirationSites: z.string().optional(),
  timeline: z.string().min(1, "Please select a timeline"),
  budget: z.string().min(1, "Please select a budget range"),
  additionalNotes: z.string().optional(),
  _hp_website: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const FORM_NAME = "dad-beekeeping-intake";

export default function DadBeekeepingForm() {
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
      title="Beekeeping Website Questionnaire"
      subtitle="Tell us about your bees, your products, and your story — we'll build a website that does them justice."
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

          <FormSection title="About You" description="The basics so we can stay in touch.">
            <div className="grid md:grid-cols-2 gap-5">
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
          </FormSection>

          <FormSection title="Your Beekeeping Business" description="Help us understand the operation.">
            <FormField label="Business Name" required error={errors.businessName}>
              <TextInput registration={register("businessName")} placeholder="e.g., Smith Family Apiaries" error={errors.businessName} />
            </FormField>
            <div className="grid md:grid-cols-2 gap-5">
              <FormField label="How long have you been keeping bees?" required error={errors.yearsInBusiness}>
                <SelectInput
                  registration={register("yearsInBusiness")}
                  error={errors.yearsInBusiness}
                  options={[
                    { value: "just-starting", label: "Just getting started" },
                    { value: "1-5", label: "1\u20135 years" },
                    { value: "5-10", label: "5\u201310 years" },
                    { value: "10-20", label: "10\u201320 years" },
                    { value: "20-plus", label: "20+ years" },
                  ]}
                />
              </FormField>
              <FormField label="How many hives do you manage?" required error={errors.numberOfHives}>
                <SelectInput
                  registration={register("numberOfHives")}
                  error={errors.numberOfHives}
                  options={[
                    { value: "1-10", label: "1\u201310 hives" },
                    { value: "11-50", label: "11\u201350 hives" },
                    { value: "51-100", label: "51\u2013100 hives" },
                    { value: "100-plus", label: "100+ hives" },
                  ]}
                />
              </FormField>
            </div>
            <FormField label="Where are your hives located?" required error={errors.hiveLocations}>
              <TextInput registration={register("hiveLocations")} placeholder="e.g., Our farm in Lancaster County, plus two neighbor properties" error={errors.hiveLocations} />
            </FormField>
            <FormField label="What got you into beekeeping?" error={errors.howStarted}>
              <TextArea
                registration={register("howStarted")}
                placeholder="Was it a family tradition, a hobby that grew into something bigger, or maybe a fascination that started one day? We'd love to hear..."
                rows={6}
                error={errors.howStarted}
              />
            </FormField>
          </FormSection>

          <FormSection title="Your Products" description="What do you make and where do people find it?">
            <FormField label="What products do you offer?" required error={errors.products}>
              <CheckboxGroup
                registration={register("products")}
                error={errors.products}
                options={[
                  { value: "raw-honey", label: "Raw honey" },
                  { value: "infused-honey", label: "Infused / flavored honey" },
                  { value: "comb-honey", label: "Comb honey" },
                  { value: "beeswax-candles", label: "Beeswax candles" },
                  { value: "beeswax-wraps", label: "Beeswax wraps" },
                  { value: "pollen", label: "Bee pollen" },
                  { value: "propolis", label: "Propolis" },
                  { value: "royal-jelly", label: "Royal jelly" },
                  { value: "lip-balm-skincare", label: "Lip balm / skincare" },
                  { value: "soap", label: "Honey soap" },
                  { value: "other", label: "Other" },
                ]}
              />
            </FormField>
            <FormField label="Where do you currently sell?" required error={errors.whereSelling}>
              <CheckboxGroup
                registration={register("whereSelling")}
                error={errors.whereSelling}
                options={[
                  { value: "farmers-markets", label: "Farmers markets" },
                  { value: "online", label: "Online (website, Etsy, etc.)" },
                  { value: "local-stores", label: "Local stores or co-ops" },
                  { value: "restaurants", label: "Direct to restaurants or chefs" },
                  { value: "wholesale", label: "Wholesale / bulk" },
                  { value: "roadside", label: "Roadside stand or farm store" },
                  { value: "not-selling", label: "Not selling yet" },
                ]}
              />
            </FormField>
            <FormField label="Would you like to sell your products online through the website?" required error={errors.wantOnlineStore}>
              <RadioGroup
                registration={register("wantOnlineStore")}
                error={errors.wantOnlineStore}
                options={[
                  { value: "yes", label: "Yes \u2014 I'd like to sell online" },
                  { value: "maybe", label: "Maybe later" },
                  { value: "no", label: "No \u2014 just share information" },
                ]}
              />
            </FormField>
          </FormSection>

          <FormSection title="Your Bee Stories" description="This is what will make your website special. Don't hold back \u2014 talk to us like you'd talk to a friend.">
            <FormField label="Tell us a memorable story about your bees" error={errors.memorableStory}>
              <TextArea
                registration={register("memorableStory")}
                placeholder="Maybe a time a hive surprised you, a funny encounter with a swarm, your biggest harvest, or what you love most about being out there with the bees..."
                rows={8}
                error={errors.memorableStory}
              />
            </FormField>
            <FormField label="What makes your honey (or products) special?" error={errors.whatMakesSpecial}>
              <TextArea
                registration={register("whatMakesSpecial")}
                placeholder="What would you tell someone at a farmers market who asks why yours is different? Maybe it's the wildflowers, the location, the way you process it, or how long you've been perfecting it..."
                rows={6}
                error={errors.whatMakesSpecial}
              />
            </FormField>
            <FormField label="What do you want visitors to your website to feel?" error={errors.visitorFeeling}>
              <TextArea
                registration={register("visitorFeeling")}
                placeholder="Warm and homey? Impressed by the craft? Connected to nature? Hungry for honey? Just tell us in your own words..."
                rows={4}
                error={errors.visitorFeeling}
              />
            </FormField>
          </FormSection>

          <FormSection title="Website Features" description="What should the site be able to do?">
            <FormField label="What features do you want?" required error={errors.wantedFeatures}>
              <CheckboxGroup
                registration={register("wantedFeatures")}
                error={errors.wantedFeatures}
                options={[
                  { value: "product-catalog", label: "Product catalog with photos" },
                  { value: "online-store", label: "Online store / ordering" },
                  { value: "about-story", label: "Our story / About page" },
                  { value: "photo-gallery", label: "Photo gallery" },
                  { value: "blog", label: "Blog or seasonal updates" },
                  { value: "contact-form", label: "Contact form" },
                  { value: "location-map", label: "Location / farm map" },
                  { value: "recipes", label: "Recipes using honey" },
                  { value: "bee-facts", label: "Bee facts / education section" },
                  { value: "testimonials", label: "Customer testimonials" },
                ]}
              />
            </FormField>
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
            <FormField label="Existing Website URL (if you have one)" error={errors.existingSiteUrl}>
              <TextInput registration={register("existingSiteUrl")} placeholder="https://..." error={errors.existingSiteUrl} />
            </FormField>
          </FormSection>

          <FormSection title="Design & Style" description="How should the site look and feel?">
            <FormField label="Any brand colors in mind?" error={errors.brandColors}>
              <TextInput registration={register("brandColors")} placeholder="e.g., Honey gold, forest green, cream..." error={errors.brandColors} />
            </FormField>
            <FormField label="What style feels right?" required error={errors.designStyle}>
              <RadioGroup
                registration={register("designStyle")}
                error={errors.designStyle}
                options={[
                  { value: "rustic", label: "Rustic & natural" },
                  { value: "modern", label: "Clean & modern" },
                  { value: "homey", label: "Warm & homey" },
                  { value: "unsure", label: "Not sure \u2014 surprise me" },
                ]}
              />
            </FormField>
            <FormField label="Any websites you admire?" error={errors.inspirationSites}>
              <TextArea
                registration={register("inspirationSites")}
                placeholder="Paste URLs or describe what you like about them"
                rows={3}
                error={errors.inspirationSites}
              />
            </FormField>
          </FormSection>

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
              <FormField label="Budget Range" required error={errors.budget}>
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

          <FormSection title="Anything Else?">
            <FormField label="Anything else we should know?" error={errors.additionalNotes}>
              <TextArea
                registration={register("additionalNotes")}
                placeholder="Special requests, things you've seen on other websites that you love (or hate), anything at all..."
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
