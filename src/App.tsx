import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import { SeoHead } from "@/components/seo/SeoHead";

const InfiniteLogoCarousel = lazy(
  () => import("@/components/others/InfiniteLogoCarousel"),
);
const About = lazy(() => import("@/components/sections/About"));
const Values = lazy(() => import("@/components/sections/Values"));
const Testimonials = lazy(() => import("@/components/sections/Testimonials"));
const Projects = lazy(() => import("@/components/sections/Projects"));
const Contact = lazy(() => import("@/components/sections/Contact"));
const Footer = lazy(() => import("@/components/sections/Footer"));

function SectionFallback() {
  const { t } = useTranslation("common");
  return (
    <div className="py-8 text-center text-sm text-muted-foreground" aria-hidden>
      {t("loading")}
    </div>
  );
}

function App() {
  return (
    <>
      <SeoHead />
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <InfiniteLogoCarousel />
          <About />
          <Values />
          <Testimonials />
          <Projects />
          <Contact />
          <Footer />
        </Suspense>
      </main>
    </>
  );
}

export default App;
