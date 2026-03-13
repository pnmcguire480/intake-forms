import Link from "next/link";

const categories = [
  {
    slug: "restaurant",
    label: "Restaurant & Food",
    description: "Restaurants, cafes, bars, catering, food trucks",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    color: "bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100 hover:border-orange-300",
    iconBg: "bg-orange-100",
  },
  {
    slug: "small-business",
    label: "Small Business",
    description: "Service providers, local shops, professional firms",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    ),
    color: "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 hover:border-blue-300",
    iconBg: "bg-blue-100",
  },
  {
    slug: "ecommerce",
    label: "E-Commerce",
    description: "Online stores, product catalogs, digital goods",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
      />
    ),
    color: "bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300",
    iconBg: "bg-emerald-100",
  },
  {
    slug: "portfolio",
    label: "Portfolio & Personal",
    description: "Creatives, freelancers, personal brands, resumes",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    ),
    color: "bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100 hover:border-purple-300",
    iconBg: "bg-purple-100",
  },
  {
    slug: "nonprofit",
    label: "Nonprofit & Organization",
    description: "Churches, charities, community groups, associations",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    ),
    color: "bg-pink-50 text-pink-600 border-pink-200 hover:bg-pink-100 hover:border-pink-300",
    iconBg: "bg-pink-100",
  },
  {
    slug: "real-estate",
    label: "Real Estate",
    description: "Agents, brokers, property management, listings",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    ),
    color: "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100 hover:border-amber-300",
    iconBg: "bg-amber-100",
  },
  {
    slug: "healthcare",
    label: "Healthcare & Medical",
    description: "Doctors, dentists, clinics, therapists, wellness",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0zM12 10v4m-2-2h4"
      />
    ),
    color: "bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:border-red-300",
    iconBg: "bg-red-100",
  },
  {
    slug: "construction",
    label: "Construction & Home Services",
    description: "Contractors, plumbers, electricians, landscaping",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
    ),
    color: "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100 hover:border-yellow-300",
    iconBg: "bg-yellow-100",
  },
  {
    slug: "fitness",
    label: "Fitness & Wellness",
    description: "Gyms, trainers, yoga studios, spas, coaches",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    ),
    color: "bg-lime-50 text-lime-600 border-lime-200 hover:bg-lime-100 hover:border-lime-300",
    iconBg: "bg-lime-100",
  },
  {
    slug: "events",
    label: "Events & Weddings",
    description: "Venues, planners, photographers, DJs, florists",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    ),
    color: "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-200 hover:bg-fuchsia-100 hover:border-fuchsia-300",
    iconBg: "bg-fuchsia-100",
  },
  {
    slug: "custom",
    label: "Other / Custom",
    description: "Don\u2019t see your category? Start here",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
      />
    ),
    color: "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 hover:border-gray-300",
    iconBg: "bg-gray-100",
  },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Hero */}
      <div className="text-center space-y-4 pt-4 md:pt-8">
        <div className="w-16 h-16 bg-brand-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-brand-200">
          <svg
            className="w-8 h-8 text-white"
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
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Project Intake
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Ready to build your website? Select the category that best fits your
          project and fill out a quick questionnaire so we can get started.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <svg
            className="w-4 h-4 text-green-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
          </svg>
          Your responses are sent directly via email &mdash; nothing is stored.
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/q/${cat.slug}`}
            className={`group relative flex items-start gap-4 p-5 rounded-2xl border-2 transition-all duration-200 ${cat.color}`}
          >
            <div
              className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${cat.iconBg}`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {cat.icon}
              </svg>
            </div>
            <div className="min-w-0">
              <h2 className="font-semibold text-gray-900 group-hover:text-gray-950">
                {cat.label}
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">{cat.description}</p>
            </div>
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ))}
      </div>

      {/* Bottom note */}
      <p className="text-center text-sm text-gray-400 pb-4">
        Each questionnaire takes about 5&ndash;10 minutes to complete.
      </p>
    </div>
  );
}
