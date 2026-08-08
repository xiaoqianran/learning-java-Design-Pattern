import { createFileRoute, Link } from "@tanstack/react-router";
import { LESSONS, getLessonsByTrack } from "@/data/lessons";
import { useProgress } from "@/store/progress";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  Sparkles,
  Search,
  Library,
  BookMarked,
  Boxes,
  FlaskConical,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import {
  completedCount,
  getContinueLesson,
  isAllComplete,
  orderedTracks,
  progressPercent,
  TRACK_META,
  trackLabel,
} from "@/lib/nav";

export const Route = createFileRoute("/")({
  component: HomePage,
});

type TrackFilter = "全部" | (typeof LESSONS)[number]["track"];

function HomePage() {
  const completed = useProgress((s) => s.completed);
  const quizScores = useProgress((s) => s.quizScores);
  const streak = useProgress((s) => s.streak);
  const [q, setQ] = useState("");
  const [track, setTrack] = useState<TrackFilter>("全部");

  const progress = progressPercent(completed);
  const doneCount = completedCount(completed);
  const cont = getContinueLesson(completed);
  const contIdx = LESSONS.findIndex((l) => l.slug === cont.slug);
  const allDone = isAllComplete(completed);

  const filtered = useMemo(() => {
    let list = track === "全部" ? LESSONS : getLessonsByTrack(track);
    const s = q.trim().toLowerCase();
    if (s) {
      list = list.filter(
        (l) =>
          l.title.toLowerCase().includes(s) ||
          l.summary.toLowerCase().includes(s) ||
          l.slug.includes(s),
      );
    }
    return list;
  }, [q, track]);

  const pathCards = orderedTracks().map((t) => {
    const list = getLessonsByTrack(t);
    const done = list.filter((l) => completed.includes(l.slug)).length;
    return {
      track: t,
      ...TRACK_META[t],
      done,
      total: list.length,
      pct: list.length ? Math.round((done / list.length) * 100) : 0,
    };
  });

  return (
    <div className="mx-auto max-w-3xl pb-16">
      <section className="relative overflow-hidden rounded-xl border border-border bg-surface px-5 py-8 sm:px-8 sm:py-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(600px 200px at 10% -10%, color-mix(in oklab, var(--color-primary) 18%, transparent), transparent 70%)",
          }}
        />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-2">
            <p className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg/60 px-2.5 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              v1 · GoF 23 + SOLID + Spring
            </p>
            {streak > 0 ? (
              <span className="rounded-full bg-surface-3 px-2.5 py-1 font-mono text-xs text-muted">
                连续 {streak} 天
              </span>
            ) : null}
          </div>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance text-fg sm:text-4xl">
            系统学 Java 设计模式
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
            讲解 + Java 源码 + 交互沙盘 + 小测验。从 SOLID 到 GoF 23，再到 Spring
            落地与面试串讲——参考 learning-vue3 的「读一点、动手一点、测一点」。
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {allDone ? (
              <Link
                to="/certificate"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-fg no-underline hover:bg-primary-dim"
              >
                查看结业证明
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link
                to="/lesson/$slug"
                params={{ slug: cont.slug }}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-fg no-underline hover:bg-primary-dim"
              >
                {doneCount ? "继续学习" : "开始第一课"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
            <Link
              to="/docs"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-surface-2 px-4 text-sm font-medium text-fg no-underline hover:bg-surface-3"
            >
              模式图谱
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-primary" />
              {LESSONS.length} 节课
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-primary" />
              已完成 {doneCount}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-primary" />
              进度 {progress}%
            </span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-3">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          {!allDone ? (
            <p className="mt-2 text-xs text-subtle">
              下一课：第 {contIdx + 1} 节 · {cont.title}
            </p>
          ) : null}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold text-fg">学习路径</h2>
        <p className="mt-1 text-sm text-muted">建议顺序：基础 → 创建 → 结构 → 行为 → 实战</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {pathCards.map((c) => (
            <button
              key={c.track}
              type="button"
              onClick={() => setTrack(c.track)}
              className={cn(
                "rounded-xl border p-4 text-left transition-colors",
                track === c.track
                  ? "border-primary/40 bg-primary-soft"
                  : "border-border bg-surface hover:border-border-strong hover:bg-surface-2",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-fg">{c.label}</p>
                  <p className="mt-0.5 text-xs text-muted">{c.blurb}</p>
                </div>
                <span className="font-mono text-[11px] tabular-nums text-subtle">
                  {c.done}/{c.total}
                </span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-3">
                <div className="h-full rounded-full bg-primary" style={{ width: `${c.pct}%` }} />
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[12rem] flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="搜索课程、模式名…"
              className="h-10 w-full rounded-lg border border-border bg-surface pl-9 pr-3 text-sm text-fg placeholder:text-subtle"
            />
          </div>
          <Button
            size="sm"
            variant={track === "全部" ? "default" : "secondary"}
            onClick={() => setTrack("全部")}
          >
            全部
          </Button>
        </div>

        <ul className="mt-4 space-y-2">
          {filtered.map((lesson, i) => {
            const done = completed.includes(lesson.slug);
            const score = quizScores[lesson.slug];
            const globalIdx = LESSONS.findIndex((l) => l.slug === lesson.slug);
            return (
              <li key={lesson.slug}>
                <Link
                  to="/lesson/$slug"
                  params={{ slug: lesson.slug }}
                  className="flex items-start gap-3 rounded-xl border border-border bg-surface p-3 no-underline transition-colors hover:border-border-strong hover:bg-surface-2 sm:p-4"
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-xs font-medium",
                      done ? "bg-primary text-primary-fg" : "bg-surface-3 text-muted",
                    )}
                  >
                    {done ? <Check className="h-4 w-4" /> : globalIdx + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-fg">{lesson.title}</span>
                      <span className="rounded-full bg-surface-3 px-2 py-0.5 text-[10px] text-muted">
                        {trackLabel(lesson.track)}
                      </span>
                      <span className="text-[10px] text-subtle">{lesson.level}</span>
                    </span>
                    <span className="mt-0.5 block text-sm text-muted">{lesson.summary}</span>
                    <span className="mt-1 flex flex-wrap gap-2 text-[11px] text-subtle">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />约 {lesson.minutes} 分钟
                      </span>
                      {score !== undefined ? <span>测验 {score}%</span> : null}
                    </span>
                  </span>
                  <ArrowRight className="mt-2 h-4 w-4 shrink-0 text-subtle" />
                </Link>
              </li>
            );
          })}
          {filtered.length === 0 ? (
            <li className="py-10 text-center text-sm text-muted">无匹配课程</li>
          ) : null}
        </ul>
      </section>

      <section className="mt-10 grid gap-3 sm:grid-cols-2">
        {[
          { to: "/docs" as const, icon: Library, label: "模式图谱", hint: "23 模式一览" },
          { to: "/patterns" as const, icon: Boxes, label: "模式沙盘", hint: "场景匹配练习" },
          { to: "/cheatsheet" as const, icon: BookMarked, label: "速查表", hint: "一页纸复习" },
          { to: "/lab" as const, icon: FlaskConical, label: "练习场", hint: "混合刷题" },
          { to: "/hub" as const, icon: LayoutDashboard, label: "学习中心", hint: "打卡与收藏" },
          { to: "/playground" as const, icon: BookOpen, label: "代码库", hint: "Java 片段" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 no-underline transition-colors hover:bg-surface-2"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-medium text-fg">{item.label}</span>
                <span className="block text-xs text-muted">{item.hint}</span>
              </span>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
