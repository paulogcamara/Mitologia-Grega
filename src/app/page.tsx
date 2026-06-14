"use client";

import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { Loader } from "@/components/ui/Loader";
import { SoundToggle } from "@/components/ui/SoundToggle";
import { Hero } from "@/components/sections/Hero";
import { Gods } from "@/components/sections/Gods";
import { Descent } from "@/components/sections/Descent";
import { Underworld } from "@/components/sections/Underworld";
import { Return } from "@/components/sections/Return";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Loader />
      <SoundToggle />
      <main>
        <Hero />
        <Gods />
        <Descent />
        <Underworld />
        <Return />
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
