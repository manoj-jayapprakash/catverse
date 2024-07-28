import React from "react";
import { useInView } from "react-intersection-observer";
type TProps = {
  children: React.ReactNode;
  className?: string;
  onLoadMore: () => void;
};

export const InfiniteScroll = ({
  children,
  className = "",
  onLoadMore,
}: TProps) => {
  const { ref } = useInView({
    rootMargin: "200px",
    onChange: (inView) => {
      if (inView) onLoadMore();
    },
  });

  return (
    <ul className={className}>
      {children}
      <li ref={ref} />
    </ul>
  );
};
