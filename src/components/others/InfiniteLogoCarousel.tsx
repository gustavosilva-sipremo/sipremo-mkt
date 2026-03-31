import {
  Building2,
  Building,
  Factory,
  Landmark,
  Warehouse,
  Globe,
  Briefcase,
} from "lucide-react";

const logos = [
  { name: "Company A", icon: Building2 },
  { name: "Company B", icon: Building },
  { name: "Company C", icon: Factory },
  { name: "Company D", icon: Landmark },
  { name: "Company E", icon: Warehouse },
  { name: "Company F", icon: Globe },
  { name: "Company G", icon: Briefcase },
];

export default function InfiniteLogoCarousel() {
  return (
    <div className="w-full overflow-hidden py-10 bg-transparent absolute">
      <div className="relative flex w-max animate-scroll gap-12">
        {[...logos, ...logos].map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex items-center justify-center min-w-[160px] h-20 rounded-xl border backdrop-blur-md shadow-sm"
            >
              <Icon className="w-8 h-8 text-muted-foreground" />
            </div>
          );
        })}
      </div>

      <style>{`
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
