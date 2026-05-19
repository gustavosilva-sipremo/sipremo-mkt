import { useEffect, useState } from "react";

/**
 * Matches Tailwind `md` breakpoint (viewport &lt; 768px = mobile layout).
 */
export const MOBILE_MEDIA_QUERY = "(max-width: 767px)";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = () => setMatches(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

export function useIsMobile(): boolean {
  return useMediaQuery(MOBILE_MEDIA_QUERY);
}

export function useIsDesktop(): boolean {
  const isMobile = useIsMobile();
  return !isMobile;
}

/** Desktop pointer (mouse/trackpad) — skip hover-only effects on touch. */
export const POINTER_FINE_QUERY = "(hover: hover) and (pointer: fine)";

export function usePointerFine(): boolean {
  return useMediaQuery(POINTER_FINE_QUERY);
}
