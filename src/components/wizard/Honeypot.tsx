"use client";

import { useFormContext } from "react-hook-form";

/**
 * Hidden honeypot field. Invisible to humans, tempting to bots.
 * If filled, the server silently discards the submission.
 */
export function Honeypot() {
  const { register } = useFormContext();

  return (
    <div
      aria-hidden="true"
      tabIndex={-1}
      style={{
        position: "absolute",
        left: "-9999px",
        top: "-9999px",
        opacity: 0,
        height: 0,
        overflow: "hidden",
      }}
    >
      <label htmlFor="_hp_website">Website</label>
      <input
        id="_hp_website"
        type="text"
        autoComplete="off"
        tabIndex={-1}
        {...register("_hp_website")}
      />
    </div>
  );
}
