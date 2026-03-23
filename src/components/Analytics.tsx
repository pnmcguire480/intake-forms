import Script from "next/script";

/**
 * Plausible Analytics — privacy-first, no cookies, ~1KB.
 * Only loads when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set.
 * Self-hosted: also set NEXT_PUBLIC_PLAUSIBLE_HOST.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  const host =
    process.env.NEXT_PUBLIC_PLAUSIBLE_HOST || "https://plausible.io";

  return (
    <Script
      defer
      data-domain={domain}
      src={`${host}/js/script.js`}
      strategy="afterInteractive"
    />
  );
}
