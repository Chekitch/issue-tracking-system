import { useState } from "react";

/**
 * Custom hook for managing modal state
 * @param initial - Initial state of the modal
 * @returns An object containing the modal state, openModal function, and closeModal function
 */
export function useModal(initial = false) {
    const [open, setOpen] = useState(initial);
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    return { open, openModal, closeModal };
}