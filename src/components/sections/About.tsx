import HexField from "@/components/others/HexField";
import { aboutHexes } from "@/content/hexLayouts";
import { teamMembers } from "@/content/team";
import type { TeamMember } from "@/types/content";
import { Activity, BarChart3, Gauge, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

function TeamCard({ member }: { member: TeamMember }) {
  const { t } = useTranslation("about");
  const key = member.id;

  return (
    <div className="h-full w-full max-w-sm rounded-2xl border border-border/50 bg-background/60 p-6 shadow-sm backdrop-blur-md transition-all hover:shadow-xl">
      <div className="flex h-full flex-col items-center space-y-4 text-center">
        <img
          src={member.img}
          alt={t(`team.${key}.name`)}
          width={96}
          height={96}
          loading="lazy"
          decoding="async"
          className="h-24 w-24 select-none rounded-full border border-border/50 object-cover"
        />
        <div>
          <h4 className="text-lg font-semibold">{t(`team.${key}.name`)}</h4>
          <p className="text-sm text-primary">{t(`team.${key}.role`)}</p>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {t(`team.${key}.desc`)}
        </p>
      </div>
    </div>
  );
}

export default function About() {
  const { t } = useTranslation("about");

  return (
    <section
      id="about"
      className="relative mx-auto max-w-7xl overflow-hidden px-4 pt-48 pb-20 sm:px-6"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-size-[20px_20px]" />
      <HexField variant="onLight" hexes={aboutHexes} />
      <div className="absolute -top-40 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="mb-16 text-center md:mb-20">
        <h2 className="mb-5 text-3xl font-bold md:text-5xl">{t("title")}</h2>
        <p className="mx-auto max-w-3xl text-base text-muted-foreground md:text-lg">
          {t("tagline")}
        </p>
      </div>

      <div className="mb-20 grid items-start gap-10 md:mb-24 md:grid-cols-2 md:gap-14">
        <div className="space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
          <p>{t("p3")}</p>
        </div>

        <div className="space-y-5 rounded-2xl border border-border/50 bg-background/60 p-6 shadow-sm backdrop-blur-md md:p-7">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <BarChart3 size={18} aria-hidden />
            {t("capabilitiesTitle")}
          </h3>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <Activity size={16} className="mt-1 text-primary" aria-hidden />
              {t("cap1")}
            </li>
            <li className="flex items-start gap-3">
              <Gauge size={16} className="mt-1 text-primary" aria-hidden />
              {t("cap2")}
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck size={16} className="mt-1 text-primary" aria-hidden />
              {t("cap3")}
            </li>
          </ul>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="mb-3 text-center text-2xl font-semibold md:text-3xl">
          {t("teamTitle")}
        </h3>
        <p className="mx-auto mb-12 max-w-2xl text-center text-sm text-muted-foreground md:text-base">
          {t("teamSubtitle")}
        </p>

        <div className="flex flex-col items-center gap-10">
          <div className="grid w-full max-w-3xl grid-cols-1 justify-items-center gap-8 sm:grid-cols-2">
            {teamMembers.slice(0, 2).map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
          <div className="grid w-full grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.slice(2).map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
