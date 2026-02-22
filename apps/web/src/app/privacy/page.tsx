import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How AltStore collects, uses, and protects your personal data in compliance with GDPR and EU law.",
};

const LAST_UPDATED = "21 February 2026";
const CONTACT_EMAIL = "privacy@altstore.eu";
const CONTROLLER = "AltStore EU S.L.";
const CONTROLLER_ADDRESS = "Calle Gran Vía 28, 28013 Madrid, Spain";

const PrivacyPolicyPage = () => (
  <div className="mx-4 py-16 md:mx-16 md:py-24 lg:mx-24 xl:mx-32">
    <div className="mx-auto max-w-3xl">
      <LegalHeader
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="We collect as little as possible, store it safely, and never sell it. This policy explains exactly what we do and why."
        lastUpdated={LAST_UPDATED}
      />

      <div className="section-divider my-10" />

      <LegalBody>
        <Section title="1. Who We Are">
          <p>
            AltStore is operated by <strong>{CONTROLLER}</strong>, {CONTROLLER_ADDRESS}{" "}
            (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). We are the data controller
            responsible for your personal data under the EU General Data Protection Regulation
            (GDPR) and applicable Spanish and EU data protection law.
          </p>
          <p>
            Contact our Data Protection Officer (DPO) at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Section>

        <Section title="2. Data We Collect and Why">
          <SubSection title="2.1 Browsing the Marketplace (no account required)">
            <DataTable
              rows={[
                {
                  data: "Hashed IP address (SHA-256 + monthly rotating salt)",
                  purpose: "Rate-limiting and abuse prevention",
                  basis: "Legitimate interests (Art. 6(1)(f) GDPR)",
                  retention: "90 days",
                },
                {
                  data: "User-agent string",
                  purpose: "Platform compatibility metrics",
                  basis: "Legitimate interests (Art. 6(1)(f) GDPR)",
                  retention: "90 days",
                },
                {
                  data: "Country (derived from IP, not stored with IP)",
                  purpose: "Aggregate regional download statistics",
                  basis: "Legitimate interests (Art. 6(1)(f) GDPR)",
                  retention: "90 days",
                },
              ]}
            />
            <p className="mt-4">
              We never store raw IP addresses. Every IP is hashed with a rotating salt before
              persistence; the plaintext IP is discarded immediately after hashing.
            </p>
          </SubSection>

          <SubSection title="2.2 Registered Consumer Accounts">
            <DataTable
              rows={[
                {
                  data: "Email address",
                  purpose: "Account authentication and critical service notifications",
                  basis: "Contract performance (Art. 6(1)(b) GDPR)",
                  retention: "Until account deletion + 30 days",
                },
                {
                  data: "OAuth provider ID (e.g. Google sub)",
                  purpose: "Federated sign-in",
                  basis: "Contract performance (Art. 6(1)(b) GDPR)",
                  retention: "Until account deletion + 30 days",
                },
                {
                  data: "Download history (linked to user ID, not IP)",
                  purpose: "Re-download capability and support",
                  basis: "Contract performance (Art. 6(1)(b) GDPR)",
                  retention: "Until account deletion",
                },
              ]}
            />
          </SubSection>

          <SubSection title="2.3 Developer Accounts">
            <DataTable
              rows={[
                {
                  data: "Name, email, country, legal entity type",
                  purpose: "Developer identity and DMA compliance verification",
                  basis:
                    "Contract performance (Art. 6(1)(b) GDPR) + Legal obligation (Art. 6(1)(c))",
                  retention: "Duration of account + 5 years (tax law)",
                },
                {
                  data: "EU VAT number (where applicable)",
                  purpose: "Tax compliance and DMA business verification",
                  basis: "Legal obligation (Art. 6(1)(c) GDPR)",
                  retention: "10 years (EU accounting directives)",
                },
              ]}
            />
          </SubSection>
        </Section>

        <Section title="3. Cookies and Tracking">
          <p>
            AltStore uses <strong>no third-party advertising or analytics cookies</strong>. We set a
            single first-party session cookie strictly necessary for authenticated sessions (
            <code>next-auth.session-token</code>). No consent banner is required for this cookie
            under ePrivacy Directive Art. 5(3) because it is strictly necessary.
          </p>
          <p>
            We do not use Google Analytics, Meta Pixel, or any fingerprinting technology. We do not
            participate in real-time bidding or audience profiling.
          </p>
        </Section>

        <Section title="4. Data Sharing and Processors">
          <p>
            We do not sell your data. We share data only with the following sub-processors, all of
            whom are contractually bound to GDPR-compliant data processing agreements (DPAs):
          </p>
          <ul>
            <li>
              <strong>Supabase Inc.</strong> — hosted PostgreSQL database (EU region: Frankfurt,
              Germany). Standard Contractual Clauses (SCCs) in place.
            </li>
            <li>
              <strong>Cloudflare Inc.</strong> — R2 object storage for APK binaries. SCCs in place.
              Files are encrypted at rest and served via signed, time-limited URLs.
            </li>
            <li>
              <strong>VirusTotal (Google LLC)</strong> — APK hash submission for malware scanning.
              Only the SHA-256 hash of the binary is transmitted; no user data is sent. SCCs in
              place.
            </li>
            <li>
              <strong>Upstash Inc.</strong> — Redis queue for background jobs. No personal data
              stored in queue payloads.
            </li>
          </ul>
          <p>
            We may disclose data to competent EU authorities (e.g. Agencia Española de Protección de
            Datos) where required by law or court order.
          </p>
        </Section>

        <Section title="5. International Transfers">
          <p>
            All primary data processing occurs within the European Economic Area (EEA). Where
            sub-processors are headquartered outside the EEA (e.g. Cloudflare, VirusTotal),
            transfers are safeguarded by European Commission Standard Contractual Clauses (SCCs)
            pursuant to Art. 46(2)(c) GDPR. You may request copies of applicable SCCs by writing to{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Section>

        <Section title="6. Data Retention">
          <ul>
            <li>
              Download logs (hashed IP, user-agent, country): deleted after <strong>90 days</strong>
              .
            </li>
            <li>
              Consumer account data: retained until account deletion, then purged within 30 days.
            </li>
            <li>
              Developer account data: retained for the duration of the account plus statutory
              accounting periods (5–10 years depending on jurisdiction).
            </li>
            <li>Security and moderation logs: 12 months, then aggregated and anonymised.</li>
          </ul>
          <p>
            Automated deletion jobs run nightly. You can verify the schedule in our open-source
            repository.
          </p>
        </Section>

        <Section title="7. Your Rights Under GDPR">
          <p>
            As a data subject in the EU/EEA you have the following rights, exercisable free of
            charge by contacting{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline">
              {CONTACT_EMAIL}
            </a>{" "}
            or via your account dashboard:
          </p>
          <ul>
            <li>
              <strong>Right of access (Art. 15):</strong> obtain a copy of your personal data.
            </li>
            <li>
              <strong>Right to rectification (Art. 16):</strong> correct inaccurate data.
            </li>
            <li>
              <strong>Right to erasure / &ldquo;right to be forgotten&rdquo; (Art. 17):</strong>{" "}
              request deletion of your data where no legal retention obligation applies.
            </li>
            <li>
              <strong>Right to restriction (Art. 18):</strong> limit how we process your data.
            </li>
            <li>
              <strong>Right to data portability (Art. 20):</strong> receive your data in a
              structured, machine-readable format (JSON).
            </li>
            <li>
              <strong>Right to object (Art. 21):</strong> object to processing based on legitimate
              interests.
            </li>
            <li>
              <strong>Rights related to automated decision-making (Art. 22):</strong> we do not
              engage in solely automated decision-making with legal effects.
            </li>
          </ul>
          <p>
            We will respond within <strong>30 days</strong>. You also have the right to lodge a
            complaint with your national supervisory authority. In Spain: Agencia Española de
            Protección de Datos (AEPD),{" "}
            <a
              href="https://www.aepd.es"
              className="text-accent underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.aepd.es
            </a>
            .
          </p>
          <p>
            For the full description of your GDPR rights and how to exercise them, see our dedicated{" "}
            <a href="/gdpr" className="text-accent underline">
              GDPR Rights page
            </a>
            .
          </p>
        </Section>

        <Section title="8. Security">
          <p>
            We implement appropriate technical and organisational measures including: TLS 1.3 in
            transit; AES-256 encryption at rest for all stored files; IP hashing before persistence;
            role-based access control; automated security scanning of all uploaded binaries; and
            regular penetration testing. Despite these measures no system is perfectly secure — if
            you discover a vulnerability, please report it responsibly to{" "}
            <a href="mailto:security@altstore.eu" className="text-accent underline">
              security@altstore.eu
            </a>
            .
          </p>
        </Section>

        <Section title="9. Children">
          <p>
            AltStore is not directed at children under 16. We do not knowingly collect personal data
            from anyone under 16. If you believe a child has provided us with personal data, contact
            us immediately at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline">
              {CONTACT_EMAIL}
            </a>{" "}
            and we will delete it promptly.
          </p>
        </Section>

        <Section title="10. Changes to This Policy">
          <p>
            We will notify registered users of material changes by email at least 30 days before
            they take effect. The &ldquo;Last updated&rdquo; date at the top of this page reflects
            the most recent revision. Continued use of the platform after the effective date
            constitutes acceptance of the updated policy.
          </p>
        </Section>

        <Section title="11. Contact">
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

const SubSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <h3 className="text-sm font-semibold text-zinc-300">{title}</h3>
    {children}
  </div>
);

interface DataRow {
  data: string;
  purpose: string;
  basis: string;
  retention: string;
}

const DataTable = ({ rows }: { rows: DataRow[] }) => (
  <div className="overflow-x-auto rounded-xl border border-zinc-800">
    <table className="w-full min-w-[600px] text-xs">
      <thead>
        <tr className="border-b border-zinc-800">
          {["Data", "Purpose", "Legal Basis", "Retention"].map((h) => (
            <th
              key={h}
              className="px-4 py-3 text-left font-semibold uppercase tracking-wider text-zinc-500"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-zinc-800/60">
        {rows.map((row, i) => (
          <tr key={i} className="align-top">
            <td className="px-4 py-3 text-zinc-300">{row.data}</td>
            <td className="px-4 py-3 text-zinc-400">{row.purpose}</td>
            <td className="px-4 py-3 text-zinc-400">{row.basis}</td>
            <td className="px-4 py-3 text-zinc-400">{row.retention}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PrivacyPolicyPage;
