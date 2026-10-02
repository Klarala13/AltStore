// Only same-site paths: "//evil.com" or "https://…" would turn the login page into an open redirect.
export const safeCallbackUrl = (value: string | string[] | undefined): string => {
  const url = Array.isArray(value) ? value[0] : value;
  return url && url.startsWith("/") && !url.startsWith("//") ? url : "/";
};
