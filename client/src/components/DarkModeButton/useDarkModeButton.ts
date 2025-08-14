import { useCallback } from "react";

export const useDarkModeButton = (callback: () => void) => {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        callback();
      }
    },
    [callback]
  );

  return { handleKeyDown };
};
