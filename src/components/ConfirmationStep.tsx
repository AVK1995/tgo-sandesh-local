import { LEGAL } from "@/app/_legal/legal";
import { CALL_NAME } from "@/lib/call-copy";
import { WhatsAppGlyph } from "./sdp";
import "./ConfirmationStep.css";

/**
 * THE BRIDGE · hero of /thank-you
 *
 * Cal's completed booking lands here, but the call is not treated as
 * confirmed until the buyer has messaged on WhatsApp. So the hero's single job
 * is to get that message sent: headline, Sandesh's face, two lines, one button.
 *
 * The WhatsApp number is LEGAL's phone, never a literal here: one number for
 * the footer, the policies and this button, so they can never disagree.
 *
 * MOBILE: the button stays in the hero AND a second copy docks to the bottom
 * of the viewport from first paint. No observer, no timer, no entrance
 * transition, so it is visible the moment the page is. The page reserves its
 * height (see ConfirmationStep.css).
 *
 * A Server Component: it is a link and some text.
 */

const WHATSAPP_TEXT = "Hey, I've booked a call. What's the next step to confirm my call?";

const whatsappUrl = (phone: string, text: string) =>
  `https://api.whatsapp.com/send/?${new URLSearchParams({
    phone: phone.replace(/\D/g, ""),
    text,
    type: "phone_number",
    app_absent: "0",
  })}`;

type Avatar = { src: string; alt: string; width: number; height: number };

export default function ConfirmationStep({ avatar }: { avatar: Avatar }) {
  return (
    <section className="book-section book-dark cs">
      <div className="book-wrap book-narrow">
        <h1 className="cs-h1">
          <span className="cs-alert">WAIT!</span> Your {CALL_NAME} Has Not Been Confirmed Yet…
        </h1>

        <div className="cs-avatar">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avatar.src} alt={avatar.alt} width={avatar.width} height={avatar.height} />
        </div>

        <p className="cs-copy">
          You’ve just <strong>completed the first step</strong>.
        </p>
        <p className="cs-copy">
          Connect on WhatsApp to{" "}
          <strong>get the next steps to confirm your {CALL_NAME}</strong>.
        </p>

        <div className="cs-cta">
          <WhatsAppCta />
        </div>
      </div>

      {/* The phone-only docked copy. The in-hero button above stays at every
          width; this one is hidden from 768px up. */}
      <div className="cs-dock">
        <WhatsAppCta />
      </div>
    </section>
  );
}

function WhatsAppCta() {
  return (
    <a
      className="cs-btn"
      href={whatsappUrl(LEGAL.phoneHref, WHATSAPP_TEXT)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsAppGlyph size={22} />
      <span>Click Here</span>
    </a>
  );
}
