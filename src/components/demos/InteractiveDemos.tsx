import { useMemo, useState } from "react";
import type { DemoKind } from "@/data/lessons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function InteractiveDemo({
  kind,
  title,
  hint,
}: {
  kind: DemoKind;
  title: string;
  hint?: string;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-surface shadow-soft">
      <div className="border-b border-border px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">
          交互 Demo · 模式沙盘
        </p>
        <h3 className="mt-0.5 font-display text-base font-semibold text-fg">{title}</h3>
        {hint ? <p className="mt-1 text-sm text-muted">{hint}</p> : null}
      </div>
      <div className="p-4 sm:p-5">
        <DemoBody kind={kind} />
      </div>
    </section>
  );
}

function Log({ lines }: { lines: string[] }) {
  return (
    <pre className="mt-3 max-h-40 overflow-auto rounded-lg border border-border bg-code-bg p-3 font-mono text-[12px] leading-relaxed text-code-fg">
      {lines.length ? lines.map((l, i) => <div key={i}>{l}</div>) : <span className="text-subtle">日志为空 — 点上方按钮试试</span>}
    </pre>
  );
}

function DemoBody({ kind }: { kind: DemoKind }) {
  switch (kind) {
    case "intro":
      return <IntroDemo />;
    case "solid":
      return <SolidDemo />;
    case "classify":
      return <ClassifyDemo />;
    case "singleton":
      return <SingletonDemo />;
    case "factory":
    case "abstract-factory":
      return <FactoryDemo abstractMode={kind === "abstract-factory"} />;
    case "builder":
      return <BuilderDemo />;
    case "prototype":
      return <PrototypeDemo />;
    case "adapter":
      return <AdapterDemo />;
    case "bridge":
      return <BridgeDemo />;
    case "composite":
      return <CompositeDemo />;
    case "decorator":
      return <DecoratorDemo />;
    case "facade":
      return <FacadeDemo />;
    case "flyweight":
      return <FlyweightDemo />;
    case "proxy":
      return <ProxyDemo />;
    case "strategy":
      return <StrategyDemo />;
    case "observer":
      return <ObserverDemo />;
    case "command":
      return <CommandDemo />;
    case "template":
      return <TemplateDemo />;
    case "iterator":
      return <IteratorDemo />;
    case "state":
      return <StateDemo />;
    case "chain":
      return <ChainDemo />;
    case "mediator":
      return <MediatorDemo />;
    case "memento":
      return <MementoDemo />;
    case "visitor":
      return <VisitorDemo />;
    case "interpreter":
      return <InterpreterDemo />;
    case "spring":
      return <SpringDemo />;
    case "combine":
    case "case":
      return <CaseDemo />;
    case "anti":
      return <AntiDemo />;
    case "interview":
      return <InterviewDemo />;
    default:
      return <ClassifyDemo />;
  }
}

function IntroDemo() {
  const [mode, setMode] = useState<"hard" | "pattern">("hard");
  const [pays, setPays] = useState(["alipay", "wechat"]);
  const [log, setLog] = useState<string[]>([]);
  function addPay() {
    const name = `pay${pays.length + 1}`;
    setPays((p) => [...p, name]);
    setLog((l) => [
      ...l,
      mode === "hard"
        ? `+ ${name}：需改 OrderService 增加 else-if（修改旧代码）`
        : `+ ${name}：新增 PayStrategy 实现类 + 注册（旧代码不动）`,
    ]);
  }
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant={mode === "hard" ? "default" : "secondary"} onClick={() => setMode("hard")}>
          硬编码 if-else
        </Button>
        <Button size="sm" variant={mode === "pattern" ? "default" : "secondary"} onClick={() => setMode("pattern")}>
          策略 + 工厂
        </Button>
        <Button size="sm" variant="outline" onClick={addPay}>
          新增支付方式
        </Button>
      </div>
      <p className="mt-3 text-sm text-muted">
        当前支付：{pays.join(" · ")}（{mode === "hard" ? "每加一种都要改核心类" : "扩展点在新类"}）
      </p>
      <Log lines={log} />
    </div>
  );
}

function SolidDemo() {
  const [openClosed, setOpenClosed] = useState(true);
  const [methods, setMethods] = useState(["alipay", "wechat"]);
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant={openClosed ? "default" : "secondary"} onClick={() => setOpenClosed(true)}>
          遵守 OCP
        </Button>
        <Button size="sm" variant={!openClosed ? "default" : "secondary"} onClick={() => setOpenClosed(false)}>
          违反 OCP
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setMethods((m) => [...m, `method-${m.length + 1}`])}
        >
          添加支付
        </Button>
      </div>
      <ul className="mt-3 space-y-1 text-sm text-muted">
        {methods.map((m) => (
          <li key={m} className="rounded-md border border-border bg-surface-2 px-3 py-2">
            {m}{" "}
            <span className="text-subtle">
              → {openClosed ? "新 class implements Payment" : "改 switch / if 核心"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const SCENARIOS: { q: string; a: string; why: string }[] = [
  { q: "全局只允许一个配置中心", a: "Singleton", why: "唯一实例 + 全局访问点" },
  { q: "第三方支付 SDK 接口和我们系统不一致", a: "Adapter", why: "接口转换" },
  { q: "咖啡加奶加糖，动态叠加", a: "Decorator", why: "同接口叠加职责" },
  { q: "订单待付→已付→发货", a: "State", why: "状态驱动行为" },
  { q: "多种排序/计价算法可切换", a: "Strategy", why: "算法族互换" },
  { q: "审批：主管→经理→总监", a: "Chain", why: "处理者链" },
  { q: "子系统启动步骤很杂，给一个 start()", a: "Facade", why: "统一高层接口" },
  { q: "十万棵树共享几种树模型", a: "Flyweight", why: "共享内在状态" },
];

function ClassifyDemo() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const s = SCENARIOS[i % SCENARIOS.length]!;
  const options = useMemo(() => {
    const pool = ["Singleton", "Adapter", "Decorator", "State", "Strategy", "Chain", "Facade", "Flyweight"];
    return [...new Set([s.a, ...pool])].slice(0, 4).sort();
  }, [s]);
  return (
    <div>
      <p className="text-sm font-medium text-fg">{s.q}</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => setPicked(o)}
            className={cn(
              "rounded-md border px-3 py-2.5 text-left text-sm transition-colors",
              picked === o
                ? o === s.a
                  ? "border-primary bg-primary-soft text-fg"
                  : "border-danger/40 bg-danger/10"
                : "border-border bg-surface-2 hover:border-border-strong",
            )}
          >
            {o}
          </button>
        ))}
      </div>
      {picked ? (
        <p className={cn("mt-3 text-sm", picked === s.a ? "text-primary" : "text-warn")}>
          {picked === s.a ? `正确：${s.a} — ${s.why}` : `再想想：更贴 ${s.a}（${s.why}）`}
        </p>
      ) : null}
      <Button
        className="mt-3"
        size="sm"
        variant="secondary"
        onClick={() => {
          setI((x) => x + 1);
          setPicked(null);
        }}
      >
        下一题
      </Button>
    </div>
  );
}

function SingletonDemo() {
  const [ids, setIds] = useState<string[]>([]);
  const [counter] = useState(() => ({ n: 0 }));
  function getInstance() {
    if (ids.length === 0) {
      const id = "Config@" + Math.random().toString(16).slice(2, 6);
      setIds([id, id]);
    } else {
      setIds((x) => [...x, x[0]!]);
    }
    counter.n += 1;
  }
  return (
    <div>
      <Button size="sm" onClick={getInstance}>
        getInstance()
      </Button>
      <p className="mt-2 text-sm text-muted">调用次数：{ids.length}</p>
      <Log lines={ids.map((id, i) => `调用 #${i + 1} → ${id} ${i > 0 && id === ids[0] ? "（同一实例）" : ""}`)} />
    </div>
  );
}

function FactoryDemo({ abstractMode }: { abstractMode?: boolean }) {
  const [family, setFamily] = useState<"win" | "mac">("win");
  const [log, setLog] = useState<string[]>([]);
  function create() {
    if (abstractMode) {
      setLog((l) => [
        ...l,
        family === "win" ? "WinFactory → WinButton + WinCheckbox（产品族一致）" : "MacFactory → MacButton + MacCheckbox",
      ]);
    } else {
      setLog((l) => [...l, family === "win" ? "WindowsDialog.createButton() → WindowsButton" : "MacDialog.createButton() → MacButton"]);
    }
  }
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant={family === "win" ? "default" : "secondary"} onClick={() => setFamily("win")}>
          Windows
        </Button>
        <Button size="sm" variant={family === "mac" ? "default" : "secondary"} onClick={() => setFamily("mac")}>
          Mac
        </Button>
        <Button size="sm" onClick={create}>
          {abstractMode ? "创建产品族" : "createButton()"}
        </Button>
      </div>
      <Log lines={log} />
    </div>
  );
}

function BuilderDemo() {
  const [url, setUrl] = useState("/api/orders");
  const [method, setMethod] = useState("GET");
  const [auth, setAuth] = useState(true);
  const [built, setBuilt] = useState("");
  return (
    <div className="space-y-3">
      <label className="block text-xs text-muted">
        url
        <input
          className="mt-1 h-9 w-full rounded-md border border-border bg-bg px-2 text-sm text-fg"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </label>
      <div className="flex flex-wrap gap-2">
        {["GET", "POST", "PUT"].map((m) => (
          <Button key={m} size="sm" variant={method === m ? "default" : "secondary"} onClick={() => setMethod(m)}>
            {m}
          </Button>
        ))}
        <Button size="sm" variant={auth ? "default" : "outline"} onClick={() => setAuth((v) => !v)}>
          Authorization
        </Button>
        <Button
          size="sm"
          onClick={() =>
            setBuilt(
              `HttpRequest.Builder().url("${url}").method("${method}")${auth ? '.header("Authorization","Bearer …")' : ""}.build()`,
            )
          }
        >
          build()
        </Button>
      </div>
      <Log lines={built ? [built] : []} />
    </div>
  );
}

function PrototypeDemo() {
  const [proto] = useState({ title: "模板文档", pages: 3 });
  const [clones, setClones] = useState<{ title: string; pages: number; id: number }[]>([]);
  return (
    <div>
      <p className="text-sm text-muted">
        原型：{proto.title} · {proto.pages} 页
      </p>
      <Button
        className="mt-2"
        size="sm"
        onClick={() =>
          setClones((c) => [...c, { title: proto.title + " 副本", pages: proto.pages, id: Date.now() }])
        }
      >
        clone()
      </Button>
      <ul className="mt-3 space-y-1 text-sm">
        {clones.map((c) => (
          <li key={c.id} className="rounded-md border border-border bg-surface-2 px-3 py-2 text-fg">
            {c.title}（{c.pages} 页）· 独立对象
          </li>
        ))}
      </ul>
    </div>
  );
}

function AdapterDemo() {
  const [log, setLog] = useState<string[]>([]);
  return (
    <div>
      <Button
        size="sm"
        onClick={() =>
          setLog((l) => [...l, "MediaPlayer.play('a.avi') → AviAdapter → LegacyAviPlayer.playAvi('a.avi')"])
        }
      >
        用新接口播放 AVI
      </Button>
      <Log lines={log} />
    </div>
  );
}

function BridgeDemo() {
  const [renderer, setRenderer] = useState<"vector" | "raster">("vector");
  const [log, setLog] = useState<string[]>([]);
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant={renderer === "vector" ? "default" : "secondary"} onClick={() => setRenderer("vector")}>
          VectorRenderer
        </Button>
        <Button size="sm" variant={renderer === "raster" ? "default" : "secondary"} onClick={() => setRenderer("raster")}>
          RasterRenderer
        </Button>
        <Button size="sm" onClick={() => setLog((l) => [...l, `Circle.draw() → ${renderer} renderCircle(10)`])}>
          draw Circle
        </Button>
      </div>
      <Log lines={log} />
    </div>
  );
}

function CompositeDemo() {
  const tree = useMemo(
    () => [
      "📁 root/",
      "  📄 readme.md (2kb)",
      "  📁 src/",
      "    📄 Main.java (5kb)",
      "    📄 Util.java (3kb)",
    ],
    [],
  );
  return (
    <div>
      <p className="text-sm text-muted">Folder 与 File 实现同一 FileNode；size() 递归求和 = 10kb</p>
      <Log lines={tree} />
    </div>
  );
}

function DecoratorDemo() {
  const [parts, setParts] = useState<string[]>(["Espresso"]);
  const prices: Record<string, number> = { Espresso: 12, Milk: 2, Mocha: 3, Whip: 2 };
  const cost = parts.reduce((s, p) => s + (prices[p] ?? 0), 0);
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {["Milk", "Mocha", "Whip"].map((p) => (
          <Button key={p} size="sm" variant="secondary" onClick={() => setParts((x) => [...x, p])}>
            + {p}
          </Button>
        ))}
        <Button size="sm" variant="outline" onClick={() => setParts(["Espresso"])}>
          重置
        </Button>
      </div>
      <p className="mt-3 text-sm text-fg">
        {parts.join(" → ")} · ¥{cost}
      </p>
    </div>
  );
}

function FacadeDemo() {
  const [log, setLog] = useState<string[]>([]);
  return (
    <div>
      <Button
        size="sm"
        onClick={() =>
          setLog(["ComputerFacade.start()", "  cpu.freeze()", "  memory.load(...)", "  cpu.jump(0)", "  cpu.execute()"])
        }
      >
        computer.start()
      </Button>
      <Log lines={log} />
    </div>
  );
}

function FlyweightDemo() {
  const [trees, setTrees] = useState(0);
  const types = 3;
  return (
    <div>
      <Button size="sm" onClick={() => setTrees((t) => t + 1000)}>
        种 1000 棵树
      </Button>
      <p className="mt-3 text-sm text-muted">
        树实例：{trees} · 共享 TreeType：{types}（若每棵独立存贴图，内存会 ×{trees || 1}）
      </p>
    </div>
  );
}

function ProxyDemo() {
  const [loaded, setLoaded] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  return (
    <div>
      <Button
        size="sm"
        onClick={() => {
          if (!loaded) {
            setLog((l) => [...l, "ImageProxy: 首次 display → 加载 RealImage", "show photo.png"]);
            setLoaded(true);
          } else {
            setLog((l) => [...l, "ImageProxy: 已缓存 RealImage", "show photo.png"]);
          }
        }}
      >
        display()
      </Button>
      <Log lines={log} />
    </div>
  );
}

function StrategyDemo() {
  const [pay, setPay] = useState<"alipay" | "wechat" | "card">("alipay");
  const [log, setLog] = useState<string[]>([]);
  const label = { alipay: "支付宝", wechat: "微信", card: "银行卡" }[pay];
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {(["alipay", "wechat", "card"] as const).map((p) => {
          const labels = { alipay: "支付宝", wechat: "微信", card: "银行卡" } as const;
          return (
            <Button key={p} size="sm" variant={pay === p ? "default" : "secondary"} onClick={() => setPay(p)}>
              {labels[p]}
            </Button>
          );
        })}
        <Button size="sm" onClick={() => setLog((l) => [...l, `checkout → ${label} 扣款 99`])}>
          checkout(99)
        </Button>
      </div>
      <Log lines={log} />
    </div>
  );
}

function ObserverDemo() {
  const [subs, setSubs] = useState(["财经频道", "科技频道"]);
  const [log, setLog] = useState<string[]>([]);
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="secondary" onClick={() => setSubs((s) => [...s, `频道${s.length + 1}`])}>
          订阅
        </Button>
        <Button
          size="sm"
          onClick={() => setLog((l) => [...l, ...subs.map((s) => `${s} ← 突发新闻`)] )}
        >
          publish
        </Button>
      </div>
      <p className="mt-2 text-xs text-muted">订阅者：{subs.join(" · ")}</p>
      <Log lines={log} />
    </div>
  );
}

function CommandDemo() {
  const [on, setOn] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          onClick={() => {
            setOn(true);
            setLog((l) => [...l, "LightOnCommand.execute() → light on"]);
          }}
        >
          开灯
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            setOn(false);
            setLog((l) => [...l, "undo() → light off"]);
          }}
        >
          撤销
        </Button>
      </div>
      <p className="mt-2 text-sm text-fg">灯：{on ? "亮" : "灭"}</p>
      <Log lines={log} />
    </div>
  );
}

function TemplateDemo() {
  const [log, setLog] = useState<string[]>([]);
  return (
    <div>
      <Button
        size="sm"
        onClick={() => setLog(["mine()", "  read()", "  parse()", "  analyze()", "  hook()"])}
      >
        DataMiner.mine()
      </Button>
      <Log lines={log} />
    </div>
  );
}

function IteratorDemo() {
  const items = ["A", "B", "C", "D"];
  const [i, setI] = useState(0);
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" disabled={i >= items.length} onClick={() => setI((x) => x + 1)}>
          next()
        </Button>
        <Button size="sm" variant="secondary" onClick={() => setI(0)}>
          reset
        </Button>
      </div>
      <p className="mt-2 text-sm text-muted">
        hasNext = {String(i < items.length)} · 当前输出：{items.slice(0, i).join(" → ") || "（无）"}
      </p>
    </div>
  );
}

function StateDemo() {
  const flow = ["Created", "Paid", "Shipped", "Done"];
  const [i, setI] = useState(0);
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {flow.map((s, idx) => (
          <span
            key={s}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs",
              idx === i ? "bg-primary text-primary-fg" : idx < i ? "bg-primary/20 text-primary" : "bg-surface-3 text-muted",
            )}
          >
            {s}
          </span>
        ))}
      </div>
      <Button className="mt-3" size="sm" disabled={i >= flow.length - 1} onClick={() => setI((x) => x + 1)}>
        next()
      </Button>
    </div>
  );
}

function ChainDemo() {
  const [log, setLog] = useState<string[]>([]);
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={() => setLog(["auth:login → AuthHandler 处理"])}>
          请求 auth:login
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setLog(["other → Auth 不处理 → LogHandler 兜底"])}
        >
          请求 other
        </Button>
      </div>
      <Log lines={log} />
    </div>
  );
}

function MediatorDemo() {
  const [log, setLog] = useState<string[]>([]);
  return (
    <div>
      <Button
        size="sm"
        onClick={() => setLog((l) => [...l, "Button.click → Mediator → TextBox.setText('submitted') + Checkbox.reset()"])}
      >
        点击提交按钮
      </Button>
      <Log lines={log} />
    </div>
  );
}

function MementoDemo() {
  const [text, setText] = useState("");
  const [stack, setStack] = useState<string[]>([]);
  return (
    <div className="space-y-2">
      <input
        className="h-9 w-full rounded-md border border-border bg-bg px-2 text-sm text-fg"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="编辑器内容…"
      />
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={() => setStack((s) => [...s, text])}>
          save()
        </Button>
        <Button
          size="sm"
          variant="secondary"
          disabled={!stack.length}
          onClick={() => {
            const next = [...stack];
            const m = next.pop();
            setStack(next);
            if (m !== undefined) setText(m);
          }}
        >
          restore()
        </Button>
      </div>
      <p className="text-xs text-muted">历史快照：{stack.length}</p>
    </div>
  );
}

function VisitorDemo() {
  const [log, setLog] = useState<string[]>([]);
  return (
    <div>
      <Button
        size="sm"
        onClick={() => setLog(["Dot.accept(exportVisitor)", "Circle.accept(exportVisitor)", "→ 导出完成（不改 Shape 类）"])}
      >
        导出图形
      </Button>
      <Log lines={log} />
    </div>
  );
}

function InterpreterDemo() {
  return (
    <div>
      <p className="font-mono text-sm text-fg">Add(Num(1), Num(2)).eval() = 3</p>
      <p className="mt-2 text-sm text-muted">把表达式建成树，再递归求值——小规则引擎的雏形。</p>
    </div>
  );
}

function SpringDemo() {
  const items = [
    "BeanFactory → 工厂",
    "默认 Bean → 单例",
    "AOP → 代理",
    "JdbcTemplate → 模板方法",
    "ApplicationEvent → 观察者",
    "HandlerAdapter → 适配器",
  ];
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {items.map((t) => (
        <li key={t} className="rounded-md border border-border bg-surface-2 px-3 py-2 text-sm text-fg">
          {t}
        </li>
      ))}
    </ul>
  );
}

function CaseDemo() {
  const steps = [
    "Builder 组装 Order",
    "Strategy 计价 / 支付",
    "State 驱动订单状态",
    "Facade 库存子系统",
    "Observer 领域事件",
    "Proxy/AOP 审计日志",
  ];
  const [i, setI] = useState(0);
  return (
    <div>
      <ol className="space-y-1 text-sm">
        {steps.map((s, idx) => (
          <li
            key={s}
            className={cn(
              "rounded-md border px-3 py-2",
              idx <= i ? "border-primary/40 bg-primary-soft text-fg" : "border-border bg-surface-2 text-muted",
            )}
          >
            {idx + 1}. {s}
          </li>
        ))}
      </ol>
      <Button className="mt-3" size="sm" disabled={i >= steps.length - 1} onClick={() => setI((x) => x + 1)}>
        推进一步
      </Button>
    </div>
  );
}

function AntiDemo() {
  return (
    <div className="space-y-2 text-sm text-muted">
      <p className="rounded-md border border-danger/30 bg-danger/10 px-3 py-2 text-fg">
        反模式：EverythingManager 上帝类 — 用户/订单/支付/报表全塞一起
      </p>
      <p className="rounded-md border border-border bg-surface-2 px-3 py-2">
        模式崇拜：两个 if 也上抽象工厂 + 访问者 — 违背 YAGNI
      </p>
      <p className="text-primary">原则：有稳定变化点再抽象，模式是手段不是目标。</p>
    </div>
  );
}

function InterviewDemo() {
  const tips = [
    "1. 一句话定义",
    "2. 解决的痛点",
    "3. 角色与类图",
    "4. 相近模式区别",
    "5. Java/Spring 例子",
    "6. 优缺点与边界",
  ];
  return (
    <ol className="grid gap-2 sm:grid-cols-2">
      {tips.map((t) => (
        <li key={t} className="rounded-md border border-border bg-surface-2 px-3 py-2 text-sm text-fg">
          {t}
        </li>
      ))}
    </ol>
  );
}
