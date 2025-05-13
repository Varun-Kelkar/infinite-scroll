import { useEffect, useRef, useCallback, useMemo } from "react";

interface UseInfiniteScrollOptions {
  isLoading: boolean;
  onLoadMore: () => void;
  threshold?: number;
}

export const useInfiniteScroll = ({
  isLoading,
  onLoadMore,
  threshold = 1,
}: UseInfiniteScrollOptions) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isLoading) {
        onLoadMore();
      }
    },
    [isLoading, onLoadMore]
  );
  const observer = useMemo(
    () =>
      new IntersectionObserver(observerCallback, {
        threshold,
      }),
    [observerCallback, threshold]
  );

  const addIntersectionObserver = () => {
    if (loaderRef.current) {
      const observer = new IntersectionObserver(observerCallback, {
        threshold,
      });
      observer.observe(loaderRef.current);
    }
  };

  const removeIntersectionObserver = () => {
    if (loaderRef.current) {
      observer.unobserve(loaderRef.current);
    }
  };

  useEffect(() => {
    addIntersectionObserver();

    return removeIntersectionObserver;
  }, []);

  return { loaderRef };
};
