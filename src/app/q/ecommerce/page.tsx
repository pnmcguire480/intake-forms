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
  businessName: z.string().min(1, "Business name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  whatYouSell: z.string().min(10, "Please describe what you sell"),
  productCount: z.string().min(1, "Please select an option"),
  targetAudience: z.string().min(1, "Please describe your target audience"),
  hasExistingSite: z.string().min(1, "Please select an option"),
  existingSiteUrl: z.string().optional(),
  currentPlatform: z.string().optional(),
  wantedFeatures: z.array(z.string()).min(1, "Please select at least one feature"),
  paymentMethods: z.array(z.string()).min(1, "Please select at least one payment method"),
  shippingNeeds: z.string().min(1, "Please select a shipping option"),
  brandStatus: z.string().min(1, "Please select an option"),
  competitors: z.string().optional(),
  timeline: z.string().min(1, "Please select a timeline"),
  budget: z.string().min(1, "Please select a budget range"),
  additionalNotes: z.string().optional(),
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
      subtitle="Help us understand your online store needs so we can build the right solution."
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

          <FormSection title="Contact Information" description="How can we reach you?">
            <div className="grid md:grid-cols-2 gap-5">
              <FormField label="Business / Store Name" required error={errors.businessName}>
                <TextInput registration={register("businessName")} placeholder="e.g., Bright Thread Co." error={errors.businessName} />
              </FormField>
              <FormField label="Your Name" required error={errors.contactName}>
                <TextInput registration={register("contactName")} placeholder="e.g., Jane Smith" error={errors.contactName} />
              </FormField>
              <FormField label="Email" required error={errors.email}>
                <TextInput registration={register("email")} type="email" placeholder="you@example.com" error={errors.email} />
              </FormField>
              <FormField label="Phone" required error={errors.phone}>
                <TextInput registration={register("phone")} type="tel" placeholder="(555) 123-4567" error={errors.phone} />
              </FormField>
            </div>
          </FormSection>

          <FormSection title="About Your Products">
            <FormField label="What do you sell?" required error={errors.whatYouSell}>
              <TextArea
                registration={register("whatYouSell")}
                placeholder="Describe your products — physical goods, digital products, services, subscriptions..."
                rows={4}
                error={errors.whatYouSell}
              />
            </FormField>
            <FormField label="How many products do you plan to list?" required error={errors.productCount}>
              <RadioGroup
                registration={register("productCount")}
                error={errors.productCount}
                options={[
                  { value: "1-10", label: "1-10 products" },
                  { value: "11-50", label: "11-50 products" },
                  { value: "51-200", label: "51-200 products" },
                  { value: "200+", label: "200+ products" },
                ]}
              />
            </FormField>
            <FormField label="Who is your target customer?" required error={errors.targetAudience}>
              <TextArea
                registration={register("targetAudience")}
                placeholder="e.g., Women 25-40 who are interested in sustainable fashion..."
                rows={3}
                error={errors.targetAudience}
              />
            </FormField>
          </FormSection>

          <FormSection title="Current Situation">
            <FormField label="Do you currently sell online?" required error={errors.hasExistingSite}>
              <RadioGroup
                registration={register("hasExistingSite")}
                error={errors.hasExistingSite}
                options={[
                  { value: "yes-website", label: "Yes, I have my own website" },
                  { value: "yes-marketplace", label: "Yes, on a marketplace (Etsy, Amazon, etc.)" },
                  { value: "yes-social", label: "Yes, through social media" },
                  { value: "no", label: "No, this is my first time selling online" },
                ]}
              />
            </FormField>
            <FormField label="Existing store URL (if applicable)" error={errors.existingSiteUrl}>
              <TextInput registration={register("existingSiteUrl")} placeholder="https://..." error={errors.existingSiteUrl} />
            </FormField>
            <FormField label="Current platform (if any)" error={errors.currentPlatform}>
              <TextInput registration={register("currentPlatform")} placeholder="e.g., Shopify, WooCommerce, Squarespace..." error={errors.currentPlatform} />
            </FormField>
          </FormSection>

          <FormSection title="Store Features" description="What does your online store need?">
            <FormField label="Desired features" required error={errors.wantedFeatures}>
              <CheckboxGroup
                registration={register("wantedFeatures")}
                error={errors.wantedFeatures}
                options={[
                  { value: "product-search", label: "Product search & filtering" },
                  { value: "variants", label: "Product variants (size, color, etc.)" },
                  { value: "reviews", label: "Customer reviews & ratings" },
                  { value: "wishlist", label: "Wishlist / Favorites" },
                  { value: "discount-codes", label: "Discount codes / Coupons" },
                  { value: "inventory", label: "Inventory management" },
                  { value: "email-marketing", label: "Email marketing integration" },
                  { value: "analytics", label: "Sales analytics / Dashboard" },
                  { value: "subscriptions", label: "Subscription / Recurring orders" },
                  { value: "gift-cards", label: "Gift cards" },
                  { value: "blog", label: "Blog / Content marketing" },
                  { value: "social-selling", label: "Social media selling integration" },
                ]}
              />
            </FormField>
            <FormField label="Payment methods needed" required error={errors.paymentMethods}>
              <CheckboxGroup
                registration={register("paymentMethods")}
                error={errors.paymentMethods}
                options={[
                  { value: "credit-card", label: "Credit / Debit cards" },
                  { value: "paypal", label: "PayPal" },
                  { value: "apple-pay", label: "Apple Pay / Google Pay" },
                  { value: "afterpay", label: "Buy Now Pay Later (Afterpay, Klarna)" },
                  { value: "crypto", label: "Cryptocurrency" },
                  { value: "bank-transfer", label: "Bank transfer" },
                ]}
              />
            </FormField>
            <FormField label="Shipping" required error={errors.shippingNeeds}>
              <RadioGroup
                registration={register("shippingNeeds")}
                error={errors.shippingNeeds}
                options={[
                  { value: "domestic", label: "Domestic only (US)" },
                  { value: "international", label: "Domestic + International" },
                  { value: "digital", label: "Digital products only (no shipping)" },
                  { value: "mixed", label: "Mix of physical and digital" },
                  { value: "unsure", label: "Not sure yet" },
                ]}
              />
            </FormField>
          </FormSection>

          <FormSection title="Branding">
            <FormField label="Do you have existing branding?" required error={errors.brandStatus}>
              <RadioGroup
                registration={register("brandStatus")}
                error={errors.brandStatus}
                options={[
                  { value: "full", label: "Yes — logo, colors, and fonts ready" },
                  { value: "partial", label: "Partial — I have a logo but need help with the rest" },
                  { value: "none", label: "No — I need branding help" },
                ]}
              />
            </FormField>
            <FormField label="Any stores you admire or want yours to look like?" error={errors.competitors}>
              <TextArea
                registration={register("competitors")}
                placeholder="Paste URLs or describe what you like about them"
                rows={3}
                error={errors.competitors}
              />
            </FormField>
          </FormSection>

          <FormSection title="Timeline & Budget">
            <FormField label="When do you need the store?" required error={errors.timeline}>
              <SelectInput
                registration={register("timeline")}
                error={errors.timeline}
                options={[
                  { value: "asap", label: "As soon as possible" },
                  { value: "1month", label: "Within 1 month" },
                  { value: "2-3months", label: "2-3 months" },
                  { value: "flexible", label: "Flexible / No rush" },
                ]}
              />
            </FormField>
            <FormField label="Budget Range" required error={errors.budget}>
              <SelectInput
                registration={register("budget")}
                error={errors.budget}
                options={[
                  { value: "under2k", label: "Under $2,000" },
                  { value: "2k-5k", label: "$2,000 - $5,000" },
                  { value: "5k-10k", label: "$5,000 - $10,000" },
                  { value: "10k-20k", label: "$10,000 - $20,000" },
                  { value: "20k+", label: "$20,000+" },
                  { value: "unsure", label: "Not sure yet" },
                ]}
              />
            </FormField>
          </FormSection>

          <FormSection title="Anything Else?">
            <FormField label="Additional notes or questions" error={errors.additionalNotes}>
              <TextArea
                registration={register("additionalNotes")}
                placeholder="Anything else you'd like us to know..."
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
