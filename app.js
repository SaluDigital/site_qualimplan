class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    return this.state.error
      ? React.createElement(
          "div",
          {
            style: {
              padding: "40px",
              fontFamily: "monospace",
              color: "#c00",
              background: "#fff9f9",
              minHeight: "100vh",
            },
          },
          React.createElement("h2", null, "Erro ao renderizar a p\xE1gina"),
          React.createElement(
            "pre",
            { style: { whiteSpace: "pre-wrap", fontSize: "13px" } },
            String(this.state.error)
          )
        )
      : this.props.children;
  }
}

const InsurancePopup = () => {
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return open
    ? React.createElement(
        "div",
        { className: "insurance-popup", role: "presentation" },
        React.createElement("div", {
          className: "insurance-popup-backdrop",
          onClick: () => setOpen(false),
        }),
        React.createElement(
          "div",
          {
            className: "insurance-popup-card",
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "insurance-popup-title",
          },
          React.createElement(
            "button",
            {
              className: "insurance-popup-close",
              type: "button",
              onClick: () => setOpen(false),
              "aria-label": "Fechar aviso",
            },
            React.createElement(Icon, { name: "plus", size: 18 })
          ),
          React.createElement(
            "div",
            { className: "insurance-popup-icon" },
            React.createElement(Icon, { name: "info", size: 28 })
          ),
          React.createElement("p", { className: "insurance-popup-kicker" }, "Aviso importante"),
          React.createElement(
            "h2",
            { id: "insurance-popup-title", className: "insurance-popup-title" },
            "N\xE3o atendemos conv\xEAnios"
          )
        )
      )
    : null;
};

const App = () =>
  React.createElement(
    React.Fragment,
    null,
    React.createElement(Header, null),
    React.createElement(
      "main",
      null,
      React.createElement(ImplantHeroCopy, null),
      React.createElement(Metrics, null),
      React.createElement(BrandStory, null),
      React.createElement(Structure, null),
      React.createElement(SmileDreams, null),
      React.createElement(Hero, null),
      React.createElement(Pain, null),
      React.createElement(Straumann, null),
      React.createElement(Indication, null),
      React.createElement(Process, null),
      React.createElement(Benefits, null),
      React.createElement(Social, null),
      React.createElement(Video2, null),
      React.createElement(FAQ, null),
      React.createElement(FinalCTA, null)
    ),
    React.createElement(Footer, null),
    React.createElement(WAFloat, null),
    React.createElement(InsurancePopup, null),
    React.createElement(Tweaks, null)
  );

ReactDOM.createRoot(document.getElementById("root")).render(
  React.createElement(ErrorBoundary, null, React.createElement(App, null))
);
