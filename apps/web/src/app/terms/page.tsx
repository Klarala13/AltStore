import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms and conditions governing your use of the AltStore EU alternative app marketplace.",
};

const LAST_UPDATED = "21 February 2026";
const CONTACT_EMAIL = "legal@altstore.eu";
const CONTROLLER = "AltStore EU S.L.";
const CONTROLLER_ADDRESS = "Calle Gran Vía 28, 28013 Madrid, Spain";

const TermsPage = () => (
  <div className="mx-4 py-16 md:mx-16 md:py-24 lg:mx-24 xl:mx-32">
    <div className="mx-auto max-w-3xl">
      <LegalHeader
        eyebrow="Legal"
        title="Terms of Service"
        subtitle="Please read these terms carefully before using AltStore. By accessing or using the platform you agree to be bound by them."
        lastUpdated={LAST_UPDATED}
      />

      <div className="section-divider my-10" />

      <LegalBody>
        <Section title="1. Parties and Acceptance">
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement
            between you (&ldquo;User&rdquo;, &ldquo;you&rdquo;) and <strong>{CONTROLLER}</strong>,{" "}
            {CONTROLLER_ADDRESS} (&ldquo;AltStore&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By
            accessing <strong>altstore.eu</strong> or any associated mobile application or API, you
            confirm that you are at least 16 years old, have the legal capacity to enter into
            contracts, and agree to these Terms and our{" "}
            <a href="/privacy" className="text-accent underline">
              Privacy Policy
            </a>
            .
          </p>
          <p>
            If you are using AltStore on behalf of a legal entity, you represent that you have the
            authority to bind that entity to these Terms.
          </p>
        </Section>

        <Section title="2. Description of the Service">
          <p>
            AltStore is a Digital Markets Act (DMA)-compliant alternative app marketplace that
            allows EU users to discover, download, and install applications distributed by
            third-party developers. AltStore operates as an intermediary platform as defined in
            Regulation (EU) 2022/1925 (Digital Markets Act) and Regulation (EU) 2022/2065 (Digital
            Services Act).
          </p>
          <p>
            We do not develop the applications distributed through the platform. Each application is
            the sole responsibility of its developer.
          </p>
        </Section>

        <Section title="3. User Accounts">
          <p>
            Creating an account is optional for browsing and downloading apps. An account is
            required to submit applications as a developer.
          </p>
          <ul>
            <li>You are responsible for maintaining the confidentiality of your credentials.</li>
            <li>
              You must notify us immediately at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline">
                {CONTACT_EMAIL}
              </a>{" "}
              if you suspect unauthorised access.
            </li>
            <li>You must not share, sell, or transfer your account.</li>
            <li>You must not create accounts using automated means or false identities.</li>
            <li>We reserve the right to suspend or terminate accounts that violate these Terms.</li>
          </ul>
        </Section>

        <Section title="4. Acceptable Use">
          <p>You agree not to use AltStore to:</p>
          <ul>
            <li>
              Upload, distribute, or facilitate the distribution of malware, spyware, or any
              application that causes harm to devices or users.
            </li>
            <li>
              Circumvent, disable, or interfere with security-related features of the platform.
            </li>
            <li>
              Scrape, harvest, or systematically extract data from the platform without express
              written consent.
            </li>
            <li>
              Impersonate any person, organisation, or brand, or misrepresent your affiliation with
              any entity.
            </li>
            <li>
              Engage in any activity that violates applicable EU or member-state law, including but
              not limited to the GDPR, DSA, DMA, and Spanish data protection law.
            </li>
            <li>
              Attempt to reverse-engineer, decompile, or disassemble any part of the platform
              software (except as permitted by applicable law).
            </li>
            <li>
              Use the platform to distribute illegal content as defined by Regulation (EU) 2022/2065
              Art. 3(h).
            </li>
          </ul>
        </Section>

        <Section title="5. Developer Terms">
          <p>
            By submitting an application to AltStore, developers additionally agree to the
            following:
          </p>

          <SubSection title="5.1 Content Responsibility">
            <p>
              You represent and warrant that: (a) you own or have all necessary rights and licences
              to distribute the application; (b) the application does not infringe any third-party
              intellectual property rights; (c) the application does not contain malicious code; (d)
              the application&rsquo;s privacy policy URL is accurate and accessible; and (e) the
              application complies with all applicable laws in EU member states where it is made
              available.
            </p>
          </SubSection>

          <SubSection title="5.2 Mandatory Security Scanning">
            <p>
              All submitted binaries are scanned via VirusTotal before publication. Any binary
              triggering one or more positive engine detections will be automatically rejected. You
              may not attempt to circumvent or obfuscate binaries to avoid detection. Doing so will
              result in immediate and permanent account termination and may be reported to relevant
              authorities.
            </p>
          </SubSection>

          <SubSection title="5.3 DMA Compliance">
            <p>
              Developers who are gatekeepers or operate services covered by the DMA agree not to use
              AltStore to circumvent obligations imposed on them under Regulation (EU) 2022/1925.
            </p>
          </SubSection>

          <SubSection title="5.4 Licence Grant">
            <p>
              By submitting an application you grant AltStore a non-exclusive, royalty-free,
              worldwide licence to: host, store, reproduce, and distribute the binary and associated
              metadata solely for the purpose of operating the marketplace; display screenshots and
              icons in search results, category pages, and promotional materials; and generate QR
              codes and signed download URLs for end users.
            </p>
          </SubSection>

          <SubSection title="5.5 Takedown Compliance">
            <p>
              We operate a notice-and-action mechanism under DSA Art. 16. If we receive a valid
              notice of illegal content or a court order, we will remove or disable access to the
              relevant content and notify the uploader where legally permitted.
            </p>
          </SubSection>
        </Section>

        <Section title="6. Intellectual Property">
          <p>
            All intellectual property in the AltStore platform — including but not limited to the
            source code, design system, trademarks, and documentation — is owned by {CONTROLLER} or
            its licensors. The platform source code is made available under an open-source licence
            (see the repository for details); this does not grant you any rights to the AltStore
            name, logo, or brand assets.
          </p>
          <p>
            Application content, binaries, and metadata remain the intellectual property of their
            respective developers.
          </p>
        </Section>

        <Section title="7. Disclaimer of Warranties">
          <p>
            To the maximum extent permitted by EU consumer protection law, AltStore is provided
            &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranty of any kind, express
            or implied, including but not limited to warranties of merchantability, fitness for a
            particular purpose, or non-infringement.
          </p>
          <p>
            We do not warrant that: the platform will be uninterrupted or error-free; any
            application distributed through the platform is fit for any particular purpose; or
            results obtained from using the platform will be accurate or reliable.
          </p>
          <p>
            Nothing in this clause limits rights you have under mandatory EU consumer law, including
            Directive 2019/770 on digital content and services and Directive 2011/83/EU on consumer
            rights.
          </p>
        </Section>

        <Section title="8. Limitation of Liability">
          <p>
            To the fullest extent permitted by applicable law, AltStore shall not be liable for: (a)
            any indirect, incidental, special, consequential, or punitive damages; (b) loss of data,
            profits, goodwill, or business opportunity; arising out of or in connection with your
            use of or inability to use the platform or any application distributed through it.
          </p>
          <p>
            Our total aggregate liability to you for any cause of action shall not exceed the
            greater of €100 or the amount paid by you to AltStore in the 12 months preceding the
            event giving rise to the claim.
          </p>
          <p>
            These limitations do not apply to liability arising from fraud, wilful misconduct, gross
            negligence, or any liability that cannot be excluded under mandatory EU or Spanish law.
          </p>
        </Section>

        <Section title="9. Indemnification">
          <p>
            Developers agree to indemnify, defend, and hold harmless AltStore and its officers,
            employees, and agents from and against any claims, damages, liabilities, costs, and
            expenses (including reasonable legal fees) arising from: (a) any application you submit
            or distribute; (b) your breach of these Terms; (c) your violation of any third-party
            right; or (d) your violation of applicable law.
          </p>
        </Section>

        <Section title="10. Termination">
          <p>
            You may close your account and cease use of the platform at any time by contacting{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline">
              {CONTACT_EMAIL}
            </a>
            . We may suspend or terminate your access with or without notice if: (a) you breach
            these Terms; (b) we are required to do so by law or a competent authority; or (c) we
            discontinue the service.
          </p>
          <p>
            On termination, your licence to use the platform ends immediately. Clauses 6, 7, 8, 9,
            and 12 survive termination.
          </p>
        </Section>

        <Section title="11. Changes to These Terms">
          <p>
            We may update these Terms from time to time. We will provide at least{" "}
            <strong>30 days&rsquo; notice</strong> of material changes to registered users via
            email, and will post the updated Terms on this page with a revised &ldquo;Last
            updated&rdquo; date. Continued use after the effective date constitutes acceptance. If
            you do not agree with the updated Terms, you must discontinue use and may request
            account deletion.
          </p>
        </Section>

        <Section title="12. Governing Law and Disputes">
          <p>
            These Terms are governed by the laws of Spain, without regard to its conflict-of-law
            rules. The EU Online Dispute Resolution platform is available at{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              className="text-accent underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              ec.europa.eu/consumers/odr
            </a>
            .
          </p>
          <p>
            Disputes arising out of or in connection with these Terms that cannot be resolved
            amicably shall be subject to the exclusive jurisdiction of the courts of Madrid, Spain,
            except where mandatory EU consumer law confers jurisdiction on courts in your country of
            residence.
          </p>
        </Section>

        <Section title="13. Contact">
          <p>
            For questions about these Terms:{" "}
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

export default TermsPage;
