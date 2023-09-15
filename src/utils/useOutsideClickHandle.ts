import { useEffect, MutableRefObject } from "react";

export const useOutsideClickHandle = <El extends HTMLElement | null>(
  ref: MutableRefObject<El>,
  clickHandler: (e: MouseEvent) => void
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        ref.current.contains(document.activeElement) &&
        !ref.current.contains(event.target as Node | null)
      ) {
        clickHandler(event);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clickHandler, ref]);
};
