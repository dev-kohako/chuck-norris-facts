/**
 * The React Compiler memoizes both handlers, so their identities stay stable
 * across renders without `useCallback` wrappers.
 */
export const useSearchByCategorySection = (onOpenModal: () => void) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onOpenModal();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpenModal();
    }
  };

  return { handleClick, handleKeyDown };
};
