import { useCallback } from "react";

export const useSearchByCategorySection = (onOpenModal: () => void) => {
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onOpenModal();
    },
    [onOpenModal]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onOpenModal();
      }
    },
    [onOpenModal]
  );

  return { handleClick, handleKeyDown };
};
