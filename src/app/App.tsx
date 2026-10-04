import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingCart, Search, Mic, Star, X, Plus, Minus,
  Leaf, Truck, Heart, Menu, Sparkles, ChevronRight,
  Zap, Clock, BadgeCheck, MapPin, Instagram, Twitter,
  Facebook, TrendingUp, Cpu, Shield, Phone, ChevronDown,
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  weight: string;
  rating: number;
  reviews: number;
  badge: string | null;
  aiScore: number;
  bgColor: string;
  emoji: string;
  imgUrl?: string;
};

type CartItem = Product & { quantity: number };

const PRODUCTS: Product[] = [
  {
    id: 1, name: "Full Cream Milk", category: "Milk", price: 68, originalPrice: 78,
    weight: "1 Litre", rating: 4.8, reviews: 2341, badge: "Fresh Today", aiScore: 98,
    bgColor: "#D6EAF8", emoji: "🥛",
    imgUrl: "https://images.unsplash.com/photo-1639151082235-406d8eb262b9?w=500&h=400&fit=crop&auto=format&q=85",
  },
  {
    id: 2, name: "Homestyle Paneer", category: "Paneer", price: 89, originalPrice: 110,
    weight: "200g", rating: 4.7, reviews: 1876, badge: "Bestseller", aiScore: 95,
    bgColor: "#FEF3C7", emoji: "🧀",
    imgUrl: "https://images.unsplash.com/photo-1781332146569-9c5093bc2ca5?w=500&h=400&fit=crop&auto=format&q=85",
  },
  {
    id: 3, name: "Pure A2 Ghee", category: "Ghee", price: 245, originalPrice: 290,
    weight: "500ml", rating: 4.9, reviews: 3102, badge: "Premium", aiScore: 97,
    bgColor: "#FEF9C3", emoji: "🫙",
    imgUrl: "https://images.unsplash.com/photo-1613548058193-1cd24c1bebcf?w=500&h=400&fit=crop&auto=format&q=85",
  },
  {
    id: 4, name: "Salted Butter", category: "Butter", price: 52, originalPrice: 60,
    weight: "100g", rating: 4.6, reviews: 987, badge: "New", aiScore: 92,
    bgColor: "#FEF3C7", emoji: "🧈",
    imgUrl: "https://images.unsplash.com/photo-1608100743854-decfbbea206e?w=500&h=400&fit=crop&auto=format&q=85",
  },
  {
    id: 5, name: "Greek Yogurt", category: "Curd & Yogurt", price: 45, originalPrice: 52,
    weight: "400g", rating: 4.7, reviews: 1543, badge: "Health Pick", aiScore: 94,
    bgColor: "#DCFCE7", emoji: "🥣",
    imgUrl: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=500&h=400&fit=crop&auto=format&q=85",
  },
  {
    id: 6, name: "Cheddar Slices", category: "Cheese", price: 185, originalPrice: 220,
    weight: "200g", rating: 4.5, reviews: 734, badge: "Imported", aiScore: 89,
    bgColor: "#FEF3C7", emoji: "🧀",
    imgUrl: "https://images.unsplash.com/photo-1627935722051-395636b0d8a5?w=500&h=400&fit=crop&auto=format&q=85",
  },
  {
    id: 7, name: "Toned Milk", category: "Milk", price: 54, originalPrice: 60,
    weight: "1 Litre", rating: 4.6, reviews: 1234, badge: null, aiScore: 91,
    bgColor: "#EFF6FF", emoji: "🥛",
    imgUrl: "https://images.unsplash.com/photo-1644346402970-d8d7304ff82f?w=500&h=400&fit=crop&auto=format&q=85",
  },
  {
    id: 8, name: "Mango Lassi Pack", category: "Curd & Yogurt", price: 35, originalPrice: 42,
    weight: "200g", rating: 4.4, reviews: 567, badge: null, aiScore: 87,
    bgColor: "#FEF9C3", emoji: "🥭",
    imgUrl: "https://images.unsplash.com/photo-1676976197628-e25f98f6df24?w=500&h=400&fit=crop&auto=format&q=85",
  },
  {
    id: 9, name: "Set Dahi", category: "Curd & Yogurt", price: 30, originalPrice: 36,
    weight: "500g", rating: 4.6, reviews: 2100, badge: "Daily Essential", aiScore: 93,
    bgColor: "#F0FDF4", emoji: "🫙",
    imgUrl: "https://images.unsplash.com/photo-1530259152377-3a014e1092e0?w=500&h=400&fit=crop&auto=format&q=85",
  },
  {
    id: 10, name: "Mozzarella Block", category: "Cheese", price: 210, originalPrice: 250,
    weight: "200g", rating: 4.5, reviews: 421, badge: null, aiScore: 88,
    bgColor: "#FFFBEB", emoji: "🍕",
    imgUrl: "https://images.unsplash.com/photo-1558221693-89a565d7ecd8?w=500&h=400&fit=crop&auto=format&q=85",
  },
  {
    id: 11, name: "White Butter", category: "Butter", price: 48, originalPrice: 55,
    weight: "100g", rating: 4.5, reviews: 612, badge: null, aiScore: 90,
    bgColor: "#FFFBEB", emoji: "🧈",
    imgUrl: "https://images.unsplash.com/photo-1662988564746-4fc159c87f2d?w=500&h=400&fit=crop&auto=format&q=85",
  },
  {
    id: 12, name: "Malai Paneer", category: "Paneer", price: 110, originalPrice: 130,
    weight: "250g", rating: 4.8, reviews: 2034, badge: "Chef's Pick", aiScore: 96,
    bgColor: "#FEF3C7", emoji: "🍱",
    imgUrl: "https://images.unsplash.com/photo-1551881192-002e02ad3d87?w=500&h=400&fit=crop&auto=format&q=85",
  },
];

const CATEGORIES = ["All", "Milk", "Paneer", "Ghee", "Butter", "Curd & Yogurt", "Cheese"];

const TESTIMONIALS = [
  {
    name: "Priya Sharma", city: "Delhi",
    text: "The A2 Ghee is absolutely divine! Pure, aromatic, and delivered fresh the same morning. Finally found a dairy I can trust.",
    rating: 5, avatar: "PS",
  },
  {
    name: "Rahul Mehta", city: "Mumbai",
    text: "Ordered paneer at 7 AM and got it by 9 AM. Quality is just like homemade. My family won't accept any other brand now.",
    rating: 5, avatar: "RM",
  },
  {
    name: "Anita Joshi", city: "Bengaluru",
    text: "The AI recommendations are spot on! It suggested Greek Yogurt and now I order it every week. Love this website.",
    rating: 5, avatar: "AJ",
  },
  {
    name: "Vikram Singh", city: "Pune",
    text: "Best quality dairy I have tasted in years. The milk is thick and fresh, reminds me of my village back home.",
    rating: 4, avatar: "VS",
  },
];

const AI_SUGGESTIONS = [
  'Try "A2 Milk"...',
  'Search "Paneer"...',
  'Find "Desi Ghee"...',
  'Look for "Butter"...',
  'Explore "Cheese"...',
];

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [listening, setListening] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [addedId, setAddedId] = useState<number | null>(null);
  const [suggestionIdx, setSuggestionIdx] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSuggestionIdx(i => (i + 1) % AI_SUGGESTIONS.length), 2500);
    return () => clearInterval(t);
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const removeFromCart = (id: number) => setCart(prev => prev.filter(i => i.id !== id));

  const updateQty = (id: number, delta: number) =>
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: i.quantity + delta } : i).filter(i => i.quantity > 0));

  const toggleWishlist = (id: number) =>
    setWishlist(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  const filtered = PRODUCTS.filter(p => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const discount = (p: Product) => Math.round((1 - p.price / p.originalPrice) * 100);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif", background: "#FAF8F3", color: "#1C1209" }}>

      {/* ─── NAVBAR ─── */}
      <nav className="sticky top-0 z-50 bg-[#FAF8F3]/96 backdrop-blur-md border-b border-[#1C1209]/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 h-16">

            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-9 h-9 bg-[#1B4D35] rounded-xl flex items-center justify-center shadow-md shadow-[#1B4D35]/30">
                <span className="text-lg leading-none">🐄</span>
              </div>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-lg leading-none text-[#1B4D35]">PureMilk</div>
                <div className="text-[10px] text-[#D4891A] font-semibold tracking-widest uppercase">Farm to Table</div>
              </div>
            </a>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-lg mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1C1209]/35" />
                <AnimatePresence mode="wait">
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder={search === "" ? AI_SUGGESTIONS[suggestionIdx] : ""}
                    className="w-full pl-10 pr-12 py-2.5 bg-white border border-[#1C1209]/12 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4D35]/25 focus:border-[#1B4D35]/50 transition-all placeholder:text-[#1C1209]/30"
                  />
                </AnimatePresence>
                <button
                  onClick={() => { setListening(true); setTimeout(() => setListening(false), 2200); }}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${listening ? "text-red-500 animate-pulse" : "text-[#1C1209]/35 hover:text-[#1B4D35]"}`}
                  title="Voice search"
                >
                  <Mic className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3 ml-auto">
              <button className="hidden md:flex items-center gap-1.5 text-xs text-[#1C1209]/60 hover:text-[#1B4D35] transition-colors">
                <MapPin className="w-3.5 h-3.5" />
                Deliver to <span className="font-semibold text-[#1C1209]">Delhi 110001</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              <button
                onClick={() => setCartOpen(true)}
                className="relative flex items-center gap-2 bg-[#1B4D35] hover:bg-[#163d2a] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md shadow-[#1B4D35]/25 hover:shadow-lg"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden md:inline">Cart</span>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-[#D4891A] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              <button onClick={() => setMobileMenuOpen(v => !v)} className="md:hidden p-2 rounded-lg hover:bg-[#1C1209]/6 transition-colors">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <div className="md:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1C1209]/35" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search dairy products..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#1C1209]/12 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4D35]/25"
              />
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden border-t border-[#1C1209]/10 py-3"
              >
                <div className="flex flex-wrap gap-2 py-2">
                  {CATEGORIES.map(c => (
                    <button
                      key={c}
                      onClick={() => { setCategory(c); setMobileMenuOpen(false); }}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${category === c ? "bg-[#1B4D35] text-white" : "bg-white border border-[#1C1209]/10 text-[#1C1209]/70"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-[#1B4D35]">
        {/* ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#2D6B4D]/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#D4891A]/15 rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#D4891A]/8 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Left copy */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-[#D4891A]/15 border border-[#D4891A]/35 text-[#E8A835] text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6 uppercase tracking-wider"
              >
                <Sparkles className="w-3.5 h-3.5" />
                AI-Powered Freshness Guarantee
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] text-white mb-6"
              >
                Pure Dairy,
                <br />
                <em className="not-italic text-[#D4891A]">Delivered</em>
                <br />
                Fresh Daily.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 }}
                className="text-white/65 text-lg leading-relaxed mb-8 max-w-md"
              >
                From our farm to your doorstep in under 2 hours. Milk, paneer, ghee, butter — all FSSAI certified and AI freshness-scored.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 }}
                className="flex flex-wrap gap-3 mb-12"
              >
                <button
                  onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
                  className="flex items-center gap-2 bg-[#D4891A] hover:bg-[#c07918] text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-[#D4891A]/35 hover:shadow-xl hover:shadow-[#D4891A]/40 hover:-translate-y-0.5"
                >
                  Shop Fresh Now
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-2 bg-white/10 hover:bg-white/18 border border-white/20 text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-all">
                  <Truck className="w-4 h-4" />
                  Track Order
                </button>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="flex gap-8 pt-6 border-t border-white/10"
              >
                {[
                  { val: "50K+", lbl: "Happy Customers" },
                  { val: "99.8%", lbl: "Purity Score" },
                  { val: "< 2 hrs", lbl: "Avg. Delivery" },
                ].map(s => (
                  <div key={s.lbl}>
                    <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold text-white">{s.val}</div>
                    <div className="text-white/45 text-xs mt-0.5">{s.lbl}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right image card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden md:block relative"
            >
              <div className="relative rounded-2xl overflow-hidden bg-[#0F2D1F] shadow-2xl shadow-black/40">
                <img
                  src="https://images.unsplash.com/photo-1639151082235-406d8eb262b9?w=700&h=520&fit=crop&auto=format&q=90"
                  alt="Fresh farm milk bottle and glass"
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: "4/3" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2D1F]/70 via-transparent to-transparent" />

                {/* AI freshness badge */}
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-4 right-4 bg-white/97 backdrop-blur rounded-xl px-3.5 py-2.5 shadow-xl"
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-[#1C1209]">AI: 98% Fresh</span>
                  </div>
                  <div className="text-[10px] text-[#1C1209]/45 flex items-center gap-1">
                    <Zap className="w-2.5 h-2.5 text-[#D4891A]" />
                    Verified this morning
                  </div>
                </motion.div>

                {/* Product info overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute bottom-4 left-4 bg-white/97 backdrop-blur rounded-xl px-3.5 py-2.5 shadow-xl"
                >
                  <div className="text-xs font-bold text-[#1C1209]">Full Cream Milk · 1 Litre</div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-2.5 h-2.5 fill-[#D4891A] text-[#D4891A]" />)}
                    </div>
                    <span className="text-[10px] text-[#1C1209]/50">4.8 (2,341 reviews)</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="font-bold text-[#1B4D35] text-sm">₹68</span>
                    <span className="text-[10px] line-through text-[#1C1209]/35">₹78</span>
                    <span className="text-[10px] font-bold text-[#D4891A] bg-[#D4891A]/10 px-1.5 py-0.5 rounded">13% OFF</span>
                  </div>
                </motion.div>
              </div>

              {/* Floating side card */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute -left-5 top-1/2 -translate-y-1/2 bg-white rounded-2xl p-4 shadow-xl w-40"
              >
                <div className="text-2xl mb-2">🫙</div>
                <div className="text-xs font-bold text-[#1C1209]">Pure A2 Ghee</div>
                <div className="text-[10px] text-[#1C1209]/50 mb-2">500ml · Premium</div>
                <div className="w-full bg-[#EDE8DC] rounded-full h-1 mb-1">
                  <div className="bg-[#D4891A] h-1 rounded-full" style={{ width: "97%" }} />
                </div>
                <div className="text-[10px] text-[#D4891A] font-semibold">AI Score: 97%</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── TRUST STRIP ─── */}
      <div className="bg-[#EDE8DC]/60 border-y border-[#1C1209]/8">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { Icon: Truck, title: "Free Delivery", sub: "Orders above ₹199" },
              { Icon: Leaf, title: "100% Natural", sub: "No preservatives" },
              { Icon: Clock, title: "2-Hour Delivery", sub: "7 AM — 9 PM daily" },
              { Icon: BadgeCheck, title: "FSSAI Certified", sub: "Quality tested daily" },
            ].map(({ Icon, title, sub }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#1B4D35]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-[#1B4D35]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#1C1209]">{title}</div>
                  <div className="text-xs text-[#1C1209]/50">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── AI ENGINE BANNER ─── */}
      <div className="max-w-7xl mx-auto px-4 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative overflow-hidden bg-gradient-to-r from-[#1B4D35] via-[#1f5a3e] to-[#245a40] rounded-2xl p-6 md:p-8 text-white"
        >
          {/* decorative */}
          <div className="absolute right-0 top-0 bottom-0 flex items-center pr-8 opacity-8 pointer-events-none">
            <span className="text-8xl md:text-9xl">🤖</span>
          </div>
          <div className="relative flex flex-wrap items-center gap-6">
            <div className="w-14 h-14 bg-[#D4891A]/20 border border-[#D4891A]/30 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Cpu className="w-7 h-7 text-[#D4891A]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-xl">AI Freshness Engine</span>
                <span className="text-[10px] bg-[#D4891A] text-white px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse">Live</span>
              </div>
              <p className="text-white/65 text-sm leading-relaxed max-w-lg">
                Our machine learning model scans every batch from farm — checking temperature logs, production timestamps, and quality parameters — then ranks each product with a live freshness score updated every 30 minutes.
              </p>
            </div>
            <div className="flex gap-8">
              {[
                { val: "12", lbl: "Products Live" },
                { val: "98%", lbl: "Avg AI Score", gold: true },
                { val: "30m", lbl: "Update Cycle" },
              ].map(({ val, lbl, gold }) => (
                <div key={lbl} className="text-center">
                  <div style={{ fontFamily: "'Playfair Display', serif" }} className={`text-2xl font-bold ${gold ? "text-[#D4891A]" : "text-white"}`}>{val}</div>
                  <div className="text-white/45 text-xs mt-0.5">{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ─── PRODUCT GRID ─── */}
      <section id="products" className="max-w-7xl mx-auto px-4 py-10">
        {/* Section header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-[#D4891A] text-xs font-bold uppercase tracking-widest mb-1">AI-Ranked Products</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl font-bold text-[#1C1209]">Shop Fresh Today</h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#1C1209]/50">
            <TrendingUp className="w-4 h-4" />
            <span>{filtered.length} products</span>
          </div>
        </div>

        {/* Category tabs */}
        <div className="hidden md:flex items-center gap-2 mb-8 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                category === cat
                  ? "bg-[#1B4D35] text-white shadow-md shadow-[#1B4D35]/20"
                  : "bg-white text-[#1C1209]/65 border border-[#1C1209]/10 hover:border-[#1B4D35]/35 hover:text-[#1B4D35]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.05, 0.3) }}
              className="group bg-white rounded-3xl overflow-hidden border border-[#1C1209]/8 hover:border-[#1B4D35]/30 transition-all duration-300 cursor-pointer"
              style={{ boxShadow: "0 2px 12px rgba(28,18,9,0.06)", transition: "box-shadow 0.3s, border-color 0.3s, transform 0.3s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(27,77,53,0.18)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(28,18,9,0.06)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
            >
              {/* Image zone */}
              <div
                className="relative overflow-hidden"
                style={{ backgroundColor: product.bgColor, aspectRatio: "4 / 3" }}
              >
                <img
                  src={product.imgUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient fade at bottom into card */}
                <div
                  className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
                  style={{ background: `linear-gradient(to top, ${product.bgColor}E0 0%, transparent 100%)` }}
                />

                {/* Top-left: badge stack */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {product.badge && (
                    <span className="inline-flex items-center gap-1 bg-[#1B4D35] text-white text-[9px] font-bold px-2.5 py-1 rounded-full shadow-md tracking-wide uppercase">
                      {product.badge}
                    </span>
                  )}
                  <span className="inline-flex bg-[#D4891A] text-white text-[9px] font-bold px-2.5 py-1 rounded-full shadow-md">
                    {discount(product)}% OFF
                  </span>
                </div>

                {/* Top-right: AI freshness score with glow ring */}
                <div className="absolute top-3 right-3">
                  <div
                    className="flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-xl shadow-md"
                    style={{ boxShadow: product.aiScore >= 95 ? "0 0 0 2px rgba(34,197,94,0.35), 0 2px 8px rgba(0,0,0,0.12)" : "0 2px 8px rgba(0,0,0,0.12)" }}
                  >
                    <Zap className="w-3 h-3 text-[#D4891A]" />
                    <span className="text-[10px] font-extrabold text-[#1C1209]">{product.aiScore}%</span>
                  </div>
                </div>

                {/* Bottom-right: wishlist — always visible on touch, hover-only on desktop */}
                <button
                  onClick={e => { e.stopPropagation(); toggleWishlist(product.id); }}
                  className="absolute bottom-3 right-3 w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-115 active:scale-95"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${wishlist.has(product.id) ? "fill-rose-500 text-rose-500" : "text-[#1C1209]/40"}`}
                  />
                </button>
              </div>

              {/* Card body */}
              <div className="p-4">
                {/* Category chip */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: product.bgColor, color: "#1B4D35" }}
                  >
                    {product.category}
                  </span>
                  <span className="text-[10px] text-[#1C1209]/40 font-medium">{product.weight}</span>
                </div>

                {/* Name */}
                <div
                  className="font-bold text-[#1C1209] leading-snug mb-2.5"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.9rem" }}
                >
                  {product.name}
                </div>

                {/* Stars + count */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-px">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star
                        key={s}
                        className={`w-3 h-3 ${s <= Math.floor(product.rating) ? "fill-[#D4891A] text-[#D4891A]" : "fill-gray-200 text-gray-200"}`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold text-[#D4891A]">{product.rating}</span>
                  <span className="text-[10px] text-[#1C1209]/35">({product.reviews.toLocaleString()})</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-3.5">
                  <span className="text-xl font-extrabold text-[#1C1209]">₹{product.price}</span>
                  <span className="text-xs text-[#1C1209]/30 line-through">₹{product.originalPrice}</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full ml-auto">
                    Save ₹{product.originalPrice - product.price}
                  </span>
                </div>

                {/* Add to cart */}
                <motion.button
                  onClick={() => addToCart(product)}
                  whileTap={{ scale: 0.96 }}
                  className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                    addedId === product.id
                      ? "bg-emerald-500 text-white"
                      : "bg-[#1B4D35]/10 hover:bg-[#1B4D35] text-[#1B4D35] hover:text-white"
                  }`}
                  style={addedId !== product.id ? { transition: "background 0.25s, color 0.25s, box-shadow 0.25s" } : {}}
                >
                  {addedId === product.id ? "✓ Added to Cart!" : "+ Add to Cart"}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-[#1C1209]/40">
            <div className="text-5xl mb-4">🔍</div>
            <p className="font-semibold text-lg">No products found</p>
            <p className="text-sm">Try a different search or category</p>
          </div>
        )}
      </section>

      {/* ─── FEATURE HIGHLIGHT ─── */}
      <section className="max-w-7xl mx-auto px-4 pb-10">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              icon: "🌿",
              title: "Sourced from 200+ Farms",
              body: "We partner with verified local farms across North India, ensuring every drop is ethically sourced and naturally produced.",
              bg: "#EDFAF0",
              border: "#1B4D35/15",
            },
            {
              icon: "🤖",
              title: "AI Quality Control",
              body: "Machine learning models analyze freshness parameters in real time so you always get the highest-scoring batch available.",
              bg: "#FFF8E7",
              border: "#D4891A/15",
            },
            {
              icon: "⚡",
              title: "Same-Day Cold Chain",
              body: "Products travel in temperature-controlled vehicles from farm to doorstep in under 2 hours — guaranteed cold and fresh.",
              bg: "#E8F4FD",
              border: "#1B4D35/10",
            },
          ].map(card => (
            <div
              key={card.title}
              className="rounded-2xl p-6 border"
              style={{ backgroundColor: card.bg, borderColor: "rgba(28,18,9,0.08)" }}
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="font-bold text-[#1C1209] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{card.title}</h3>
              <p className="text-sm text-[#1C1209]/60 leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CHEESE FEATURE BANNER ─── */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="relative rounded-2xl overflow-hidden bg-[#1C1209]">
          <img
            src="https://images.unsplash.com/photo-1627935722051-395636b0d8a5?w=1200&h=400&fit=crop&auto=format&q=85"
            alt="Artisan cheese on wooden board"
            className="w-full h-56 md:h-72 object-cover opacity-55"
          />
          <div className="absolute inset-0 flex items-center">
            <div className="px-8 md:px-12">
              <div className="text-[#D4891A] text-xs font-bold uppercase tracking-widest mb-2">New Arrival</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl md:text-4xl font-bold text-white mb-4">
                Artisan Cheese Collection
              </h2>
              <p className="text-white/60 text-sm mb-6 max-w-sm">
                From creamy mozzarella to sharp cheddar — handcrafted with traditional methods and AI-verified for peak ripeness.
              </p>
              <button
                onClick={() => setCategory("Cheese")}
                className="flex items-center gap-2 bg-[#D4891A] hover:bg-[#c07918] text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all"
              >
                Explore Cheeses
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="bg-[#EDE8DC]/50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="text-[#D4891A] text-xs font-bold uppercase tracking-widest mb-2">Customer Love</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl font-bold text-[#1C1209]">What Our Customers Say</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-5 border border-[#1C1209]/8 hover:shadow-lg hover:shadow-[#1C1209]/5 transition-shadow"
              >
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className={`w-3.5 h-3.5 ${s <= t.rating ? "fill-[#D4891A] text-[#D4891A]" : "fill-gray-200 text-gray-200"}`} />
                  ))}
                </div>
                <p className="text-sm text-[#1C1209]/75 leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#1B4D35] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#1C1209]">{t.name}</div>
                    <div className="text-xs text-[#1C1209]/45">{t.city}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-[#D4891A] to-[#c07918] rounded-2xl px-8 py-12 md:px-14 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-white rounded-full" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white rounded-full" />
          </div>
          <div className="relative">
            <div className="text-3xl mb-3">📬</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl md:text-4xl font-bold mb-3">
              Get Fresh Deals Daily
            </h2>
            <p className="text-white/75 mb-8 max-w-sm mx-auto text-sm leading-relaxed">
              Subscribe for exclusive discounts, AI-picked seasonal products, and early access to new launches.
            </p>
            {subscribed ? (
              <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white px-6 py-3 rounded-xl font-semibold">
                ✓ You are subscribed — check your inbox!
              </div>
            ) : (
              <div className="flex max-w-sm mx-auto gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 bg-white/18 border border-white/30 rounded-xl text-white placeholder-white/45 focus:outline-none focus:bg-white/25 text-sm"
                />
                <button
                  onClick={() => { if (email) setSubscribed(true); }}
                  className="px-6 py-3 bg-[#1B4D35] hover:bg-[#163d2a] text-white rounded-xl font-semibold text-sm transition-colors flex-shrink-0 shadow-lg shadow-black/20"
                >
                  Subscribe
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#1C1209] text-white">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <div className="grid md:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 bg-[#D4891A] rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-lg leading-none">🐄</span>
                </div>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-lg leading-none">PureMilk</div>
                  <div className="text-[10px] text-[#D4891A] font-semibold tracking-widest uppercase">Farm to Table</div>
                </div>
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-5">
                Farm-fresh certified dairy delivered to your doorstep. Pure, natural, and AI-quality-scored.
              </p>
              <div className="flex gap-2.5">
                {[Instagram, Twitter, Facebook].map((Icon, i) => (
                  <button key={i} className="w-8 h-8 bg-white/8 hover:bg-[#D4891A] rounded-lg flex items-center justify-center transition-all hover:scale-110">
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
              <div className="mt-5 space-y-2 text-sm text-white/35">
                <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-[#D4891A]" /> 1800-123-MILK</div>
              </div>
            </div>

            {/* Links */}
            {[
              { heading: "Products", links: ["Full Cream Milk", "Paneer", "A2 Ghee", "Butter", "Cheese", "Yogurt & Dahi"] },
              { heading: "Company", links: ["About PureMilk", "Our Farms", "Certifications", "Blog & Recipes", "Careers"] },
              { heading: "Support", links: ["Track Order", "Return Policy", "Contact Us", "FAQ", "Bulk / B2B Orders"] },
            ].map(col => (
              <div key={col.heading}>
                <h4 className="font-semibold text-white/70 mb-4 text-sm uppercase tracking-wider">{col.heading}</h4>
                <ul className="space-y-2.5">
                  {col.links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-white/35 hover:text-[#D4891A] text-sm transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-6 border-t border-white/8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-[#D4891A]" />
              <p className="text-white/25 text-xs">© 2024 PureMilk Dairy Pvt. Ltd. · FSSAI Lic: 12345678901234</p>
            </div>
            <div className="flex gap-5 text-white/25 text-xs">
              <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white/60 transition-colors">Refund Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── CART DRAWER ─── */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            />
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#1C1209]/10">
                <div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold text-lg text-[#1C1209]">Your Cart</h2>
                  <p className="text-xs text-[#1C1209]/45">{cartCount} item{cartCount !== 1 ? "s" : ""}</p>
                </div>
                <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-[#1C1209]/6 rounded-xl transition-colors">
                  <X className="w-5 h-5 text-[#1C1209]" />
                </button>
              </div>

              {/* AI tip */}
              {cart.length > 0 && (
                <div className="mx-4 mt-3 bg-[#1B4D35]/6 border border-[#1B4D35]/15 rounded-xl px-3 py-2 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#1B4D35] flex-shrink-0" />
                  <span className="text-xs text-[#1B4D35] font-medium">AI-picked: All items in your cart are 90%+ fresh today.</span>
                </div>
              )}

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-[#1C1209]/35 py-16">
                    <ShoppingCart className="w-14 h-14 mb-4 opacity-25" />
                    <p className="font-semibold">Your cart is empty</p>
                    <p className="text-sm mt-1">Add some fresh dairy products!</p>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="mt-5 px-5 py-2.5 bg-[#1B4D35] text-white rounded-xl text-sm font-semibold"
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  cart.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-3 bg-[#FAF8F3] rounded-xl p-3"
                    >
                      <div
                        className="w-16 h-16 rounded-2xl flex-shrink-0 overflow-hidden border border-[#1C1209]/8"
                        style={{ backgroundColor: item.bgColor }}
                      >
                        <img
                          src={item.imgUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-[#1C1209] truncate">{item.name}</div>
                        <div className="text-xs text-[#1C1209]/45">{item.weight}</div>
                        <div className="font-bold text-[#1B4D35] text-sm mt-1">₹{item.price * item.quantity}</div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#1C1209]/25 hover:text-red-500 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex items-center gap-2 bg-white rounded-lg border border-[#1C1209]/10 px-2 py-1">
                          <button onClick={() => updateQty(item.id, -1)} className="text-[#1C1209]/45 hover:text-[#1B4D35] transition-colors">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-bold w-4 text-center text-[#1C1209]">{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="text-[#1C1209]/45 hover:text-[#1B4D35] transition-colors">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Checkout footer */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-[#1C1209]/8 bg-white">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#1C1209]/55">Subtotal ({cartCount} items)</span>
                    <span className="font-bold text-[#1C1209]">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-[#1C1209]/55">Delivery</span>
                    <span className={`font-semibold ${cartTotal >= 199 ? "text-emerald-600" : "text-[#1C1209]"}`}>
                      {cartTotal >= 199 ? "FREE" : `₹${49 - Math.floor((cartTotal / 199) * 49)}`}
                    </span>
                  </div>

                  {cartTotal < 199 && (
                    <div className="bg-[#D4891A]/10 border border-[#D4891A]/20 text-[#c07918] text-xs p-2.5 rounded-lg mb-3 text-center font-medium">
                      Add ₹{199 - cartTotal} more for FREE delivery!
                    </div>
                  )}

                  <button className="w-full bg-[#1B4D35] hover:bg-[#163d2a] text-white py-3.5 rounded-xl font-semibold text-sm transition-all shadow-md shadow-[#1B4D35]/25 hover:shadow-lg hover:shadow-[#1B4D35]/30">
                    Proceed to Checkout · ₹{cartTotal + (cartTotal >= 199 ? 0 : 49)}
                  </button>
                  <p className="text-center text-[10px] text-[#1C1209]/30 mt-2.5">Secured by SSL · All payments encrypted</p>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
