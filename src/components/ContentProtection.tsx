"use client";

import { useEffect } from "react";

/**
 * Content protection - prevents text selection, copying, right-click, and discourages screenshots.
 * Note: OS-level screenshots (Print Screen, phone screenshot) cannot be fully blocked by websites.
 */
export default function ContentProtection() {
  useEffect(() => {
    // Prevent right-click context menu on entire page
    function handleContextMenu(e: MouseEvent) {
      e.preventDefault();
    }

    // Prevent drag on images and other elements
    function handleDragStart(e: DragEvent) {
      e.preventDefault();
    }

    // Prevent text selection (selectstart)
    function handleSelectStart(e: Event) {
      e.preventDefault();
    }

    // Prevent copy (allow in admin form fields)
    function handleCopy(e: ClipboardEvent) {
      const target = e.target as HTMLElement;
      if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
        e.preventDefault();
      }
    }

    // Prevent cut (allow in admin form fields)
    function handleCut(e: ClipboardEvent) {
      const target = e.target as HTMLElement;
      if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
        e.preventDefault();
      }
    }

    // Prevent paste (allow in admin form fields)
    function handlePaste(e: ClipboardEvent) {
      const target = e.target as HTMLElement;
      if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
        e.preventDefault();
      }
    }

    // Block Print Screen and common screenshot shortcuts
    function handleKeyDown(e: KeyboardEvent) {
      if (
        e.key === "PrintScreen" ||
        (e.ctrlKey && e.shiftKey && e.key === "S") ||
        (e.metaKey && e.shiftKey && e.key === "4")
      ) {
        e.preventDefault();
      }
    }

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("selectstart", handleSelectStart);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("cut", handleCut);
    document.addEventListener("paste", handlePaste);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("selectstart", handleSelectStart);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("cut", handleCut);
      document.removeEventListener("paste", handlePaste);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
