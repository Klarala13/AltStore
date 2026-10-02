import { permanentRedirect } from "next/navigation";

// The API has no "newest first" ordering yet, so this page used to render mock data.
// Send people to the real catalogue until a sort option exists.
const NewReleasesPage = () => permanentRedirect("/#apps");

export default NewReleasesPage;
