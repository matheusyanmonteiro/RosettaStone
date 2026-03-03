'use client';

const ContactSection = ({ dict }: { dict: any }) => {
  return (
    <section id="contact" className="relative py-32 px-6 z-10">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/50" />
          <h2 className="font-display text-2xl md:text-3xl tracking-widest text-primary glow-cyan">
            {dict.contact.title}
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/50" />
        </div>
        <div className="retro-border p-8 md:p-12 bg-card/80 backdrop-blur-sm">
          <div className="font-mono text-sm text-muted-foreground mb-8">
            <span className="text-secondary">{">"}</span> {dict.contact.subtitle}
          </div>
          <div className="space-y-4 font-mono text-sm text-left md:text-center">
            <a href="mailto:matheusyanmonteiro@gmail.com" className="block text-primary hover:glow-cyan transition-all tracking-wider">
              ╠══ EMAIL: matheusyanmonteiro@gmail.com
            </a>
            <a href="https://github.com/matheusyanmonteiro" target="_blank" className="block text-secondary hover:glow-green transition-all tracking-wider">
              ╠══ GITHUB: github.com/matheusyanmonteiro
            </a>
            <a href="https://linkedin.com/in/matheusyanmonte76iro-b5788a208" target="_blank" className="block text-accent hover:glow-magenta transition-all tracking-wider">
              ╠══ LINKEDIN: linkedin.com/in/matheusyanmonte76iro
            </a>
          </div>
        </div>
        <footer className="mt-24 font-mono text-xs text-muted-foreground/40 tracking-widest">
          <p>{"<"}/{">"} BUILT BY MATHEUS — {new Date().getFullYear()}</p>
          <p className="mt-2">[ STATUS: {dict.contact.status} ]</p>
        </footer>
      </div>
    </section>
  );
};

export default ContactSection;