import { useEffect, useState } from "react";

export const useModal = (isOpen: boolean, onClose: () => void) => {
  const [show, setShow] = useState(isOpen);
  const [isMounted, setIsMounted] = useState(false);

  const modalRoot = document.getElementById("modal-root") || document.body;
  const el = document.createElement("div");

  useEffect(() => {
    modalRoot.appendChild(el);
    setIsMounted(true);

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      modalRoot.removeChild(el);
    };
  }, [el, modalRoot, isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      document.body.style.overflow = "hidden";
    } else {
      setTimeout(() => {
        setShow(false);
        document.body.style.overflow = "auto";
      }, 300);
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return { show, isMounted, el, handleBackdropClick };
};
