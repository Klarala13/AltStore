import type { Metadata } from "next";
import { SubmitAppForm } from "./SubmitAppForm";

export const metadata: Metadata = {
  title: "Submit an app — Appia",
  description: "Publish an Android app on Appia. No account needed.",
};

const SubmitPage = () => (
  <div className="mx-4 py-16 md:mx-16 md:py-20 lg:mx-24 xl:mx-32">
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-white">
          Submit an app
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          No account, no password. Fill this in, attach your APK, and we take it from there. Every
          submission is scanned for malware and reviewed before it appears in the store.
        </p>
      </div>

      <SubmitAppForm />
    </div>
  </div>
);

export default SubmitPage;
