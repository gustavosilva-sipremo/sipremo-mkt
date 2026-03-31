import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Footer from "@/components/sections/Footer";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Values from "./components/sections/Values";

function App() {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Values />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
