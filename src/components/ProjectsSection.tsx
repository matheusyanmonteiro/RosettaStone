'use client';

const ProjectsSection = ({ dict }: { dict: any }) => {
  return (
    <section id="projects" className="relative py-32 px-6 z-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/50" />
          <h2 className="font-display text-2xl md:text-3xl tracking-widest text-primary glow-cyan">
            {`// ${dict.nav.projects.toUpperCase()}`}
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/50" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {dict.projects?.map((project: any, i: number) => (
            <div
              key={i}
              className="group border border-border bg-card/40 backdrop-blur-sm p-6 hover:border-primary/50 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/50" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/50" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/50" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/50" />
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg tracking-wider text-primary group-hover:glow-cyan">
                  {project.title}
                </h3>
                <span className="font-mono text-[10px] tracking-widest px-2 py-1 text-secondary border border-secondary/30 bg-secondary/5">
                  DEPLOYED
                </span>
              </div>
              <p className="text-foreground/60 text-sm mb-6 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech: string) => (
                  <span key={tech} className="font-mono text-[11px] text-muted-foreground border border-border px-2 py-0.5">
                    {tech}
                  </span>
                ))}
              </div>
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" className="inline-block mt-4 text-xs text-primary underline decoration-primary/30">
                  {">"} REPOSITORY_ACCESS
                </a>
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;