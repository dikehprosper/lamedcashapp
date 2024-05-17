"use client";

import Link from "next/link";
import "./languageToggle.css";
import { useParams, usePathname } from "next/navigation";

export default function LanguageToggle() {
  const pathname = usePathname();
  const { locale } = useParams<{ locale: string }>();

  return (
    <Link
      href={`/${locale === "en" ? "fr" : "en"}${
        pathname.split(`/${locale}`)[1]
      }`}
      locale={locale === "en" ? "fr" : "en"}
      className="toggleBtn"
    >
      {locale === "en" ? "FR" : "EN"}
    </Link>
  );
}
