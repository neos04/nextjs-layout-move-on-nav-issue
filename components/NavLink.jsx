"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const NavLink = ({ href, children, title, onClick, disabled }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const isDisabled = disabled;

  return (
    <Link
      href={href}
      className={`navlink ${isActive ? "active" : ""}`}
      title={title}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </Link>
  );
};

export default NavLink;
