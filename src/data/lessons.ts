export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explain: string;
};

export type DemoKind =
  | "intro"
  | "solid"
  | "classify"
  | "singleton"
  | "factory"
  | "abstract-factory"
  | "builder"
  | "prototype"
  | "adapter"
  | "bridge"
  | "composite"
  | "decorator"
  | "facade"
  | "flyweight"
  | "proxy"
  | "strategy"
  | "observer"
  | "command"
  | "template"
  | "iterator"
  | "state"
  | "chain"
  | "mediator"
  | "memento"
  | "visitor"
  | "interpreter"
  | "spring"
  | "combine"
  | "anti"
  | "case"
  | "interview";

export type LessonBlock =
  | { type: "text"; title?: string; body: string }
  | { type: "code"; title?: string; lang?: string; code: string }
  | { type: "tip"; body: string }
  | { type: "demo"; kind: DemoKind; title: string; hint?: string }
  | { type: "quiz"; questions: QuizQuestion[] };

export type Lesson = {
  slug: string;
  title: string;
  summary: string;
  level: "入门" | "进阶" | "实战";
  track: "基础" | "创建型" | "结构型" | "行为型" | "实战" | "速查";
  format?: "course" | "reference";
  minutes: number;
  official?: string;
  blocks: LessonBlock[];
};

export const LESSONS: Lesson[] = [
  {
    slug: "intro",
    title: "设计模式是什么",
    summary: "为何学模式、GoF 起源、如何用本站学习。",
    level: "入门",
    track: "基础",
    minutes: 8,
    official: "https://refactoring.guru/design-patterns",
    blocks: [
      { type: "text", title: "一句话", body: "设计模式是「可复用的面向对象设计经验」：在特定上下文中，对反复出现的问题给出命名的、可沟通的解决方案。\n\n它不是类库，也不是写死的代码模板——是**问题 → 结构 → 取舍**的共同语言。" },
      { type: "text", title: "GoF 与分类", body: "1994 年《Design Patterns》（Gang of Four）整理 23 种经典模式，分为：\n• 创建型（Creational）——对象怎么造\n• 结构型（Structural）——类/对象怎么组合\n• 行为型（Behavioral）——职责与交互怎么分配\n\nJava 生态（JDK / Spring）大量内置了这些思路。" },
      { type: "code", title: "没有模式时的痛点（反例）", lang: "java", code: "// 到处 new + 硬编码类型 → 改一个支付方式要动多处\npublic class OrderService {\n  public void pay(Order order) {\n    if (\"alipay\".equals(order.getPayType())) {\n      new AlipayClient().charge(order.getAmount());\n    } else if (\"wechat\".equals(order.getPayType())) {\n      new WechatClient().charge(order.getAmount());\n    }\n    // 每加一种支付，这里就膨胀一次（开闭原则？）\n  }\n}" },
      { type: "tip", body: "学习节奏：先理解意图（Intent）→ 看 UML/角色 → 读 Java 代码 → 动手 Demo → 小测验。不要死背类图。" },
      { type: "demo", kind: "intro", title: "动手：问题 vs 模式思路", hint: "切换「硬编码」与「策略/工厂」两种写法，观察扩展成本。" },
      { type: "quiz", questions: [
        { id: "i1", question: "设计模式主要解决什么？", options: ["替代写代码", "命名并复用常见设计问题的解法", "只能用于 GUI", "数据库表设计"], answer: 1, explain: "模式是经验的命名与结构化，不是代码生成器。" },
        { id: "i2", question: "GoF 三类模式是？", options: ["前端/后端/运维", "创建/结构/行为", "同步/异步/响应式", "MVC/MVP/MVVM"], answer: 1, explain: "创建型、结构型、行为型。" },
      ] },
    ],
  },
  {
    slug: "solid",
    title: "SOLID 原则",
    summary: "单职责、开闭、里氏替换、接口隔离、依赖倒置。",
    level: "入门",
    track: "基础",
    minutes: 12,
    official: "https://en.wikipedia.org/wiki/SOLID",
    blocks: [
      { type: "text", title: "为什么先讲 SOLID", body: "模式是「解法的名字」，SOLID 是「好坏的尺子」。很多模式（策略、装饰、工厂）本质上是在践行开闭与依赖倒置。" },
      { type: "code", title: "S · 单职责（SRP）", lang: "java", code: "// 坏：一个类又算价又发邮件又写库\n// 好：拆开\nclass PriceCalculator { Money calc(Order o) { /* ... */ return Money.ZERO; } }\nclass OrderRepository { void save(Order o) { /* ... */ } }\nclass OrderMailer { void send(Order o) { /* ... */ } }" },
      { type: "code", title: "O · 开闭（OCP）", lang: "java", code: "// 对扩展开放，对修改关闭：用多态加新行为\ninterface Discount {\n  Money apply(Money price);\n}\nclass VipDiscount implements Discount {\n  public Money apply(Money price) { return price.mul(0.9); }\n}\n// 新活动折扣 = 新类，不必改旧的结算核心" },
      { type: "code", title: "D · 依赖倒置（DIP）", lang: "java", code: "// 高层依赖抽象，不依赖具体实现\nclass Checkout {\n  private final PaymentGateway gateway; // 接口\n  Checkout(PaymentGateway gateway) { this.gateway = gateway; }\n  void pay(Order o) { gateway.charge(o); }\n}" },
      { type: "demo", kind: "solid", title: "动手：违反 vs 遵守开闭", hint: "尝试添加「新支付方式」，看两种设计需要改几处。" },
      { type: "quiz", questions: [
        { id: "s1", question: "开闭原则强调？", options: ["永不写新类", "扩展行为尽量加新代码而非改旧代码", "只用 final 类", "禁止继承"], answer: 1, explain: "对扩展开放，对修改关闭。" },
        { id: "s2", question: "依赖倒置中，高层应依赖？", options: ["具体实现类", "抽象（接口/抽象类）", "静态工具方法", "全局单例字段"], answer: 1, explain: "依赖抽象，便于替换实现。" },
      ] },
    ],
  },
  {
    slug: "principles-more",
    title: "更多设计原则",
    summary: "DRY、KISS、YAGNI、合成复用、迪米特法则。",
    level: "入门",
    track: "基础",
    minutes: 8,
    blocks: [
      { type: "text", title: "实用清单", body: "• DRY：别复制粘贴逻辑，抽公共\n• KISS：能简单就别炫技\n• YAGNI：别为假想需求过度设计\n• 合成复用：优先组合而非继承\n• 迪米特（最少知识）：只和直接朋友说话" },
      { type: "code", title: "组合优于继承", lang: "java", code: "// 与其 Stack extends ArrayList（暴露多余 API）\n// 不如：\nclass Stack<T> {\n  private final Deque<T> store = new ArrayDeque<>();\n  void push(T t) { store.push(t); }\n  T pop() { return store.pop(); }\n}" },
      { type: "tip", body: "模式用多了也会「模式病」。先有痛点再引入模式。" },
      { type: "quiz", questions: [
        { id: "p1", question: "YAGNI 意思是？", options: ["必须用上所有模式", "不要为还没出现的需求过度设计", "只能写一个类", "禁止接口"], answer: 1, explain: "You Aren't Gonna Need It。" },
      ] },
    ],
  },
  {
    slug: "classification",
    title: "模式分类与选型",
    summary: "创建 / 结构 / 行为：意图对照表。",
    level: "入门",
    track: "基础",
    minutes: 10,
    blocks: [
      { type: "text", title: "怎么选模式", body: "问三个问题：\n1. 对象创建过程复杂或要解耦？→ 创建型\n2. 接口不匹配、要增强能力、要统一子系统？→ 结构型\n3. 算法可替换、对象协作、状态变迁？→ 行为型" },
      { type: "code", title: "速记表（Java 语境）", lang: "text", code: "创建：Singleton  Factory  AbstractFactory  Builder  Prototype\n结构：Adapter  Bridge  Composite  Decorator  Facade  Flyweight  Proxy\n行为：Strategy  Observer  Command  Template  Iterator  State\n      Chain  Mediator  Memento  Visitor  Interpreter" },
      { type: "demo", kind: "classify", title: "动手：场景 → 模式匹配", hint: "选一个业务场景，系统给出推荐模式。" },
      { type: "quiz", questions: [
        { id: "c1", question: "「运行时切换算法」更接近？", options: ["Singleton", "Strategy", "Adapter", "Prototype"], answer: 1, explain: "策略模式封装可互换算法。" },
      ] },
    ],
  },
  {
    slug: "uml-java",
    title: "UML 与 Java 映射",
    summary: "类图、接口、组合/聚合在代码里长什么样。",
    level: "入门",
    track: "基础",
    minutes: 10,
    blocks: [
      { type: "text", title: "读类图的关键", body: "• 空心三角 + 实线 = 继承\n• 空心三角 + 虚线 = 实现接口\n• 实心菱形 = 组合（强拥有）\n• 空心菱形 = 聚合\n• 虚线箭头 = 依赖" },
      { type: "code", title: "Java 对应", lang: "java", code: "interface Shape { void draw(); }          // 接口\nclass Circle implements Shape {           // 实现\n  public void draw() { System.out.println(\"○\"); }\n}\nclass Canvas {                            // 组合：持有并管理生命周期\n  private final List<Shape> shapes = new ArrayList<>();\n  void add(Shape s) { shapes.add(s); }\n}" },
      { type: "quiz", questions: [
        { id: "u1", question: "implements 在 UML 中通常是？", options: ["实线空心三角", "虚线空心三角", "实心菱形", "无箭头线"], answer: 1, explain: "实现关系常用虚线 + 空心三角。" },
      ] },
    ],
  },
  {
    slug: "singleton",
    title: "单例模式 Singleton",
    summary: "保证全局唯一实例，并提供全局访问点。",
    level: "入门",
    track: "创建型",
    minutes: 10,
    official: "https://refactoring.guru/design-patterns/singleton",
    blocks: [
      { type: "text", title: "意图", body: "保证全局唯一实例，并提供全局访问点。\n\n场景：全局唯一配置 / 线程池管理器" },
      { type: "code", title: "Java 示例", lang: "java", code: "public final class Config {\n  private static final Config INSTANCE = new Config(); // 饿汉\n  private Config() {}\n  public static Config getInstance() { return INSTANCE; }\n  private String env = \"prod\";\n  public String env() { return env; }\n}\n// 懒汉 + 双重检查（需要 volatile）\npublic final class Lazy {\n  private static volatile Lazy inst;\n  private Lazy() {}\n  public static Lazy getInstance() {\n    if (inst == null) {\n      synchronized (Lazy.class) {\n        if (inst == null) inst = new Lazy();\n      }\n    }\n    return inst;\n  }\n}\n// 推荐：枚举单例（防反射/序列化坑）\nenum AppContext { INSTANCE; }" },
      { type: "tip", body: "JDK / 框架线索：全局唯一配置 / 线程池管理器" },
      { type: "demo", kind: "singleton", title: "动手：单例模式" },
      { type: "quiz", questions: [
        { id: "si1", question: "枚举单例为什么更安全？", options: ["线程不安全懒汉", "序列化/反射可能破坏单例", "不能用于配置", "比饿汉慢就一定错"], answer: 1, explain: "枚举可抵御常见破坏手段。" },
      ] },
    ],
  },
  {
    slug: "factory-method",
    title: "工厂方法 Factory Method",
    summary: "由子类决定实例化哪一个产品。",
    level: "入门",
    track: "创建型",
    minutes: 10,
    official: "https://refactoring.guru/design-patterns/factory-method",
    blocks: [
      { type: "text", title: "意图", body: "由子类决定实例化哪一个产品。\n\n场景：跨平台 UI / 日志 Appender 选择" },
      { type: "code", title: "Java 示例", lang: "java", code: "interface Button { void render(); }\nclass WindowsButton implements Button {\n  public void render() { System.out.println(\"WinBtn\"); }\n}\nclass MacButton implements Button {\n  public void render() { System.out.println(\"MacBtn\"); }\n}\nabstract class Dialog {\n  // 工厂方法\n  abstract Button createButton();\n  void render() {\n    Button ok = createButton();\n    ok.render();\n  }\n}\nclass WindowsDialog extends Dialog {\n  Button createButton() { return new WindowsButton(); }\n}" },
      { type: "tip", body: "JDK / 框架线索：跨平台 UI / 日志 Appender 选择" },
      { type: "demo", kind: "factory", title: "动手：工厂方法" },
      { type: "quiz", questions: [
        { id: "fa1", question: "工厂方法把「new 具体类」放在哪？", options: ["调用方 main 里", "抽象创建者的子类实现", "数据库", "final 字段"], answer: 1, explain: "子类实现 createXxx()。" },
      ] },
    ],
  },
  {
    slug: "abstract-factory",
    title: "抽象工厂 Abstract Factory",
    summary: "创建一系列相关产品族，无需指定具体类。",
    level: "进阶",
    track: "创建型",
    minutes: 12,
    official: "https://refactoring.guru/design-patterns/abstract-factory",
    blocks: [
      { type: "text", title: "意图", body: "创建一系列相关产品族，无需指定具体类。\n\n场景：同一风格的整套控件" },
      { type: "code", title: "Java 示例", lang: "java", code: "interface Button { void paint(); }\ninterface Checkbox { void paint(); }\ninterface GUIFactory {\n  Button createButton();\n  Checkbox createCheckbox();\n}\nclass WinFactory implements GUIFactory {\n  public Button createButton() { return () -> System.out.println(\"WinB\"); }\n  public Checkbox createCheckbox() { return () -> System.out.println(\"WinC\"); }\n}\nclass MacFactory implements GUIFactory {\n  public Button createButton() { return () -> System.out.println(\"MacB\"); }\n  public Checkbox createCheckbox() { return () -> System.out.println(\"MacC\"); }\n}\n// 客户端只依赖 GUIFactory，保证产品族一致" },
      { type: "tip", body: "JDK / 框架线索：同一风格的整套控件" },
      { type: "demo", kind: "abstract-factory", title: "动手：抽象工厂" },
      { type: "quiz", questions: [
        { id: "ab1", question: "抽象工厂与工厂方法的核心差别？", options: ["没有差别", "抽象工厂面向产品族；工厂方法面向单一产品层次", "抽象工厂不能有接口", "工厂方法必须用枚举"], answer: 1, explain: "一族 vs 一个。" },
      ] },
    ],
  },
  {
    slug: "builder",
    title: "建造者模式 Builder",
    summary: "分步构建复杂对象，可复用同一步骤得到不同表示。",
    level: "入门",
    track: "创建型",
    minutes: 10,
    official: "https://refactoring.guru/design-patterns/builder",
    blocks: [
      { type: "text", title: "意图", body: "分步构建复杂对象，可复用同一步骤得到不同表示。\n\n场景：Lombok @Builder / StringBuilder / 复杂 DTO" },
      { type: "code", title: "Java 示例", lang: "java", code: "public final class HttpRequest {\n  private final String url;\n  private final String method;\n  private final Map<String,String> headers;\n  private HttpRequest(Builder b) {\n    this.url = b.url; this.method = b.method; this.headers = Map.copyOf(b.headers);\n  }\n  public static class Builder {\n    private String url;\n    private String method = \"GET\";\n    private final Map<String,String> headers = new LinkedHashMap<>();\n    public Builder url(String u) { this.url = u; return this; }\n    public Builder method(String m) { this.method = m; return this; }\n    public Builder header(String k, String v) { headers.put(k, v); return this; }\n    public HttpRequest build() {\n      if (url == null) throw new IllegalStateException(\"url required\");\n      return new HttpRequest(this);\n    }\n  }\n}\n// new HttpRequest.Builder().url(\"/api\").header(\"A\",\"1\").build();" },
      { type: "tip", body: "JDK / 框架线索：Lombok @Builder / StringBuilder / 复杂 DTO" },
      { type: "demo", kind: "builder", title: "动手：建造者模式" },
      { type: "quiz", questions: [
        { id: "bu1", question: "Builder 最适合什么场景？", options: ["只有一个字段的类", "构造参数很多且可选组合复杂", "替代所有 new", "多线程锁"], answer: 1, explain: "复杂构造过程。" },
      ] },
    ],
  },
  {
    slug: "prototype",
    title: "原型模式 Prototype",
    summary: "通过克隆已有实例创建新对象，避免昂贵初始化。",
    level: "入门",
    track: "创建型",
    minutes: 8,
    official: "https://refactoring.guru/design-patterns/prototype",
    blocks: [
      { type: "text", title: "意图", body: "通过克隆已有实例创建新对象，避免昂贵初始化。\n\n场景：对象创建成本高 / 配置模板复制" },
      { type: "code", title: "Java 示例", lang: "java", code: "class Document implements Cloneable {\n  String title;\n  List<String> pages = new ArrayList<>();\n  @Override\n  public Document clone() {\n    try {\n      Document c = (Document) super.clone();\n      c.pages = new ArrayList<>(pages); // 深拷贝可变部分\n      return c;\n    } catch (CloneNotSupportedException e) {\n      throw new AssertionError(e);\n    }\n  }\n}\n// 也可用拷贝构造：new Document(other)" },
      { type: "tip", body: "JDK / 框架线索：对象创建成本高 / 配置模板复制" },
      { type: "demo", kind: "prototype", title: "动手：原型模式" },
      { type: "quiz", questions: [
        { id: "pr1", question: "浅拷贝的风险？", options: ["没有风险", "共享可变引用导致互相污染", "一定更快错误", "不能用于 String"], answer: 1, explain: "共享可变字段会串改。" },
      ] },
    ],
  },
  {
    slug: "adapter",
    title: "适配器 Adapter",
    summary: "让不兼容的接口可以一起工作。",
    level: "进阶",
    track: "结构型",
    minutes: 10,
    official: "https://refactoring.guru/design-patterns/adapter",
    blocks: [
      { type: "text", title: "意图", body: "让不兼容的接口可以一起工作。" },
      { type: "code", title: "Java 示例", lang: "java", code: "interface MediaPlayer { void play(String file); }\nclass LegacyAviPlayer {\n  void playAvi(String f) { System.out.println(\"AVI:\"+f); }\n}\nclass AviAdapter implements MediaPlayer {\n  private final LegacyAviPlayer legacy = new LegacyAviPlayer();\n  public void play(String file) {\n    if (file.endsWith(\".avi\")) legacy.playAvi(file);\n    else throw new IllegalArgumentException(\"unsupported\");\n  }\n}" },
      { type: "tip", body: "现实映射：InputStreamReader 等 I/O 适配" },
      { type: "demo", kind: "adapter", title: "动手：适配器" },
      { type: "quiz", questions: [
        { id: "adaq", question: "适配器解决什么？", options: ["创建唯一实例", "接口不兼容", "替换算法", "对象克隆"], answer: 1, explain: "接口转换。" },
      ] },
    ],
  },
  {
    slug: "bridge",
    title: "桥接 Bridge",
    summary: "将抽象与实现分离，使二者可独立变化。",
    level: "进阶",
    track: "结构型",
    minutes: 10,
    official: "https://refactoring.guru/design-patterns/bridge",
    blocks: [
      { type: "text", title: "意图", body: "将抽象与实现分离，使二者可独立变化。" },
      { type: "code", title: "Java 示例", lang: "java", code: "interface Renderer { void renderCircle(float r); }\nclass VectorRenderer implements Renderer {\n  public void renderCircle(float r) { System.out.println(\"vector r=\"+r); }\n}\nclass RasterRenderer implements Renderer {\n  public void renderCircle(float r) { System.out.println(\"pixels r=\"+r); }\n}\nabstract class Shape {\n  protected final Renderer renderer;\n  Shape(Renderer r) { this.renderer = r; }\n  abstract void draw();\n}\nclass Circle extends Shape {\n  private final float radius;\n  Circle(Renderer r, float radius) { super(r); this.radius = radius; }\n  void draw() { renderer.renderCircle(radius); }\n}" },
      { type: "tip", body: "现实映射：JDBC Driver 抽象与实现" },
      { type: "demo", kind: "bridge", title: "动手：桥接" },
      { type: "quiz", questions: [
        { id: "briq", question: "桥接主要避免？", options: ["单继承导致的类爆炸", "GC 停顿", "SQL 注入", "死锁"], answer: 0, explain: "抽象×实现组合爆炸。" },
      ] },
    ],
  },
  {
    slug: "composite",
    title: "组合 Composite",
    summary: "将对象组合成树，使客户端统一处理单对象与组合。",
    level: "进阶",
    track: "结构型",
    minutes: 10,
    official: "https://refactoring.guru/design-patterns/composite",
    blocks: [
      { type: "text", title: "意图", body: "将对象组合成树，使客户端统一处理单对象与组合。" },
      { type: "code", title: "Java 示例", lang: "java", code: "interface FileNode {\n  int size();\n  void print(String indent);\n}\nclass FileLeaf implements FileNode {\n  private final String name; private final int bytes;\n  FileLeaf(String n, int b) { name=n; bytes=b; }\n  public int size() { return bytes; }\n  public void print(String i) { System.out.println(i+name); }\n}\nclass Folder implements FileNode {\n  private final String name;\n  private final List<FileNode> children = new ArrayList<>();\n  Folder(String n) { name=n; }\n  void add(FileNode n) { children.add(n); }\n  public int size() { return children.stream().mapToInt(FileNode::size).sum(); }\n  public void print(String i) {\n    System.out.println(i+name+\"/\");\n    children.forEach(c -> c.print(i+\"  \"));\n  }\n}" },
      { type: "tip", body: "现实映射：GUI 组件树 / 文件系统" },
      { type: "demo", kind: "composite", title: "动手：组合" },
      { type: "quiz", questions: [
        { id: "comq", question: "组合模式让客户端？", options: ["区分叶子与容器不同 API", "用统一接口对待树节点", "必须用递归数据库", "只能有两层"], answer: 1, explain: "透明一致的树操作。" },
      ] },
    ],
  },
  {
    slug: "decorator",
    title: "装饰器 Decorator",
    summary: "动态地给对象叠加职责，比子类更灵活。",
    level: "进阶",
    track: "结构型",
    minutes: 10,
    official: "https://refactoring.guru/design-patterns/decorator",
    blocks: [
      { type: "text", title: "意图", body: "动态地给对象叠加职责，比子类更灵活。" },
      { type: "code", title: "Java 示例", lang: "java", code: "interface Coffee { double cost(); String desc(); }\nclass Espresso implements Coffee {\n  public double cost() { return 12; }\n  public String desc() { return \"Espresso\"; }\n}\nabstract class CoffeeDecorator implements Coffee {\n  protected final Coffee inner;\n  CoffeeDecorator(Coffee c) { this.inner = c; }\n}\nclass Milk extends CoffeeDecorator {\n  Milk(Coffee c) { super(c); }\n  public double cost() { return inner.cost() + 2; }\n  public String desc() { return inner.desc() + \" +Milk\"; }\n}\nclass Mocha extends CoffeeDecorator {\n  Mocha(Coffee c) { super(c); }\n  public double cost() { return inner.cost() + 3; }\n  public String desc() { return inner.desc() + \" +Mocha\"; }\n}\n// new Mocha(new Milk(new Espresso()))" },
      { type: "tip", body: "现实映射：java.io 流包装 / Spring Bean 代理" },
      { type: "demo", kind: "decorator", title: "动手：装饰器" },
      { type: "quiz", questions: [
        { id: "decq", question: "装饰器与继承比，优势是？", options: ["更少对象", "运行时可叠加组合职责", "不能扩展方法", "必须 final"], answer: 1, explain: "可叠加、可替换。" },
      ] },
    ],
  },
  {
    slug: "facade",
    title: "外观 Facade",
    summary: "为子系统提供统一的高层接口。",
    level: "进阶",
    track: "结构型",
    minutes: 8,
    official: "https://refactoring.guru/design-patterns/facade",
    blocks: [
      { type: "text", title: "意图", body: "为子系统提供统一的高层接口。" },
      { type: "code", title: "Java 示例", lang: "java", code: "class Cpu { void freeze(){} void jump(long pos){} void execute(){} }\nclass Memory { void load(long pos, byte[] data){} }\nclass Disk { byte[] read(long lba, int size){ return new byte[size]; } }\nclass ComputerFacade {\n  private final Cpu cpu = new Cpu();\n  private final Memory mem = new Memory();\n  private final Disk disk = new Disk();\n  void start() {\n    cpu.freeze();\n    mem.load(0, disk.read(0, 1024));\n    cpu.jump(0);\n    cpu.execute();\n  }\n}\n// 客户端只需 computer.start()" },
      { type: "tip", body: "现实映射：SLF4J 门面 / 业务 ApplicationService" },
      { type: "demo", kind: "facade", title: "动手：外观" },
      { type: "quiz", questions: [
        { id: "facq", question: "外观模式目的？", options: ["增加子系统复杂度", "简化客户端与子系统交互", "强制单例", "替代所有接口"], answer: 1, explain: "高层统一入口。" },
      ] },
    ],
  },
  {
    slug: "flyweight",
    title: "享元 Flyweight",
    summary: "共享细粒度对象，节省内存。",
    level: "进阶",
    track: "结构型",
    minutes: 10,
    official: "https://refactoring.guru/design-patterns/flyweight",
    blocks: [
      { type: "text", title: "意图", body: "共享细粒度对象，节省内存。" },
      { type: "code", title: "Java 示例", lang: "java", code: "final class TreeType { // 内在状态：可共享\n  final String name, color, texture;\n  TreeType(String n, String c, String t) { name=n; color=c; texture=t; }\n  void draw(int x, int y) { /* 用外在坐标绘制 */ }\n}\nclass TreeTypeFactory {\n  private static final Map<String, TreeType> CACHE = new HashMap<>();\n  static TreeType get(String name, String color, String texture) {\n    String key = name+\"|\"+color+\"|\"+texture;\n    return CACHE.computeIfAbsent(key, k -> new TreeType(name, color, texture));\n  }\n}\nclass Tree { // 外在状态\n  int x, y; TreeType type;\n  Tree(int x, int y, TreeType t) { this.x=x; this.y=y; this.type=t; }\n  void draw() { type.draw(x, y); }\n}" },
      { type: "tip", body: "现实映射：Integer 缓存 / String 池" },
      { type: "demo", kind: "flyweight", title: "动手：享元" },
      { type: "quiz", questions: [
        { id: "flyq", question: "享元拆分的是？", options: ["同步与异步", "内在状态(共享)与外在状态(上下文)", "GET 与 POST", "编译期与运行时"], answer: 1, explain: "intrinsic vs extrinsic。" },
      ] },
    ],
  },
  {
    slug: "proxy",
    title: "代理 Proxy",
    summary: "为对象提供代理以控制访问。",
    level: "进阶",
    track: "结构型",
    minutes: 10,
    official: "https://refactoring.guru/design-patterns/proxy",
    blocks: [
      { type: "text", title: "意图", body: "为对象提供代理以控制访问。" },
      { type: "code", title: "Java 示例", lang: "java", code: "interface Image { void display(); }\nclass RealImage implements Image {\n  private final String file;\n  RealImage(String f) { this.file = f; load(); }\n  private void load() { System.out.println(\"load \"+file); }\n  public void display() { System.out.println(\"show \"+file); }\n}\nclass ImageProxy implements Image {\n  private final String file;\n  private RealImage real;\n  ImageProxy(String f) { this.file = f; }\n  public void display() {\n    if (real == null) real = new RealImage(file); // 懒加载\n    real.display();\n  }\n}" },
      { type: "tip", body: "现实映射：JDK 动态代理 / Spring AOP" },
      { type: "demo", kind: "proxy", title: "动手：代理" },
      { type: "quiz", questions: [
        { id: "proq", question: "代理常见用途？", options: ["只做 UI 布局", "懒加载、权限、远程、日志增强", "替代 GC", "编译注解"], answer: 1, explain: "控制与增强访问。" },
      ] },
    ],
  },
  {
    slug: "strategy",
    title: "策略 Strategy",
    summary: "定义算法族，分别封装，使它们可互换。",
    level: "进阶",
    track: "行为型",
    minutes: 10,
    official: "https://refactoring.guru/design-patterns/strategy",
    blocks: [
      { type: "text", title: "意图", body: "定义算法族，分别封装，使它们可互换。" },
      { type: "code", title: "Java 示例", lang: "java", code: "interface PayStrategy { void pay(int amount); }\nclass Alipay implements PayStrategy {\n  public void pay(int amount) { System.out.println(\"支付宝 \"+amount); }\n}\nclass WechatPay implements PayStrategy {\n  public void pay(int amount) { System.out.println(\"微信 \"+amount); }\n}\nclass Order {\n  private PayStrategy strategy;\n  void setPayStrategy(PayStrategy s) { this.strategy = s; }\n  void checkout(int amount) { strategy.pay(amount); }\n}" },
      { type: "tip", body: "现实映射：Comparator / Spring 注入多种实现" },
      { type: "demo", kind: "strategy", title: "动手：策略" },
      { type: "quiz", questions: [
        { id: "strq", question: "策略与 if-else 比？", options: ["更难扩展", "新增算法通常加类不改上下文", "必须用反射", "不能有接口"], answer: 1, explain: "开闭原则友好。" },
      ] },
    ],
  },
  {
    slug: "observer",
    title: "观察者 Observer",
    summary: "对象状态变化时，依赖它的对象自动收到通知。",
    level: "进阶",
    track: "行为型",
    minutes: 10,
    official: "https://refactoring.guru/design-patterns/observer",
    blocks: [
      { type: "text", title: "意图", body: "对象状态变化时，依赖它的对象自动收到通知。" },
      { type: "code", title: "Java 示例", lang: "java", code: "interface Observer { void update(String event); }\nclass NewsAgency {\n  private final List<Observer> observers = new ArrayList<>();\n  void subscribe(Observer o) { observers.add(o); }\n  void unsubscribe(Observer o) { observers.remove(o); }\n  void publish(String news) {\n    for (Observer o : observers) o.update(news);\n  }\n}\nclass Channel implements Observer {\n  private final String name;\n  Channel(String n) { name=n; }\n  public void update(String event) { System.out.println(name+\" got \"+event); }\n}\n// JDK: PropertyChangeListener / Flow API" },
      { type: "tip", body: "现实映射：事件总线 / GUI 监听 / Rx" },
      { type: "demo", kind: "observer", title: "动手：观察者" },
      { type: "quiz", questions: [
        { id: "obsq", question: "观察者核心关系？", options: ["一对一强制持有", "一对多发布订阅", "只能同步数据库", "必须单例"], answer: 1, explain: "Subject 通知多个 Observer。" },
      ] },
    ],
  },
  {
    slug: "command",
    title: "命令 Command",
    summary: "将请求封装为对象，从而参数化、排队、撤销。",
    level: "进阶",
    track: "行为型",
    minutes: 10,
    official: "https://refactoring.guru/design-patterns/command",
    blocks: [
      { type: "text", title: "意图", body: "将请求封装为对象，从而参数化、排队、撤销。" },
      { type: "code", title: "Java 示例", lang: "java", code: "interface Command { void execute(); void undo(); }\nclass Light {\n  void on(){ System.out.println(\"on\"); }\n  void off(){ System.out.println(\"off\"); }\n}\nclass LightOnCommand implements Command {\n  private final Light light;\n  LightOnCommand(Light l){ light=l; }\n  public void execute(){ light.on(); }\n  public void undo(){ light.off(); }\n}\nclass Remote {\n  private Command slot; private Command last;\n  void set(Command c){ slot=c; }\n  void press(){ slot.execute(); last=slot; }\n  void undo(){ if(last!=null) last.undo(); }\n}" },
      { type: "tip", body: "现实映射：Runnable / 事务脚本 / 宏命令" },
      { type: "demo", kind: "command", title: "动手：命令" },
      { type: "quiz", questions: [
        { id: "comq", question: "命令模式便于实现？", options: ["哈希索引", "撤销/重做与队列化请求", "CSS 布局", "GC"], answer: 1, explain: "请求对象化。" },
      ] },
    ],
  },
  {
    slug: "template-method",
    title: "模板方法 Template Method",
    summary: "在父类定义算法骨架，步骤延迟到子类。",
    level: "进阶",
    track: "行为型",
    minutes: 8,
    official: "https://refactoring.guru/design-patterns/template-method",
    blocks: [
      { type: "text", title: "意图", body: "在父类定义算法骨架，步骤延迟到子类。" },
      { type: "code", title: "Java 示例", lang: "java", code: "abstract class DataMiner {\n  // 模板方法：final 防止改骨架\n  public final void mine(String path) {\n    byte[] raw = read(path);\n    Object data = parse(raw);\n    analyze(data);\n    hook(); // 可选钩子\n  }\n  abstract byte[] read(String path);\n  abstract Object parse(byte[] raw);\n  void analyze(Object data) { System.out.println(\"analyze \"+data); }\n  void hook() {}\n}\nclass CsvMiner extends DataMiner {\n  byte[] read(String p){ return p.getBytes(); }\n  Object parse(byte[] raw){ return new String(raw).split(\",\"); }\n}" },
      { type: "tip", body: "现实映射：HttpServlet doGet 流程 / JUnit 生命周期" },
      { type: "demo", kind: "template", title: "动手：模板方法" },
      { type: "quiz", questions: [
        { id: "temq", question: "模板方法用什么复用算法骨架？", options: ["组合代理", "继承 + 抽象步骤", "只有接口默认方法且禁止继承", "AOP 必须"], answer: 1, explain: "父类骨架 + 子类步骤。" },
      ] },
    ],
  },
  {
    slug: "iterator",
    title: "迭代器 Iterator",
    summary: "顺序访问聚合对象元素，不暴露内部表示。",
    level: "进阶",
    track: "行为型",
    minutes: 8,
    official: "https://refactoring.guru/design-patterns/iterator",
    blocks: [
      { type: "text", title: "意图", body: "顺序访问聚合对象元素，不暴露内部表示。" },
      { type: "code", title: "Java 示例", lang: "java", code: "// Java 已内建\nList<String> list = List.of(\"a\",\"b\",\"c\");\nIterator<String> it = list.iterator();\nwhile (it.hasNext()) {\n  System.out.println(it.next());\n}\n// for-each / Stream 都建立在迭代思想上" },
      { type: "tip", body: "现实映射：Iterable / Iterator / Stream" },
      { type: "demo", kind: "iterator", title: "动手：迭代器" },
      { type: "quiz", questions: [
        { id: "iteq", question: "迭代器的价值？", options: ["暴露数组下标", "统一遍历方式并隐藏结构", "替代集合", "只能正向"], answer: 1, explain: "封装遍历。" },
      ] },
    ],
  },
  {
    slug: "state",
    title: "状态 State",
    summary: "对象内在状态改变时改变行为，像换了类一样。",
    level: "进阶",
    track: "行为型",
    minutes: 10,
    official: "https://refactoring.guru/design-patterns/state",
    blocks: [
      { type: "text", title: "意图", body: "对象内在状态改变时改变行为，像换了类一样。" },
      { type: "code", title: "Java 示例", lang: "java", code: "interface State { void handle(OrderContext ctx); }\nclass OrderContext {\n  private State state = new Created();\n  void setState(State s){ state=s; }\n  void next(){ state.handle(this); }\n}\nclass Created implements State {\n  public void handle(OrderContext ctx){\n    System.out.println(\"支付中\");\n    ctx.setState(new Paid());\n  }\n}\nclass Paid implements State {\n  public void handle(OrderContext ctx){\n    System.out.println(\"已发货\");\n    ctx.setState(new Shipped());\n  }\n}\nclass Shipped implements State {\n  public void handle(OrderContext ctx){ System.out.println(\"完成\"); }\n}" },
      { type: "tip", body: "现实映射：订单/工作流状态机" },
      { type: "demo", kind: "state", title: "动手：状态" },
      { type: "quiz", questions: [
        { id: "staq", question: "状态 vs 策略？", options: ["完全相同", "状态转换常由状态对象自身驱动；策略通常由上下文选择", "状态不能有类", "策略必须单例"], answer: 1, explain: "转换归属不同。" },
      ] },
    ],
  },
  {
    slug: "chain",
    title: "责任链 Chain of Responsibility",
    summary: "沿处理者链传递请求，直到有人处理。",
    level: "进阶",
    track: "行为型",
    minutes: 10,
    official: "https://refactoring.guru/design-patterns/chain-of-responsibility",
    blocks: [
      { type: "text", title: "意图", body: "沿处理者链传递请求，直到有人处理。" },
      { type: "code", title: "Java 示例", lang: "java", code: "abstract class Handler {\n  private Handler next;\n  Handler link(Handler n){ next=n; return n; }\n  final void handle(String req){\n    if (canHandle(req)) doHandle(req);\n    else if (next != null) next.handle(req);\n    else System.out.println(\"unhandled \"+req);\n  }\n  abstract boolean canHandle(String req);\n  abstract void doHandle(String req);\n}\nclass AuthHandler extends Handler {\n  boolean canHandle(String r){ return r.startsWith(\"auth:\"); }\n  void doHandle(String r){ System.out.println(\"auth ok\"); }\n}\nclass LogHandler extends Handler {\n  boolean canHandle(String r){ return true; }\n  void doHandle(String r){ System.out.println(\"log \"+r); }\n}" },
      { type: "tip", body: "现实映射：Servlet Filter / Netty Pipeline / 审批流" },
      { type: "demo", kind: "chain", title: "动手：责任链" },
      { type: "quiz", questions: [
        { id: "chaq", question: "责任链好处？", options: ["强制单一处理者", "解耦发送者与接收者，可动态组链", "必须环状", "不能有抽象类"], answer: 1, explain: "灵活的处理管道。" },
      ] },
    ],
  },
  {
    slug: "mediator",
    title: "中介者 Mediator",
    summary: "用中介对象封装一系列对象交互，降低耦合。",
    level: "进阶",
    track: "行为型",
    minutes: 10,
    official: "https://refactoring.guru/design-patterns/mediator",
    blocks: [
      { type: "text", title: "意图", body: "用中介对象封装一系列对象交互，降低耦合。" },
      { type: "code", title: "Java 示例", lang: "java", code: "interface Mediator { void notify(Component sender, String event); }\nabstract class Component {\n  protected Mediator mediator;\n  Component(Mediator m){ mediator=m; }\n}\nclass Button extends Component {\n  Button(Mediator m){ super(m); }\n  void click(){ mediator.notify(this, \"click\"); }\n}\nclass TextBox extends Component {\n  Button(Mediator m){ super(m); }\n  void setText(String t){ System.out.println(\"text=\"+t); }\n}\n// DialogMediator 协调 Button/TextBox/Checkbox" },
      { type: "tip", body: "现实映射：聊天室 / UI 对话框协调" },
      { type: "demo", kind: "mediator", title: "动手：中介者" },
      { type: "quiz", questions: [
        { id: "medq", question: "中介者减少？", options: ["对象数量", "同事对象之间的网状依赖", "内存分配", "线程"], answer: 1, explain: "多对多变星型。" },
      ] },
    ],
  },
  {
    slug: "memento",
    title: "备忘录 Memento",
    summary: "在不破坏封装的前提下捕获并恢复对象内部状态。",
    level: "进阶",
    track: "行为型",
    minutes: 8,
    official: "https://refactoring.guru/design-patterns/memento",
    blocks: [
      { type: "text", title: "意图", body: "在不破坏封装的前提下捕获并恢复对象内部状态。" },
      { type: "code", title: "Java 示例", lang: "java", code: "class Editor {\n  private String text = \"\";\n  void type(String s){ text += s; }\n  String getText(){ return text; }\n  Memento save(){ return new Memento(text); }\n  void restore(Memento m){ text = m.state(); }\n  static final class Memento {\n    private final String state;\n    private Memento(String s){ state=s; }\n    private String state(){ return state; }\n  }\n}\nclass History {\n  private final Deque<Editor.Memento> stack = new ArrayDeque<>();\n  void push(Editor.Memento m){ stack.push(m); }\n  Editor.Memento pop(){ return stack.pop(); }\n}" },
      { type: "tip", body: "现实映射：撤销栈 / 游戏存档" },
      { type: "demo", kind: "memento", title: "动手：备忘录" },
      { type: "quiz", questions: [
        { id: "memq", question: "备忘录关键？", options: ["对外公开所有字段", "窄接口保存/恢复，不泄露细节", "只能序列化到 DB", "必须 JSON"], answer: 1, explain: "封装状态快照。" },
      ] },
    ],
  },
  {
    slug: "visitor",
    title: "访问者 Visitor",
    summary: "在不改元素类的前提下定义新操作。",
    level: "进阶",
    track: "行为型",
    minutes: 10,
    official: "https://refactoring.guru/design-patterns/visitor",
    blocks: [
      { type: "text", title: "意图", body: "在不改元素类的前提下定义新操作。" },
      { type: "code", title: "Java 示例", lang: "java", code: "interface Shape { void accept(Visitor v); }\nclass Dot implements Shape {\n  int x,y;\n  public void accept(Visitor v){ v.visitDot(this); }\n}\nclass Circle implements Shape {\n  int r;\n  public void accept(Visitor v){ v.visitCircle(this); }\n}\ninterface Visitor {\n  void visitDot(Dot d);\n  void visitCircle(Circle c);\n}\nclass ExportVisitor implements Visitor {\n  public void visitDot(Dot d){ System.out.println(\"dot\"); }\n  public void visitCircle(Circle c){ System.out.println(\"circle\"); }\n}" },
      { type: "tip", body: "现实映射：编译器 AST 遍历" },
      { type: "demo", kind: "visitor", title: "动手：访问者" },
      { type: "quiz", questions: [
        { id: "visq", question: "访问者适合？", options: ["元素结构常变、操作少", "结构稳定、操作常增", "只有一个类", "禁止接口"], answer: 1, explain: "双分派扩展操作。" },
      ] },
    ],
  },
  {
    slug: "interpreter",
    title: "解释器 Interpreter",
    summary: "为语言定义文法表示，并解释句子。",
    level: "进阶",
    track: "行为型",
    minutes: 8,
    official: "https://refactoring.guru/design-patterns/interpreter",
    blocks: [
      { type: "text", title: "意图", body: "为语言定义文法表示，并解释句子。" },
      { type: "code", title: "Java 示例", lang: "java", code: "interface Expr { int eval(); }\nclass Num implements Expr {\n  private final int v; Num(int v){ this.v=v; }\n  public int eval(){ return v; }\n}\nclass Add implements Expr {\n  private final Expr l,r; Add(Expr l, Expr r){ this.l=l; this.r=r; }\n  public int eval(){ return l.eval()+r.eval(); }\n}\n// new Add(new Num(1), new Num(2)).eval() == 3\n// 实际项目更常用解析器生成器 / 脚本引擎" },
      { type: "tip", body: "现实映射：正则、SQL 子集、规则引擎" },
      { type: "demo", kind: "interpreter", title: "动手：解释器" },
      { type: "quiz", questions: [
        { id: "intq", question: "解释器适用？", options: ["任意复杂商业系统唯一架构", "简单文法的可组合表达式", "替代 JVM", "GUI 布局"], answer: 1, explain: "小语言/规则。" },
      ] },
    ],
  },
  {
    slug: "spring-patterns",
    title: "Spring 中的设计模式",
    summary: "容器、代理、模板、观察者在 Spring 的落地。",
    level: "实战",
    track: "实战",
    minutes: 12,
    blocks: [
      { type: "text", title: "这一课", body: "容器、代理、模板、观察者在 Spring 的落地。\n\n读源码时按模式标签去认" },
      { type: "code", title: "要点 / 代码地图", lang: "java", code: "// 1) 工厂：BeanFactory / ApplicationContext\n// 2) 单例：默认 Bean scope = singleton\n// 3) 代理：AOP（JDK 动态代理 / CGLIB）\n// 4) 模板方法：JdbcTemplate、RestTemplate 回调\n// 5) 观察者：ApplicationEvent + @EventListener\n// 6) 适配器：HandlerAdapter\n// 7) 策略：各种 ***Strategy 接口\n\n@Component\nclass OrderPaidListener {\n  @EventListener\n  public void on(OrderPaidEvent e) {\n    // 解耦副作用\n  }\n}" },
      { type: "demo", kind: "spring", title: "动手：Spring 中的设计模式" },
      { type: "quiz", questions: [
        { id: "sprq", question: "Spring 默认 Bean 作用域？", options: ["prototype", "singleton", "request", "session"], answer: 1, explain: "默认单例。" },
      ] },
    ],
  },
  {
    slug: "combine",
    title: "模式组合拳",
    summary: "工厂+策略、装饰+代理、责任链+命令。",
    level: "实战",
    track: "实战",
    minutes: 10,
    blocks: [
      { type: "text", title: "这一课", body: "工厂+策略、装饰+代理、责任链+命令。\n\n真实项目很少「只用一个模式」" },
      { type: "code", title: "要点 / 代码地图", lang: "java", code: "// 支付：工厂创建策略，上下文执行\nPayStrategy s = payFactory.create(order.getPayType());\norder.setPayStrategy(s);\norder.checkout(order.getAmount());\n\n// 日志：装饰 I/O + 代理权限\nInputStream in = new BufferedInputStream(new FileInputStream(path));\n// Spring: @Transactional 代理包业务" },
      { type: "demo", kind: "combine", title: "动手：模式组合拳" },
      { type: "quiz", questions: [
        { id: "comq", question: "组合使用模式的目标？", options: ["堆砌名词", "用正交的模式各自解决一类问题", "减少类到 1 个", "避免接口"], answer: 1, explain: "正交解耦。" },
      ] },
    ],
  },
  {
    slug: "anti-patterns",
    title: "反模式与过度设计",
    summary: "上帝类、意大利面、模式崇拜。",
    level: "实战",
    track: "实战",
    minutes: 8,
    blocks: [
      { type: "text", title: "这一课", body: "上帝类、意大利面、模式崇拜。\n\n简单问题用简单方案" },
      { type: "code", title: "要点 / 代码地图", lang: "java", code: "// 反模式示例：God Class\nclass EverythingManager {\n  // 用户、订单、支付、报表、邮件、缓存……全塞一起\n}\n// 模式崇拜：只有两个 if 也硬上策略+工厂+抽象工厂+访问者" },
      { type: "demo", kind: "anti", title: "动手：反模式与过度设计" },
      { type: "quiz", questions: [
        { id: "antq", question: "何时不该上模式？", options: ["永远该上", "没有稳定变化点、过早抽象时", "面试时", "有接口时"], answer: 1, explain: "YAGNI + 有痛点再抽象。" },
      ] },
    ],
  },
  {
    slug: "case-order",
    title: "案例：电商订单",
    summary: "下单链路中的模式地图。",
    level: "实战",
    track: "实战",
    minutes: 12,
    blocks: [
      { type: "text", title: "这一课", body: "下单链路中的模式地图。\n\n把已学模式串到一条业务链" },
      { type: "code", title: "要点 / 代码地图", lang: "java", code: "// 创建订单：Builder 组装复杂 Order\n// 定价：Strategy（VIP/满减/券）\n// 支付：Strategy + 简单工厂\n// 状态：State（待付/已付/发货/完成/取消）\n// 库存：Facade 封装库存子系统\n// 领域事件：Observer / Spring Events\n// 审计：Decorator 或 AOP Proxy 记日志" },
      { type: "demo", kind: "case", title: "动手：案例：电商订单" },
      { type: "quiz", questions: [
        { id: "casq", question: "订单状态迁移更贴哪个模式？", options: ["Singleton", "State", "Flyweight", "Interpreter"], answer: 1, explain: "状态机。" },
      ] },
    ],
  },
  {
    slug: "interview",
    title: "面试串讲清单",
    summary: "高频问答与表达模板。",
    level: "实战",
    track: "实战",
    minutes: 10,
    blocks: [
      { type: "text", title: "这一课", body: "高频问答与表达模板。\n\n张口就能讲清取舍" },
      { type: "code", title: "要点 / 代码地图", lang: "java", code: "答题结构：\n1) 定义一句话\n2) 解决什么问题 / 不用会怎样\n3) 角色（参与者）\n4) 和相近模式区别\n5) Java/Spring 例子\n6) 优缺点与适用边界\n\n易混：\nAdapter 改接口 vs Decorator 加能力 vs Proxy 控访问\nStrategy 换算法 vs State 换状态\nFactory Method 单产品层次 vs Abstract Factory 产品族" },
      { type: "demo", kind: "interview", title: "动手：面试串讲清单" },
      { type: "quiz", questions: [
        { id: "intq", question: "Adapter 与 Decorator 差异？", options: ["无差异", "Adapter 重在接口转换；Decorator 重在叠加职责", "Decorator 只能一个", "Adapter 必须继承"], answer: 1, explain: "目的不同。" },
      ] },
    ],
  },
  {
    slug: "compare",
    title: "模式对比表",
    summary: "易混模式横向对比。",
    level: "进阶",
    track: "速查",
    format: "reference",
    minutes: 6,
    blocks: [
      { type: "text", title: "易混三人组", body: "Adapter：我接口不对，包一层变成你要的。\nDecorator：接口一样，套娃增强。\nProxy：接口一样，控制访问（懒加载/权限/远程）。" },
      { type: "text", title: "创建族", body: "Factory Method：一个产品维度的扩展点。\nAbstract Factory：保证产品族一致。\nBuilder：同一构建过程，不同配置结果。" },
      { type: "quiz", questions: [
        { id: "cmp1", question: "要给第三方库接口换成自己系统接口？", options: ["Decorator", "Adapter", "Singleton", "Memento"], answer: 1, explain: "适配器。" },
      ] },
    ],
  },
  {
    slug: "when-to-use",
    title: "选型清单",
    summary: "场景 → 模式快速索引。",
    level: "进阶",
    track: "速查",
    format: "reference",
    minutes: 6,
    blocks: [
      { type: "text", title: "速查", body: "唯一实例 → Singleton\n复杂构造 → Builder\n产品族 → Abstract Factory\n接口不兼容 → Adapter\n树形结构 → Composite\n动态加功能 → Decorator\n子系统太多 → Facade\n算法可替换 → Strategy\n事件通知 → Observer\n可撤销操作 → Command\n流程骨架固定 → Template Method\n对象状态机 → State\n处理管道 → Chain" },
      { type: "demo", kind: "classify", title: "再练：场景匹配" },
      { type: "quiz", questions: [
        { id: "w1", question: "大量相似树共享材质贴图？", options: ["Flyweight", "Command", "Mediator", "Interpreter"], answer: 0, explain: "享元共享内在状态。" },
      ] },
    ],
  },
];

export const TRACKS = [
  "基础",
  "创建型",
  "结构型",
  "行为型",
  "实战",
  "速查",
] as const;

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

export function getLessonIndex(slug: string): number {
  return LESSONS.findIndex((l) => l.slug === slug);
}

export function getAdjacent(slug: string): {
  prev?: Lesson;
  next?: Lesson;
} {
  const i = getLessonIndex(slug);
  if (i < 0) return {};
  return {
    prev: i > 0 ? LESSONS[i - 1] : undefined,
    next: i < LESSONS.length - 1 ? LESSONS[i + 1] : undefined,
  };
}

export function getLessonsByTrack(track: Lesson["track"]) {
  return LESSONS.filter((l) => l.track === track);
}

export function getAllQuizQuestions(): Array<
  QuizQuestion & { lessonSlug: string; lessonTitle: string }
> {
  const out: Array<QuizQuestion & { lessonSlug: string; lessonTitle: string }> = [];
  for (const lesson of LESSONS) {
    for (const block of lesson.blocks) {
      if (block.type === "quiz") {
        for (const q of block.questions) {
          out.push({
            ...q,
            lessonSlug: lesson.slug,
            lessonTitle: lesson.title,
          });
        }
      }
    }
  }
  return out;
}

export function isCourseLesson(l: Lesson): boolean {
  if (l.format === "reference") return false;
  if (l.format === "course") return true;
  return l.track !== "速查";
}

export function getCourseLessons(): Lesson[] {
  return LESSONS.filter(isCourseLesson);
}
