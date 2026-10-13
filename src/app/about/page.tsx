import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import styles from "@/styles/About.module.css";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — ${site.tagline}`,
};

export default function AboutPage() {
  return (
    <div className="container">
      <article className={styles.about}>
        <header className={styles.header}>
          <h1>About the show</h1>
          <p className={styles.tagline}>{site.tagline}</p>
        </header>

        <div className={styles.prose}>
          <p>
            {site.name} is a weekly podcast about the transmissions hiding in
            ordinary life — the habits, places, and half-finished stories that
            quietly shape us. Each episode follows one thread for about forty
            minutes: reported conversations, field recordings, and the kind of
            tangents that turn out to be the point.
          </p>
          <p>
            No news cycle, no hot takes. Just careful listening, a single
            question per week, and the belief that everything is more
            interesting up close.
          </p>
        </div>

        <section className={styles.host} aria-labelledby="host-title">
          <img
            className={styles.hostAvatar}
            src={site.host.avatar}
            alt={`Portrait of ${site.host.name}`}
            width={160}
            height={160}
          />
          <div>
            <h2 id="host-title">Your host</h2>
            <p className={styles.hostName}>{site.host.name}</p>
            <p className={styles.hostBio}>{site.host.bio}</p>
          </div>
        </section>

        <p className={styles.cta}>
          Ready to listen?{" "}
          <Link href="/episodes/">Browse the episode catalog</Link> or{" "}
          <Link href="/faq/">read the FAQ</Link>.
        </p>
      </article>
    </div>
  );
}
