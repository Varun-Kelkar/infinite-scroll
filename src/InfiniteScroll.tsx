import { useState } from "react";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";
import styles from "./InfiniteScroll.module.css";

function generateSequentialNumbers(start: number, end: number) {
  const numbers = [];
  for (let i = start, j = 1; j <= end; i++, j++) {
    numbers.push(i);
  }
  return numbers;
}
export default function InfiniteScrollList() {
  const [items, setItems] = useState(() => generateSequentialNumbers(0, 10));
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreItems = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newItems = generateSequentialNumbers(items.length, 10);
      items.push(...newItems);
      setItems(items);
      setIsLoading(false);
    }, 1000);
  };

  const { loaderRef } = useInfiniteScroll({
    isLoading,
    onLoadMore: loadMoreItems,
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Infinite Scroll List</h2>
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li key={`${item}-${index}`} className={styles.listItem}>
            {item}
          </li>
        ))}
      </ul>
      <div ref={loaderRef} className={styles.loader}>
        {isLoading ? "Loading more..." : null}
      </div>
    </div>
  );
}
