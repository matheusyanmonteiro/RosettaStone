'use client';

const AboutSection = ({ dict }: { dict: any }) => {
  return (
    <section id="about" className="relative py-32 px-6 z-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/50" />
          <h2 className="font-display text-2xl md:text-3xl tracking-widest text-primary glow-cyan">
            {dict.about.title}
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/50" />
        </div>
        <div className="retro-border p-8 md:p-12 bg-card/80 backdrop-blur-sm">
          <div className="font-mono text-sm text-muted-foreground mb-4">
            <span className="text-secondary">const</span>{" "}
            <span className="text-primary">developer</span> = {"{"}
          </div>
          <div className="pl-6 space-y-3 font-mono text-sm">
            <p><span className="text-accent">nome</span>: <span className="text-foreground">"{dict.about.name}"</span>,</p>
            <p><span className="text-accent">localização</span>: <span className="text-foreground">"{dict.about.location}"</span>,</p>
            <p><span className="text-accent">formação</span>: <span className="text-foreground">"Engenharia de Software (UnB)"</span>,</p>
            <p><span className="text-accent">foco</span>: <span className="text-foreground">"{dict.about.focus}"</span>,</p>
            <p><span className="text-accent">stack_principal</span>: <span className="text-foreground">["Node.js", "TypeScript", "Delphix", "Terraform"]</span></p>
          </div>
          <div className="font-mono text-sm text-muted-foreground mt-4">{"}"};</div>
          <p className="mt-8 text-foreground/80 text-lg leading-relaxed font-body">
            {dict.about.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;