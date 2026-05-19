import { logoItems } from "@/content/logos";
import {
  Briefcase,
  Building,
  Building2,
  Factory,
  Globe,
  Landmark,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Building,
  Factory,
  Landmark,
  Warehouse,
  Globe,
  Briefcase,
};

export default function InfiniteLogoCarousel() {
  const items = [...logoItems, ...logoItems];

  return (
    <div className="absolute w-full overflow-hidden bg-transparent py-10" aria-hidden>
      <div className="relative flex w-max animate-logo-scroll gap-12">
        {items.map((item, index) => {
          const Icon = iconMap[item.icon] ?? Building2;
          return (
            <div
              key={`${item.id}-${index}`}
              className="flex h-20 min-w-[160px] items-center justify-center rounded-xl border backdrop-blur-md shadow-sm"
            >
              <Icon className="h-8 w-8 text-muted-foreground" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
