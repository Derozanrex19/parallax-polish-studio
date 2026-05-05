import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { Work } from "@/components/portfolio/Work";
import { Stack } from "@/components/portfolio/Stack";
import { Education } from "@/components/portfolio/Education";
import { Contact } from "@/components/portfolio/Contact";

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Work />
      <Stack />
      <Education />
      <Contact />
    </main>
  );
};

export default Index;
