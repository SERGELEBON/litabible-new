import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/**
 * POST /api/contact
 *
 * Body: { name, email, subject, message, captchaToken? }
 *
 * Validates the payload with zod. Since this sandbox has no Cloudflare
 * Turnstile keys configured and no DB to persist messages, we just log the
 * submission to the server log and return `{ success: true }`. The frontend
 * treats this as "message received" and shows a thank-you toast.
 *
 * When you wire up real email delivery / DB persistence / captcha verification,
 * this handler is the single place to change.
 */

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(120),
  email: z.string().trim().toLowerCase().email("Invalid email address.").max(254),
  subject: z.string().trim().min(2, "Subject must be at least 2 characters.").max(200),
  message: z.string().trim().min(5, "Message must be at least 5 characters.").max(10_000),
  captchaToken: z.string().trim().optional(),
});

export async function POST(req: NextRequest) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Validation failed.",
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 400 }
    );
  }

  // OK — we have a clean, validated submission. Log it server-side.
  const { name, email, subject, message, captchaToken } = parsed.data;
  const tokenPreview = captchaToken ? `${captchaToken.slice(0, 8)}…` : "(none)";
  console.log("[contact] submission:", {
    name,
    email,
    subject,
    messageLength: message.length,
    captchaToken: tokenPreview,
    receivedAt: new Date().toISOString(),
  });

  // No DB / no email backend configured — return success so the client can
  // display a thank-you toast. (Wire up real delivery in a follow-up task.)
  return NextResponse.json(
    {
      success: true,
      message: "Message received. Thank you for reaching out.",
      receivedAt: new Date().toISOString(),
    },
    { status: 200 }
  );
}
