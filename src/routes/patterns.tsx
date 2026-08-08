import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Boxes } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/patterns")({
  component: PatternsLabPage,
});

const QUESTS = [
  {
    id: 1,
    scene: "收银台要支持支付宝 / 微信 / 银行卡，未来还要加 Apple Pay",
    answer: "Strategy",
    options: ["Singleton", "Strategy", "Flyweight", "Memento"],
    tip: "算法（支付方式）可互换 → 策略",
  },
  {
    id: 2,
    scene: "接入旧版报表 SDK，方法名和参数都对不上新系统接口",
    answer: "Adapter",
    options: ["Adapter", "Decorator", "Proxy", "Facade"],
    tip: "接口不兼容 → 适配器",
  },
  {
    id: 3,
    scene: "图片很大，列表先占位，点开再真正加载解码",
    answer: "Proxy",
    options: ["Prototype", "Proxy", "Builder", "Visitor"],
    tip: "控制访问 + 懒加载 → 代理",
  },
  {
    id: 4,
    scene: "订单：待支付 → 已支付 → 已发货 → 完成，每步允许操作不同",
    answer: "State",
    options: ["State", "Strategy", "Iterator", "Interpreter"],
    tip: "状态迁移驱动行为 → 状态模式",
  },
  {
    id: 5,
    scene: "请假：组长批 → 经理批 → 总监批，金额不同走人不同",
    answer: "Chain",
    options: ["Mediator", "Chain", "Command", "Observer"],
    tip: "处理者链路 → 责任链",
  },
  {
    id: 6,
    scene: "咖啡 + 奶 + 摩卡，价格与描述动态叠加",
    answer: "Decorator",
    options: ["Decorator", "Adapter", "Composite", "Bridge"],
    tip: "同接口叠加职责 → 装饰器",
  },
];

function PatternsLabPage() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = QUESTS[i]!;

  function pick(opt: string) {
    if (picked) return;
    setPicked(opt);
    if (opt === q.answer) setScore((s) => s + 1);
  }

  function next() {
    if (i >= QUESTS.length - 1) {
      setDone(true);
      return;
    }
    setI((x) => x + 1);
    setPicked(null);
  }

  function reset() {
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  }

  return (
    <div className="mx-auto max-w-3xl pb-16">
      <header className="mb-8">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          <Boxes className="h-3.5 w-3.5" />
          模式沙盘
        </p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-fg">场景 → 模式匹配</h1>
        <p className="mt-2 text-sm text-muted">读业务场景，选出最贴切的模式。练的是「选型语感」。 </p>
      </header>

      {done ? (
        <div className="rounded-xl border border-border bg-surface p-6 text-center">
          <p className="font-display text-xl font-semibold text-fg">
            完成！{score}/{QUESTS.length}
          </p>
          <p className="mt-2 text-sm text-muted">
            {score >= 5 ? "选型感觉不错，去面试串讲课巩固表达。" : "回课程看看易混对比，再来一轮。"}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Button onClick={reset}>再来一轮</Button>
            <Link
              to="/lesson/$slug"
              params={{ slug: "interview" }}
              className="inline-flex h-10 items-center rounded-md border border-border bg-surface-2 px-4 text-sm text-fg no-underline"
            >
              去面试串讲
            </Link>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-surface p-5 shadow-soft">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>
              第 {i + 1}/{QUESTS.length} 关
            </span>
            <span className="font-mono">得分 {score}</span>
          </div>
          <p className="mt-4 text-[15px] leading-relaxed text-fg">{q.scene}</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {q.options.map((opt) => {
              let cls = "border-border bg-surface-2 hover:border-border-strong";
              if (picked) {
                if (opt === q.answer) cls = "border-primary/50 bg-primary-soft";
                else if (opt === picked) cls = "border-danger/40 bg-danger/10";
                else cls = "border-border bg-surface-2 opacity-60";
              } else if (picked === opt) {
                cls = "border-primary bg-primary-soft";
              }
              return (
                <button
                  key={opt}
                  type="button"
                  disabled={!!picked}
                  onClick={() => pick(opt)}
                  className={cn("rounded-md border px-3 py-2.5 text-left text-sm transition-colors", cls)}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {picked ? (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
              <p className={cn("text-sm", picked === q.answer ? "text-primary" : "text-warn")}>
                {picked === q.answer ? "正确。" : `更贴 ${q.answer}。`} {q.tip}
              </p>
              <Button size="sm" onClick={next}>
                {i >= QUESTS.length - 1 ? "看成绩" : "下一关"}
              </Button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
