import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "tr"],
  localePrefix: "always",
  // Used when no locale matches
  defaultLocale: "tr",
  domains: [
    {
      domain: "guneskirtasiye.com",
      defaultLocale: "tr",
      locales: ["tr", "en"],
    },
  ],
});
