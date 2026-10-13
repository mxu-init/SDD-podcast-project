import type { Metadata } from "next";
import EpisodesView from "./EpisodesView";
import styles from "@/styles/Episodes.module.css";

export const metadata: Metadata = {
  title: "Episodes",
  description: "All 20 episodes of the podcast, newest first.",
};

export default function EpisodesPage() {
  return (
    <div className="container">
      <header className={styles.header}>
        <h1>Episodes</h1>
        <p>
          All twenty episodes, newest first — pick one and press play. Every
          episode works right here in the page.
        </p>
      </header>
      <EpisodesView />
    </div>
  );
}
