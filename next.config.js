/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");
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
  i18n,
};

const nextTranslate = require("next-translate-plugin");

// module.exports = nextTranslate(nextConfig);
module.exports = nextConfig;
