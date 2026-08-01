import { createPortal } from "react-dom";

import { ModalProps } from "../../types/types";
import { useModal } from "./useModal";

const Modal = ({ onClose, children, ariaLabel = "Modal dialog" }: ModalProps) => {
  const { container, handleBackdropClick } = useModal(onClose);

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center w-full min-h-screen p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
    >
      <div
        className="relative flex flex-col w-full max-w-3xl max-h-[90vh] p-6 overflow-y-auto
          bg-gradient-to-tl from-zinc-300 to-zinc-200 shadow-neumorphism
          dark:from-zinc-800 dark:to-zinc-700 dark:shadow-dark-neumorphism rounded-xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl text-zinc-700 dark:text-zinc-200
            hover:text-sky-500 dark:hover:text-sky-500 transition-colors p-1"
          aria-label="Close modal"
        >
          &times;
        </button>
        <div className="w-full overflow-y-auto">{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, container);
};

export default Modal;
