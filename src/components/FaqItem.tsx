import type { FaqItem as FaqItemData } from "@/types";
import styles from "@/styles/Faq.module.css";

export default function FaqItem({ item }: { item: FaqItemData }) {
  return (
    <details className={styles.item}>
      <summary className={styles.question}>{item.question}</summary>
      <p className={styles.answer}>{item.answer}</p>
    </details>
  );
}
