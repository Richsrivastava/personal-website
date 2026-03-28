"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/writing", label: "Writing" },
  { href: "/poetry", label: "Poetry" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header>
      <Link href="/" className="site-name">
        Richa Srivastava
      </Link>
      <nav>
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={pathname.startsWith(href) ? "active" : ""}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
