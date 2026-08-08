import { createFileRoute, Link } from "@tanstack/react-router";
import { LESSONS, getLessonsByTrack, type Lesson } from "@/data/lessons";
import { trackLabel, orderedTracks } from "@/lib/nav";
import { useProgress } from "@/store/progress";
import { Check, ExternalLink, Library } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/docs")({
  component: DocsPage,
});

const GOF: { cat: string; items: { name: string; slug: string }[] }[] = [
  {
    cat: "创建型 Creational",
    items: [
      { name: "Singleton", slug: "singleton" },
      { name: "Factory Method", slug: "factory-method" },
      { name: "Abstract Factory", slug: "abstract-factory" },
      { name: "Builder", slug: "builder" },
      { name: "Prototype", slug: "prototype" },
    ],
  },
  {
    cat: "结构型 Structural",
    items: [
      { name: "Adapter", slug: "adapter" },
      { name: "Bridge", slug: "bridge" },
      { name: "Composite", slug: "composite" },
      { name: "Decorator", slug: "decorator" },
      { name: "Facade", slug: "facade" },
      { name: "Flyweight", slug: "flyweight" },
      { name: "Proxy", slug: "proxy" },
    ],
  },
  {
    cat: "行为型 Behavioral",
    items: [
      { name: "Strategy", slug: "strategy" },
      { name: "Observer", slug: "observer" },
      { name: "Command", slug: "command" },
      { name: "Template Method", slug: "template-method" },
      { name: "Iterator", slug: "iterator" },
      { name: "State", slug: "state" },
      { name: "Chain of Responsibility", slug: "chain" },
      { name: "Mediator", slug: "mediator" },
      { name: "Memento", slug: "memento" },
      { name: "Visitor", slug: "visitor" },
      { name: "Interpreter", slug: "interpreter" },
    ],
  },
];

function DocsPage() {
  const completed = useProgress((s) => s.completed);
  return (
    <div className="mx-auto max-w-3xl pb-16">
      <header className="mb-8">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          <Library className="h-3.5 w-3.5" />
          模式图谱
        </p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-fg sm:text-3xl">
          GoF 23 + 学习路径
        </h1>
        <p className="mt-2 text-sm text-muted">
          点击进入对应课程。外部精讲默认指向 refactoring.guru（英文图解极佳）。
        </p>
      </header>

      <div className="space-y-8">
        {GOF.map((g) => (
          <section key={g.cat}>
            <h2 className="font-display text-base font-semibold text-fg">{g.cat}</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {g.items.map((it) => {
                const lesson = LESSONS.find((l) => l.slug === it.slug);
                const done = completed.includes(it.slug);
                return (
                  <li key={it.slug}>
                    <Link
                      to="/lesson/$slug"
                      params={{ slug: it.slug }}
                      className={cn(
                        "flex items-center justify-between gap-2 rounded-lg border px-3 py-2.5 no-underline transition-colors",
                        done
                          ? "border-primary/30 bg-primary-soft"
                          : "border-border bg-surface hover:bg-surface-2",
                      )}
                    >
                      <span>
                        <span className="block text-sm font-medium text-fg">{it.name}</span>
                        {lesson ? (
                          <span className="block text-[11px] text-muted">{lesson.summary}</span>
                        ) : null}
                      </span>
                      {done ? <Check className="h-4 w-4 shrink-0 text-primary" /> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="font-display text-base font-semibold text-fg">按本站路径</h2>
        <div className="mt-3 space-y-4">
          {orderedTracks().map((track) => {
            const list = getLessonsByTrack(track as Lesson["track"]);
            return (
              <div key={track} className="rounded-xl border border-border bg-surface p-4">
                <p className="text-sm font-semibold text-fg">{trackLabel(track as Lesson["track"])}</p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {list.map((l) => (
                    <li key={l.slug}>
                      <Link
                        to="/lesson/$slug"
                        params={{ slug: l.slug }}
                        className="inline-flex rounded-full border border-border bg-bg px-2.5 py-1 text-[11px] text-muted no-underline hover:text-fg"
                      >
                        {l.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <p className="mt-8 text-xs text-subtle">
        <a
          href="https://refactoring.guru/design-patterns"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-primary no-underline hover:underline"
        >
          <ExternalLink className="h-3 w-3" />
          refactoring.guru/design-patterns
        </a>
      </p>
    </div>
  );
}
