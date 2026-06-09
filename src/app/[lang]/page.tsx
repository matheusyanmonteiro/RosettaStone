import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import { getDictionary } from "@/lib/get-dictionary";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Terminal from "@/components/Terminal";

export default async function Page({ params }: { params: Promise<{ lang: any }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="relative z-10">
      <HeroSection dict={dict} lang={lang} />
      <AboutSection dict={dict} />
      <ProjectsSection />
      <section className="container mx-auto px-6 py-10">
        <Terminal dict={dict} lang={lang} />
      </section>
      <ContactSection dict={dict} />
    </main>
  );
}