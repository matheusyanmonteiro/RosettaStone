'use client';

import { useEffect, useState } from "react";
import DecryptText from "./DecryptText";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
}

interface UserData {
  public_repos: number;
  login: string;
}

const PER_PAGE = 4;

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  Ruby: "#701516",
  Go: "#00ADD8",
  Rust: "#dea584",
  "C#": "#178600",
  "C++": "#f34b7d",
  C: "#555555",
  Shell: "#89e051",
  PHP: "#4F5D95",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Dart: "#00B4AB",
  Lua: "#000080",
  Scala: "#c22d40",
};

const ProjectsSection = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(repos.length / PER_PAGE));
  const startIndex = (page - 1) * PER_PAGE;
  const displayedRepos = repos.slice(startIndex, startIndex + PER_PAGE);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch("https://api.github.com/users/matheusyanmonteiro", {
            signal: controller.signal,
          }),
          fetch(
            "https://api.github.com/users/matheusyanmonteiro/repos?sort=updated&per_page=20",
            { signal: controller.signal }
          ),
        ]);

        if (!userRes.ok || !reposRes.ok) {
          setError(true);
          setLoading(false);
          return;
        }

        const user: UserData = await userRes.json();
        const reposData: Repo[] = await reposRes.json();

        setUserData(user);
        setRepos(reposData.filter((r) => !r.fork));
        setLoading(false);
      } catch {
        if (!controller.signal.aborted) {
          setError(true);
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [repos]);

  return (
    <section id="projects" className="relative py-32 px-6 z-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/50" />
          <h2 className="font-display text-2xl md:text-3xl tracking-widest text-primary glow-cyan">
            {"// REPOSITÓRIOS"}
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/50" />
        </div>

        {loading && (
          <div className="text-center font-mono text-sm text-muted-foreground animate-pulse">
            {">"} SYS: LOADING_REPOSITORIES...
          </div>
        )}

        {error && (
          <div className="text-center font-mono text-sm text-destructive">
            {">"} ERR: FAILED_TO_LOAD_REPOSITORIES
          </div>
        )}

        {!loading && !error && userData && (
          <div className="text-center font-mono text-xs text-muted-foreground mb-8 tracking-widest">
            <span className="text-primary">[ {userData.public_repos} ]</span>{" "}
            REPOSITORIES_LOADED —{" "}
            <a
              href={`https://github.com/${userData.login}`}
              target="_blank"
              className="text-primary hover:glow-cyan underline decoration-primary/30"
            >
              github.com/{userData.login}
            </a>
          </div>
        )}

        {!loading && !error && repos.length === 0 && (
          <div className="text-center font-mono text-sm text-muted-foreground">
            {">"} NO_REPOSITORIES_FOUND
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayedRepos.map((repo) => {
            const langColor = repo.language
              ? languageColors[repo.language]
              : undefined;
            const tags = [
              ...(repo.language ? [repo.language] : []),
              ...repo.topics,
            ];

            return (
              <div
                key={repo.id}
                className="group border border-border bg-card/40 backdrop-blur-sm p-6 hover:border-primary/50 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/50" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/50" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/50" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/50" />

                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg tracking-wider text-primary group-hover:glow-cyan">
                    <DecryptText text={repo.name.replace(/-/g, "_").toUpperCase()} />
                  </h3>
                  <div className="flex gap-3 font-mono text-[10px] text-muted-foreground">
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        {repo.stargazers_count}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <span className="text-primary/50">⑂</span>
                      {repo.forks_count}
                    </span>
                  </div>
                </div>

                <p className="text-foreground/60 text-sm mb-6 leading-relaxed min-h-[3rem]">
                  {repo.description || "NO_DESCRIPTION_AVAILABLE"}
                </p>

                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => {
                    const isLang = tag === repo.language;
                    return (
                      <span
                        key={tag}
                        className="font-mono text-[11px] border px-2 py-0.5 flex items-center gap-1"
                        style={{
                          color: isLang && langColor ? langColor : undefined,
                          borderColor:
                            isLang && langColor ? langColor + "80" : undefined,
                        }}
                      >
                        {isLang && langColor && (
                          <span
                            className="inline-block w-2 h-2 rounded-full"
                            style={{ backgroundColor: langColor }}
                          />
                        )}
                        {tag}
                      </span>
                    );
                  })}
                </div>

                <a
                  href={repo.html_url}
                  target="_blank"
                  className="inline-block mt-4 text-xs text-primary underline decoration-primary/30 hover:glow-cyan transition-all"
                >
                  {">"} REPOSITORY_ACCESS
                </a>

                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {!loading && !error && totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-12 font-mono text-sm">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-3 py-1 border transition-all duration-300 tracking-widest ${
                    pageNum === page
                      ? "bg-primary text-background border-primary glow-cyan"
                      : "border-primary/30 text-primary hover:border-primary hover:bg-primary/10"
                  }`}
                >
                  [ {pageNum} ]
                </button>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
