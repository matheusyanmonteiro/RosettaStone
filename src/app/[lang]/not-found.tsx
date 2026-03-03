import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden font-mono">
      <div className="scanlines" />
      <div className="crt-flicker" />
      <div className="text-center z-10 p-10 border border-destructive/50 bg-destructive/5 backdrop-blur-md relative">
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-destructive" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-destructive" />
        <h1 className="text-7xl md:text-9xl font-bold text-destructive glitch mb-4" data-text="404">
          404
        </h1>
        <p className="text-xl md:text-2xl text-foreground mb-8 tracking-[0.2em] uppercase">
          {">"} CRITICAL_ERROR: ROUTE_NOT_FOUND
        </p>
        <div className="space-y-4 mb-12 text-sm text-muted-foreground opacity-70">
          <p>CODE: ERR_SYSTEM_NAVIGATION_FAILURE</p>
          <p>STATUS: UNRECOVERABLE_PATH</p>
        </div>
        <Link 
          href="/" 
          className="retro-border px-8 py-3 text-primary hover:bg-primary/10 transition-all duration-300 inline-block"
        >
          [ REBOOT_SYSTEM ]
        </Link>
      </div>
      <div className="absolute inset-0 opacity-20 pointer-events-none select-none">
      </div>
    </div>
  );
}