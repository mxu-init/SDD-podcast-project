import Link from "next/link";
import FeaturedEpisode from "@/components/FeaturedEpisode";
import { getEpisodeById } from "@/data/episodes";
import { site } from "@/data/site";
import styles from "@/styles/Home.module.css";

export default function HomePage() {
  const featured = getEpisodeById(site.featuredEpisodeId);

  if (!featured) {
    throw new Error(
      `Featured episode "${site.featuredEpisodeId}" not found in catalog`,
    );
  }

  return (
    <div className="container">
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>A podcast</p>
          <h1 id="hero-title" className={styles.heroTitle}>
            {site.name}
          </h1>
          <p className={styles.heroTagline}>{site.tagline}</p>
          <div className={styles.heroActions}>
            <a href="#featured" className={styles.primaryAction}>
              Listen to the featured episode
            </a>
            <Link href="/episodes/" className={styles.secondaryAction}>
              Browse all 20 episodes
            </Link>
          </div>
        </div>
        <div className={styles.heroArt}>
          <img
            src={site.artwork}
            alt={`${site.name} cover artwork`}
            width={420}
            height={420}
          />
        </div>
      </section>

      <section
        id="featured"
        className={styles.featuredSection}
        aria-labelledby="featured-title"
      >
        <h2 id="featured-title" className={styles.sectionTitle}>
          Featured episode
        </h2>
        <FeaturedEpisode episode={featured} />
      </section>

      <section className={styles.cta} aria-label="Browse episodes">
        <h2 className={styles.sectionTitle}>The full season</h2>
        <p className={styles.ctaText}>
          Twenty episodes, newest first — each one a short trip somewhere you
          have not been yet.
        </p>
        <Link href="/episodes/" className={styles.primaryAction}>
          Open the episode catalog
        </Link>
      </section>
    </div>
  );
}
