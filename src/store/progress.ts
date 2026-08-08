import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCourseLessons, LESSONS } from "@/data/lessons";

export type WrongItem = {
  id: string;
  lessonSlug: string;
  question: string;
  options: string[];
  answer: number;
  explain: string;
  wrongChoice: number;
  at: number;
};

type ProgressState = {
  visited: string[];
  completed: string[];
  mastered: string[];
  quizScores: Record<string, number>;
  bookmarks: string[];
  notes: Record<string, string>;
  wrongBook: WrongItem[];
  checkIns: string[];
  streak: number;
  markVisited: (slug: string) => void;
  markComplete: (slug: string) => void;
  markMastered: (slug: string) => void;
  setQuizScore: (slug: string, score: number) => void;
  toggleBookmark: (slug: string) => void;
  setNote: (slug: string, text: string) => void;
  addWrong: (item: Omit<WrongItem, "at">) => void;
  clearWrong: (id: string) => void;
  clearAllWrong: () => void;
  checkInToday: () => void;
  reset: () => void;
};

function todayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function yesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function computeStreak(checkIns: string[]): number {
  if (checkIns.length === 0) return 0;
  const set = new Set(checkIns);
  let streak = 0;
  const cursor = new Date();
  if (!set.has(todayKey())) {
    cursor.setDate(cursor.getDate() - 1);
  }
  for (;;) {
    const y = cursor.getFullYear();
    const m = String(cursor.getMonth() + 1).padStart(2, "0");
    const day = String(cursor.getDate()).padStart(2, "0");
    const key = `${y}-${m}-${day}`;
    if (!set.has(key)) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function uniqPush(list: string[], slug: string) {
  return list.includes(slug) ? list : [...list, slug];
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      visited: [],
      completed: [],
      mastered: [],
      quizScores: {},
      bookmarks: [],
      notes: {},
      wrongBook: [],
      checkIns: [],
      streak: 0,
      markVisited: (slug) => set((s) => ({ visited: uniqPush(s.visited, slug) })),
      markComplete: (slug) =>
        set((s) => ({
          visited: uniqPush(s.visited, slug),
          completed: uniqPush(s.completed, slug),
        })),
      markMastered: (slug) =>
        set((s) => ({
          visited: uniqPush(s.visited, slug),
          completed: uniqPush(s.completed, slug),
          mastered: uniqPush(s.mastered, slug),
        })),
      setQuizScore: (slug, score) =>
        set((s) => ({
          quizScores: { ...s.quizScores, [slug]: score },
        })),
      toggleBookmark: (slug) =>
        set((s) => ({
          bookmarks: s.bookmarks.includes(slug)
            ? s.bookmarks.filter((b) => b !== slug)
            : [...s.bookmarks, slug],
        })),
      setNote: (slug, text) =>
        set((s) => ({
          notes: { ...s.notes, [slug]: text },
        })),
      addWrong: (item) =>
        set((s) => {
          const filtered = s.wrongBook.filter((w) => w.id !== item.id);
          return {
            wrongBook: [{ ...item, at: Date.now() }, ...filtered].slice(0, 80),
          };
        }),
      clearWrong: (id) =>
        set((s) => ({
          wrongBook: s.wrongBook.filter((w) => w.id !== id),
        })),
      clearAllWrong: () => set({ wrongBook: [] }),
      checkInToday: () => {
        const key = todayKey();
        const { checkIns } = get();
        if (checkIns.includes(key)) {
          set({ streak: computeStreak(checkIns) });
          return;
        }
        const next = [...checkIns, key];
        set({ checkIns: next, streak: computeStreak(next) });
        void yesterdayKey;
      },
      reset: () =>
        set({
          visited: [],
          completed: [],
          mastered: [],
          quizScores: {},
          bookmarks: [],
          notes: {},
          wrongBook: [],
          checkIns: [],
          streak: 0,
        }),
    }),
    {
      name: "java-dp-learn-progress-v1",
      version: 1,
    },
  ),
);

export { todayKey, computeStreak };

export function isCertificateReady(mastered: string[], completed?: string[]) {
  const core = getCourseLessons();
  const hasAnyMastered = mastered.length > 0;
  if (hasAnyMastered) {
    return core.every((l) => mastered.includes(l.slug));
  }
  if (completed) {
    return core.every((l) => completed.includes(l.slug));
  }
  return false;
}

export function coreProgress(completed: string[], mastered: string[]) {
  const core = getCourseLessons();
  const done = core.filter((l) => completed.includes(l.slug)).length;
  const mast = core.filter((l) => mastered.includes(l.slug)).length;
  return {
    total: core.length,
    completed: done,
    mastered: mast,
    pctComplete: core.length ? Math.round((done / core.length) * 100) : 0,
    pctMastered: core.length ? Math.round((mast / core.length) * 100) : 0,
  };
}

export function lessonUniverse() {
  return LESSONS;
}
