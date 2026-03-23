import type { Metadata } from "next";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Intake — Tell Us About Your Project",
  description:
    "Answer a few questions about your business and goals so we can put together the right plan for your website.",
  robots: { index: false, follow: false },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/images/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/images/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/images/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/images/favicon/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Project Intake — Tell Us About Your Project",
    description:
      "Answer a few questions about your business and goals so we can put together the right plan for your website.",
    type: "website",
    locale: "en_US",
    siteName: "Project Intake",
  },
  twitter: {
    card: "summary",
    title: "Project Intake — Tell Us About Your Project",
    description:
      "Answer a few questions about your business and goals so we can put together the right plan for your website.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Analytics />
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 no-underline">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <span className="font-semibold text-gray-800 text-lg">
                Project Intake
              </span>
            </a>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <svg
                className="w-3.5 h-3.5 text-success"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
              </svg>
              <span>Secure Form</span>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 px-4 py-8">{children}</main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 px-6 py-6">
          <div className="max-w-3xl mx-auto text-center space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-sm text-gray-500">
              <svg
                className="w-4 h-4 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Your responses are sent directly and are not stored on this site.
            </div>
            <p className="text-xs text-gray-400">
              This form is for authorized recipients only.
            </p>
            <p className="text-xs text-gray-300 pt-2">
              &copy; {new Date().getFullYear()} McGuire Digital
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
