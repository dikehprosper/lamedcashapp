"use client";

import Link from "next/link";
import "./languageToggle.css";
import { useParams, usePathname } from "next/navigation";

interface LanguageToggleProps {
  updatedTheme: string; // Assuming updatedTheme can be "light" or "dark"
}

export default function LanguageToggle({ updatedTheme }: LanguageToggleProps) {
  const pathname = usePathname();
  const { locale } = useParams<{ locale: string }>();

  // Set styles based on the updatedTheme
  const toggleStyle = {
    backgroundColor: updatedTheme === "dark" ? "#333" : "#fff", // Dark background for dark theme
    color: updatedTheme === "dark" ? "#fff" : "#000", // White text for dark theme, black for light
  };

  return (!updatedTheme? "" :
    <div style={{color: updatedTheme === "dark" ? "": "black"}}  className="toggleBtn">
      <Link
        href={`/${locale === "en" ? "fr" : "en"}${pathname.split(`/${locale}`)[1]}`}
        locale={locale === "en" ? "fr" : "en"}
       
      >
        {locale === "en" ? "FR" : "EN"}
      </Link>
    </div>
  );
}
