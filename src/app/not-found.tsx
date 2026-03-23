import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto text-center py-24 px-4 space-y-6">
      <div className="w-20 h-20 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto">
        <svg
          className="w-10 h-10 text-brand-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-brand-600 uppercase tracking-wide">
          404
        </p>
        <h1 className="text-2xl font-bold text-gray-900">Page not found</h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          This page doesn&apos;t exist or the link may have changed.
          <br />
          If you were looking for a project intake form, start here:
        </p>
      </div>

      <Link
        href="/q/wizard"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white text-sm font-medium rounded-xl hover:bg-brand-700 transition-colors"
      >
        <svg
          className="w-4 h-4"
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
        Start the intake form
      </Link>

      <p className="text-xs text-gray-400">
        Or go back to the{" "}
        <Link href="/" className="text-brand-600 hover:text-brand-700 underline">
          home page
        </Link>
      </p>
    </div>
  );
}
