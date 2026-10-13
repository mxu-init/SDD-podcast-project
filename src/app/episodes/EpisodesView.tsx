"use client";

import { useState } from "react";
import { EPISODES } from "@/data/episodes";
import EpisodeCard from "@/components/EpisodeCard";
import EpisodeDetail from "@/components/EpisodeDetail";
import type { Episode } from "@/types";
import styles from "@/styles/Episodes.module.css";

export default function EpisodesView() {
  const [selected, setSelected] = useState<Episode | null>(null);

  return (
    <div className={styles.view}>
      {selected ? (
        <EpisodeDetail episode={selected} onClose={() => setSelected(null)} />
      ) : null}
      <ul className={styles.list}>
        {EPISODES.map((episode) => (
          <li key={episode.id}>
            <EpisodeCard
              episode={episode}
              onSelect={setSelected}
              active={selected?.id === episode.id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
