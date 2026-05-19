import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useEffect, useState, type RefObject } from "react";

/** Duração do fade no início/fim de cada ciclo (limitada à duração do vídeo). */
function getFadeDuration(duration: number): number {
  if (!Number.isFinite(duration) || duration <= 0) return 0.45;
  return Math.min(0.6, Math.max(0.28, duration * 0.14));
}

function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * Math.min(1, Math.max(0, t))) - 1) / 2;
}

/** Opacidade 0→1 no início e 1→0 no fim, para esconder o corte do loop. */
export function computeLoopOpacity(currentTime: number, duration: number): number {
  if (!Number.isFinite(duration) || duration <= 0) return 1;

  const fade = Math.min(getFadeDuration(duration), duration / 2.2);

  if (currentTime <= fade) {
    return easeInOutSine(currentTime / fade);
  }

  const remaining = duration - currentTime;
  if (remaining <= fade) {
    return easeInOutSine(remaining / fade);
  }

  return 1;
}

export function useHeroVideo(videoRef: RefObject<HTMLVideoElement | null>) {
  const reducedMotion = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId = 0;

    const updateOpacity = () => {
      if (!video.duration) return;
      const next = reducedMotion
        ? 1
        : computeLoopOpacity(video.currentTime, video.duration);
      setOpacity(next);
    };

    const tick = () => {
      updateOpacity();
      rafId = requestAnimationFrame(tick);
    };

    const startTick = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tick);
    };

    const stopTick = () => {
      cancelAnimationFrame(rafId);
      rafId = 0;
    };

    const tryPlay = () => {
      if (!reducedMotion) {
        void video.play().catch(() => {
          /* autoplay blocked */
        });
      }
    };

    const onCanPlay = () => {
      setReady(true);
      updateOpacity();
      tryPlay();
    };

    const onPlay = () => startTick();
    const onPause = () => stopTick();
    const onSeeked = () => updateOpacity();

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("seeked", onSeeked);

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      onCanPlay();
    }
    if (!video.paused) {
      startTick();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
            video.load();
          }
          tryPlay();
        } else {
          video.pause();
          stopTick();
        }
      },
      { threshold: 0.12, rootMargin: "80px 0px" },
    );
    observer.observe(video);

    return () => {
      stopTick();
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("seeked", onSeeked);
      observer.disconnect();
    };
  }, [reducedMotion, videoRef]);

  const visibleOpacity = ready ? opacity : 0;

  return { ready, opacity: visibleOpacity, reducedMotion };
}
