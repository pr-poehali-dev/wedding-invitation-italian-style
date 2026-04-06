import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const PHOTO_LEFT = "https://cdn.poehali.dev/projects/da9c55e1-2bcf-416a-90f7-995b1931dbfb/bucket/392a8f03-2221-4324-96af-3746df3e5a78.png";
const PHOTO_RIGHT = "https://cdn.poehali.dev/projects/da9c55e1-2bcf-416a-90f7-995b1931dbfb/bucket/b39bae2a-57f4-4aba-bd6b-c418fd75b86a.png";
const LEMON_BRANCH = "https://cdn.poehali.dev/projects/da9c55e1-2bcf-416a-90f7-995b1931dbfb/bucket/be714152-862a-4017-a24e-425890a3c8a3.png";
const LEMON_SLICE = "https://cdn.poehali.dev/projects/da9c55e1-2bcf-416a-90f7-995b1931dbfb/bucket/62f93f2b-16f4-48a3-96ff-a65d0f74b1a0.png";
const BG_TILE = "https://cdn.poehali.dev/projects/da9c55e1-2bcf-416a-90f7-995b1931dbfb/bucket/0274bd99-ef64-4d91-8eff-26345949f76b.png";
const DRESSCODE_1 = "https://cdn.poehali.dev/projects/da9c55e1-2bcf-416a-90f7-995b1931dbfb/bucket/1a95a109-8b95-4b15-a228-da758d067f9c.png";
const DRESSCODE_2 = "https://cdn.poehali.dev/projects/da9c55e1-2bcf-416a-90f7-995b1931dbfb/bucket/86e06fde-0f27-4798-9818-8d7cd6292709.png";

const BLUE = "#4a7ab5";
const BLUE_LIGHT = "#e8f0fb";
const GOLD = "#c8960a";

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

function LemonDeco({ className = "", size = 80, flip = false }: { className?: string; size?: number; flip?: boolean }) {
  return (
    <img
      src={LEMON_BRANCH}
      alt=""
      className={`pointer-events-none select-none opacity-80 ${className}`}
      style={{ width: size, height: "auto", transform: flip ? "scaleX(-1)" : undefined }}
    />
  );
}

function Divider() {
  return (
    <div className="flex items-center justify-center gap-3 my-2">
      <div className="h-px flex-1 max-w-16" style={{ background: `${BLUE}30` }} />
      <span style={{ color: GOLD }}>✦</span>
      <div className="h-px flex-1 max-w-16" style={{ background: `${BLUE}30` }} />
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
          <div
            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 bg-white font-[Playfair_Display] text-3xl md:text-4xl font-bold flex items-center justify-center shadow-md"
            style={{ borderColor: BLUE, color: BLUE }}
          >
            {String(val).padStart(2, "0")}
          </div>
          <span className="mt-2 text-[10px] md:text-xs font-[Montserrat] tracking-widest uppercase" style={{ color: `${BLUE}99` }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

const ALCOHOL_OPTIONS = [
  "Только безалкогольные",
  "Виски",
  "Вино белое",
  "Вино красное",
  "Пиво",
  "Шампанское",
  "Коктейли",
];

function GuestForm() {
  const [form, setForm] = useState({ name: "", attendance: "yes", alcohol: [] as string[], wishes: "" });
  const [sent, setSent] = useState(false);

  const toggleAlcohol = (opt: string) => {
    setForm(f => ({
      ...f,
      alcohol: f.alcohol.includes(opt) ? f.alcohol.filter(a => a !== opt) : [...f.alcohol, opt],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="text-center py-12">
        <img src={LEMON_SLICE} alt="" className="w-20 h-auto mx-auto mb-4 opacity-80" />
        <p className="font-[Playfair_Display] text-2xl italic mb-2" style={{ color: BLUE }}>Grazie mille!</p>
        <p className="font-[Montserrat] text-sm" style={{ color: `${BLUE}99` }}>Мы вас с нетерпением ждём</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
      <div>
        <label className="block font-[Montserrat] text-[10px] uppercase tracking-widest mb-2" style={{ color: `${BLUE}99` }}>Имя и фамилия</label>
        <input
          required
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className="w-full rounded-2xl px-4 py-3 font-[Montserrat] text-gray-800 bg-white focus:outline-none transition-colors border-2"
          style={{ borderColor: `${BLUE}30` }}
          placeholder="Иван Иванов"
        />
      </div>

      <div>
        <label className="block font-[Montserrat] text-[10px] uppercase tracking-widest mb-3" style={{ color: `${BLUE}99` }}>Присутствие</label>
        <div className="flex gap-3">
          {[{ val: "yes", label: "Буду с радостью!" }, { val: "no", label: "Не смогу прийти" }].map(opt => (
            <button
              key={opt.val}
              type="button"
              onClick={() => setForm(f => ({ ...f, attendance: opt.val }))}
              className="flex-1 py-3 px-3 rounded-2xl font-[Montserrat] text-xs border-2 transition-all"
              style={form.attendance === opt.val
                ? { background: BLUE, color: "white", borderColor: BLUE }
                : { background: "white", color: BLUE, borderColor: `${BLUE}30` }
              }
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-[Montserrat] text-[10px] uppercase tracking-widest mb-3" style={{ color: `${BLUE}99` }}>Предпочтения по напиткам</label>
        <div className="flex flex-wrap gap-2">
          {ALCOHOL_OPTIONS.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => toggleAlcohol(opt)}
              className="px-4 py-2 rounded-full font-[Montserrat] text-xs border-2 transition-all"
              style={form.alcohol.includes(opt)
                ? { background: GOLD, color: "white", borderColor: GOLD }
                : { background: "white", color: BLUE, borderColor: `${BLUE}30` }
              }
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-[Montserrat] text-[10px] uppercase tracking-widest mb-2" style={{ color: `${BLUE}99` }}>Пожелания молодожёнам</label>
        <textarea
          value={form.wishes}
          onChange={e => setForm(f => ({ ...f, wishes: e.target.value }))}
          rows={3}
          className="w-full rounded-2xl px-4 py-3 font-[Montserrat] text-gray-800 bg-white focus:outline-none resize-none transition-colors border-2"
          style={{ borderColor: `${BLUE}30` }}
          placeholder="Ваши тёплые слова..."
        />
      </div>

      <button
        type="submit"
        className="w-full py-4 text-white font-[Montserrat] text-xs uppercase tracking-widest rounded-2xl transition-colors shadow-lg"
        style={{ background: BLUE }}
      >
        Отправить ответ
      </button>
    </form>
  );
}

export default function Index() {
  return (
    <div className="font-[Montserrat] overflow-x-hidden" style={{ background: "#fdfaf0" }}>

      {/* ===== HERO ===== */}
      <section
        className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${BG_TILE})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Полупрозрачный оверлей для читаемости */}
        <div className="absolute inset-0 bg-white/55" />

        {/* Фото слева — полная высота */}
        <div className="absolute left-0 bottom-0 h-full pointer-events-none select-none z-10" style={{ width: "clamp(140px, 28vw, 380px)" }}>
          <img
            src={PHOTO_LEFT}
            alt=""
            className="h-full w-full object-contain object-bottom"
          />
        </div>

        {/* Фото справа — полная высота */}
        <div className="absolute right-0 bottom-0 h-full pointer-events-none select-none z-10" style={{ width: "clamp(140px, 28vw, 380px)" }}>
          <img
            src={PHOTO_RIGHT}
            alt=""
            className="h-full w-full object-contain object-bottom"
          />
        </div>

        {/* Карточка по центру */}
        <div className="relative z-20 w-full flex flex-col items-center px-4" style={{ maxWidth: "min(360px, 44vw)" }}>

          {/* Лимончики над карточкой */}
          <div className="relative z-30 -mb-8 w-40 md:w-52 pointer-events-none select-none">
            <img src={LEMON_BRANCH} alt="" className="w-full h-auto object-contain drop-shadow-md" />
          </div>

          {/* Овал */}
          <div
            className="relative z-20 w-full bg-white/90 flex flex-col items-center justify-center text-center px-6 pt-14 pb-10 backdrop-blur-sm"
            style={{
              borderRadius: "50% / 8%",
              border: `2.5px solid ${BLUE}`,
              boxShadow: `inset 0 0 0 5px white, inset 0 0 0 8px ${BLUE}`,
              minHeight: "380px",
            }}
          >
            <p className="font-[Montserrat] text-[9px] uppercase tracking-[0.35em] mb-4" style={{ color: `${BLUE}80` }}>
              Вы приглашены
            </p>

            <h1 className="font-[Playfair_Display] italic leading-tight mb-1" style={{ fontSize: "clamp(1.7rem, 5vw, 2.6rem)", color: BLUE }}>
              Эдуард
            </h1>
            <p className="font-[Playfair_Display] italic text-2xl mb-1" style={{ color: `${BLUE}50` }}>&amp;</p>
            <h1 className="font-[Playfair_Display] italic leading-tight mb-5" style={{ fontSize: "clamp(1.7rem, 5vw, 2.6rem)", color: BLUE }}>
              Полина
            </h1>

            <Divider />

            <p className="font-[Montserrat] font-bold tracking-widest mt-4 mb-1" style={{ fontSize: "clamp(0.9rem, 3vw, 1.2rem)", color: GOLD }}>
              26 мая 2026 года
            </p>
            <p className="font-[Montserrat] text-[9px] uppercase tracking-widest mb-6" style={{ color: `${BLUE}80` }}>
              Начало в 15:30
            </p>

            <a
              href="#details"
              className="inline-flex items-center gap-2 font-[Montserrat] text-[9px] uppercase tracking-widest px-6 py-2.5 rounded-full border-2 transition-all duration-300 hover:text-white"
              style={{ borderColor: BLUE, color: BLUE }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = BLUE; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
            >
              Подробнее
            </a>
          </div>
        </div>

        <div className="relative z-20 mt-8 flex flex-col items-center">
          <div className="w-0.5 h-8 animate-pulse" style={{ background: `${BLUE}40` }} />
        </div>
      </section>

      {/* ===== ПРИВЕТСТВИЕ ===== */}
      <section className="py-20 px-6 bg-white relative overflow-hidden">
        {/* Лимончики-декор */}
        <div className="absolute -left-6 top-6 opacity-40 pointer-events-none">
          <LemonDeco size={120} />
        </div>
        <div className="absolute -right-6 bottom-6 opacity-40 pointer-events-none">
          <LemonDeco size={100} flip />
        </div>

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <FadeIn>
            <img src={LEMON_SLICE} alt="" className="w-16 h-auto mx-auto mb-6 opacity-70" />
            <p className="font-[Montserrat] text-[10px] uppercase tracking-[0.5em] mb-6" style={{ color: GOLD }}>— дорогие гости —</p>
            <p className="font-[Playfair_Display] italic leading-relaxed mb-4" style={{ fontSize: "clamp(1.1rem, 3vw, 1.4rem)", color: BLUE }}>
              Мы счастливы пригласить вас на важное событие —
            </p>
            <h2 className="font-[Playfair_Display] italic mb-6" style={{ fontSize: "clamp(1.5rem, 5vw, 2.2rem)", color: GOLD }}>
              день нашей свадьбы!
            </h2>
            <Divider />
            <p className="font-[Playfair_Display] italic leading-relaxed mt-6" style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", color: `${BLUE}99` }}>
              Будем безумно рады, если вы присоединитесь к нам в этот особенный день!
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ===== COUNTDOWN ===== */}
      <section
        className="py-16 px-6 relative overflow-hidden"
        style={{ backgroundImage: `url(${BG_TILE})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-white/70" />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <FadeIn>
            <p className="font-[Montserrat] text-xs uppercase tracking-[0.4em] mb-6" style={{ color: GOLD }}>До нашей свадьбы осталось</p>
            <Countdown />
          </FadeIn>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="h-3 w-full" style={{ background: `repeating-linear-gradient(90deg, ${BLUE} 0px, ${BLUE} 12px, #f5e642 12px, #f5e642 24px, #fff 24px, #fff 36px)` }} />

      {/* ===== DATE & VENUE ===== */}
      <section id="details" className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute right-0 top-10 opacity-25 pointer-events-none">
          <LemonDeco size={160} flip />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <FadeIn className="text-center mb-16">
            <p className="font-[Montserrat] text-xs uppercase tracking-[0.5em] mb-3" style={{ color: GOLD }}>— когда и где —</p>
            <h2 className="font-[Playfair_Display] italic text-5xl mb-4" style={{ color: BLUE }}>День торжества</h2>
            <Divider />
          </FadeIn>

          <FadeIn delay={100}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
              <div className="rounded-3xl p-7 text-center flex-1 max-w-xs border-2" style={{ background: BLUE_LIGHT, borderColor: `${BLUE}20` }}>
                <div className="text-4xl mb-3">📅</div>
                <p className="font-[Montserrat] text-[10px] uppercase tracking-widest mb-2" style={{ color: GOLD }}>Дата</p>
                <p className="font-[Playfair_Display] text-xl font-medium" style={{ color: BLUE }}>26 мая 2026</p>
                <p className="font-[Montserrat] text-xs mt-1" style={{ color: `${BLUE}70` }}>Вторник</p>
              </div>
              <div className="rounded-3xl p-7 text-center flex-1 max-w-xs border-2" style={{ background: BLUE_LIGHT, borderColor: `${BLUE}20` }}>
                <div className="text-4xl mb-3">🕒</div>
                <p className="font-[Montserrat] text-[10px] uppercase tracking-widest mb-2" style={{ color: GOLD }}>Начало</p>
                <p className="font-[Playfair_Display] text-xl font-medium" style={{ color: BLUE }}>15:30</p>
                <p className="font-[Montserrat] text-xs mt-1" style={{ color: `${BLUE}70` }}>Регистрация в ЗАГСе</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="rounded-3xl p-8 mb-6 border-2" style={{ background: BLUE_LIGHT, borderColor: `${BLUE}20` }}>
              <div className="flex items-start gap-5">
                <div className="text-3xl mt-1 flex-shrink-0">💍</div>
                <div>
                  <p className="font-[Montserrat] text-[10px] uppercase tracking-widest mb-2" style={{ color: GOLD }}>Регистрация</p>
                  <p className="font-[Playfair_Display] italic text-xl mb-1" style={{ color: BLUE }}>Центральный отдел по г. Иркутску</p>
                  <p className="font-[Montserrat] text-sm mb-1" style={{ color: `${BLUE}99` }}>Служба ЗАГС Иркутской области</p>
                  <p className="font-[Montserrat] text-sm" style={{ color: `${BLUE}70` }}>ул. Декабрьских событий, 106</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="rounded-3xl p-8" style={{ background: BLUE }}>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
                <div className="flex items-start gap-5 flex-1">
                  <div className="text-3xl mt-1 flex-shrink-0">🥂</div>
                  <div>
                    <p className="font-[Montserrat] text-[10px] uppercase tracking-widest mb-2" style={{ color: "#f5e642cc" }}>Место празднования</p>
                    <p className="font-[Playfair_Display] italic text-xl text-white mb-1">Банкет и торжество</p>
                    <p className="font-[Montserrat] text-sm text-white/70 mb-1">рп. Большая Речка, Иркутский район</p>
                    <p className="font-[Montserrat] text-sm text-white/50">Южный переулок, д. 7</p>
                  </div>
                </div>
                <a
                  href="https://yandex.ru/maps/?text=664518%2C+Иркутский+район%2C+Иркутская+область%2C+рп.+Большая+Речка%2C+Южный+переулок%2C+7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 inline-flex items-center gap-2 font-[Montserrat] text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded-full transition-colors shadow-lg"
                  style={{ background: "#f5e642", color: BLUE }}
                >
                  <Icon name="Map" size={14} />
                  Открыть карту
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="h-3 w-full" style={{ background: `repeating-linear-gradient(90deg, #fff 0px, #fff 12px, ${BLUE} 12px, ${BLUE} 24px, #f5e642 24px, #f5e642 36px)` }} />

      {/* ===== TIMELINE ===== */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: BLUE }}>
        <div className="absolute left-4 top-8 opacity-20 pointer-events-none">
          <LemonDeco size={120} />
        </div>
        <div className="absolute right-4 bottom-8 opacity-20 pointer-events-none">
          <LemonDeco size={100} flip />
        </div>

        <div className="max-w-2xl mx-auto relative z-10">
          <FadeIn className="text-center mb-16">
            <p className="font-[Montserrat] text-xs uppercase tracking-[0.5em] mb-3" style={{ color: "#f5e642cc" }}>— программа —</p>
            <h2 className="font-[Playfair_Display] italic text-5xl text-white mb-4">Тайминг дня</h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-white/20" />
              <span className="text-yellow-300 text-xl">✦</span>
              <div className="h-px w-16 bg-white/20" />
            </div>
          </FadeIn>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/15 -translate-x-1/2" />
            {[
              { time: "15:30", title: "Регистрация", desc: "Центральный отдел ЗАГСа", emoji: "💍", side: "left" },
              { time: "16:30–17:00", title: "Выезд", desc: "Отправляемся на место торжества", emoji: "🚗", side: "right" },
              { time: "17:30", title: "Начало банкета", desc: "рп. Большая Речка, Южный пер., 7", emoji: "🥂", side: "left" },
              { time: "22:00", title: "Танцы!", desc: "До позднего вечера!", emoji: "🌙", side: "right" },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className={`flex items-center gap-6 mb-10 ${item.side === "right" ? "flex-row-reverse" : ""}`}>
                  <div className={`flex-1 ${item.side === "right" ? "text-left" : "text-right"}`}>
                    <p className="font-[Montserrat] text-xs uppercase tracking-widest mb-1" style={{ color: "#f5e64299" }}>{item.time}</p>
                    <p className="font-[Playfair_Display] text-lg text-white italic">{item.title}</p>
                    <p className="font-[Montserrat] text-xs text-white/50 mt-0.5">{item.desc}</p>
                  </div>
                  <div className="relative z-10 w-12 h-12 rounded-full border-4 flex items-center justify-center shadow-lg flex-shrink-0 text-xl" style={{ background: "#f5e642", borderColor: BLUE }}>
                    {item.emoji}
                  </div>
                  <div className="flex-1" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="h-3 w-full" style={{ background: `repeating-linear-gradient(90deg, ${BLUE} 0px, ${BLUE} 12px, #f5e642 12px, #f5e642 24px, #fff 24px, #fff 36px)` }} />

      {/* ===== ДЕТАЛИ (ДРЕСС-КОД) ===== */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute -right-8 top-12 opacity-30 pointer-events-none">
          <LemonDeco size={180} flip />
        </div>
        <div className="absolute -left-8 bottom-12 opacity-25 pointer-events-none">
          <LemonDeco size={130} />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <FadeIn className="text-center mb-14">
            <p className="font-[Montserrat] text-xs uppercase tracking-[0.5em] mb-3" style={{ color: GOLD }}>— важно знать —</p>
            <h2 className="font-[Playfair_Display] italic text-5xl mb-4" style={{ color: BLUE }}>Детали</h2>
            <Divider />
          </FadeIn>

          <FadeIn>
            <div className="rounded-3xl p-8 mb-8 border-2" style={{ background: BLUE_LIGHT, borderColor: `${BLUE}20` }}>
              <div className="flex gap-4 items-start mb-5">
                <div className="text-3xl flex-shrink-0 mt-1">👗</div>
                <div>
                  <p className="font-[Montserrat] text-[10px] uppercase tracking-widest mb-2" style={{ color: GOLD }}>Дресс-код</p>
                  <p className="font-[Playfair_Display] italic text-xl mb-3" style={{ color: BLUE }}>Любой наряд — приветствуется!</p>
                  <p className="font-[Montserrat] text-sm leading-relaxed mb-3" style={{ color: `${BLUE}99` }}>
                    Мы будем рады видеть вас в любом наряде, но нам будет ещё приятнее, если вы поддержите общую цветовую гамму нашего торжества.
                  </p>
                  <p className="font-[Playfair_Display] italic text-base" style={{ color: BLUE }}>
                    Наша свадьба пройдет в итальянском стиле — прикрепляем несколько референсов:
                  </p>
                </div>
              </div>

              {/* Референсы */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="rounded-2xl overflow-hidden shadow-md">
                  <img src={DRESSCODE_1} alt="Референс дресс-код 1" className="w-full h-64 object-cover object-top" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-md">
                  <img src={DRESSCODE_2} alt="Референс дресс-код 2" className="w-full h-64 object-cover object-top" />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="h-3 w-full" style={{ background: `repeating-linear-gradient(90deg, ${BLUE} 0px, ${BLUE} 12px, #f5e642 12px, #f5e642 24px, #fff 24px, #fff 36px)` }} />

      {/* ===== ПОЖЕЛАНИЯ ===== */}
      <section
        className="py-24 px-6 relative overflow-hidden"
        style={{ backgroundImage: `url(${BG_TILE})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-white/80" />
        <div className="max-w-3xl mx-auto relative z-10">
          <FadeIn className="text-center mb-14">
            <img src={LEMON_SLICE} alt="" className="w-14 h-auto mx-auto mb-5 opacity-70" />
            <p className="font-[Montserrat] text-xs uppercase tracking-[0.5em] mb-3" style={{ color: GOLD }}>— просим учесть —</p>
            <h2 className="font-[Playfair_Display] italic text-5xl mb-4" style={{ color: BLUE }}>Несколько пожеланий</h2>
            <Divider />
          </FadeIn>

          <div className="space-y-5">
            {[
              { emoji: "💌", text: "Дорогие гости, так как мы хотим видеть только самых-самых близких людей, то мы будем ждать вас без дополнительного гостя — именно поэтому мы рассылаем приглашения лично." },
              { emoji: "💵", text: "Чтобы сделать этот день ещё более ярким и запоминающимся, просим взять с собой разменянные наличные от 50 до 1000 рублей для участия в конкурсах." },
              { emoji: "🎉", text: "Так как свадьба планируется камерная — без ведущего и диджея — если у вас появится необычная идея развлечения, обязательно напишите нам!" },
              { emoji: "📅", text: "Подтвердите приход и дайте нам знать до 1 мая 2026 года." },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="flex gap-5 items-start rounded-3xl p-7 border-2" style={{ background: "white", borderColor: `${BLUE}20` }}>
                  <span className="text-2xl flex-shrink-0 mt-0.5">{item.emoji}</span>
                  <p className="font-[Montserrat] text-sm leading-relaxed" style={{ color: `${BLUE}cc` }}>{item.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="h-3 w-full" style={{ background: `repeating-linear-gradient(90deg, #fff 0px, #fff 12px, ${BLUE} 12px, ${BLUE} 24px, #f5e642 24px, #f5e642 36px)` }} />

      {/* ===== RSVP ===== */}
      <section id="rsvp" className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute left-0 top-0 opacity-20 pointer-events-none">
          <LemonDeco size={150} />
        </div>
        <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none">
          <LemonDeco size={130} flip />
        </div>

        <div className="max-w-2xl mx-auto relative z-10">
          <FadeIn className="text-center mb-12">
            <p className="font-[Montserrat] text-xs uppercase tracking-[0.5em] mb-3" style={{ color: GOLD }}>— анкета гостя —</p>
            <h2 className="font-[Playfair_Display] italic text-5xl mb-4" style={{ color: BLUE }}>Ваш ответ</h2>
            <p className="font-[Montserrat] text-sm" style={{ color: `${BLUE}99` }}>Ответьте на несколько вопросов — для нас это очень важно!</p>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border" style={{ borderColor: `${BLUE}20` }}>
              <GuestForm />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="h-3 w-full" style={{ background: `repeating-linear-gradient(90deg, ${BLUE} 0px, ${BLUE} 12px, #f5e642 12px, #f5e642 24px, #fff 24px, #fff 36px)` }} />

      {/* ===== КОНТАКТЫ ===== */}
      <section
        className="py-20 px-6 relative overflow-hidden"
        style={{ backgroundImage: `url(${BG_TILE})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-white/80" />
        <div className="max-w-xl mx-auto relative z-10">
          <FadeIn className="text-center mb-12">
            <p className="font-[Montserrat] text-xs uppercase tracking-[0.5em] mb-3" style={{ color: GOLD }}>— мы здесь —</p>
            <h2 className="font-[Playfair_Display] italic text-5xl mb-4" style={{ color: BLUE }}>Контакты</h2>
            <Divider />
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-5">
            <FadeIn>
              <a href="tel:+79041381591" className="group block rounded-3xl p-8 text-center border-2 transition-all hover:shadow-md" style={{ background: "white", borderColor: `${BLUE}20` }}>
                <p className="font-[Playfair_Display] italic text-2xl mb-1" style={{ color: BLUE }}>Эдуард</p>
                <p className="font-[Montserrat] text-sm font-semibold tracking-wide" style={{ color: GOLD }}>+7 (904) 138-15-91</p>
              </a>
            </FadeIn>
            <FadeIn delay={100}>
              <a href="tel:+79041141320" className="group block rounded-3xl p-8 text-center border-2 transition-all hover:shadow-md" style={{ background: "white", borderColor: `${BLUE}20` }}>
                <p className="font-[Playfair_Display] italic text-2xl mb-1" style={{ color: BLUE }}>Полина</p>
                <p className="font-[Montserrat] text-sm font-semibold tracking-wide" style={{ color: GOLD }}>+7 (904) 114-13-20</p>
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-14 px-6 text-center relative overflow-hidden" style={{ background: BLUE }}>
        <div className="absolute left-4 top-4 opacity-20 pointer-events-none">
          <LemonDeco size={90} />
        </div>
        <div className="absolute right-4 bottom-4 opacity-20 pointer-events-none">
          <LemonDeco size={80} flip />
        </div>

        <div className="relative z-10">
          <p className="font-[Playfair_Display] italic text-4xl text-yellow-300 mb-2">Эдуард & Полина</p>
          <p className="font-[Montserrat] text-white/50 text-xs uppercase tracking-widest mb-8">26 мая 2026 · Иркутск</p>

          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-10 bg-white/20" />
            <img src={LEMON_SLICE} alt="" className="w-8 h-auto opacity-60" />
            <div className="h-px w-10 bg-white/20" />
          </div>

          {/* La Dolce Vita рукописным шрифтом */}
          <p
            className="text-white"
            style={{ fontFamily: "'Dancing Script', cursive", fontSize: "clamp(2rem, 7vw, 3.5rem)", opacity: 0.9 }}
          >
            La Dolce Vita!
          </p>
        </div>
      </footer>
    </div>
  );
}
