import React from "react";

/**
 * A hook for managing open/closed state with controlled actions.
 * Commonly used for modals, dropdowns, and other toggleable components.
 *
 * @param initial - Initial open state (defaults to false)
 * @returns Object containing:
 *   - isOpen: Current open state
 *   - open: Function to set state to open
 *   - close: Function to set state to closed
 *   - toggle: Function to toggle between states
 */
export const useDisclosure = (initial = false) => {
  const [isOpen, setIsOpen] = React.useState(initial);

  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);
  const toggle = React.useCallback(() => setIsOpen((state) => !state), []);

  return { isOpen, open, close, toggle };
};
