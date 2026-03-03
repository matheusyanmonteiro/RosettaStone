import { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30 hover:border-blue-500">
      <span className="text-xs font-mono text-blue-500 dark:text-blue-400">
        {project.category}
      </span>
      <h2 className="mb-3 text-2xl font-semibold">
        {project.title}{" "}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
      <p className="m-0 max-w-[30ch] text-sm opacity-70 mb-4">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.map((tech) => (
          <span key={tech} className="text-[10px] bg-blue-100 text-blue-800 px-2 py-1 rounded dark:bg-blue-900 dark:text-blue-100">
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-4 text-sm font-medium">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" className="hover:underline text-blue-600">GitHub</a>
        )}
        {project.deployUrl && (
          <a href={project.deployUrl} target="_blank" className="hover:underline text-green-600">Live Demo</a>
        )}
      </div>
    </div>
  );
}