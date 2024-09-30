"use client";

import { useRouter } from "next/navigation"; // Import useRouter for navigation
import "./languageToggle.css";
import { useParams, usePathname } from "next/navigation";
import Cookies from 'js-cookie';
interface LanguageToggleProps {
  updatedTheme: string; // Assuming updatedTheme can be "light" or "dark"
}

function getLocaleFromPath(pathname: string): string {
  const parts = pathname.split("/");
  const locale = parts[1]; // Locale is expected to be in the first part of the path (e.g., /en, /fr)
  return ["en", "fr"].includes(locale) ? locale : "fr"; // Default to 'fr' if no valid locale is found
}

export default function LanguageToggle({updatedTheme}: any) {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
 
  // Set styles based on the updatedTheme
  const toggleStyle = {
    backgroundColor: updatedTheme === "dark" ? "#333" : "#fff", // Dark background for dark theme
    color: updatedTheme === "dark" ? "#fff" : "#000", // White text for dark theme, black for light
  };



const toggleLang = () => {
   const currentPath = window.location.pathname;

  // Extract the current language from the URL
  const currentLang = currentPath.split("/")[1];

  // Determine the new language based on the current one
  const newLang = currentLang === "fr" ? "en" : "fr";

  // Construct the new path by replacing the current language with the new one
  const newPath = currentPath.replace(`/${currentLang}`, `/${newLang}`);

  // Update the cookie with the new language preference
  Cookies.set("locale", newLang, { expires: 365 }); // Set cookie to last 1 year

  // Update the window's pathname to the new path
  window.history.pushState({}, "", newPath);

  // Optionally, you may want to trigger a page refresh
  window.location.reload(); // This line will refresh the page to apply changes
};

  return (
    <div
      style={{
        color:
          updatedTheme === "dark"
            ? "white"
            : updatedTheme === "light"
            ? "black"
            : "transparent",
      }}
      className='toggleBtn'
      onClick={toggleLang} // Call the function on click
    >
      {locale === "en" ? "FR" : "EN"}
    </div>
  );
}
