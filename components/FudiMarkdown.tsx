import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const FudiMarkdown = ({ content }: { content: string }) => {
  // Función auxiliar para caracteres estilo matrix
  function getCodeChar() {
    const chars = "01⸻•△▢▣▤▥▦▧▨▩".split("");
    return chars[Math.floor(Math.random() * chars.length)];
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
        strong: ({ children }) => <strong className="text-cyan-400 font-semibold">{children}</strong>,
        ul: ({ children }) => <ul className="space-y-1 mb-4">{children}</ul>,
        li: ({ children }) => (
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>{children}</span>
          </li>
        ),
        h1: ({ children }) => <h1 className="text-xl font-semibold mb-3">{children}</h1>,
        h2: ({ children }) => <h2 className="text-lg font-semibold mb-2">{children}</h2>,
        h3: ({ children }) => <h3 className="text-base font-semibold mb-2">{children}</h3>,
        hr: () => {
          // FudiMatrix Footer con aura de papiro digital
          return (
            <div className="my-8 relative h-14 overflow-hidden rounded-full bg-gradient-to-b from-black to-gray-900 shadow-inner shadow-cyan-500/10">
              {/* Fondo dinámico tipo matrix rain */}
              <div className="absolute inset-0 flex items-center justify-center gap-3">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="relative flex flex-col gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <div
                        key={j}
                        className="text-cyan-300/20 text-xs font-mono animate-matrix-fall tracking-tight"
                        style={{
                          animationDelay: `${(i * 0.1) + (j * 0.2)}s`,
                          animationDuration: `${2 + (j * 0.5)}s`,
                        }}
                      >
                        {getCodeChar()}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Glow sutil */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent blur-sm pointer-events-none" />

              {/* Mensaje central con estética “relicario digital” */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="px-4 py-1 bg-black/60 backdrop-blur-md rounded-full border border-cyan-300/20 shadow-md shadow-cyan-200/10">
                  <span className="text-cyan-100 text-xs font-mono tracking-widest uppercase">
                    &lt; \_JOIN_THE_FUDIVERSE_ /&gt;
                  </span>
                </div>
              </div>
            </div>
          );
        },
        code: ({ node, children, ...props }) => {
          // @ts-ignore
          if (node && node.inline) {
            return (
              <code className="px-1 py-0.5 bg-white/10 rounded text-sm" {...props}>
                {children}
              </code>
            );
          }
          return (
            <pre className="p-3 bg-white/5 rounded-lg overflow-x-auto mb-3">
              <code {...props}>{children}</code>
            </pre>
          );
        },
        text: ({ value }: any) => {
          if (typeof value === 'string') {
            if (value.includes('├─') || value.includes('└─') || value.includes('→')) {
              return <span className="font-mono text-sm">{value}</span>;
            }
            if (value.match(/^═+$/) || value.match(/^─+$/)) {
              return <span className="block text-white/20 select-none">{value}</span>;
            }
          }
          return <>{value}</>;
        }
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
