import { useEffect, useState } from "react";

/**
 * `App` renders the dialog only while it is open, so the component never exists
 * in a closed state — the `show` flag and the close-animation timer this hook
 * used to carry could never run. What is left is the portal container, the
 * Escape handler and the scroll lock.
 */
export const useModal = (onClose: () => void) => {
  // Created once, through the lazy initializer. Building the node during render
  // handed the effect a different element on every pass, so the portal — and
  // everything inside it — was torn down and rebuilt on each render.
  const [container] = useState(() => document.createElement("div"));

  useEffect(() => {
    const root = document.getElementById("modal-root") ?? document.body;
    root.appendChild(container);

    return () => {
      root.removeChild(container);
    };
  }, [container]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return { container, handleBackdropClick };
};
