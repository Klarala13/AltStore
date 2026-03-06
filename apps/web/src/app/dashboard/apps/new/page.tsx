import { NewAppForm } from "./NewAppForm";

const NewAppPage = () => (
  <div className="mx-auto max-w-2xl">
    <div className="mb-8">
      <h1 className="font-display text-2xl font-semibold text-white">Submit New App</h1>
      <p className="mt-1 text-sm text-zinc-500">
        Fill in your app details. A privacy policy URL is required for GDPR compliance.
      </p>
    </div>

    <NewAppForm />
  </div>
);

export default NewAppPage;
