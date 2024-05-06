/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GOOGLE_TRANSLATION_CONFIG: JSON.stringify({
      languages: [
        { title: "English", name: "en" },
        { title: "Français", name: "fr" },
      ],
      defaultLanguage: "fr",
    }),
  },
  i18n: { localeDetection: false },
};

const nextTranslate = require("next-translate-plugin");

module.exports = nextTranslate(nextConfig);
