import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { Work } from "@/components/portfolio/Work";
import { Contact } from "@/components/portfolio/Contact";

const Index = () => {
  return (
    <main id="main-content" className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Work />
      <Experience />
      <Contact />
    </main>
  );
};

export default Index;
