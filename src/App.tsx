import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Footer from "@/components/sections/Footer";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Values from "./components/sections/Values";
import InfiniteLogoCarousel from "./components/others/InfiniteLogoCarousel";
import Testimonials from "./components/sections/Testimonials";

function App() {
  return (
    <div>
      <Header />
      <Hero />
      <InfiniteLogoCarousel />
      <About />
      <Values />
      <Testimonials />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
