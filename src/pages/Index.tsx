import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const LEMON_TOP = "https://cdn.poehali.dev/files/6772a591-0b0a-4e3d-b5b9-b4d5ded44457.png";
const PHOTO_LEFT = "https://cdn.poehali.dev/projects/da9c55e1-2bcf-416a-90f7-995b1931dbfb/bucket/392a8f03-2221-4324-96af-3746df3e5a78.png";
const PHOTO_RIGHT = "https://cdn.poehali.dev/projects/da9c55e1-2bcf-416a-90f7-995b1931dbfb/bucket/b39bae2a-57f4-4aba-bd6b-c418fd75b86a.png";
const MAIOLICA_IMAGE = "https://cdn.poehali.dev/projects/da9c55e1-2bcf-416a-90f7-995b1931dbfb/bucket/77931437-20e0-4a53-a5db-0b5eb8ad2f81.jpeg";

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
  const target = new Date("2026-05-26T15:30:00");
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

      {/* ===== HERO ===== */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-16 px-4"
        style={{
          background: 'repeating-linear-gradient(90deg, #fffde7 0px, #fffde7 40px, #fdf8c8 40px, #fdf8c8 80px)',
        }}
      >
        {/* Фото слева */}
        <div className="absolute left-0 bottom-0 w-36 md:w-52 lg:w-64 pointer-events-none select-none z-10">
          <img
            src={PHOTO_LEFT}
            alt=""
            className="w-full h-auto object-contain object-bottom"
            style={{ maxHeight: '70vh' }}
          />
        </div>

        {/* Фото справа */}
        <div className="absolute right-0 bottom-0 w-36 md:w-52 lg:w-64 pointer-events-none select-none z-10">
          <img
            src={PHOTO_RIGHT}
            alt=""
            className="w-full h-auto object-contain object-bottom"
            style={{ maxHeight: '70vh', transform: 'scaleX(-1)' }}
          />
        </div>

        {/* Карточка по центру */}
        <div className="relative z-20 w-full max-w-xs md:max-w-sm mx-auto flex flex-col items-center">

          {/* Лимон сверху — выступает над овалом */}
          <div className="relative z-30 -mb-8 w-44 md:w-56 pointer-events-none select-none drop-shadow-lg">
            <img
              src={LEMON_TOP}
              alt="Лимоны"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Овал с двойной синей обводкой */}
          <div
            className="relative z-20 w-full bg-white flex flex-col items-center justify-center text-center px-8 pt-16 pb-12"
            style={{
              borderRadius: '50% / 8%',
              border: '2.5px solid #1a3a6b',
              boxShadow: 'inset 0 0 0 6px white, inset 0 0 0 8.5px #1a3a6b',
              minHeight: '400px',
            }}
          >
            <p className="font-[Montserrat] text-[10px] uppercase tracking-[0.35em] text-[#1a3a6b]/50 mb-5">
              Вы приглашены
            </p>

            <h1 className="font-[Playfair_Display] italic text-[#1a3a6b] leading-tight mb-1" style={{ fontSize: 'clamp(2rem, 7vw, 2.8rem)' }}>
              Эдуард
            </h1>
            <p className="font-[Playfair_Display] italic text-[#1a3a6b]/40 text-2xl mb-1">&amp;</p>
            <h1 className="font-[Playfair_Display] italic text-[#1a3a6b] leading-tight mb-6" style={{ fontSize: 'clamp(2rem, 7vw, 2.8rem)' }}>
              Полина
            </h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-[#1a3a6b]/20" />
              <span className="text-[#c8960a] text-base">✦</span>
              <div className="h-px w-10 bg-[#1a3a6b]/20" />
            </div>

            <p className="font-[Montserrat] font-bold tracking-widest text-[#c8960a] mb-2" style={{ fontSize: 'clamp(1rem, 4vw, 1.3rem)' }}>
              26 мая 2026 года
            </p>
            <p className="font-[Montserrat] text-[10px] uppercase tracking-widest text-[#1a3a6b]/50 mb-7">
              Начало в 15:30
            </p>

            <a
              href="#details"
              className="inline-flex items-center gap-2 border-2 border-[#1a3a6b] text-[#1a3a6b] font-[Montserrat] text-[10px] uppercase tracking-widest px-7 py-2.5 rounded-full hover:bg-[#1a3a6b] hover:text-white transition-all duration-300"
            >
              Подробнее
            </a>
          </div>
        </div>

        <div className="relative z-20 mt-10 flex flex-col items-center">
          <div className="w-0.5 h-10 bg-[#1a3a6b]/20 animate-pulse" />
        </div>
      </section>

      {/* ===== COUNTDOWN ===== */}
      <section
        className="py-16 px-6"
        style={{ background: 'repeating-linear-gradient(90deg, #fffde7 0px, #fffde7 40px, #fdf8c8 40px, #fdf8c8 80px)' }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <p className="font-[Montserrat] text-xs uppercase tracking-[0.4em] text-[#c8960a] mb-6">До нашей свадьбы осталось</p>
            <Countdown />
          </FadeIn>
        </div>
      </section>

      {/* ===== MAIOLICA DIVIDER ===== */}
      <div className="h-3 w-full" style={{ background: 'repeating-linear-gradient(90deg, #1a3a6b 0px, #1a3a6b 12px, #f5e642 12px, #f5e642 24px, #fff 24px, #fff 36px)' }} />

      {/* ===== DATE & VENUE ===== */}
      <section id="details" className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="font-[Montserrat] text-xs uppercase tracking-[0.5em] text-[#c8960a] mb-3">— когда и где —</p>
            <h2 className="font-[Playfair_Display] italic text-5xl text-[#1a3a6b] mb-4">День торжества</h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-[#1a3a6b]/20" />
              <span className="text-[#c8960a] text-xl">✦</span>
              <div className="h-px w-16 bg-[#1a3a6b]/20" />
            </div>
          </FadeIn>

          {/* Дата и время */}
          <FadeIn delay={100}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
              <div className="bg-[#fffde7] border-2 border-[#1a3a6b]/10 rounded-3xl p-7 text-center flex-1 max-w-xs">
                <div className="text-4xl mb-3">📅</div>
                <p className="font-[Montserrat] text-[10px] uppercase tracking-widest text-[#c8960a] mb-2">Дата</p>
                <p className="font-[Playfair_Display] text-xl text-[#1a3a6b] font-medium">26 мая 2026</p>
                <p className="font-[Montserrat] text-xs text-[#1a3a6b]/50 mt-1">Вторник</p>
              </div>
              <div className="bg-[#fffde7] border-2 border-[#1a3a6b]/10 rounded-3xl p-7 text-center flex-1 max-w-xs">
                <div className="text-4xl mb-3">🕒</div>
                <p className="font-[Montserrat] text-[10px] uppercase tracking-widest text-[#c8960a] mb-2">Начало</p>
                <p className="font-[Playfair_Display] text-xl text-[#1a3a6b] font-medium">15:30</p>
                <p className="font-[Montserrat] text-xs text-[#1a3a6b]/50 mt-1">Сбор гостей с 15:00</p>
              </div>
            </div>
          </FadeIn>

          {/* Место регистрации */}
          <FadeIn delay={200}>
            <div className="bg-[#fffde7] border-2 border-[#1a3a6b]/10 rounded-3xl p-8 mb-6">
              <div className="flex items-start gap-5">
                <div className="text-3xl mt-1 flex-shrink-0">💍</div>
                <div>
                  <p className="font-[Montserrat] text-[10px] uppercase tracking-widest text-[#c8960a] mb-2">Регистрация</p>
                  <p className="font-[Playfair_Display] italic text-xl text-[#1a3a6b] mb-1">Центральный отдел по г. Иркутску</p>
                  <p className="font-[Montserrat] text-sm text-[#1a3a6b]/70 mb-1">Служба ЗАГС Иркутской области</p>
                  <p className="font-[Montserrat] text-sm text-[#1a3a6b]/50">ул. Декабрьских событий, 106</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Место празднования — с кнопкой карты */}
          <FadeIn delay={300}>
            <div className="bg-[#1a3a6b] rounded-3xl p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
                <div className="flex items-start gap-5 flex-1">
                  <div className="text-3xl mt-1 flex-shrink-0">🥂</div>
                  <div>
                    <p className="font-[Montserrat] text-[10px] uppercase tracking-widest text-[#f5e642]/70 mb-2">Место празднования</p>
                    <p className="font-[Playfair_Display] italic text-xl text-white mb-1">Банкет и торжество</p>
                    <p className="font-[Montserrat] text-sm text-white/70 mb-1">рп. Большая Речка</p>
                    <p className="font-[Montserrat] text-sm text-white/50">Южный переулок, д. 7</p>
                  </div>
                </div>
                <a
                  href="https://yandex.ru/maps/?text=рп.+Большая+Речка+Южный+переулок+7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 inline-flex items-center gap-2 bg-[#f5e642] text-[#1a3a6b] font-[Montserrat] text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-white transition-colors shadow-lg"
                >
                  <Icon name="Map" size={14} />
                  Открыть карту
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== MAIOLICA DIVIDER ===== */}
      <div className="h-3 w-full" style={{ background: 'repeating-linear-gradient(90deg, #fff 0px, #fff 12px, #1a3a6b 12px, #1a3a6b 24px, #f5e642 24px, #f5e642 36px)' }} />

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
              { time: "15:00", title: "Сбор гостей", desc: "Welcome-коктейль", emoji: "🥂", side: "left" },
              { time: "15:30", title: "Регистрация", desc: "ЗАГС, ул. Декабрьских событий, 106", emoji: "💍", side: "right" },
              { time: "17:00", title: "Выезд на банкет", desc: "рп. Большая Речка, Южный пер., 7", emoji: "🚗", side: "left" },
              { time: "18:00", title: "Банкет", desc: "Праздничный ужин, тосты и первый танец", emoji: "🎵", side: "right" },
              { time: "20:00", title: "Торт", desc: "Разрезание свадебного торта", emoji: "🎂", side: "left" },
              { time: "20:30", title: "Танцы", desc: "До позднего вечера", emoji: "🌙", side: "right" },
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
      <div className="h-3 w-full" style={{ background: 'repeating-linear-gradient(90deg, #1a3a6b 0px, #1a3a6b 12px, #f5e642 12px, #f5e642 24px, #fff 24px, #fff 36px)' }} />

      {/* ===== DETAILS ===== */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="font-[Montserrat] text-xs uppercase tracking-[0.5em] text-[#c8960a] mb-3">— важно знать —</p>
            <h2 className="font-[Playfair_Display] italic text-5xl text-[#1a3a6b] mb-4">Детали</h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-[#1a3a6b]/20" />
              <span className="text-[#c8960a] text-xl">✦</span>
              <div className="h-px w-16 bg-[#1a3a6b]/20" />
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { emoji: "👔", title: "Дресс-код", desc: "Праздничный наряд. Предпочтительная палитра: белый, синий, жёлтый. Белое — только для невесты." },
              { emoji: "👶", title: "Дети", desc: "Мы рады видеть ваших детей! Для малышей будет оборудована специальная зона." },
              { emoji: "📷", title: "Фото", desc: "Просим не снимать во время церемонии — фотограф запечатлеет все важные моменты." },
              { emoji: "🎁", title: "Подарки", desc: "Лучший подарок — ваше присутствие. Если хочется сделать сюрприз — уточните у организаторов." },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 100}>
                <div className="bg-[#fffde7] border-2 border-[#1a3a6b]/10 rounded-3xl p-7 flex gap-5 items-start hover:border-[#1a3a6b]/30 transition-colors">
                  <div className="text-3xl flex-shrink-0 mt-1">{item.emoji}</div>
                  <div>
                    <p className="font-[Montserrat] text-[10px] uppercase tracking-widest text-[#c8960a] mb-2">{item.title}</p>
                    <p className="font-[Montserrat] text-sm text-[#1a3a6b]/70 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MAIOLICA DIVIDER ===== */}
      <div className="h-3 w-full" style={{ background: 'repeating-linear-gradient(90deg, #fff 0px, #fff 12px, #1a3a6b 12px, #1a3a6b 24px, #f5e642 24px, #f5e642 36px)' }} />

      {/* ===== RSVP ===== */}
      <section
        id="rsvp"
        className="py-24 px-6"
        style={{ background: 'repeating-linear-gradient(90deg, #fffde7 0px, #fffde7 40px, #fdf8c8 40px, #fdf8c8 80px)' }}
      >
        <div className="max-w-2xl mx-auto">
          <FadeIn className="text-center mb-12">
            <p className="font-[Montserrat] text-xs uppercase tracking-[0.5em] text-[#c8960a] mb-3">— ваш ответ —</p>
            <h2 className="font-[Playfair_Display] italic text-5xl text-[#1a3a6b] mb-4">RSVP</h2>
            <p className="font-[Montserrat] text-sm text-[#1a3a6b]/60">Пожалуйста, подтвердите присутствие до 1 мая 2026</p>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-[#1a3a6b]/10">
              <GuestForm />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#1a3a6b] py-14 px-6 text-center">
        <p className="font-[Playfair_Display] italic text-[#f5e642] text-4xl mb-2">Эдуард & Полина</p>
        <p className="font-[Montserrat] text-white/50 text-xs uppercase tracking-widest mb-4">26 мая 2026 · Иркутск</p>
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-10 bg-white/20" />
          <span className="text-[#f5e642] text-lg">🍋</span>
          <div className="h-px w-10 bg-white/20" />
        </div>
      </footer>
    </div>
  );
}