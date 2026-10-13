"use client";

import { useState } from "react";
import type { Episode } from "@/types";
import styles from "@/styles/EpisodePlayer.module.css";

export default function EpisodePlayer({ episode }: { episode: Episode }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={styles.player}>
      <p className={styles.label}>
        Now playing — Episode {episode.number}: {episode.title}
      </p>
      {failed ? (
        <p className={styles.fallback} role="status">
          Audio preview is unavailable right now — the episode details below
          still work as usual.
        </p>
      ) : (
        <audio
          className={styles.audio}
          controls
          preload="none"
          src={episode.audio}
          onError={() => setFailed(true)}
        >
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}
