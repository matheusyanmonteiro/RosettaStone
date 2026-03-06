import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import ThemeVisuals from "@/components/ThemeVisuals"; // Importe o gerenciador
import { getDictionary } from "@/lib/get-dictionary";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

export default async function Page({ params }: { params: Promise<{ lang: any }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      {/* O ThemeVisuals cuida do MatrixRain vs NeuromancerBackground internamente */}
      <ThemeVisuals />
      
      <Navbar dict={dict} />
      
      <main className="relative z-10">
        <HeroSection dict={dict} />
        <AboutSection dict={dict} />
        <ProjectsSection dict={dict} />
        <ContactSection dict={dict} />
      </main>
    </>
  );
}