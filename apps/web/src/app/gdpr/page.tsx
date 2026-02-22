import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GDPR — Your Data Rights",
  description:
    "Understand and exercise your rights under the EU General Data Protection Regulation (GDPR) when using AltStore.",
};

const LAST_UPDATED = "21 February 2026";
const CONTACT_EMAIL = "privacy@altstore.eu";
const CONTROLLER = "AltStore EU S.L.";
const CONTROLLER_ADDRESS = "Calle Gran Vía 28, 28013 Madrid, Spain";

const GdprPage = () => (
  <div className="mx-4 py-16 md:mx-16 md:py-24 lg:mx-24 xl:mx-32">
    <div className="mx-auto max-w-3xl">
      <LegalHeader
        eyebrow="Legal"
        title="Your Data Rights"
        subtitle="The GDPR gives you meaningful control over your personal data. This page explains each right and exactly how to exercise it with AltStore."
        lastUpdated={LAST_UPDATED}
      />

      <div className="section-divider my-10" />

      {/* Rights cards grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {RIGHTS.map((right) => (
          <RightCard key={right.article} {...right} />
        ))}
      </div>

      <div className="section-divider my-10" />

      <LegalBody>
        <Section title="How to Exercise Your Rights">
          <p>
            You can exercise any of the rights above at any time using any of these channels — we do
            not require a specific form:
          </p>
          <ul>
            <li>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline">
                {CONTACT_EMAIL}
              </a>{" "}
              — include &ldquo;GDPR Request&rdquo; in the subject line and specify which right(s)
              you are invoking.
            </li>
            <li>
              <strong>Account dashboard:</strong> registered users can download a data export or
              initiate account deletion directly from Settings → Privacy.
            </li>
            <li>
              <strong>Post:</strong> {CONTROLLER}, {CONTROLLER_ADDRESS}. Please include a copy of a
              government-issued ID for verification (we will not retain it after verification).
            </li>
          </ul>
          <p>
            We will acknowledge your request within <strong>72 hours</strong> and fulfil it within{" "}
            <strong>30 calendar days</strong>. Where a request is complex or numerous, we may extend
            this by a further two months and will notify you of the extension within the initial
            30-day period (Art. 12(3) GDPR).
          </p>
          <p>
            All requests are free of charge unless manifestly unfounded or excessive (Art. 12(5)
            GDPR).
          </p>
        </Section>

        <Section title="Identity Verification">
          <p>
            To protect your data, we must verify your identity before fulfilling access,
            portability, or erasure requests. For account holders, verification is done by
            confirming ownership of the registered email address via a one-time link. For
            non-account users, we may ask for additional information to locate your data (e.g.
            approximate download date and country).
          </p>
          <p>
            We never store identity documents. Any documents provided are used solely for
            verification and deleted within 7 days.
          </p>
        </Section>

        <Section title="What We Store — and What We Don&rsquo;t">
          <p>
            We are deliberately minimal in our data collection. Key points that affect your rights:
          </p>
          <ul>
            <li>
              <strong>IP addresses are never stored in plaintext.</strong> We hash IPs using SHA-256
              with a monthly rotating salt immediately upon receipt. We cannot retrieve your IP from
              our database, and thus cannot provide it in a data export.
            </li>
            <li>
              <strong>Download logs are deleted after 90 days</strong> in an automated nightly job.
              If your request arrives after this window, that data no longer exists.
            </li>
            <li>
              <strong>We do not profile users</strong> or build behavioural models. There is no
              ad-tech stack, no cookie-based tracking, and no third-party analytics.
            </li>
            <li>
              <strong>Developer account data</strong> is subject to statutory retention obligations
              (Spanish tax law, EU accounting directives) that may prevent full erasure during the
              mandatory retention period. We will inform you if this applies to your request.
            </li>
          </ul>
        </Section>

        <Section title="Data Portability — Export Format">
          <p>
            Where portability applies (Art. 20 GDPR), we export your data as a structured{" "}
            <strong>JSON file</strong> containing:
          </p>
          <ul>
            <li>Account profile (email, name, account type, creation date)</li>
            <li>Download history linked to your account (app name, version, date, country)</li>
            <li>Developer account details and app submissions (for developer accounts)</li>
          </ul>
          <p>
            The export does not include hashed IPs (irreversible) or data already deleted per our
            retention schedule.
          </p>
        </Section>

        <Section title="Automated Decision-Making and Profiling">
          <p>
            AltStore does <strong>not</strong> engage in solely automated decision-making (including
            profiling) that produces legal effects or similarly significantly affects you, as
            described in Art. 22 GDPR.
          </p>
          <p>
            Our automated virus-scanning pipeline makes decisions about <em>applications</em>, not
            about users. No user-facing decision is made solely by automated means without human
            review.
          </p>
        </Section>

        <Section title="Consent and Withdrawal">
          <p>
            We do not rely on consent as a legal basis for any processing that is necessary for
            operating the service (we use contract performance and legitimate interests instead).
            The only context in which we may request consent is for optional communications such as
            product update newsletters.
          </p>
          <p>
            You may withdraw any consent given at any time by emailing{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline">
              {CONTACT_EMAIL}
            </a>{" "}
            or via your account settings. Withdrawal does not affect the lawfulness of processing
            before withdrawal.
          </p>
        </Section>

        <Section title="Right to Lodge a Complaint">
          <p>
            If you believe we have not handled your personal data lawfully, you have the right to
            lodge a complaint with the competent supervisory authority. As a Spanish-registered
            company, our lead supervisory authority is:
          </p>
          <div className="rounded-xl border border-zinc-800 p-5">
            <p className="font-semibold text-zinc-200">
              Agencia Española de Protección de Datos (AEPD)
            </p>
            <p className="mt-1">
              C/ Jorge Juan, 6, 28001 Madrid, Spain
              <br />
              <a
                href="https://www.aepd.es"
                className="text-accent underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.aepd.es
              </a>
              {" · "}
              <a href="tel:+34901100099" className="text-accent underline">
                +34 901 100 099
              </a>
            </p>
          </div>
          <p>
            You may also contact the supervisory authority in your EU member state of habitual
            residence. A list of all EU data protection authorities is available at{" "}
            <a
              href="https://edpb.europa.eu/about-edpb/about-edpb/members_en"
              className="text-accent underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              edpb.europa.eu
            </a>
            .
          </p>
          <p>
            We would always prefer to resolve your concern directly first — please{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline">
              contact us
            </a>{" "}
            before filing a complaint.
          </p>
        </Section>

        <Section title="Contact Our DPO">
          <p>
            Data Protection Officer:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline">
              {CONTACT_EMAIL}
            </a>
            <br />
            {CONTROLLER}
            <br />
            {CONTROLLER_ADDRESS}
          </p>
        </Section>
      </LegalBody>
    </div>
  </div>
);

/* ─────────────────────────── Rights cards data ───────────────────────────── */

interface Right {
  article: string;
  title: string;
  description: string;
  howTo: string;
  icon: React.ReactNode;
}

const ShieldIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 12c0 6.627 5.373 12 12 12s12-5.373 12-12a12 12 0 00-.598-3.75M15 3.036A11.959 11.959 0 0120.402 6"
    />
  </svg>
);
const EyeIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const PencilIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
    />
  </svg>
);
const TrashIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    />
  </svg>
);
const PauseIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
  </svg>
);
const ArrowUpTrayIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
    />
  </svg>
);
const HandIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l-.001-1.012a.24.24 0 01.065-.166l.948-.948a3.75 3.75 0 000-5.304l-1.5-1.5a3.75 3.75 0 00-5.304 0l-.167.166"
    />
  </svg>
);

const RIGHTS: Right[] = [
  {
    article: "Art. 15",
    title: "Right of Access",
    description:
      "You can request a copy of all personal data we hold about you, along with information on how it is used, where it came from, and who it is shared with.",
    howTo: "Email us or use Settings → Privacy → Download My Data.",
    icon: <EyeIcon />,
  },
  {
    article: "Art. 16",
    title: "Right to Rectification",
    description:
      "If any personal data we hold about you is inaccurate or incomplete, you have the right to have it corrected without undue delay.",
    howTo: "Update directly in account Settings, or email us for data you cannot edit yourself.",
    icon: <PencilIcon />,
  },
  {
    article: "Art. 17",
    title: "Right to Erasure",
    description:
      "The &ldquo;right to be forgotten&rdquo;. You can request deletion of your personal data where it is no longer necessary, you withdraw consent, or we have no legal basis to retain it.",
    howTo: "Email us or use Settings → Privacy → Delete My Account.",
    icon: <TrashIcon />,
  },
  {
    article: "Art. 18",
    title: "Right to Restriction",
    description:
      "You can ask us to pause processing of your data — for example while you contest its accuracy, or while we assess an objection you have raised.",
    howTo: "Email us specifying the processing you wish to restrict.",
    icon: <PauseIcon />,
  },
  {
    article: "Art. 20",
    title: "Right to Portability",
    description:
      "Where processing is based on your consent or on a contract, you can receive your data in a structured, commonly used, machine-readable format (JSON) to transfer to another service.",
    howTo: "Email us or use Settings → Privacy → Export My Data.",
    icon: <ArrowUpTrayIcon />,
  },
  {
    article: "Art. 21",
    title: "Right to Object",
    description:
      "You can object at any time to processing of your personal data based on legitimate interests. We will cease processing unless we can demonstrate compelling legitimate grounds that override your interests.",
    howTo: "Email us specifying the processing activity you object to.",
    icon: <HandIcon />,
  },
  {
    article: "Art. 22",
    title: "Automated Decisions",
    description:
      "You have the right not to be subject to decisions based solely on automated processing that produce significant effects on you. AltStore does not make such decisions about users.",
    howTo: "Contact us if you believe an automated decision has affected you.",
    icon: <ShieldIcon />,
  },
  {
    article: "Art. 7(3)",
    title: "Withdraw Consent",
    description:
      "Where we rely on consent to process your data (e.g. optional newsletters), you can withdraw that consent at any time without affecting prior lawful processing.",
    howTo: "Use the unsubscribe link in any marketing email, or email our DPO.",
    icon: <ShieldIcon />,
  },
];

const RightCard = ({ article, title, description, howTo, icon }: Right) => (
  <div className="rounded-xl border border-zinc-800 bg-white/[0.02] p-6 transition-colors duration-200 hover:border-zinc-700">
    <div className="mb-4 flex items-start justify-between gap-3">
      <div
        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
        style={{ background: "rgba(30,255,0,0.08)", color: "#1eff00" }}
      >
        {icon}
      </div>
      <span className="rounded-full border border-zinc-700 px-2.5 py-0.5 font-mono text-xs text-zinc-500">
        {article}
      </span>
    </div>
    <h3 className="font-display mb-2 text-base font-semibold text-white">{title}</h3>
    <p
      className="mb-3 text-sm leading-6 text-zinc-400"
      dangerouslySetInnerHTML={{ __html: description }}
    />
    <p className="text-xs text-zinc-600">
      <span className="font-semibold text-zinc-500">How to exercise: </span>
      {howTo}
    </p>
  </div>
);

/* ─────────────────────────── Shared primitives ───────────────────────────── */

const LegalHeader = ({
  eyebrow,
  title,
  subtitle,
  lastUpdated,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
}) => (
  <div>
    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">{eyebrow}</p>
    <h1 className="font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
      {title}
    </h1>
    <p className="mt-4 max-w-xl text-base leading-7 text-zinc-400">{subtitle}</p>
    <p className="mt-4 text-xs text-zinc-600">Last updated: {lastUpdated}</p>
  </div>
);

const LegalBody = ({ children }: { children: React.ReactNode }) => (
  <div className="legal-prose space-y-10 text-sm leading-7 text-zinc-400">{children}</div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="space-y-4">
    <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
    {children}
  </section>
);

export default GdprPage;
