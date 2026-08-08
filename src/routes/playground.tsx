import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/playground")({
  component: PlaygroundPage,
});

const SNIPPETS: { id: string; title: string; code: string }[] = [
  {
    id: "singleton-enum",
    title: "枚举单例",
    code: `public enum AppContext {
  INSTANCE;
  public void hello() {
    System.out.println("ok");
  }
}`,
  },
  {
    id: "strategy",
    title: "策略接口",
    code: `public interface PayStrategy {
  void pay(int amount);
}

public class Order {
  private PayStrategy strategy;
  public void setPayStrategy(PayStrategy s) { this.strategy = s; }
  public void checkout(int amount) { strategy.pay(amount); }
}`,
  },
  {
    id: "decorator",
    title: "装饰器骨架",
    code: `public interface Coffee {
  double cost();
  String desc();
}

public abstract class CoffeeDecorator implements Coffee {
  protected final Coffee inner;
  protected CoffeeDecorator(Coffee c) { this.inner = c; }
}`,
  },
  {
    id: "observer",
    title: "观察者",
    code: `public interface Observer {
  void update(String event);
}

public class Subject {
  private final java.util.List<Observer> list = new java.util.ArrayList<>();
  public void subscribe(Observer o) { list.add(o); }
  public void publish(String e) {
    for (Observer o : list) o.update(e);
  }
}`,
  },
  {
    id: "builder",
    title: "Builder",
    code: `public final class User {
  private final String name;
  private final int age;
  private User(Builder b) { name = b.name; age = b.age; }
  public static class Builder {
    private String name;
    private int age;
    public Builder name(String n) { name = n; return this; }
    public Builder age(int a) { age = a; return this; }
    public User build() { return new User(this); }
  }
}`,
  },
];

function PlaygroundPage() {
  const [id, setId] = useState(SNIPPETS[0]!.id);
  const cur = SNIPPETS.find((s) => s.id === id) ?? SNIPPETS[0]!;
  return (
    <div className="mx-auto max-w-3xl pb-16">
      <header className="mb-6">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          <Code2 className="h-3.5 w-3.5" />
          代码库
        </p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-fg">Java 片段速览</h1>
        <p className="mt-2 text-sm text-muted">
          浏览器内不跑 JVM——这里提供可复制的经典骨架，配合课程 Demo 理解。
        </p>
      </header>
      <div className="mb-4 flex flex-wrap gap-2">
        {SNIPPETS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setId(s.id)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs transition-colors",
              id === s.id
                ? "border-primary/40 bg-primary-soft text-primary"
                : "border-border bg-surface text-muted hover:text-fg",
            )}
          >
            {s.title}
          </button>
        ))}
      </div>
      <CodeBlock code={cur.code} title={cur.title} lang="java" />
    </div>
  );
}
