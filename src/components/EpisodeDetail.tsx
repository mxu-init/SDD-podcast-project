"use client";

import { useEffect, useRef } from "react";
import EpisodePlayer from "@/components/EpisodePlayer";
import type { Episode } from "@/types";
import styles from "@/styles/Episodes.module.css";

interface EpisodeDetailProps {
  episode: Episode;
  onClose: () => void;
}

export default function EpisodeDetail({ episode, onClose }: EpisodeDetailProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [episode.id]);

  return (
    <div
      ref={panelRef}
      className={styles.detail}
      role="region"
      aria-label={`Episode ${episode.number} detail`}
      tabIndex={-1}
    >
      <div className={styles.detailHeader}>
        <img
          className={styles.detailArtwork}
          src={episode.artwork}
          alt={`Artwork for episode ${episode.number}, ${episode.title}`}
          width={200}
          height={200}
        />
        <div className={styles.detailBody}>
          <p className={styles.detailMeta}>
            <span>Episode {episode.number}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={episode.releaseDate}>{episode.releaseDate}</time>
            <span aria-hidden="true">·</span>
            <span>{episode.duration}</span>
          </p>
          <h2 className={styles.detailTitle}>{episode.title}</h2>
          <p className={styles.detailText}>{episode.longDescription}</p>
          <EpisodePlayer episode={episode} />
          <button type="button" className={styles.close} onClick={onClose}>
            Close episode
          </button>
        </div>
      </div>
    </div>
  );
}
