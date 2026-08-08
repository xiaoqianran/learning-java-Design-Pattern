import { createFileRoute } from "@tanstack/react-router";
import { BookMarked } from "lucide-react";

export const Route = createFileRoute("/cheatsheet")({
  component: CheatsheetPage,
});

const SECTIONS: { title: string; items: { k: string; v: string }[] }[] = [
  {
    title: "设计原则",
    items: [
      { k: "SRP", v: "一个类只有一个变化理由" },
      { k: "OCP", v: "扩展开放，修改关闭" },
      { k: "LSP", v: "子类可替换父类" },
      { k: "ISP", v: "接口宜小不宜胖" },
      { k: "DIP", v: "依赖抽象而非具体" },
      { k: "组合复用", v: "优先组合而非继承" },
    ],
  },
  {
    title: "创建型",
    items: [
      { k: "Singleton", v: "唯一实例；枚举最稳" },
      { k: "Factory Method", v: "子类决定造哪个产品" },
      { k: "Abstract Factory", v: "产品族一致创建" },
      { k: "Builder", v: "分步构建复杂对象" },
      { k: "Prototype", v: "克隆创建；注意深拷贝" },
    ],
  },
  {
    title: "结构型",
    items: [
      { k: "Adapter", v: "接口转换" },
      { k: "Bridge", v: "抽象与实现解耦" },
      { k: "Composite", v: "树结构统一处理" },
      { k: "Decorator", v: "同接口叠加职责" },
      { k: "Facade", v: "子系统统一入口" },
      { k: "Flyweight", v: "共享内在状态" },
      { k: "Proxy", v: "控制访问 / 懒加载 / AOP" },
    ],
  },
  {
    title: "行为型",
    items: [
      { k: "Strategy", v: "算法可互换" },
      { k: "Observer", v: "一对多通知" },
      { k: "Command", v: "请求对象化；可撤销" },
      { k: "Template Method", v: "骨架在父类" },
      { k: "Iterator", v: "统一遍历" },
      { k: "State", v: "状态即行为" },
      { k: "Chain", v: "处理者链路" },
      { k: "Mediator", v: "星型协调" },
      { k: "Memento", v: "快照恢复" },
      { k: "Visitor", v: "稳定结构扩操作" },
      { k: "Interpreter", v: "小文法表达式" },
    ],
  },
  {
    title: "易混对比",
    items: [
      { k: "Adapter vs Decorator", v: "改接口 vs 加能力" },
      { k: "Decorator vs Proxy", v: "增强 vs 控制访问" },
      { k: "Strategy vs State", v: "外部选算法 vs 状态自驱动" },
      { k: "Factory vs AbstractFactory", v: "单层次 vs 产品族" },
    ],
  },
  {
    title: "Spring 映射",
    items: [
      { k: "BeanFactory", v: "工厂" },
      { k: "默认 Bean", v: "单例" },
      { k: "AOP", v: "代理" },
      { k: "JdbcTemplate", v: "模板方法" },
      { k: "ApplicationEvent", v: "观察者" },
      { k: "HandlerAdapter", v: "适配器" },
    ],
  },
];

function CheatsheetPage() {
  return (
    <div className="mx-auto max-w-3xl pb-16">
      <header className="mb-8">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          <BookMarked className="h-3.5 w-3.5" />
          速查表
        </p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-fg">一页纸 · 设计模式</h1>
        <p className="mt-2 text-sm text-muted">写代码 / 面试前扫一眼。</p>
      </header>
      <div className="space-y-6">
        {SECTIONS.map((sec) => (
          <section key={sec.title} className="overflow-hidden rounded-xl border border-border bg-surface">
            <h2 className="border-b border-border bg-surface-2 px-4 py-2.5 font-display text-sm font-semibold text-fg">
              {sec.title}
            </h2>
            <ul className="divide-y divide-border">
              {sec.items.map((it) => (
                <li key={it.k} className="flex flex-col gap-0.5 px-4 py-2.5 sm:flex-row sm:items-baseline sm:gap-4">
                  <span className="shrink-0 font-mono text-xs font-medium text-primary sm:w-44">{it.k}</span>
                  <span className="text-sm text-muted">{it.v}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
