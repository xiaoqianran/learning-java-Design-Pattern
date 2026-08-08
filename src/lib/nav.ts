import {
  Award,
  BookMarked,
  BookOpen,
  BookX,
  Boxes,
  FlaskConical,
  LayoutDashboard,
  Library,
  type LucideIcon,
} from "lucide-react";
import type { Lesson } from "@/data/lessons";
import { LESSONS, TRACKS, getCourseLessons } from "@/data/lessons";

export const TRACK_META: Record<Lesson["track"], { order: number; label: string; blurb: string }> =
  {
    基础: { order: 1, label: "① 设计基础", blurb: "原则 · 分类 · UML" },
    创建型: { order: 2, label: "② 创建型模式", blurb: "单例 · 工厂 · 建造 · 原型" },
    结构型: { order: 3, label: "③ 结构型模式", blurb: "适配 · 装饰 · 代理 · 外观" },
    行为型: { order: 4, label: "④ 行为型模式", blurb: "策略 · 观察者 · 状态 · 命令" },
    实战: { order: 5, label: "⑤ 实战与面试", blurb: "Spring · 案例 · 串讲" },
    速查: { order: 6, label: "⑥ 速查补全", blurb: "对比 · 选型 · 可选" },
  };

export function trackLabel(track: Lesson["track"]) {
  return TRACK_META[track]?.label ?? track;
}

export function orderedTracks(): Lesson["track"][] {
  return [...TRACKS].sort((a, b) => (TRACK_META[a]?.order ?? 99) - (TRACK_META[b]?.order ?? 99));
}

export function getValidCompleted(completed: string[]): string[] {
  const set = new Set(LESSONS.map((l) => l.slug));
  return completed.filter((s) => set.has(s));
}

export function completedCount(completed: string[]): number {
  const set = new Set(getValidCompleted(completed));
  return getCourseLessons().filter((l) => set.has(l.slug)).length;
}

export function progressPercent(completed: string[]): number {
  const core = getCourseLessons();
  if (core.length === 0) return 0;
  return Math.round((completedCount(completed) / core.length) * 100);
}

export function isAllComplete(completed: string[]): boolean {
  return getCourseLessons().every((l) => completed.includes(l.slug));
}

export function getContinueLesson(completed: string[]): Lesson {
  const coreNext = getCourseLessons().find((l) => !completed.includes(l.slug));
  if (coreNext) return coreNext;
  const next = LESSONS.find((l) => !completed.includes(l.slug));
  if (next) return next;
  return LESSONS[LESSONS.length - 1] ?? LESSONS[0]!;
}

export function getContinueHref(completed: string[]): {
  kind: "lesson" | "certificate";
  slug?: string;
} {
  if (isAllComplete(completed)) return { kind: "certificate" };
  return { kind: "lesson", slug: getContinueLesson(completed).slug };
}

export type NavItem = {
  to:
    | "/"
    | "/docs"
    | "/cheatsheet"
    | "/patterns"
    | "/playground"
    | "/lab"
    | "/hub"
    | "/mistakes"
    | "/certificate";
  label: string;
  hint?: string;
  icon: LucideIcon;
};

export const NAV_PRIMARY: NavItem[] = [
  { to: "/docs", label: "图谱", hint: "查 · 23 模式地图", icon: Library },
  { to: "/patterns", label: "沙盘", hint: "练 · 场景匹配", icon: Boxes },
  { to: "/hub", label: "进度", hint: "我 · 学习中心", icon: LayoutDashboard },
];

export const NAV_TOOLS: NavItem[] = [
  { to: "/cheatsheet", label: "速查表", hint: "一页纸复习", icon: BookMarked },
  { to: "/playground", label: "代码库", hint: "Java 片段速览", icon: BookOpen },
  { to: "/lab", label: "练习场", hint: "刷测验题", icon: FlaskConical },
  { to: "/mistakes", label: "错题本", hint: "错题重练", icon: BookX },
  { to: "/certificate", label: "结业证书", hint: "全部完成后解锁", icon: Award },
];

export const NAV_HOME: NavItem = {
  to: "/",
  label: "学 · 首页",
  hint: "路径与大纲",
  icon: BookOpen,
};
