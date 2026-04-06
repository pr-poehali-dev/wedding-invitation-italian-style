import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const INVITE_IMAGE = "https://cdn.poehali.dev/projects/da9c55e1-2bcf-416a-90f7-995b1931dbfb/bucket/ff6bbbcb-6b67-490d-b2e0-acd316050855.jpeg";
const MAIOLICA_IMAGE = "https://cdn.poehali.dev/projects/da9c55e1-2bcf-416a-90f7-995b1931dbfb/bucket/77931437-20e0-4a53-a5db-0b5eb8ad2f81.jpeg";
const LEMON_BIRDS = "https://cdn.poehali.dev/projects/da9c55e1-2bcf-416a-90f7-995b1931dbfb/bucket/2cc595c9-b0d6-4498-a4ed-078cb7deebfe.jpeg";
const MENU_IMAGE = "https://cdn.poehali.dev/projects/da9c55e1-2bcf-416a-90f7-995b1931dbfb/bucket/942be219-e2e5-4c32-a178-6bdb7b0d20d9.jpeg";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Countdown() {
  const target = new Date("2026-05-26T14:00:00");
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "дней", val: time.days },
    { label: "часов", val: time.hours },
    { label: "минут", val: time.minutes },
    { label: "секунд", val: time.seconds },
  ];

  return (
    <div className="flex gap-3 md:gap-6 justify-center">
      {units.map(({ label, val }) => (
        <div key={label} className="flex flex-col items-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 border-[#1a3a6b] bg-white text-[#1a3a6b] font-[Playfair_Display] text-3xl md:text-4xl font-bold flex items-center justify-center shadow-md">
            {String(val).padStart(2, "0")}
          </div>
          <span className="mt-2 text-[10px] md:text-xs font-[Montserrat] text-[#1a3a6b]/60 tracking-widest uppercase">{label}</span>
        </div>
      ))}
    </div>
  );
}

function GuestForm() {
  const [form, setForm] = useState({ name: "", attendance: "yes", menu: "", wishes: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🍋</div>
        <p className="font-[Playfair_Display] text-2xl text-[#1a3a6b] italic mb-2">Grazie mille!</p>
        <p className="font-[Montserrat] text-sm text-[#1a3a6b]/60">Мы вас с нетерпением ждём</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-5">
      <div>
        <label className="block font-[Montserrat] text-xs uppercase tracking-widest text-[#1a3a6b]/70 mb-2">Ваше имя</label>
        <input
          required
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className="w-full border-2 border-[#1a3a6b]/20 rounded-xl px-4 py-3 font-[Montserrat] text-[#1a1a2e] bg-white/80 focus:outline-none focus:border-[#1a3a6b]/50 transition-colors"
          placeholder="Имя и фамилия"
        />
      </div>
      <div>
        <label className="block font-[Montserrat] text-xs uppercase tracking-widest text-[#1a3a6b]/70 mb-2">Присутствие</label>
        <div className="flex gap-3">
          {[{ val: "yes", label: "✓ Буду!" }, { val: "no", label: "✗ Не смогу" }].map(opt => (
            <button
              key={opt.val}
              type="button"
              onClick={() => setForm(f => ({ ...f, attendance: opt.val }))}
              className={`flex-1 py-3 rounded-xl font-[Montserrat] text-sm border-2 transition-all ${
                form.attendance === opt.val
                  ? "bg-[#1a3a6b] text-white border-[#1a3a6b]"
                  : "border-[#1a3a6b]/20 text-[#1a3a6b] bg-white/80 hover:border-[#1a3a6b]/50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block font-[Montserrat] text-xs uppercase tracking-widest text-[#1a3a6b]/70 mb-2">Предпочтения в меню</label>
        <select
          value={form.menu}
          onChange={e => setForm(f => ({ ...f, menu: e.target.value }))}
          className="w-full border-2 border-[#1a3a6b]/20 rounded-xl px-4 py-3 font-[Montserrat] text-[#1a1a2e] bg-white/80 focus:outline-none focus:border-[#1a3a6b]/50"
        >
          <option value="">Выберите вариант</option>
          <option value="meat">Мясное меню</option>
          <option value="fish">Рыбное меню</option>
          <option value="veg">Вегетарианское</option>
          <option value="children">Детское меню</option>
        </select>
      </div>
      <div>
        <label className="block font-[Montserrat] text-xs uppercase tracking-widest text-[#1a3a6b]/70 mb-2">Пожелание молодожёнам</label>
        <textarea
          value={form.wishes}
          onChange={e => setForm(f => ({ ...f, wishes: e.target.value }))}
          rows={3}
          className="w-full border-2 border-[#1a3a6b]/20 rounded-xl px-4 py-3 font-[Montserrat] text-[#1a1a2e] bg-white/80 focus:outline-none focus:border-[#1a3a6b]/50 resize-none transition-colors"
          placeholder="Ваши тёплые слова..."
        />
      </div>
      <button
        type="submit"
        className="w-full py-4 bg-[#1a3a6b] text-white font-[Montserrat] text-sm uppercase tracking-widest rounded-xl hover:bg-[#2d5aa0] transition-colors shadow-lg"
      >
        Отправить ответ
      </button>
    </form>
  );
}

export default function Index() {
  return (
    <div className="bg-[#fdfaf0] font-[Montserrat] overflow-x-hidden">

      {/* ===== HERO — La Dolce Vita ===== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Maiolica background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${MAIOLICA_IMAGE})` }}
        />
        {/* Cream overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fdfaf0]/60 via-transparent to-[#fdfaf0]" />

        {/* Lemon branches top-left */}
        <div className="absolute top-0 left-0 w-48 md:w-72 opacity-90 pointer-events-none select-none">
          <img src={LEMON_BIRDS} alt="" className="w-full h-auto object-contain" style={{ transform: 'scaleX(-1)', maxHeight: '50vh', objectPosition: 'top' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 py-24">
          {/* Invite card style */}
          <div className="inline-block relative">
            {/* Blue decorative hearts */}
            <p className="font-[Montserrat] text-[#1a3a6b]/60 text-xs uppercase tracking-[0.5em] mb-8">
              Join us for a Dinner Party
            </p>

            {/* Italic script title */}
            <div className="font-[Playfair_Display] italic text-[#1a3a6b] leading-none mb-2" style={{ fontSize: 'clamp(3.5rem, 12vw, 8rem)', fontWeight: 400 }}>
              La Dolce
            </div>
            <div className="font-[Playfair_Display] italic text-[#1a3a6b] leading-none mb-6" style={{ fontSize: 'clamp(3.5rem, 12vw, 8rem)', fontWeight: 400 }}>
              Vita
            </div>

            {/* Date orange */}
            <p className="font-[Montserrat] text-[#d4691e] font-bold text-2xl md:text-3xl tracking-widest mb-6">
              06.26.2025
            </p>

            {/* Tagline italic blue */}
            <p className="font-[Playfair_Display] italic text-[#1a3a6b] text-xl md:text-2xl mb-2">
              Let's sip into summer
            </p>
            <p className="text-[#1a3a6b] text-xl mb-8">♡</p>

            {/* Names */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#1a3a6b]/30" />
              <span className="font-[Playfair_Display] text-[#1a3a6b] text-xl italic">Эдуард & Полина</span>
              <div className="h-px w-12 bg-[#1a3a6b]/30" />
            </div>

            <a
              href="#rsvp"
              className="inline-flex items-center gap-2 bg-[#1a3a6b] text-white font-[Montserrat] text-xs uppercase tracking-widest px-10 py-4 rounded-full hover:bg-[#d4691e] transition-all duration-300 shadow-lg"
            >
              Подтвердить присутствие
            </a>
          </div>
        </div>

        {/* Lemon branches bottom-right */}
        <div className="absolute bottom-0 right-0 w-40 md:w-56 opacity-80 pointer-events-none select-none">
          <img src={LEMON_BIRDS} alt="" className="w-full h-auto" style={{ maxHeight: '30vh', objectFit: 'contain', objectPosition: 'bottom right' }} />
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <div className="w-0.5 h-12 bg-[#1a3a6b]/20 animate-pulse" />
        </div>
      </section>

      {/* ===== COUNTDOWN ===== */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <p className="font-[Montserrat] text-xs uppercase tracking-[0.4em] text-[#d4691e] mb-3">До свадьбы</p>
            <Countdown />
          </FadeIn>
        </div>
      </section>

      {/* ===== MAIOLICA DIVIDER ===== */}
      <div className="h-3 w-full" style={{ background: 'repeating-linear-gradient(90deg, #1a3a6b 0px, #1a3a6b 12px, #f5e642 12px, #f5e642 24px, #fff 24px, #fff 36px)' }} />

      {/* ===== DATE & VENUE ===== */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-8"
          style={{ backgroundImage: `url(${MAIOLICA_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-[#fdfaf0]/90" />

        <div className="relative max-w-3xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="font-[Montserrat] text-xs uppercase tracking-[0.5em] text-[#d4691e] mb-3">— когда и где —</p>
            <h2 className="font-[Playfair_Display] italic text-5xl md:text-6xl text-[#1a3a6b] mb-4">Детали вечера</h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-[#1a3a6b]/20" />
              <span className="text-[#f5e642] text-2xl">✦</span>
              <div className="h-px w-16 bg-[#1a3a6b]/20" />
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { emoji: "📅", label: "Дата", val: "26 мая 2026", sub: "Вторник" },
              { emoji: "🕑", label: "Начало", val: "14:00", sub: "Сбор гостей с 13:30" },
              { emoji: "📍", label: "Место", val: "Название зала", sub: "Город, улица" },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={i * 150}>
                <div className="bg-white border-2 border-[#1a3a6b]/10 rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">{item.emoji}</div>
                  <p className="font-[Montserrat] text-xs uppercase tracking-widest text-[#d4691e] mb-2">{item.label}</p>
                  <p className="font-[Playfair_Display] text-xl text-[#1a3a6b] font-medium">{item.val}</p>
                  <p className="font-[Montserrat] text-xs text-[#1a3a6b]/50 mt-1">{item.sub}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={300} className="mt-8 text-center">
            <button className="inline-flex items-center gap-2 border-2 border-[#1a3a6b] text-[#1a3a6b] font-[Montserrat] text-xs uppercase tracking-widest px-8 py-3 rounded-full hover:bg-[#1a3a6b] hover:text-white transition-all duration-300">
              <Icon name="Map" size={14} />
              Открыть на карте
            </button>
          </FadeIn>
        </div>
      </section>

      {/* ===== MAIOLICA DIVIDER ===== */}
      <div className="h-3 w-full" style={{ background: 'repeating-linear-gradient(90deg, #fff 0px, #fff 12px, #1a3a6b 12px, #1a3a6b 24px, #f5e642 24px, #f5e642 36px)' }} />

      {/* ===== MENU — Italian style ===== */}
      <section className="relative py-24 px-6 overflow-hidden" style={{ background: 'repeating-linear-gradient(0deg, #fdfaf0 0px, #fdfaf0 40px, #fffde7 40px, #fffde7 80px)' }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn className="text-center mb-12">
            <p className="font-[Montserrat] text-xs uppercase tracking-[0.5em] text-[#d4691e] mb-3">— кулинария —</p>
            <div className="font-[Playfair_Display] italic text-[#1a3a6b] text-2xl mb-1">Unser</div>
            <h2 className="font-[Montserrat] text-5xl md:text-6xl font-bold text-[#c8960a] tracking-widest mb-6">MENÜ</h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-[#1a3a6b]/20" />
              <span className="text-[#c8960a] text-xl">✦</span>
              <div className="h-px w-16 bg-[#1a3a6b]/20" />
            </div>
          </FadeIn>

          {/* Menu card with oval border */}
          <FadeIn delay={200}>
            <div className="relative bg-white/90 backdrop-blur rounded-[4rem] border-4 border-[#1a3a6b] p-10 md:p-14 shadow-xl">
              {/* Lemon decor top */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-5xl">🍋</div>

              {[
                {
                  course: "VORSPEISE",
                  dish: "CARPACCIO VOM RINDERFILET",
                  desc: "Rinderfilet, garniert mit Rucola, gehobeltem Parmesan und einem Hauch von Trüffelöl.",
                },
                {
                  course: "HAUPTSPEISE",
                  dish: "GEBRATENE ENTENBRUST AUF PORTWEINJUS",
                  desc: "Entenbrust, serviert auf einem Bett von saisonalem Gemüse, begleitet von einem reichhaltigen Portweinjus.",
                },
                {
                  course: "DESSERT",
                  dish: "SCHOKOLADENMOUSSE MIT HIMBEERCOULIS",
                  desc: "Schokoladenmousse, garniert mit frischen Himbeeren und einem süß-säuerlichen Himbeercoulis.",
                },
              ].map((item, i) => (
                <div key={i} className={`text-center ${i < 2 ? "mb-10 pb-10 border-b border-[#1a3a6b]/10" : ""}`}>
                  <p className="font-[Montserrat] text-xs uppercase tracking-[0.4em] text-[#c8960a] mb-2">{item.course}</p>
                  <p className="font-[Montserrat] text-sm font-semibold text-[#1a3a6b] mb-2 tracking-wide">{item.dish}</p>
                  <p className="font-[Playfair_Display] italic text-[#1a3a6b]/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== MAIOLICA DIVIDER ===== */}
      <div className="h-3 w-full" style={{ background: 'repeating-linear-gradient(90deg, #1a3a6b 0px, #1a3a6b 12px, #f5e642 12px, #f5e642 24px, #fff 24px, #fff 36px)' }} />

      {/* ===== TIMELINE ===== */}
      <section className="py-24 px-6 bg-[#1a3a6b]">
        <div className="max-w-2xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="font-[Montserrat] text-xs uppercase tracking-[0.5em] text-[#f5e642]/70 mb-3">— программа —</p>
            <h2 className="font-[Playfair_Display] italic text-5xl text-white mb-4">Тайминг дня</h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-white/20" />
              <span className="text-[#f5e642] text-xl">✦</span>
              <div className="h-px w-16 bg-white/20" />
            </div>
          </FadeIn>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
            {[
              { time: "13:30", title: "Сбор гостей", desc: "Welcome-коктейль и живая музыка", emoji: "🥂", side: "left" },
              { time: "14:00", title: "Церемония", desc: "Торжественная регистрация брака", emoji: "💍", side: "right" },
              { time: "15:00", title: "Фуршет", desc: "Шампанское, закуски, первые тосты", emoji: "🍾", side: "left" },
              { time: "16:30", title: "Банкет", desc: "Праздничный ужин и первый танец", emoji: "🎵", side: "right" },
              { time: "19:00", title: "Торт", desc: "Разрезание свадебного торта", emoji: "🎂", side: "left" },
              { time: "19:30", title: "Танцы", desc: "До позднего вечера", emoji: "🌙", side: "right" },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className={`flex items-center gap-6 mb-10 ${item.side === "right" ? "flex-row-reverse" : ""}`}>
                  <div className={`flex-1 ${item.side === "right" ? "text-left" : "text-right"}`}>
                    <p className="font-[Montserrat] text-xs uppercase tracking-widest text-[#f5e642]/60 mb-1">{item.time}</p>
                    <p className="font-[Playfair_Display] text-lg text-white italic">{item.title}</p>
                    <p className="font-[Montserrat] text-xs text-white/50 mt-0.5">{item.desc}</p>
                  </div>
                  <div className="relative z-10 w-12 h-12 rounded-full bg-[#f5e642] border-4 border-[#1a3a6b] flex items-center justify-center shadow-lg flex-shrink-0 text-xl">
                    {item.emoji}
                  </div>
                  <div className="flex-1" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MAIOLICA DIVIDER ===== */}
      <div className="h-3 w-full" style={{ background: 'repeating-linear-gradient(90deg, #fff 0px, #fff 12px, #1a3a6b 12px, #1a3a6b 24px, #f5e642 24px, #f5e642 36px)' }} />

      {/* ===== DETAILS / DRESS CODE ===== */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="font-[Montserrat] text-xs uppercase tracking-[0.5em] text-[#d4691e] mb-3">— важно знать —</p>
            <h2 className="font-[Playfair_Display] italic text-5xl md:text-6xl text-[#1a3a6b] mb-4">Детали</h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-[#1a3a6b]/20" />
              <span className="text-[#f5e642] text-xl">✦</span>
              <div className="h-px w-16 bg-[#1a3a6b]/20" />
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { emoji: "👔", title: "Дресс-код", desc: "Праздничный наряд. Палитра: белый, синий, жёлтый. Пожалуйста, не надевайте белое — это цвет невесты." },
              { emoji: "👶", title: "Дети", desc: "Мы рады детям! Для малышей оборудована специальная зона с развлечениями." },
              { emoji: "📷", title: "Фото", desc: "Просим не снимать во время церемонии. Фотограф запечатлеет все важные моменты." },
              { emoji: "🎁", title: "Подарки", desc: "Лучший подарок — ваше присутствие. Если хочется сделать сюрприз — уточните у организаторов." },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 100}>
                <div className="bg-white border-2 border-[#1a3a6b]/10 rounded-3xl p-7 flex gap-5 items-start hover:border-[#1a3a6b]/30 transition-colors">
                  <div className="text-3xl flex-shrink-0 mt-1">{item.emoji}</div>
                  <div>
                    <p className="font-[Montserrat] text-xs uppercase tracking-widest text-[#d4691e] mb-2">{item.title}</p>
                    <p className="font-[Montserrat] text-sm text-[#1a3a6b]/70 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RSVP ===== */}
      <section id="rsvp" className="relative py-24 px-6 overflow-hidden">
        {/* Maiolica frame image as bg */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${MAIOLICA_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-[#fdf8d0]/90" />

        <div className="relative max-w-2xl mx-auto">
          <FadeIn className="text-center mb-12">
            <p className="font-[Montserrat] text-xs uppercase tracking-[0.5em] text-[#d4691e] mb-3">— ваш ответ —</p>
            <h2 className="font-[Playfair_Display] italic text-5xl md:text-6xl text-[#1a3a6b] mb-4">RSVP</h2>
            <p className="font-[Montserrat] text-sm text-[#1a3a6b]/60">Пожалуйста, подтвердите присутствие до 1 мая 2026</p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="h-px w-16 bg-[#1a3a6b]/20" />
              <span className="text-[#f5e642] text-xl">🍋</span>
              <div className="h-px w-16 bg-[#1a3a6b]/20" />
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-[#1a3a6b]/10">
              <GuestForm />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#1a3a6b] py-16 px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: `url(${MAIOLICA_IMAGE})` }}
        />
        <div className="relative">
          <p className="font-[Playfair_Display] italic text-[#f5e642] text-4xl md:text-5xl mb-2">La Dolce Vita</p>
          <p className="font-[Montserrat] text-white/50 text-xs uppercase tracking-widest mb-6">26 мая 2026 · Эдуард & Полина</p>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-10 bg-white/20" />
            <span className="text-[#f5e642] text-lg">🍋</span>
            <div className="h-px w-10 bg-white/20" />
          </div>
          <p className="font-[Playfair_Display] italic text-white/40 text-sm">Let's sip into summer ♡</p>
        </div>
      </footer>
    </div>
  );
}
