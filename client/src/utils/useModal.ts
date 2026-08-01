import { useState } from "react";

/**
 * Owns nothing but the open flag. Locking `body` scroll belongs to the dialog
 * itself, which is the only side that knows when the closing transition has
 * actually finished — doing it in both places left the lock on whenever the two
 * ran out of step.
 */
export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return { isModalOpen, openModal, closeModal };
};
