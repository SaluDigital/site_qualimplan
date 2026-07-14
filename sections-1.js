const { useState, useEffect, useRef } = React;

const WA_LINK = "https://api.whatsapp.com/send?phone=5511956188187&text=Ol%C3%A1!%20Vim%20do%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.";
const STRAUMANN_LOGO = "assets/Straumann_Group.svg.png";

const Reveal = ({ children, as = "div", delay = 0, variant = "up", className = "", ...props }) => {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.unobserve(node);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return React.createElement(
    as,
    {
      ref,
      className: (variant === "x" ? "reveal-x" : variant === "scale" ? "reveal-scale" : "reveal") + " " + className,
      style: { "--d": delay + "ms" },
      ...props,
    },
    children
  );
};

const CountUp = ({ end, duration = 1800, suffix = "", prefix = "" }) => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(end);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (time) => {
            const progress = Math.min((time - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(end * eased));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      });
    }, { threshold: 0.4 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration]);

  return React.createElement("span", { ref }, prefix, value, suffix);
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [specialtiesOpen, setSpecialtiesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!workOpen) return;
    const onKey = (event) => event.key === "Escape" && setWorkOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [workOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (event) => event.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setSpecialtiesOpen(false);
  };
  const openWork = () => {
    setWorkOpen(true);
    closeMobile();
  };

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "header",
      { className: "header " + (scrolled ? "scrolled" : "") },
      React.createElement(
        "div",
        { className: "container header-inner" },
        React.createElement(
          "a",
          { href: "index.html#hero", className: "header-logo", "aria-label": "Qualimplan \u2014 Tratamentos Odontol\u00f3gicos", onClick: closeMobile },
          React.createElement("img", { src: "assets/logo.png", alt: "Qualimplan" })
        ),
        React.createElement(
          "button",
          { className: "header-mobile-toggle", type: "button", "aria-label": mobileOpen ? "Fechar menu" : "Abrir menu", "aria-expanded": mobileOpen, onClick: () => setMobileOpen((open) => {
            const next = !open;
            if (!next) setSpecialtiesOpen(false);
            return next;
          }) },
          React.createElement(Icon, { name: mobileOpen ? "x" : "menu", size: 24 })
        ),
        React.createElement(
          "nav",
          { className: "header-nav " + (mobileOpen ? "open" : ""), "aria-label": "Navega\u00e7\u00e3o principal" },
          React.createElement("a", { href: "#hero", onClick: closeMobile }, "In\u00edcio"),
          React.createElement("a", { href: "#clinica", onClick: closeMobile }, "Empresa"),
          React.createElement(
            "div",
            { className: "header-menu-group " + (specialtiesOpen ? "open" : "") },
            React.createElement(
              "button",
              { className: "header-menu-trigger", type: "button", "aria-haspopup": "true", "aria-expanded": specialtiesOpen, onClick: () => setSpecialtiesOpen((open) => !open) },
              "Especialidades",
              React.createElement(Icon, { name: "arrow", size: 12, className: "header-menu-caret" })
            ),
            React.createElement(
              "div",
              { className: "header-submenu", role: "menu" },
              ["Ortodontia", "Alinhadores", "Pr\u00f3teses", "Odontopediatria", "Est\u00e9tica", "Endodontia", "Periodontia", "Cirurgia", "Preenchimento", "T\u00f3xina Botul\u00ednica"].map((item, index) =>
                React.createElement("a", { key: index, href: item === "Ortodontia" ? "ortodontia.html" : "#especialidades", role: "menuitem", onClick: closeMobile }, item)
              )
            )
          ),
          React.createElement("a", { href: "#confianca", onClick: closeMobile }, "Depoimentos"),
          React.createElement("button", { className: "header-link-button", type: "button", onClick: openWork }, "Trabalhe Conosco")
        ),
        React.createElement("span", { className: "header-notice" }, "N\u00e3o atendemos conv\u00eanios")
      )
    ),
    workOpen && React.createElement(
      "div",
      { className: "work-popup", role: "presentation" },
      React.createElement("div", { className: "work-popup-backdrop", onClick: () => setWorkOpen(false) }),
      React.createElement(
        "div",
        { className: "work-popup-card", role: "dialog", "aria-modal": "true", "aria-labelledby": "work-popup-title" },
        React.createElement("button", { className: "work-popup-close", type: "button", onClick: () => setWorkOpen(false), "aria-label": "Fechar" }, React.createElement(Icon, { name: "plus", size: 18 })),
        React.createElement("h2", { id: "work-popup-title", className: "work-popup-title" }, "Trabalhe Conosco"),
        React.createElement("p", { className: "work-popup-text" }, "Curr\u00edculos s\u00e3o recebidos exclusivamente no e-mail: ", React.createElement("a", { href: "mailto:odontologia@qualimplan.com.br" }, "odontologia@qualimplan.com.br"))
      )
    )
  );
};

const VideoPlaceholder = ({ label, src, className = "", style = {}, tall = false, showPlayBtn = true, previewTime = 0 }) => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [previewReady, setPreviewReady] = useState(!(previewTime > 0 && src));
  const videoRef = useRef(null);

  const togglePlay = (event) => {
    if (event) event.stopPropagation();
    if (!videoRef.current) return;
    if (tall && muted) {
      videoRef.current.muted = false;
      setMuted(false);
      if (!playing) videoRef.current.play();
      return;
    }
    const next = !playing;
    if (next) {
      if (!tall) {
        videoRef.current.muted = false;
        setMuted(false);
      }
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setPlaying(next);
  };

  const toggleMute = (event) => {
    if (event) event.stopPropagation();
    if (!videoRef.current) return;
    const next = !muted;
    videoRef.current.muted = next;
    setMuted(next);
  };

  useEffect(() => {
    if (tall && src && videoRef.current) {
      const video = videoRef.current;
      video.muted = muted;
      video.play().catch(() => {
        video.muted = true;
        setMuted(true);
        video.play().catch(() => {});
        const unlock = () => {
          video.muted = false;
          setMuted(false);
          video.play().catch(() => {});
        };
        window.addEventListener("click", unlock, { once: true });
        window.addEventListener("touchstart", unlock, { once: true });
      });
    }
  }, [tall, src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src || !(previewTime > 0) || playing) return;
    setPreviewReady(false);
    const seek = () => {
      try { video.currentTime = previewTime; } catch { setPreviewReady(true); }
    };
    const ready = () => setPreviewReady(true);
    video.addEventListener("seeked", ready, { once: true });
    if (video.readyState >= 1) seek();
    else video.addEventListener("loadedmetadata", seek, { once: true });
    return () => {
      video.removeEventListener("seeked", ready);
      video.removeEventListener("loadedmetadata", seek);
    };
  }, [src, previewTime, playing]);

  return React.createElement(
    "div",
    {
      className: (tall ? "hero-video" : "video2-player") + " " + className + " " + (playing ? "is-playing" : ""),
      style: { ...style, cursor: src ? "pointer" : "default" },
      onClick: src ? togglePlay : null,
      "data-video-slot": true,
    },
    src && React.createElement("video", {
      ref: videoRef,
      src,
      className: "video-element",
      playsInline: true,
      loop: true,
      muted,
      preload: previewTime > 0 ? "auto" : "metadata",
      onPlay: () => setPlaying(true),
      onPause: () => setPlaying(false),
      style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 2, opacity: previewReady ? 1 : 0, transition: "opacity 0.2s ease" },
    }),
    src && React.createElement("div", { className: "video-sound-toggle", onClick: toggleMute, style: { position: "absolute", bottom: "20px", right: "20px", zIndex: 10, background: "rgba(0,0,0,0.5)", padding: "8px", borderRadius: "50%", color: "#fff", display: "flex", backdropFilter: "blur(4px)", opacity: playing ? 1 : 0, transition: "opacity 0.3s ease", pointerEvents: playing ? "auto" : "none" } }, React.createElement(Icon, { name: muted ? "mute" : "volume", size: 18 })),
    showPlayBtn && !playing && React.createElement("div", { style: { zIndex: 3, position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" } }, React.createElement("button", { className: "play-btn", "aria-label": "Reproduzir v\u00eddeo", onClick: (event) => { event.stopPropagation(); togglePlay(); } }, React.createElement(Icon, { name: "play", size: 32 })))
  );
};

const Hero = () => React.createElement(
  "section",
  { className: "hero hero-image", id: "hero" },
  React.createElement("div", { className: "hero-bg-shape" }),
  React.createElement("div", { className: "hero-bg-shape-2" }),
  React.createElement("div", { className: "hero-grid-lines" }),
  React.createElement(
    "div",
    { className: "container hero-inner" },
    React.createElement(
      "div",
      { className: "hero-copy" },
      React.createElement("h1", { className: "display" }, React.createElement(Reveal, { as: "span", delay: 80, style: { display: "block" } }, "Seu sorriso ", React.createElement("em", null, "merece o melhor!"))),
      React.createElement(Reveal, { delay: 420 }, React.createElement("p", { className: "hero-sub" }, "Sorrir com sa\u00fade \u00e9 viver com confian\u00e7a.")),
      React.createElement(Reveal, { delay: 520 }, React.createElement("p", { className: "hero-support" }, React.createElement("strong", null, "Agende sua avalia\u00e7\u00e3o"), " e descubra como \u00e9 f\u00e1cil cuidar do seu sorriso!")),
      React.createElement(Reveal, { delay: 620, className: "hero-ctas" }, React.createElement("a", { href: WA_LINK, target: "_blank", rel: "noopener", className: "btn btn-whatsapp" }, React.createElement(Icon, { name: "whatsapp", size: 18 }), "Agendar avalia\u00e7\u00e3o"))
    )
  )
);

const METRICS = [
  { num: 15, suffix: "+", unit: "anos", label: "Transformando vidas e trazendo sorrisos de volta", icon: "crown" },
  { num: 55, suffix: "k", unit: "", label: "Clientes atendidos com carinho e qualidade", icon: "users" },
  { num: 290, suffix: "k", unit: "", label: "Procedimentos realizados com excel\u00eancia e cuidado", icon: "shield" },
  { num: 100, suffix: "k", unit: "", label: "Implantes realizados com tecnologia de ponta", icon: "tooth" },
];

const Metrics = () => React.createElement(
  "section",
  { className: "metrics", id: "metricas" },
  React.createElement(
    "div",
    { className: "container" },
    React.createElement(
      "div",
      { className: "metrics-head" },
      React.createElement("div", null, React.createElement(Reveal, { delay: 80 }, React.createElement("h2", { className: "display metrics-title" }, "Uma trajet\u00f3ria constru\u00edda ", React.createElement("em", null, "atendimento por atendimento.")))),
      React.createElement(Reveal, { delay: 200 }, React.createElement("p", { className: "metrics-note" }, "Dados atualizados", React.createElement("br", null), "referentes \u00e0 opera\u00e7\u00e3o da", React.createElement("br", null), "Qualimplan \u00b7 atendimentos realizados."))
    ),
    React.createElement(
      "div",
      { className: "metrics-grid" },
      METRICS.map((item, index) => React.createElement(
        Reveal,
        { key: index, delay: index * 100, className: "metric-card" },
        React.createElement(Icon, { name: item.icon, size: 28, className: "metric-ico" }),
        React.createElement("div", { className: "metric-num" }, React.createElement(CountUp, { end: item.num, suffix: item.suffix }), item.unit && React.createElement("span", { className: "unit" }, item.unit)),
        React.createElement("p", { className: "metric-label" }, item.label)
      ))
    )
  )
);

const PAIN_ITEMS = [
  { label: "Dificuldade para mastigar" },
  { label: "Vergonha ao sorrir" },
  { label: "Desconforto com pr\u00f3tese m\u00f3vel" },
  { label: "Inseguran\u00e7a ao falar" },
  { label: "Perda de confian\u00e7a no dia a dia" },
  { label: "Evitar fotos e refei\u00e7\u00f5es em p\u00fablico" },
];

const Pain = () => React.createElement(
  "section",
  { className: "pain", id: "identificacao" },
  React.createElement(
    "div",
    { className: "container pain-grid" },
    React.createElement(
      "div",
      { className: "pain-copy" },
      React.createElement(Reveal, { delay: 80 }, React.createElement("h2", { className: "display pain-title" }, "Mais do que est\u00e9tica: ", React.createElement("em", null, "\u00e9 sobre voltar a viver com confian\u00e7a."))),
      React.createElement(Reveal, { delay: 180 }, React.createElement("p", { className: "pain-text" }, "Perder um ou mais dentes pode afetar mastiga\u00e7\u00e3o, fala, seguran\u00e7a para sorrir, conforto e autoestima. Muitas pessoas passam a evitar fotos, refei\u00e7\u00f5es em p\u00fablico, conversas e momentos simples por inseguran\u00e7a ou desconforto.")),
      React.createElement(Reveal, { delay: 260 }, React.createElement("p", { className: "pain-text" }, "Com a avalia\u00e7\u00e3o correta, \u00e9 poss\u00edvel entender o caminho mais adequado para recuperar fun\u00e7\u00e3o, conforto e confian\u00e7a \u2014 respeitando o seu tempo e o seu caso."))
    ),
    React.createElement(
      "div",
      { className: "pain-cards" },
      PAIN_ITEMS.map((item, index) => React.createElement(Reveal, { key: index, delay: index * 80, className: "pain-card" }, React.createElement("span", { className: "pain-card-label" }, item.label)))
    )
  )
);

Object.assign(window, { Reveal, CountUp, Header, Hero, Metrics, BrandStory, Pain, VideoPlaceholder, WA_LINK });
