"use client";
import React from "react";
type Props = {
  onDetected: (code: string) => void;
  minlength?: number;
  keyDelayMs?: number;
  idleFinishMs?: number;
};
function isEditableElement(el: Element | null): boolean {
  if (!el) return false;
  const tag = el.tagName?.toLowerCase();
  if (tag === "input" || tag === "textarea" || tag === "select") return true;
  const editable = (el as HTMLElement).isContentEditable;
  const role = (el as HTMLElement).getAttribute("role");
  return editable || role === "textbox";
}
export default function UsbBarcodeListener({
  onDetected,
  minLength = 6,
  keyDelayMs = 50,
  idleFinishMs = 120,
}: Props) {
  const bufferRef = React.useRef<string>("");
  const lastTsRef = React.useRef<number>(0);
  const idleTimerRef = React.useRef<number | null>(null);

  const finalize = React.useCallback(() => {
    const code = bufferRef.current;
    bufferRef.current = "";
    lastTsRef.current = 0;
    if (idleTimerRef.current) {
      window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
    if (code && code.length >= minLength) onDetected(code);
  }, [minLength, onDetected]);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isEditableElement(document.activeElement)) return;

      const now = Date.now();

      if (e.key === "Enter") {
        finalize();
        return;
      }

      if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
        if (lastTsRef.current && now - lastTsRef.current > keyDelayMs) {
          bufferRef.current = "";
        }
        bufferRef.current += e.key;
        lastTsRef.current = now;

        if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
        idleTimerRef.current = window.setTimeout(finalize, idleFinishMs);
      }
    };

    window.addEventListener("keydown", onKeyDown, true);
    return () => {
      window.removeEventListener("keydown", onKeyDown, true);
      if (idleTimerRef.current) {
        window.clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
      bufferRef.current = "";
      lastTsRef.current = 0;
    };
  }, [finalize, idleFinishMs, keyDelayMs]);

  return null;
}
