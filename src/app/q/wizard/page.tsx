"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { WizardShell } from "@/components/wizard/WizardShell";

function WizardWithParams() {
  const searchParams = useSearchParams();
  const categoryType = searchParams.get("type") ?? undefined;
  return <WizardShell categoryType={categoryType} />;
}

export default function WizardPage() {
  return (
    <Suspense>
      <WizardWithParams />
    </Suspense>
  );
}
