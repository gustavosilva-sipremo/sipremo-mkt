import HexField from "@/components/others/HexField";
import { valuesCornerHexes } from "@/content/hexLayouts";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Leaf, TrendingUp } from "lucide-react";
import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";

const ValuesMap = lazy(() => import("@/components/sections/ValuesMap"));

export default function Values() {
  const { t } = useTranslation("values");

  return (
    <section
      id="values"
      className="relative isolate mx-auto max-w-7xl overflow-hidden px-4 pt-12 pb-20 sm:px-6 sm:pb-22"
    >
      <HexField
        variant="onLight"
        hexes={valuesCornerHexes}
        layer="above-background"
      />

      <div className="relative z-10">
        <div className="mb-14 text-center">
          <h2 className="text-2xl font-semibold md:text-3xl">{t("title")}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="mb-20 grid gap-8 md:grid-cols-3">
          <Card className="border-border/50 bg-background/60 backdrop-blur-md transition-all duration-300 hover:shadow-xl">
            <CardContent className="space-y-4 p-7">
              <div className="flex items-center gap-2 text-primary">
                <TrendingUp size={18} aria-hidden />
                <h3 className="font-semibold">{t("operationalTitle")}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{t("operationalDesc")}</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-background/60 backdrop-blur-md transition-all duration-300 hover:shadow-xl">
            <CardContent className="space-y-4 p-7">
              <div className="flex items-center gap-2 text-primary">
                <DollarSign size={18} aria-hidden />
                <h3 className="font-semibold">{t("financialTitle")}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{t("financialDesc")}</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-background/60 backdrop-blur-md transition-all duration-300 hover:shadow-xl">
            <CardContent className="space-y-4 p-7">
              <div className="flex items-center gap-2 text-primary">
                <Leaf size={18} aria-hidden />
                <h3 className="font-semibold">{t("esgTitle")}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{t("esgDesc")}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="max-w-2xl space-y-5">
            <p className="text-lg leading-relaxed text-muted-foreground">{t("p1")}</p>
            <p className="text-lg leading-relaxed text-muted-foreground">{t("p2")}</p>
            <p className="text-lg font-medium leading-relaxed text-foreground">{t("p3")}</p>
          </div>
          <div className="hidden h-[420px] overflow-hidden rounded-2xl border border-border/50 shadow-lg md:block">
            <Suspense fallback={<div className="h-full w-full animate-pulse bg-muted" />}>
              <ValuesMap />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
