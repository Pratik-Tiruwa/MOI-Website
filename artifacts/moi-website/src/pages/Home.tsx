import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Impact from "@/components/sections/Impact";
import Creators from "@/components/sections/Creators";
import Partners from "@/components/sections/Partners";
import Contact from "@/components/sections/Contact";
import OurWorks from "@/components/sections/OurWorks";
import CustomCursor from "@/components/ui/CustomCursor";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="bg-[#050505] min-h-screen text-foreground selection:bg-[#0066FF] selection:text-white">
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Impact />
        <Creators />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
