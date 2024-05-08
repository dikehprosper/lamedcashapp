"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { LuHistory } from "react-icons/lu";
import { MdDashboard } from "react-icons/md";

export default function BottomNav() {
  const t = useTranslations("dashboard");
  const pathname = usePathname();
  return (
    <div className="bottom-nav for-smaller-devices">
      <Link
        href={"/dashboard"}
        className={`${
          pathname.includes("/dashboard") ? "bottom-nav-item-active" : ""
        } bottom-nav-item`}
      >
        <MdDashboard fontSize={25} />
        <h4>{t("navLinks.dashboard")}</h4>
      </Link>
      <Link
        href={"/deposit"}
        className={`${
          pathname.includes("/deposit") ? "bottom-nav-item-active" : ""
        } bottom-nav-item`}
      >
        <BiLogInCircle fontSize={25} />
        <h4>{t("navLinks.deposit")}</h4>
      </Link>
      <Link
        href={"/withdraw"}
        className={`${
          pathname.includes("/withdraw") ? "bottom-nav-item-active" : ""
        } bottom-nav-item`}
      >
        <BiLogOutCircle fontSize={25} />
        <h4>{t("navLinks.withdraw")}</h4>
      </Link>
      <Link
        href={"/transactions"}
        className={`${
          pathname.includes("/transactions") ? "bottom-nav-item-active" : ""
        } bottom-nav-item`}
      >
        <LuHistory fontSize={25} />
        <h4>{t("navLinks.transactions")}</h4>
      </Link>
    </div>
  );
}
