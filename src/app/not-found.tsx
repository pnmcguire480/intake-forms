import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto text-center py-20 space-y-4">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto">
        <svg
          className="w-8 h-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-900">Form Not Found</h1>
      <p className="text-gray-500">
        This form doesn&apos;t exist or the link may have changed. Please check
        that you have the correct URL.
      </p>
      <Link
        href="/"
        className="inline-block text-sm text-brand-600 hover:text-brand-700 font-medium"
      >
        Go to home page
      </Link>
    </div>
  );
}
