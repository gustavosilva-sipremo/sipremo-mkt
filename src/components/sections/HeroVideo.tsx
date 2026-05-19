import { useHeroVideo } from "@/hooks/useHeroVideo";
import { useRef } from "react";

const VIDEO_MP4 = `${import.meta.env.BASE_URL}videos/video_bg.mp4`;
const VIDEO_WEBM = `${import.meta.env.BASE_URL}videos/video_bg.webm`;
const POSTER = `${import.meta.env.BASE_URL}images/hero-poster.webp`;

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { ready } = useHeroVideo(videoRef, { enabled: true });

  return (
    <div className="absolute inset-0 z-1 overflow-hidden" aria-hidden>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        poster={POSTER}
        className="hero-video h-full w-full object-cover"
        style={{
          opacity: ready ? undefined : 0,
          filter: "brightness(0.58) contrast(1.12) saturate(1.05)",
        }}
      >
        <source src={VIDEO_WEBM} type="video/webm" />
        <source src={VIDEO_MP4} type="video/mp4" />
      </video>
    </div>
  );
}
