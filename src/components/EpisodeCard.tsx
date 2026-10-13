import type { Episode } from "@/types";
import styles from "@/styles/EpisodeCard.module.css";

interface EpisodeCardProps {
  episode: Episode;
  onSelect?: (episode: Episode) => void;
  active?: boolean;
}

export default function EpisodeCard({ episode, onSelect, active }: EpisodeCardProps) {
  return (
    <article
      className={`${styles.card} ${active ? styles.active : ""}`}
      aria-label={`Episode ${episode.number}: ${episode.title}`}
    >
      <img
        className={styles.artwork}
        src={episode.artwork}
        alt={`Artwork for episode ${episode.number}, ${episode.title}`}
        width={160}
        height={160}
        loading="lazy"
      />
      <div className={styles.body}>
        <p className={styles.meta}>
          <span>Episode {episode.number}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={episode.releaseDate}>{episode.releaseDate}</time>
          <span aria-hidden="true">·</span>
          <span>{episode.duration}</span>
        </p>
        <h3 className={styles.title}>{episode.title}</h3>
        <p className={styles.description}>{episode.shortDescription}</p>
        {onSelect ? (
          <button
            type="button"
            className={styles.action}
            onClick={() => onSelect(episode)}
          >
            {active ? "Now playing" : "Play episode"}
          </button>
        ) : null}
      </div>
    </article>
  );
}
