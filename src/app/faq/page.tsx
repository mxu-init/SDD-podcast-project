import type { Metadata } from "next";
import FaqItem from "@/components/FaqItem";
import { faqItems } from "@/data/faq";
import styles from "@/styles/Faq.module.css";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about listening to the podcast.",
};

export default function FaqPage() {
  return (
    <div className="container">
      <header className={styles.header}>
        <h1>Frequently asked questions</h1>
        <p>
          Everything you might want to know before, during, or after an
          episode — tap a question to reveal the answer.
        </p>
      </header>
      <div className={styles.list}>
        {faqItems.map((item) => (
          <FaqItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
