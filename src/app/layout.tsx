import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import { site } from "@/data/site";
import "@/styles/globals.css";
import styles from "@/styles/Layout.module.css";

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const year = new Date().getFullYear();

  return (
    <html lang={site.language}>
      <body>
        <header className={styles.header}>
          <div className={`container ${styles.headerInner}`}>
            <Link href="/" className={styles.brand}>
              <span className={styles.brandMark} aria-hidden="true">
                ◉
              </span>
              <span>{site.name}</span>
            </Link>
            <Nav />
          </div>
        </header>
        <main id="main" className={styles.main}>
          {children}
        </main>
        <footer className={styles.footer}>
          <div className={`container ${styles.footerInner}`}>
            <p>
              © {year} {site.name}
            </p>
            <p className={styles.footerTagline}>{site.tagline}</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
