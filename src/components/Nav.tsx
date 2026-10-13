"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/styles/Nav.module.css";

const links = [
  { href: "/", label: "Home" },
  { href: "/episodes/", label: "Episodes" },
  { href: "/about/", label: "About" },
  { href: "/faq/", label: "FAQ" },
];

function normalize(path: string): string {
  return path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
}

export default function Nav() {
  const pathname = usePathname() ?? "/";
  const current = normalize(pathname);

  return (
    <nav className={styles.nav} aria-label="Primary">
      <ul>
        {links.map((link) => {
          const isActive = normalize(link.href) === current;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={isActive ? styles.active : undefined}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
