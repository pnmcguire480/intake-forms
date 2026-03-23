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
  // 2. Your Products
  whatYouSell: z.string().min(10, "Please tell us a bit more about what you sell"),
  productCount: z.string().min(1, "Please select a product count"),
  productType: z.string().min(1, "Please select a product type"),
  targetAudience: z.string().min(1, "Please describe who's buying from you"),
  priceRange: z.string().optional(),
  uniqueSellingPoint: z.string().optional(),
  // 3. How You Sell Now
  currentPlatforms: z.array(z.string()).min(1, "Please select at least one"),
  currentPlatformNotes: z.string().optional(),
  monthlySalesVolume: z.string().min(1, "Please select your sales volume"),
  biggestChallenge: z.string().optional(),
  // 4. Store Features
  wantedFeatures: z.array(z.string()).min(1, "Please select at least one feature"),
  paymentMethods: z.array(z.string()).min(1, "Please select at least one payment method"),
  // 5. Shipping & Fulfillment
  shippingComplexity: z.string().min(1, "Please select a shipping option"),
  fulfillmentMethod: z.string().min(1, "Please select a fulfillment method"),
  returnPolicy: z.string().optional(),
  // 6. Current Online Presence
  hasExistingSite: z.string().min(1, "Please select an option"),
  existingSiteUrl: z.string().optional(),
  socialMedia: z.string().optional(),
  currentPainPoints: z.string().optional(),
  // 7. Branding & Style
  brandVibe: z.string().min(1, "Please describe your brand vibe"),
  brandColors: z.string().optional(),
  hasLogo: z.string().min(1, "Please select an option"),
  hasProductPhotos: z.string().min(1, "Please select an option"),
  competitors: z.string().optional(),
  // 8. Timeline & Budget
  timeline: z.string().min(1, "Please select a timeline"),
  budget: z.string().min(1, "Please select a budget range"),
  additionalNotes: z.string().optional(),
  _hp_website: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const FORM_NAME = "ecommerce-intake";

export default function EcommerceForm() {
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
      title="E-Commerce Website Questionnaire"
      subtitle="Tell us about your products, how you sell, and what your dream online store looks like. Fill out what you can — don't stress about getting every detail perfect."
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
                <TextInput registration={register("contactName")} placeholder="e.g., Sarah Johnson" error={errors.contactName} />
              </FormField>
              <FormField label="Email" required error={errors.email}>
                <TextInput registration={register("email")} type="email" placeholder="you@example.com" error={errors.email} />
              </FormField>
              <FormField label="Phone" required error={errors.phone}>
                <TextInput registration={register("phone")} type="tel" placeholder="(555) 123-4567" error={errors.phone} />
              </FormField>
              <FormField label="Business / Store Name" required error={errors.businessName}>
                <TextInput registration={register("businessName")} placeholder="e.g., Bright Thread Co." error={errors.businessName} />
              </FormField>
            </div>
            <FormField label="Your role" error={errors.role}>
              <TextInput registration={register("role")} placeholder="e.g., Owner, Founder, Marketing Director..." error={errors.role} />
            </FormField>
          </FormSection>

          {/* ── 2. YOUR PRODUCTS ── */}
          <FormSection title="Your Products" description="Help us understand what you're selling and who you're selling it to.">
            <FormField label="What do you sell? Tell us about your products." required error={errors.whatYouSell}>
              <TextArea
                registration={register("whatYouSell")}
                placeholder="e.g., 'Handmade ceramic mugs, wholesale coffee beans, custom pet portraits...'"
                rows={4}
                error={errors.whatYouSell}
              />
            </FormField>
            <div className="grid md:grid-cols-2 gap-5">
              <FormField label="How many products will you list?" required error={errors.productCount}>
                <SelectInput
                  registration={register("productCount")}
                  error={errors.productCount}
                  options={[
                    { value: "1-10", label: "1\u201310 products" },
                    { value: "11-50", label: "11\u201350 products" },
                    { value: "51-200", label: "51\u2013200 products" },
                    { value: "201-1000", label: "201\u20131,000 products" },
                    { value: "1000+", label: "1,000+ products" },
                  ]}
                />
              </FormField>
              <FormField label="What type of products?" required error={errors.productType}>
                <RadioGroup
                  registration={register("productType")}
                  error={errors.productType}
                  options={[
                    { value: "physical", label: "Physical products" },
                    { value: "digital", label: "Digital downloads" },
                    { value: "services", label: "Services" },
                    { value: "subscriptions", label: "Subscriptions" },
                    { value: "mix", label: "A mix of the above" },
                  ]}
                />
              </FormField>
            </div>
            <FormField label="Who's buying from you?" required error={errors.targetAudience}>
              <TextArea
                registration={register("targetAudience")}
                placeholder="e.g., 'Women 25-45 who love handmade home decor,' 'Small business owners who need bulk supplies,' 'Dog parents who want custom everything...'"
                rows={3}
                error={errors.targetAudience}
              />
            </FormField>
            <FormField label="Typical price range" error={errors.priceRange}>
              <TextInput registration={register("priceRange")} placeholder="e.g., '$15\u2013$80' or '$200\u2013$2,000 per project'" error={errors.priceRange} />
            </FormField>
            <FormField label="What makes your products different from competitors?" error={errors.uniqueSellingPoint}>
              <TextArea
                registration={register("uniqueSellingPoint")}
                placeholder="e.g., 'Everything is made to order with sustainably sourced materials,' 'We're the only ones who offer same-day custom engraving...'"
                rows={3}
                error={errors.uniqueSellingPoint}
              />
            </FormField>
          </FormSection>

          {/* ── 3. HOW YOU SELL NOW ── */}
          <FormSection title="How You Sell Now" description="Where are you currently selling, and what's working (or not)?">
            <FormField label="Where are you selling right now?" required error={errors.currentPlatforms}>
              <CheckboxGroup
                registration={register("currentPlatforms")}
                error={errors.currentPlatforms}
                options={[
                  { value: "shopify", label: "Shopify" },
                  { value: "woocommerce", label: "WooCommerce" },
                  { value: "etsy", label: "Etsy" },
                  { value: "amazon", label: "Amazon" },
                  { value: "ebay", label: "eBay" },
                  { value: "facebook-marketplace", label: "Facebook Marketplace" },
                  { value: "instagram-shop", label: "Instagram Shop" },
                  { value: "in-person", label: "In-person only" },
                  { value: "not-yet", label: "Not selling yet" },
                  { value: "other", label: "Other" },
                ]}
              />
            </FormField>
            <FormField label="If 'Other,' tell us where" error={errors.currentPlatformNotes}>
              <TextInput registration={register("currentPlatformNotes")} placeholder="e.g., TikTok Shop, local flea markets, my own WordPress site..." error={errors.currentPlatformNotes} />
            </FormField>
            <FormField label="Monthly sales volume" required error={errors.monthlySalesVolume}>
              <SelectInput
                registration={register("monthlySalesVolume")}
                error={errors.monthlySalesVolume}
                options={[
                  { value: "starting", label: "Just starting out" },
                  { value: "under-50", label: "Under 50 orders/mo" },
                  { value: "50-200", label: "50\u2013200 orders/mo" },
                  { value: "200-1000", label: "200\u20131,000 orders/mo" },
                  { value: "1000+", label: "1,000+ orders/mo" },
                ]}
              />
            </FormField>
            <FormField label="What's the biggest headache with selling right now?" error={errors.biggestChallenge}>
              <TextArea
                registration={register("biggestChallenge")}
                placeholder="e.g., 'Managing inventory across Etsy and my website is a nightmare,' 'I spend all day answering DMs instead of making products,' 'My checkout is clunky and people abandon their carts...'"
                rows={3}
                error={errors.biggestChallenge}
              />
            </FormField>
          </FormSection>

          {/* ── 4. STORE FEATURES ── */}
          <FormSection title="Store Features" description="What does your dream online store need to do?">
            <FormField label="Check everything you want in your store" required error={errors.wantedFeatures}>
              <CheckboxGroup
                registration={register("wantedFeatures")}
                error={errors.wantedFeatures}
                options={[
                  { value: "search-filtering", label: "Product search & filtering" },
                  { value: "reviews-ratings", label: "Customer reviews & ratings" },
                  { value: "wishlists", label: "Wishlists" },
                  { value: "discount-codes", label: "Discount codes & promotions" },
                  { value: "subscriptions", label: "Subscription / recurring orders" },
                  { value: "inventory-tracking", label: "Inventory tracking" },
                  { value: "multi-currency", label: "Multi-currency" },
                  { value: "abandoned-cart", label: "Abandoned cart recovery" },
                  { value: "variant-selectors", label: "Size / color / variant selectors" },
                  { value: "product-comparison", label: "Product comparison" },
                  { value: "gift-cards", label: "Gift cards" },
                  { value: "loyalty-rewards", label: "Loyalty / rewards program" },
                  { value: "newsletter", label: "Newsletter signup" },
                ]}
              />
            </FormField>
            <FormField label="Payment methods you need" required error={errors.paymentMethods}>
              <CheckboxGroup
                registration={register("paymentMethods")}
                error={errors.paymentMethods}
                options={[
                  { value: "credit-debit", label: "Credit / debit cards" },
                  { value: "paypal", label: "PayPal" },
                  { value: "apple-google-pay", label: "Apple Pay / Google Pay" },
                  { value: "bnpl", label: "Buy now pay later (Afterpay, Klarna)" },
                  { value: "bank-transfer", label: "Bank transfer" },
                  { value: "crypto", label: "Crypto" },
                  { value: "other", label: "Other" },
                ]}
              />
            </FormField>
          </FormSection>

          {/* ── 5. SHIPPING & FULFILLMENT ── */}
          <FormSection title="Shipping & Fulfillment" description="How do your products get to your customers?">
            <FormField label="What kind of shipping do you need?" required error={errors.shippingComplexity}>
              <RadioGroup
                registration={register("shippingComplexity")}
                error={errors.shippingComplexity}
                options={[
                  { value: "digital-only", label: "No shipping (digital products only)" },
                  { value: "flat-rate", label: "Flat rate shipping" },
                  { value: "carrier-calculated", label: "Carrier-calculated rates (UPS, USPS, FedEx)" },
                  { value: "free-over-x", label: "Free shipping over a certain amount" },
                  { value: "international", label: "International shipping needed" },
                  { value: "not-sure", label: "Not sure yet" },
                ]}
              />
            </FormField>
            <FormField label="How do you fulfill orders?" required error={errors.fulfillmentMethod}>
              <RadioGroup
                registration={register("fulfillmentMethod")}
                error={errors.fulfillmentMethod}
                options={[
                  { value: "self-ship", label: "I ship from home or my own warehouse" },
                  { value: "dropshipping", label: "Dropshipping" },
                  { value: "3pl", label: "Third-party fulfillment (3PL)" },
                  { value: "mix", label: "A mix of the above" },
                  { value: "not-sure", label: "Not sure yet" },
                ]}
              />
            </FormField>
            <FormField label="What's your return/exchange policy?" error={errors.returnPolicy}>
              <TextArea
                registration={register("returnPolicy")}
                placeholder="e.g., '30-day returns, buyer pays return shipping,' 'No returns on custom items,' 'We haven't figured this out yet...'"
                rows={3}
                error={errors.returnPolicy}
              />
            </FormField>
          </FormSection>

          {/* ── 6. CURRENT ONLINE PRESENCE ── */}
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
                placeholder="List your Instagram, TikTok, Facebook, Pinterest, etc. Paste URLs if you have them."
                rows={3}
                error={errors.socialMedia}
              />
            </FormField>
            <FormField label="What's NOT working about your current online setup?" error={errors.currentPainPoints}>
              <TextArea
                registration={register("currentPainPoints")}
                placeholder="e.g., 'My site looks outdated and I'm embarrassed to share it,' 'Customers message me on Instagram because they can't figure out how to order,' 'I have no idea if my SEO is working...'"
                rows={3}
                error={errors.currentPainPoints}
              />
            </FormField>
          </FormSection>

          {/* ── 7. BRANDING & STYLE ── */}
          <FormSection title="Branding & Style" description="How should your store look and feel?">
            <FormField label="Describe your brand vibe" required error={errors.brandVibe}>
              <TextArea
                registration={register("brandVibe")}
                placeholder="Describe it like you'd describe it to a friend: minimalist and clean, bold and colorful, earthy and handmade, luxury and polished, playful and fun..."
                rows={3}
                error={errors.brandVibe}
              />
            </FormField>
            <FormField label="Brand colors (if you have them)" error={errors.brandColors}>
              <TextInput registration={register("brandColors")} placeholder="e.g., Sage green and cream, black and gold, bright coral..." error={errors.brandColors} />
            </FormField>
            <FormField label="Do you have a logo?" required error={errors.hasLogo}>
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
            <FormField label="What about product photos?" required error={errors.hasProductPhotos}>
              <RadioGroup
                registration={register("hasProductPhotos")}
                error={errors.hasProductPhotos}
                options={[
                  { value: "professional", label: "Professional product photos" },
                  { value: "good-phone", label: "Good phone photos" },
                  { value: "no-photos", label: "No photos yet" },
                  { value: "need-help", label: "Need photography help" },
                ]}
              />
            </FormField>
            <FormField label="Any online stores you admire or want yours to feel like?" error={errors.competitors}>
              <TextArea
                registration={register("competitors")}
                placeholder="Paste URLs or describe what you like about them. Even if they sell totally different stuff \u2014 we want to know what catches your eye."
                rows={3}
                error={errors.competitors}
              />
            </FormField>
          </FormSection>

          {/* ── 8. TIMELINE & BUDGET ── */}
          <FormSection title="Timeline & Budget">
            <div className="grid md:grid-cols-2 gap-5">
              <FormField label="When do you need the store?" required error={errors.timeline}>
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
                    { value: "under2k", label: "Under $2,000" },
                    { value: "2k-5k", label: "$2,000 \u2013 $5,000" },
                    { value: "5k-10k", label: "$5,000 \u2013 $10,000" },
                    { value: "10k-20k", label: "$10,000 \u2013 $20,000" },
                    { value: "20k+", label: "$20,000+" },
                    { value: "unsure", label: "Not sure yet" },
                  ]}
                />
              </FormField>
            </div>
            <FormField label="Anything else we should know?" error={errors.additionalNotes}>
              <TextArea
                registration={register("additionalNotes")}
                placeholder="Upcoming product launches, seasonal rushes we should plan for, integrations you need, things you hate on other stores, anything at all..."
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
