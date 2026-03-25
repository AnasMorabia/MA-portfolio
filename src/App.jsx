import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import OrbitalField from "./components/OrbitalField";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <OrbitalField />
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
