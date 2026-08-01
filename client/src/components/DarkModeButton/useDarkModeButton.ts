/**
 * The React Compiler memoizes the handler, so its identity stays stable across
 * renders without a `useCallback` wrapper.
 */
export const useDarkModeButton = (callback: () => void) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      callback();
    }
  };

  return { handleKeyDown };
};
