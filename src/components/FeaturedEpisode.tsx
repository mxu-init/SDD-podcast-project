"use client";

import { useState } from "react";
import EpisodePlayer from "@/components/EpisodePlayer";
import type { Episode } from "@/types";
import styles from "@/styles/FeaturedEpisode.module.css";

export default function FeaturedEpisode({ episode }: { episode: Episode }) {
  const [playing, setPlaying] = useState(false);

  return (
    <article className={styles.featured}>
      <img
        className={styles.artwork}
        src={episode.artwork}
        alt={`Artwork for episode ${episode.number}, ${episode.title}`}
        width={320}
        height={320}
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
        <p className={styles.description}>{episode.longDescription}</p>
        {playing ? (
          <EpisodePlayer episode={episode} />
        ) : (
          <button
            type="button"
            className={styles.playAction}
            onClick={() => setPlaying(true)}
          >
            <span aria-hidden="true">▶</span> Listen now
          </button>
        )}
      </div>
    </article>
  );
}
