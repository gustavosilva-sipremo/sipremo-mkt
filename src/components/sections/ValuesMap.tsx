import { useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";

type MapWithFog = {
  setFog: (options: Record<string, string | number>) => void;
};

/**
 * Map tiles: https://operations.osmfoundation.org/policies/tiles/
 * For high-traffic production, use a dedicated tile server or proxy.
 */
export default function ValuesMap() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<{ remove: () => void } | null>(null);

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container || mapRef.current) return;

    let cancelled = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || cancelled || mapRef.current) return;

        void (async () => {
          const maplibregl = await import("maplibre-gl");

          if (cancelled || !mapContainerRef.current) return;

          const map = new maplibregl.Map({
            container: mapContainerRef.current,
            style: {
              version: 8,
              sources: {
                "raster-tiles": {
                  type: "raster",
                  tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
                  tileSize: 256,
                },
              },
              layers: [
                {
                  id: "osm-tiles",
                  type: "raster",
                  source: "raster-tiles",
                  paint: { "raster-opacity": 0.5 },
                },
              ],
            },
            center: [-55, -14],
            zoom: 3,
          });

          map.on("style.load", () => {
            map.setProjection({ type: "globe" });
            map.setPitch(45);
            map.setBearing(-20);
            map.easeTo({ pitch: 45, bearing: -20, duration: 1500 });
            (map as unknown as MapWithFog).setFog({
              color: "rgb(5,5,10)",
              "high-color": "rgb(20,20,30)",
              "horizon-blend": 0.2,
            });
          });

          mapRef.current = map;
        })();

        observer.disconnect();
      },
      { rootMargin: "200px" },
    );

    observer.observe(container);

    return () => {
      cancelled = true;
      observer.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return <div ref={mapContainerRef} className="w-full h-full" />;
}
