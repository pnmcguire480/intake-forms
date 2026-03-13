export async function submitForm(formName: string, data: Record<string, unknown>) {
  // Flatten nested objects for Netlify Forms
  const flatData: Record<string, string> = {};
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      flatData[key] = value.join(", ");
    } else if (value !== undefined && value !== null) {
      flatData[key] = String(value);
    }
  }

  const body = new URLSearchParams({
    "form-name": formName,
    ...flatData,
  });

  const response = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error("Submission failed. Please try again.");
  }
}
