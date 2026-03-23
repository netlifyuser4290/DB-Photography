"use client";

import { useEffect } from "react";

/**
 * Content protection - discourages screenshots and copying.
 * Note: Cannot fully prevent screenshots/recording (OS-level capture, cameras, etc. bypass this).
 */
export default function ContentProtection() {
  useEffect(() => {
    // Prevent right-click context menu on images
    function handleContextMenu(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG" || target.closest("[data-protected]")) {
        e.preventDefault();
      }
    }

    // Prevent drag on images
    function handleDragStart(e: DragEvent) {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG") {
        e.preventDefault();
      }
    }

    // Intercept Print Screen key (limited - only blocks when page has focus)
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "PrintScreen") {
        e.preventDefault();
        // Flash or obscure - user may still have captured, but we tried
      }
    }

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
