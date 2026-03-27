import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";

const PRODUCTS = [
  {
    id: 1,
    name: "Кольцо «Вечность»",
    material: "Золото",
    category: "Кольца",
    price: 89500,
    tags: ["бриллиант", "золото 585", "классика"],
    image: "https://cdn.poehali.dev/projects/f9e7a770-f983-490b-a4ae-11365d984154/files/93430c11-4309-467d-9b59-361c90462369.jpg",
    badge: "Хит",
  },
  {
    id: 2,
    name: "Колье «Луна»",
    material: "Жемчуг",
    category: "Колье",
    price: 67000,
    tags: ["жемчуг", "серебро", "элегантность"],
    image: "https://cdn.poehali.dev/projects/f9e7a770-f983-490b-a4ae-11365d984154/files/7e5d66a2-01cb-4f79-be5f-a92594d9866e.jpg",
    badge: "Новинка",
  },
  {
    id: 3,
    name: "Серьги «Аврора»",
    material: "Золото",
    category: "Серьги",
    price: 124000,
    tags: ["сапфир", "золото 750", "роскошь"],
    image: "https://cdn.poehali.dev/projects/f9e7a770-f983-490b-a4ae-11365d984154/files/726f0831-df51-491a-88f6-12dfdc25e8da.jpg",
    badge: null,
  },
  {
    id: 4,
    name: "Браслет «Версаль»",
    material: "Золото",
    category: "Браслеты",
    price: 156000,
    tags: ["бриллиант", "золото 585", "эксклюзив"],
    image: "https://cdn.poehali.dev/projects/f9e7a770-f983-490b-a4ae-11365d984154/files/75e77786-ac1d-4c7d-942a-fe047a26f5d4.jpg",
    badge: "Эксклюзив",
  },
  {
    id: 5,
    name: "Кольцо «Роза»",
    material: "Серебро",
    category: "Кольца",
    price: 32000,
    tags: ["рубин", "серебро 925", "романтика"],
    image: "https://cdn.poehali.dev/projects/f9e7a770-f983-490b-a4ae-11365d984154/files/93430c11-4309-467d-9b59-361c90462369.jpg",
    badge: null,
  },
  {
    id: 6,
    name: "Серьги «Жемчужина»",
    material: "Жемчуг",
    category: "Серьги",
    price: 45000,
    tags: ["жемчуг", "золото 585", "классика"],
    image: "https://cdn.poehali.dev/projects/f9e7a770-f983-490b-a4ae-11365d984154/files/7e5d66a2-01cb-4f79-be5f-a92594d9866e.jpg",
    badge: null,
  },
];

const MATERIALS = ["Все", "Золото", "Серебро", "Жемчуг"];
const CATEGORIES = ["Все", "Кольца", "Колье", "Серьги", "Браслеты"];

type CartItem = { product: typeof PRODUCTS[0]; qty: number };
type Page = "home" | "catalog" | "cart";

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [search, setSearch] = useState("");
  const [material, setMaterial] = useState("Все");
  const [category, setCategory] = useState("Все");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [addedId, setAddedId] = useState<number | null>(null);

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.material.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchMaterial = material === "Все" || p.material === material;
      const matchCategory = category === "Все" || p.category === category;
      return matchSearch && matchMaterial && matchCategory;
    });
  }, [search, material, category]);

  const addToCart = (product: typeof PRODUCTS[0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { product, qty: 1 }];
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((i) => i.product.id !== id));
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.product.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--dark-bg)", color: "#EDE8DC" }}>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        style={{ backgroundColor: "rgba(15,12,9,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(201,168,76,0.15)" }}
      >
        <button
          onClick={() => setPage("home")}
          className="font-display text-2xl tracking-[0.3em] font-light"
          style={{ color: "var(--gold)" }}
        >
          Kozha Jewelry
        </button>

        <div className="hidden md:flex items-center gap-10">
          {(["home", "catalog"] as Page[]).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className="font-body text-xs tracking-[0.2em] uppercase transition-colors duration-200"
              style={{ color: page === p ? "var(--gold)" : "#9A8A7A" }}
            >
              {p === "home" ? "Главная" : "Каталог"}
            </button>
          ))}
        </div>

        <button
          onClick={() => setPage("cart")}
          className="relative flex items-center gap-2 btn-outline-gold px-4 py-2 text-xs tracking-widest"
        >
          <Icon name="ShoppingBag" size={15} />
          <span>Корзина</span>
          {cartCount > 0 && (
            <span
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ backgroundColor: "var(--gold)", color: "var(--dark-bg)" }}
            >
              {cartCount}
            </span>
          )}
        </button>
      </nav>

      {/* HOME */}
      {page === "home" && (
        <div>
          {/* HERO */}
          <section
            className="relative min-h-screen flex flex-col items-center justify-center text-center px-6"
            style={{
              background: "radial-gradient(ellipse at 50% 60%, rgba(201,168,76,0.08) 0%, transparent 70%), linear-gradient(180deg, #0F0C09 0%, #161210 100%)",
            }}
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: Math.random() * 2 + 1 + "px",
                    height: Math.random() * 2 + 1 + "px",
                    backgroundColor: "var(--gold)",
                    opacity: Math.random() * 0.4 + 0.1,
                    left: Math.random() * 100 + "%",
                    top: Math.random() * 100 + "%",
                    animation: `shimmer ${Math.random() * 3 + 2}s ease-in-out infinite alternate`,
                  }}
                />
              ))}
            </div>

            <p className="animate-fade-in font-body text-xs tracking-[0.5em] uppercase mb-8" style={{ color: "var(--gold)" }}>
              Ювелирный дом
            </p>
            <h1
              className="animate-fade-in-delay-1 font-display font-light leading-tight mb-6"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "#EDE8DC", letterSpacing: "0.05em" }}
            >
              Украшения,
              <br />
              <em style={{ color: "var(--gold)" }}>достойные вас</em>
            </h1>
            <p className="animate-fade-in-delay-2 font-body font-light text-sm tracking-wider max-w-md mb-12" style={{ color: "#7A6A5A", lineHeight: "1.9" }}>
              Каждое изделие — история, воплощённая в металле и камне.
              <br />
              Ручная работа. Золото 585 и 750. Сертифицированные камни.
            </p>

            <div className="animate-fade-in-delay-3 flex flex-col sm:flex-row gap-4">
              <button onClick={() => setPage("catalog")} className="btn-gold px-10 py-4 text-xs tracking-[0.2em] uppercase">
                Смотреть коллекцию
              </button>
              <a href="https://t.me/KozhaJewelry" target="_blank" rel="noopener noreferrer" className="btn-outline-gold px-10 py-4 text-xs tracking-[0.2em] uppercase">
                О нас
              </a>
            </div>

            <div className="animate-fade-in-delay-4 absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
              <div className="w-px h-12 bg-gradient-to-b from-transparent" style={{ background: "linear-gradient(to bottom, transparent, var(--gold))" }} />
            </div>
          </section>

          {/* FEATURES */}
          <section className="py-24 px-6" style={{ backgroundColor: "var(--dark-card)" }}>
            <div className="max-w-5xl mx-auto">
              <div className="ornament text-xs tracking-[0.4em] mb-16 font-body uppercase" style={{ color: "var(--gold)" }}>
                Наши преимущества
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  { icon: "Gem", title: "Сертифицированные камни", desc: "Каждый камень сопровождается международным сертификатом качества и подлинности" },
                  { icon: "HandHeart", title: "Ручная работа", desc: "Мастера с 20-летним опытом создают каждое украшение с любовью к деталям" },
                  { icon: "Shield", title: "Гарантия 5 лет", desc: "Бесплатное обслуживание, полировка и чистка на протяжении всего срока гарантии" },
                ].map((f) => (
                  <div key={f.title} className="text-center">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ border: "1px solid rgba(201,168,76,0.3)", backgroundColor: "rgba(201,168,76,0.05)" }}
                    >
                      <Icon name={f.icon} size={22} style={{ color: "var(--gold)" }} />
                    </div>
                    <h3 className="font-display text-xl font-light mb-3" style={{ color: "#EDE8DC" }}>{f.title}</h3>
                    <p className="font-body text-xs leading-relaxed tracking-wide" style={{ color: "#7A6A5A" }}>{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FEATURED PRODUCTS */}
          <section className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="ornament text-xs tracking-[0.4em] mb-4 font-body uppercase" style={{ color: "var(--gold)" }}>
                Избранное
              </div>
              <h2 className="font-display text-4xl font-light text-center mb-16" style={{ color: "#EDE8DC" }}>
                Новая коллекция
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {PRODUCTS.slice(0, 4).map((p, i) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onAdd={addToCart}
                    added={addedId === p.id}
                    delay={i}
                  />
                ))}
              </div>
              <div className="text-center mt-12">
                <button onClick={() => setPage("catalog")} className="btn-outline-gold px-12 py-4 text-xs tracking-[0.2em] uppercase">
                  Весь каталог
                </button>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="py-16 px-6 text-center" style={{ borderTop: "1px solid rgba(201,168,76,0.1)", backgroundColor: "var(--dark-card)" }}>
            <p className="font-display text-2xl tracking-[0.3em] mb-4" style={{ color: "var(--gold)" }}>AURUM</p>
            <p className="font-body text-xs tracking-wider" style={{ color: "#4A3A2A" }}>
              © 2024 Ювелирный дом AURUM. Все права защищены.
            </p>
          </footer>
        </div>
      )}

      {/* CATALOG */}
      {page === "catalog" && (
        <div className="pt-24 min-h-screen">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="ornament text-xs tracking-[0.4em] mb-4 font-body uppercase" style={{ color: "var(--gold)" }}>
              Коллекция
            </div>
            <h2 className="font-display text-5xl font-light text-center mb-12" style={{ color: "#EDE8DC" }}>
              Каталог украшений
            </h2>

            {/* SEARCH & FILTERS */}
            <div className="mb-10 space-y-6">
              <div className="relative max-w-xl mx-auto">
                <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--gold)" }} />
                <input
                  type="text"
                  placeholder="Поиск по названию, материалу, камням..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 text-sm font-body tracking-wide outline-none focus:ring-1"
                  style={{
                    backgroundColor: "var(--dark-card)",
                    border: "1px solid rgba(201,168,76,0.25)",
                    color: "#EDE8DC",
                    borderRadius: "2px",
                    focusRingColor: "var(--gold)",
                  }}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="flex flex-wrap gap-2 justify-center">
                  {MATERIALS.map((m) => (
                    <button
                      key={m}
                      onClick={() => setMaterial(m)}
                      className="px-5 py-2 text-xs tracking-widest font-body uppercase transition-all duration-200"
                      style={{
                        border: `1px solid ${material === m ? "var(--gold)" : "rgba(201,168,76,0.2)"}`,
                        backgroundColor: material === m ? "rgba(201,168,76,0.12)" : "transparent",
                        color: material === m ? "var(--gold)" : "#7A6A5A",
                        borderRadius: "2px",
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <div className="w-px hidden sm:block" style={{ backgroundColor: "rgba(201,168,76,0.15)" }} />
                <div className="flex flex-wrap gap-2 justify-center">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className="px-5 py-2 text-xs tracking-widest font-body uppercase transition-all duration-200"
                      style={{
                        border: `1px solid ${category === c ? "var(--gold)" : "rgba(201,168,76,0.2)"}`,
                        backgroundColor: category === c ? "rgba(201,168,76,0.12)" : "transparent",
                        color: category === c ? "var(--gold)" : "#7A6A5A",
                        borderRadius: "2px",
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RESULTS */}
            <p className="text-center font-body text-xs tracking-widest mb-8" style={{ color: "#4A3A2A" }}>
              {filteredProducts.length} украшений найдено
            </p>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-display text-3xl font-light mb-4" style={{ color: "#4A3A2A" }}>Ничего не найдено</p>
                <p className="font-body text-xs tracking-wider" style={{ color: "#3A2A1A" }}>Попробуйте изменить параметры поиска</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((p, i) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onAdd={addToCart}
                    added={addedId === p.id}
                    delay={i % 3}
                    large
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* CART */}
      {page === "cart" && (
        <div className="pt-24 min-h-screen">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="ornament text-xs tracking-[0.4em] mb-4 font-body uppercase" style={{ color: "var(--gold)" }}>
              Ваш заказ
            </div>
            <h2 className="font-display text-5xl font-light text-center mb-12" style={{ color: "#EDE8DC" }}>
              Корзина
            </h2>

            {cart.length === 0 ? (
              <div className="text-center py-24">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ border: "1px solid rgba(201,168,76,0.2)" }}
                >
                  <Icon name="ShoppingBag" size={32} style={{ color: "rgba(201,168,76,0.3)" }} />
                </div>
                <p className="font-display text-3xl font-light mb-4" style={{ color: "#4A3A2A" }}>Корзина пуста</p>
                <p className="font-body text-xs tracking-wider mb-8" style={{ color: "#3A2A1A" }}>
                  Добавьте украшения из нашей коллекции
                </p>
                <button onClick={() => setPage("catalog")} className="btn-gold px-10 py-4 text-xs tracking-widest uppercase">
                  Перейти в каталог
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-5 p-5"
                      style={{ backgroundColor: "var(--dark-card)", border: "1px solid rgba(201,168,76,0.1)" }}
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover flex-shrink-0"
                        style={{ borderRadius: "2px" }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-xl font-light mb-1" style={{ color: "#EDE8DC" }}>{item.product.name}</h4>
                        <p className="font-body text-xs tracking-wider mb-3" style={{ color: "var(--gold)" }}>{item.product.material}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQty(item.product.id, -1)}
                              className="w-7 h-7 flex items-center justify-center transition-colors"
                              style={{ border: "1px solid rgba(201,168,76,0.3)", color: "var(--gold)" }}
                            >
                              −
                            </button>
                            <span className="font-body text-sm w-4 text-center" style={{ color: "#EDE8DC" }}>{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.product.id, 1)}
                              className="w-7 h-7 flex items-center justify-center transition-colors"
                              style={{ border: "1px solid rgba(201,168,76,0.3)", color: "var(--gold)" }}
                            >
                              +
                            </button>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-display text-xl" style={{ color: "var(--gold)" }}>
                              {(item.product.price * item.qty).toLocaleString("ru-RU")} ₽
                            </span>
                            <button onClick={() => removeFromCart(item.product.id)} style={{ color: "#4A3A2A" }}>
                              <Icon name="X" size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="p-6 h-fit"
                  style={{ backgroundColor: "var(--dark-card)", border: "1px solid rgba(201,168,76,0.15)" }}
                >
                  <h3 className="font-display text-2xl font-light mb-6" style={{ color: "#EDE8DC" }}>Итого</h3>
                  <div className="space-y-3 mb-6">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex justify-between text-xs font-body tracking-wide" style={{ color: "#7A6A5A" }}>
                        <span className="truncate mr-2">{item.product.name} × {item.qty}</span>
                        <span className="flex-shrink-0">{(item.product.price * item.qty).toLocaleString("ru-RU")} ₽</span>
                      </div>
                    ))}
                    <div
                      className="border-t pt-3 flex justify-between font-display text-xl"
                      style={{ borderColor: "rgba(201,168,76,0.15)", color: "var(--gold)" }}
                    >
                      <span>Итого</span>
                      <span>{cartTotal.toLocaleString("ru-RU")} ₽</span>
                    </div>
                  </div>
                  <a
                    href={`https://t.me/YuliyaKozha?text=${encodeURIComponent("Здравствуйте! Хочу оформить заказ:\n\n" + cart.map(i => `• ${i.product.name} × ${i.qty} — ${(i.product.price * i.qty).toLocaleString("ru-RU")} ₽`).join("\n") + `\n\nИтого: ${cartTotal.toLocaleString("ru-RU")} ₽`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold w-full py-4 text-xs tracking-[0.2em] uppercase mb-3 block text-center"
                  >
                    Оформить заказ
                  </a>
                  <button onClick={() => setPage("catalog")} className="btn-outline-gold w-full py-3 text-xs tracking-widest uppercase">
                    Продолжить покупки
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ProductCard({
  product,
  onAdd,
  added,
  delay = 0,
  large = false,
}: {
  product: typeof PRODUCTS[0];
  onAdd: (p: typeof PRODUCTS[0]) => void;
  added: boolean;
  delay?: number;
  large?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card-hover group cursor-pointer animate-fade-in"
      style={{
        backgroundColor: "var(--dark-card)",
        border: "1px solid rgba(201,168,76,0.1)",
        animationDelay: `${delay * 0.1}s`,
        opacity: 0,
        animationFillMode: "forwards",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: "linear-gradient(to top, rgba(15,12,9,0.7) 0%, transparent 60%)",
            opacity: hovered ? 1 : 0.4,
          }}
        />
        {product.badge && (
          <div
            className="absolute top-4 left-4 px-3 py-1 text-xs font-body tracking-widest uppercase"
            style={{ backgroundColor: "var(--gold)", color: "var(--dark-bg)", borderRadius: "1px" }}
          >
            {product.badge}
          </div>
        )}
      </div>

      <div className="p-5">
        <p className="font-body text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "var(--gold)" }}>
          {product.material} · {product.category}
        </p>
        <h3 className={`font-display font-light mb-1 ${large ? "text-2xl" : "text-xl"}`} style={{ color: "#EDE8DC" }}>
          {product.name}
        </h3>
        <div className="flex flex-wrap gap-1 mb-4">
          {product.tags.map((t) => (
            <span key={t} className="font-body text-xs px-2 py-0.5" style={{ color: "#4A3A2A", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "1px" }}>
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="font-display text-xl" style={{ color: "var(--gold)" }}>
            {product.price.toLocaleString("ru-RU")} ₽
          </span>
          <button
            onClick={() => onAdd(product)}
            className="flex items-center gap-2 px-4 py-2 text-xs tracking-widest font-body uppercase transition-all duration-300"
            style={{
              backgroundColor: added ? "var(--gold)" : "transparent",
              border: `1px solid ${added ? "var(--gold)" : "rgba(201,168,76,0.35)"}`,
              color: added ? "var(--dark-bg)" : "var(--gold)",
              borderRadius: "1px",
            }}
          >
            <Icon name={added ? "Check" : "Plus"} size={12} />
            {added ? "Добавлено" : "В корзину"}
          </button>
        </div>
      </div>
    </div>
  );
}