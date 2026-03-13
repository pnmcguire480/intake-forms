import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "pnmcguire4@gmail.com";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formName, data } = body as {
      formName: string;
      data: Record<string, unknown>;
    };

    if (!formName || !data) {
      return NextResponse.json(
        { error: "Missing formName or data" },
        { status: 400 }
      );
    }

    // Extract common fields for indexed columns
    const contactName =
      (data.contactName as string) ||
      (data.fullName as string) ||
      "Unknown";
    const email = (data.email as string) || "";
    const phone = (data.phone as string) || null;
    const businessName =
      (data.businessName as string) ||
      (data.orgName as string) ||
      (data.nameOrBusiness as string) ||
      null;

    // Save to database
    await db.submission.create({
      data: {
        formType: formName,
        contactName,
        email,
        phone,
        businessName,
        data: data as object,
      },
    });

    // Format email body
    const lines = Object.entries(data)
      .filter(([, v]) => v !== undefined && v !== null && v !== "")
      .map(([key, value]) => {
        const label = key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (s) => s.toUpperCase());
        const val = Array.isArray(value) ? value.join(", ") : String(value);
        return `**${label}:** ${val}`;
      })
      .join("\n\n");

    const subject = `New ${formName.replace("-intake", "")} intake from ${contactName}`;

    // Send email
    if (process.env.RESEND_API_KEY) {
      await getResend().emails.send({
        from: process.env.RESEND_FROM_EMAIL || "Intake Forms <onboarding@resend.dev>",
        to: [NOTIFY_EMAIL],
        subject,
        text: `New submission: ${formName}\n\n${lines.replace(/\*\*/g, "")}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e40af; border-bottom: 2px solid #dbeafe; padding-bottom: 8px;">
              ${subject}
            </h2>
            ${Object.entries(data)
              .filter(([, v]) => v !== undefined && v !== null && v !== "")
              .map(([key, value]) => {
                const label = key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (s) => s.toUpperCase());
                const val = Array.isArray(value)
                  ? value.join(", ")
                  : String(value);
                return `
                  <div style="margin-bottom: 12px;">
                    <strong style="color: #374151;">${label}</strong><br/>
                    <span style="color: #6b7280;">${val}</span>
                  </div>`;
              })
              .join("")}
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin-top: 24px;"/>
            <p style="color: #9ca3af; font-size: 12px;">
              Submitted via intake-forms &bull; ${new Date().toLocaleString()}
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { error: "Submission failed" },
      { status: 500 }
    );
  }
}
