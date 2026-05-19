import HexDecoration from "@/components/others/HexDecoration";
import HexField from "@/components/others/HexField";
import { testimonialsSideHexes } from "@/content/hexLayouts";
import { testimonials, useCases } from "@/content/testimonials";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Testimonials() {
  const { t } = useTranslation("testimonials");

  return (
    <section id="testimonials" className="relative isolate overflow-hidden py-20 sm:py-24">
      <div className="absolute inset-0 -z-10 bg-[#05060a]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] bg-size-[22px_22px] opacity-40" />
      <div className="absolute -top-40 left-1/2 -z-10 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <HexField
        variant="onDark"
        hexes={testimonialsSideHexes}
        layer="above-background"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-20 text-center">
          <h2 className="mb-5 text-2xl font-bold text-secondary sm:text-3xl md:text-5xl">{t("title")}</h2>
          <p className="mx-auto max-w-3xl text-secondary/80">{t("subtitle")}</p>
        </div>

        <div className="mb-28 grid gap-10 md:grid-cols-2">
          {testimonials.map((item) => (
            <article
              key={item.id}
              className="group relative rounded-2xl border border-border/50 bg-background p-8 shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-2xl"
            >
              <div className="absolute inset-0 -z-10 rounded-2xl bg-primary/5 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
              <p className="mb-8 text-sm leading-relaxed text-muted-foreground md:text-base">
                &ldquo;{t(`items.${item.id}.text`)}&rdquo;
              </p>
              <div className="flex items-center justify-between border-t border-border/50 pt-5">
                <div>
                  <p className="text-sm font-semibold">{t(`items.${item.id}.name`)}</p>
                  <p className="text-xs text-primary">{t(`items.${item.id}.role`)}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div
          className="pointer-events-none relative -mt-10 mb-6 flex justify-center sm:-mt-14 sm:mb-2"
          aria-hidden
        >
          <HexDecoration
            variant="onDark"
            size="lg"
            animated="none"
            className="relative opacity-90"
            strokeWidth={2.5}
          />
        </div>

        <div>
          <h3 className="mb-14 text-center text-2xl font-semibold text-secondary md:text-3xl">
            {t("useCasesTitle")}
          </h3>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-2xl border-border/50 bg-background shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-2xl"
              >
                <div className="h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={t(`useCases.${item.id}.title`)}
                    width={400}
                    height={208}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full select-none object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h4 className="mb-3 text-lg font-semibold transition-colors group-hover:text-primary">
                    {t(`useCases.${item.id}.title`)}
                  </h4>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {t(`useCases.${item.id}.desc`)}
                  </p>
                  <button
                    type="button"
                    className="flex w-fit cursor-pointer items-center gap-2 text-sm font-medium text-primary transition-all hover:gap-3"
                  >
                    {t("learnMore")}
                    <ArrowRight size={16} aria-hidden />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
