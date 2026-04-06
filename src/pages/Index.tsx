import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/da9c55e1-2bcf-416a-90f7-995b1931dbfb/files/46b8438d-031e-4512-b899-323088ca34e3.jpg";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
    >
      {children}
    </div>
  );
}

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 my-2">
      <div className="h-px w-16 bg-[#1a3a6b] opacity-30" />
      <span className="text-[#f5e642] text-xl">✦</span>
      <div className="h-px w-16 bg-[#1a3a6b] opacity-30" />
    </div>
  );
}

function OrnamentLight() {
  return (
    <div className="flex items-center justify-center gap-3 my-2">
      <div className="h-px w-16 bg-white opacity-30" />
      <span className="text-[#f5e642] text-xl">✦</span>
      <div className="h-px w-16 bg-white opacity-30" />
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
    <div className="flex gap-4 md:gap-8 justify-center">
      {units.map(({ label, val }) => (
        <div key={label} className="flex flex-col items-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-[#1a3a6b] text-white font-[Cormorant_Garamond] text-3xl md:text-4xl font-light flex items-center justify-center shadow-lg">
            {String(val).padStart(2, "0")}
          </div>
          <span className="mt-2 text-xs font-[Montserrat] text-[#1a3a6b] opacity-70 tracking-widest uppercase">{label}</span>
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
        <div className="text-5xl mb-4">🌿</div>
        <p className="font-[Cormorant_Garamond] text-2xl text-[#1a3a6b] italic">Спасибо! Мы вас ждём</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-5">
      <div>
        <label className="block font-[Montserrat] text-xs uppercase tracking-widest text-[#1a3a6b] mb-2">Ваше имя</label>
        <input
          required
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className="w-full border border-[#1a3a6b]/30 rounded-lg px-4 py-3 font-[Montserrat] text-[#1a1a2e] bg-white focus:outline-none focus:border-[#1a3a6b] transition-colors"
          placeholder="Имя и фамилия"
        />
      </div>
      <div>
        <label className="block font-[Montserrat] text-xs uppercase tracking-widest text-[#1a3a6b] mb-2">Присутствие</label>
        <div className="flex gap-3">
          {[{ val: "yes", label: "Буду с радостью" }, { val: "no", label: "Не смогу прийти" }].map(opt => (
            <button
              key={opt.val}
              type="button"
              onClick={() => setForm(f => ({ ...f, attendance: opt.val }))}
              className={`flex-1 py-3 rounded-lg font-[Montserrat] text-sm border transition-all ${
                form.attendance === opt.val
                  ? "bg-[#1a3a6b] text-white border-[#1a3a6b]"
                  : "border-[#1a3a6b]/30 text-[#1a3a6b] bg-white hover:bg-[#f5e642]/20"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block font-[Montserrat] text-xs uppercase tracking-widest text-[#1a3a6b] mb-2">Предпочтения в меню</label>
        <select
          value={form.menu}
          onChange={e => setForm(f => ({ ...f, menu: e.target.value }))}
          className="w-full border border-[#1a3a6b]/30 rounded-lg px-4 py-3 font-[Montserrat] text-[#1a1a2e] bg-white focus:outline-none focus:border-[#1a3a6b]"
        >
          <option value="">Выберите вариант</option>
          <option value="meat">Мясное меню</option>
          <option value="fish">Рыбное меню</option>
          <option value="veg">Вегетарианское</option>
          <option value="children">Детское меню</option>
        </select>
      </div>
      <div>
        <label className="block font-[Montserrat] text-xs uppercase tracking-widest text-[#1a3a6b] mb-2">Пожелание молодожёнам</label>
        <textarea
          value={form.wishes}
          onChange={e => setForm(f => ({ ...f, wishes: e.target.value }))}
          rows={3}
          className="w-full border border-[#1a3a6b]/30 rounded-lg px-4 py-3 font-[Montserrat] text-[#1a1a2e] bg-white focus:outline-none focus:border-[#1a3a6b] resize-none transition-colors"
          placeholder="Ваши тёплые слова..."
        />
      </div>
      <button
        type="submit"
        className="w-full py-4 bg-[#1a3a6b] text-white font-[Montserrat] text-sm uppercase tracking-widest rounded-lg hover:bg-[#2d5aa0] transition-colors shadow-lg"
      >
        Отправить ответ
      </button>
    </form>
  );
}

export default function Index() {
  return (
    <div className="bg-[#fdfaf0] font-[Montserrat] overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a6b]/65 via-[#1a3a6b]/30 to-[#fdfaf0]" />

        <div className="absolute top-8 left-8 text-4xl opacity-40 animate-[float_4s_ease-in-out_infinite]">🍋</div>
        <div className="absolute top-16 right-12 text-3xl opacity-30 animate-[float_4s_ease-in-out_1.5s_infinite]">🌿</div>
        <div className="absolute bottom-32 left-16 text-2xl opacity-30 animate-[float_4s_ease-in-out_0.8s_infinite]">🌸</div>
        <div className="absolute bottom-40 right-8 text-3xl opacity-25 animate-[float_4s_ease-in-out_2s_infinite]">🍋</div>

        <div className="relative z-10 text-center px-6 animate-[fade-in_1s_ease-out_forwards]">
          <p className="font-[Montserrat] text-white/80 text-xs uppercase tracking-[0.4em] mb-6">
            Вы приглашены
          </p>
          <h1 className="font-[Cormorant_Garamond] text-6xl md:text-8xl lg:text-9xl font-light text-white leading-none mb-2">
            Эдуард
          </h1>
          <div className="font-[Cormorant_Garamond] text-3xl md:text-4xl text-[#f5e642] italic my-2">&amp;</div>
          <h1 className="font-[Cormorant_Garamond] text-6xl md:text-8xl lg:text-9xl font-light text-white leading-none mb-8">
            Полина
          </h1>
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-12 bg-white/50" />
            <p className="font-[Cormorant_Garamond] text-xl md:text-2xl text-white/90 italic tracking-wide">
              26 мая 2026 года
            </p>
            <div className="h-px w-12 bg-white/50" />
          </div>
          <a
            href="#date"
            className="inline-flex items-center gap-2 border border-white/60 text-white font-[Montserrat] text-xs uppercase tracking-widest px-8 py-3 rounded-full hover:bg-white hover:text-[#1a3a6b] transition-all duration-300"
          >
            Подробности
            <Icon name="ChevronDown" size={14} />
          </a>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <div className="w-0.5 h-12 bg-white/30 animate-pulse" />
        </div>
      </section>

      {/* DATE */}
      <section id="date" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Section>
            <p className="font-[Montserrat] text-xs uppercase tracking-[0.4em] text-[#1a3a6b]/60 mb-4">— 01 —</p>
            <h2 className="font-[Cormorant_Garamond] text-5xl md:text-6xl font-light text-[#1a3a6b] mb-3">Дата торжества</h2>
            <Ornament />
            <p className="font-[Cormorant_Garamond] text-2xl italic text-[#1a3a6b]/70 mb-12 mt-4">
              До нашей свадьбы осталось
            </p>
            <Countdown />
            <div className="mt-14 grid grid-cols-3 gap-8 text-center">
              {[
                { icon: "Calendar", label: "Дата", val: "26 мая 2026" },
                { icon: "Clock", label: "Начало", val: "14:00" },
                { icon: "Sun", label: "День недели", val: "Вторник" },
              ].map(item => (
                <div key={item.label} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#f5e642] flex items-center justify-center mb-3 shadow-sm">
                    <Icon name={item.icon as "Calendar"} size={20} className="text-[#1a3a6b]" />
                  </div>
                  <p className="font-[Montserrat] text-xs uppercase tracking-widest text-[#1a3a6b]/50 mb-1">{item.label}</p>
                  <p className="font-[Cormorant_Garamond] text-xl text-[#1a3a6b] font-medium">{item.val}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#1a3a6b]/20 to-transparent" />

      {/* VENUE */}
      <section id="venue" className="py-24 px-6 bg-[#1a3a6b]">
        <div className="max-w-3xl mx-auto text-center">
          <Section>
            <p className="font-[Montserrat] text-xs uppercase tracking-[0.4em] text-white/50 mb-4">— 02 —</p>
            <h2 className="font-[Cormorant_Garamond] text-5xl md:text-6xl font-light text-white mb-3">Место</h2>
            <OrnamentLight />
            <p className="font-[Cormorant_Garamond] text-xl italic text-white/70 mb-12 mt-4">
              Здесь будет место проведения вашей свадьбы
            </p>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 md:p-12 border border-white/20">
              <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-[#f5e642] flex items-center justify-center mb-4">
                    <Icon name="MapPin" size={24} className="text-[#1a3a6b]" />
                  </div>
                  <p className="font-[Montserrat] text-xs uppercase tracking-widest text-white/50 mb-2">Адрес</p>
                  <p className="font-[Cormorant_Garamond] text-2xl text-white font-light">Название банкетного зала</p>
                  <p className="font-[Montserrat] text-sm text-white/60 mt-1">Город, улица, дом</p>
                </div>
                <div className="hidden md:block w-px h-20 bg-white/20" />
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-[#f5e642] flex items-center justify-center mb-4">
                    <Icon name="Navigation" size={24} className="text-[#1a3a6b]" />
                  </div>
                  <p className="font-[Montserrat] text-xs uppercase tracking-widest text-white/50 mb-2">Парковка</p>
                  <p className="font-[Cormorant_Garamond] text-2xl text-white font-light">Бесплатная парковка</p>
                  <p className="font-[Montserrat] text-sm text-white/60 mt-1">Рядом со зданием</p>
                </div>
              </div>
              <button className="mt-8 inline-flex items-center gap-2 border border-[#f5e642]/60 text-[#f5e642] font-[Montserrat] text-xs uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#f5e642] hover:text-[#1a3a6b] transition-all duration-300">
                <Icon name="Map" size={14} />
                Открыть на карте
              </button>
            </div>
          </Section>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#1a3a6b]/20 to-transparent" />

      {/* TIMELINE */}
      <section id="timeline" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <Section>
            <div className="text-center mb-16">
              <p className="font-[Montserrat] text-xs uppercase tracking-[0.4em] text-[#1a3a6b]/60 mb-4">— 03 —</p>
              <h2 className="font-[Cormorant_Garamond] text-5xl md:text-6xl font-light text-[#1a3a6b] mb-3">Тайминг дня</h2>
              <Ornament />
            </div>
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#1a3a6b]/10 -translate-x-1/2" />
              {[
                { time: "13:30", title: "Сбор гостей", desc: "Добро пожаловать! Встреча и лёгкий welcome-коктейль", icon: "Users", side: "left" },
                { time: "14:00", title: "Церемония", desc: "Торжественная регистрация брака", icon: "Heart", side: "right" },
                { time: "15:00", title: "Фуршет", desc: "Шампанское, закуски и живая музыка", icon: "Wine", side: "left" },
                { time: "16:30", title: "Банкет", desc: "Праздничный ужин, тосты и первый танец", icon: "Music", side: "right" },
                { time: "19:00", title: "Торт", desc: "Разрезание свадебного торта", icon: "Cake", side: "left" },
                { time: "19:30", title: "Танцы", desc: "Дискотека до позднего вечера", icon: "Star", side: "right" },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-6 mb-10 ${item.side === "right" ? "flex-row-reverse" : ""}`}>
                  <div className={`flex-1 ${item.side === "right" ? "text-left" : "text-right"}`}>
                    <p className="font-[Montserrat] text-xs uppercase tracking-widest text-[#1a3a6b]/50 mb-1">{item.time}</p>
                    <p className="font-[Cormorant_Garamond] text-xl text-[#1a3a6b] font-medium">{item.title}</p>
                    <p className="font-[Montserrat] text-sm text-[#1a1a2e]/60 mt-0.5">{item.desc}</p>
                  </div>
                  <div className="relative z-10 w-12 h-12 rounded-full bg-[#f5e642] border-4 border-[#fdfaf0] flex items-center justify-center shadow-sm flex-shrink-0">
                    <Icon name={item.icon as "Heart"} size={18} className="text-[#1a3a6b]" />
                  </div>
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#1a3a6b]/20 to-transparent" />

      {/* DETAILS */}
      <section id="details" className="py-24 px-6 bg-[#fdf8d0]">
        <div className="max-w-3xl mx-auto">
          <Section>
            <div className="text-center mb-16">
              <p className="font-[Montserrat] text-xs uppercase tracking-[0.4em] text-[#1a3a6b]/60 mb-4">— 04 —</p>
              <h2 className="font-[Cormorant_Garamond] text-5xl md:text-6xl font-light text-[#1a3a6b] mb-3">Детали</h2>
              <Ornament />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: "Shirt",
                  title: "Дресс-код",
                  desc: "Праздничный наряд. Предпочтительная палитра: белый, синий, жёлтый. Пожалуйста, избегайте белого для гостей."
                },
                {
                  icon: "Baby",
                  title: "Дети",
                  desc: "Мы рады видеть ваших детей! Для самых маленьких будет оборудована специальная зона."
                },
                {
                  icon: "Camera",
                  title: "Фотография",
                  desc: "Пожалуйста, не снимайте во время церемонии. Наш фотограф запечатлеет все важные моменты."
                },
                {
                  icon: "Gift",
                  title: "Подарки",
                  desc: "Лучшим подарком для нас будет ваше присутствие. Если хотите сделать сюрприз — у нас есть список желаний."
                },
              ].map(item => (
                <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-[#1a3a6b]/10 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-[#1a3a6b]/10 flex items-center justify-center mb-4">
                    <Icon name={item.icon as "Gift"} size={18} className="text-[#1a3a6b]" />
                  </div>
                  <h3 className="font-[Cormorant_Garamond] text-xl text-[#1a3a6b] font-medium mb-2">{item.title}</h3>
                  <p className="font-[Montserrat] text-sm text-[#1a1a2e]/70 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#1a3a6b]/20 to-transparent" />

      {/* WISHES */}
      <section id="wishes" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Section>
            <p className="font-[Montserrat] text-xs uppercase tracking-[0.4em] text-[#1a3a6b]/60 mb-4">— 05 —</p>
            <h2 className="font-[Cormorant_Garamond] text-5xl md:text-6xl font-light text-[#1a3a6b] mb-3">Пожелания</h2>
            <Ornament />
            <p className="font-[Cormorant_Garamond] text-xl italic text-[#1a3a6b]/70 mt-6 mb-12 max-w-xl mx-auto leading-relaxed">
              Мы мечтаем о вашем присутствии рядом с нами в этот особенный день. Приезжайте с радостью в сердце и готовностью танцевать!
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { emoji: "💛", title: "Подтвердите приход", desc: "Пожалуйста, дайте нам знать до 1 мая 2026 года" },
                { emoji: "🌿", title: "Без сюрпризов", desc: "Если у вас особая диета или аллергия — напишите нам заранее" },
                { emoji: "📱", title: "Живите моментом", desc: "В день свадьбы откладывайте телефоны чаще — обнимайтесь!" },
              ].map(w => (
                <div key={w.title} className="bg-gradient-to-b from-[#f5e642]/20 to-white rounded-2xl p-6 border border-[#f5e642]/30">
                  <div className="text-4xl mb-4">{w.emoji}</div>
                  <h3 className="font-[Cormorant_Garamond] text-lg text-[#1a3a6b] font-medium mb-2">{w.title}</h3>
                  <p className="font-[Montserrat] text-sm text-[#1a1a2e]/60 leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#1a3a6b]/20 to-transparent" />

      {/* RSVP FORM */}
      <section id="rsvp" className="py-24 px-6 bg-[#1a3a6b]">
        <div className="max-w-2xl mx-auto">
          <Section>
            <div className="text-center mb-12">
              <p className="font-[Montserrat] text-xs uppercase tracking-[0.4em] text-white/50 mb-4">— 06 —</p>
              <h2 className="font-[Cormorant_Garamond] text-5xl md:text-6xl font-light text-white mb-3">Анкета гостя</h2>
              <OrnamentLight />
              <p className="font-[Cormorant_Garamond] text-lg italic text-white/70 mt-4">
                Пожалуйста, заполните форму до 1 мая 2026
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 md:p-10">
              <GuestForm />
            </div>
          </Section>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#1a3a6b]/20 to-transparent" />

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Section>
            <p className="font-[Montserrat] text-xs uppercase tracking-[0.4em] text-[#1a3a6b]/60 mb-4">— 07 —</p>
            <h2 className="font-[Cormorant_Garamond] text-5xl md:text-6xl font-light text-[#1a3a6b] mb-3">Контакты</h2>
            <Ornament />
            <p className="font-[Cormorant_Garamond] text-lg italic text-[#1a3a6b]/70 mt-6 mb-12">
              Есть вопросы? Свяжитесь с нами
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { name: "Эдуард", role: "Жених", phone: "+7 (999) 000-00-00" },
                { name: "Полина", role: "Невеста", phone: "+7 (999) 000-00-01" },
              ].map(c => (
                <div key={c.name} className="bg-white rounded-2xl p-8 border border-[#1a3a6b]/10 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 rounded-full bg-[#1a3a6b]/10 flex items-center justify-center mx-auto mb-4">
                    <span className="font-[Cormorant_Garamond] text-2xl text-[#1a3a6b]">{c.name[0]}</span>
                  </div>
                  <p className="font-[Montserrat] text-xs uppercase tracking-widest text-[#1a3a6b]/40 mb-1">{c.role}</p>
                  <h3 className="font-[Cormorant_Garamond] text-2xl text-[#1a3a6b] font-medium mb-3">{c.name}</h3>
                  <a href={`tel:${c.phone}`} className="inline-flex items-center gap-2 font-[Montserrat] text-sm text-[#1a3a6b] hover:text-[#2d5aa0] transition-colors">
                    <Icon name="Phone" size={14} />
                    {c.phone}
                  </a>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1a3a6b] py-12 text-center">
        <div className="text-4xl mb-4 animate-[float_4s_ease-in-out_infinite]">🍋</div>
        <p className="font-[Cormorant_Garamond] text-3xl text-white italic mb-2">Эдуард & Полина</p>
        <p className="font-[Montserrat] text-xs uppercase tracking-widest text-white/40">26 · 05 · 2026</p>
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="h-px w-12 bg-white/20" />
          <span className="text-[#f5e642] text-sm">✦</span>
          <div className="h-px w-12 bg-white/20" />
        </div>
      </footer>
    </div>
  );
}
