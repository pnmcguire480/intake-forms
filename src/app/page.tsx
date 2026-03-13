export default function Home() {
  return (
    <div className="max-w-xl mx-auto text-center py-20 space-y-4">
      <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto">
        <svg
          className="w-8 h-8 text-brand-600"
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
      <h1 className="text-2xl font-bold text-gray-900">Project Intake</h1>
      <p className="text-gray-500">
        This site hosts private project questionnaires. If you received a link
        to a specific form, please use that link to access it.
      </p>
      <p className="text-sm text-gray-400">
        No public forms are available here.
      </p>
    </div>
  );
}
