"use client";
import { useState } from "react";

const services = [
  {
    icon: "✦",
    title: "Design",
    desc: "Sobrancelhas alinhadas ao contorno do seu rosto.",
    detail: "A partir de R$ 45",
  },
  {
    icon: "◈",
    title: "Henna",
    desc: "Preenchimento natural com efeito sofisticado.",
    detail: "A partir de R$ 55",
  },
  {
    icon: "◇",
    title: "Brow Lamination",
    desc: "Efeito moderno que realça cada fio.",
    detail: "A partir de R$ 90",
  },
];

const horarios = [
  { dia: "Segunda", slots: ["09:00", "10:30", "14:00", "16:00"] },
  { dia: "Terça", slots: ["09:00", "11:00", "15:00"] },
  { dia: "Quarta", slots: ["10:00", "13:00", "14:30", "17:00"] },
  { dia: "Quinta", slots: ["09:30", "11:00", "16:00"] },
  { dia: "Sexta", slots: ["09:00", "10:30", "14:00"] },
  { dia: "Sábado", slots: ["09:00", "10:00", "11:00"] },
];

export default function AgendamentoPage() {
  const [tab, setTab] = useState(null); // null | 'servicos' | 'horarios'
  const [selectedSlot, setSelectedSlot] = useState(null);

  const waBase =
    "https://wa.me/5585999611885?text=Olá!%20Gostaria%20de%20agendar%20um%20horário";
  const waWithSlot = selectedSlot
    ? `${waBase}%20para%20${selectedSlot.dia}%20às%20${selectedSlot.hora}.`
    : `${waBase}%20para%20design%20de%20sobrancelhas.`;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5efe6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap');

        .ec-card {
          width: 100%;
          max-width: 480px;
          background: #fff;
          border: 1px solid #d4a84c;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 4px 32px rgba(180,140,60,0.10);
        }

        .ec-header {
          padding: 3rem 2.5rem 2rem;
          text-align: center;
          border-bottom: 1px solid #f0e6d0;
          background: #fdf8f0;
          position: relative;
        }

        .ec-ornament {
          font-size: 11px;
          letter-spacing: 0.5em;
          color: #b8892a;
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          display: block;
          margin-bottom: 1.5rem;
        }

        .ec-monogram {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          border: 1px solid #d4a84c;
          margin: 0 auto 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9a6e1a;
          font-size: 28px;
          font-weight: 300;
          letter-spacing: 0.05em;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          background: #fffbf3;
        }

        .ec-name {
          font-size: 2rem;
          font-weight: 300;
          color: #7a5010;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          margin: 0 0 0.5rem;
        }

        .ec-sub {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 0.35em;
          color: #b09060;
          text-transform: uppercase;
        }

        .ec-divider {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 1.5rem auto 0;
          width: 160px;
        }
        .ec-divider::before, .ec-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e8d5b0;
        }
        .ec-divider span {
          color: #c9a84c;
          font-size: 10px;
        }

        .ec-body {
          padding: 2rem 2.5rem;
          background: #fff;
        }

        .ec-btn-primary {
          display: block;
          width: 100%;
          padding: 1rem;
          background: #9a6e1a;
          color: #fff;
          text-align: center;
          text-decoration: none;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          border-radius: 2px;
          transition: background 0.3s ease;
          margin-bottom: 0.75rem;
        }
        .ec-btn-primary:hover {
          background: #7a5010;
        }

        .ec-btn-ghost {
          display: block;
          width: 100%;
          padding: 0.85rem;
          background: transparent;
          color: #9a6e1a;
          border: 1px solid #d4a84c;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 2px;
          transition: border-color 0.3s, background 0.3s, color 0.3s;
          margin-bottom: 0.75rem;
          text-align: center;
        }
        .ec-btn-ghost:hover, .ec-btn-ghost.active {
          border-color: #9a6e1a;
          background: #fdf3e0;
          color: #7a5010;
        }

        .ec-panel {
          margin-top: 1.5rem;
          border-top: 1px solid #f0e6d0;
          padding-top: 1.5rem;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .ec-service {
          display: flex;
          gap: 1rem;
          padding: 1rem 0;
          border-bottom: 1px solid #f5ece0;
        }
        .ec-service:last-child { border-bottom: none; }

        .ec-svc-icon {
          color: #c9a84c;
          font-size: 16px;
          padding-top: 2px;
          flex-shrink: 0;
        }

        .ec-svc-title {
          font-size: 1.1rem;
          font-weight: 400;
          color: #7a5010;
          letter-spacing: 0.1em;
          margin: 0 0 3px;
          font-style: italic;
        }

        .ec-svc-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          color: #888;
          font-weight: 300;
          margin: 0 0 4px;
          line-height: 1.6;
        }

        .ec-svc-price {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          color: #b8892a;
          letter-spacing: 0.1em;
        }

        .ec-day {
          margin-bottom: 1rem;
        }

        .ec-day-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.25em;
          color: #b09060;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .ec-slots {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .ec-slot {
          padding: 5px 14px;
          border: 1px solid #e8d5b0;
          background: #fffbf3;
          color: #b09060;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          cursor: pointer;
          border-radius: 2px;
          transition: all 0.2s;
          letter-spacing: 0.05em;
        }
        .ec-slot:hover {
          border-color: #c9a84c;
          color: #9a6e1a;
          background: #fdf3e0;
        }
        .ec-slot.selected {
          border-color: #9a6e1a;
          background: #fdf3e0;
          color: #7a5010;
        }

        .ec-selected-info {
          background: #fdf3e0;
          border: 1px solid #e8d5b0;
          border-radius: 2px;
          padding: 0.75rem 1rem;
          margin-bottom: 0.75rem;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          color: #9a6e1a;
          letter-spacing: 0.05em;
          text-align: center;
        }

        .ec-footer {
          padding: 1.25rem 2.5rem;
          border-top: 1px solid #f0e6d0;
          text-align: center;
          background: #fdf8f0;
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          letter-spacing: 0.25em;
          color: #c0a070;
          text-transform: uppercase;
        }
      `}</style>

      <div className="ec-card">
        {/* Header */}
        <div className="ec-header">
          <span className="ec-ornament">✦ &nbsp; Beauty Studio &nbsp; ✦</span>
          <div className="ec-monogram">EC</div>
          <h1 className="ec-name">Eliane Camurça</h1>
          <p className="ec-sub">Design de Sobrancelhas</p>
          <div className="ec-divider"><span>◆</span></div>
        </div>

        {/* Body */}
        <div className="ec-body">
          <a
            href={waWithSlot}
            target="_blank"
            className="ec-btn-primary"
            rel="noreferrer"
          >
            {selectedSlot
              ? `Confirmar ${selectedSlot.dia} às ${selectedSlot.hora}`
              : "Agendar pelo WhatsApp"}
          </a>

          <button
            className={`ec-btn-ghost${tab === "servicos" ? " active" : ""}`}
            onClick={() => setTab(tab === "servicos" ? null : "servicos")}
          >
            Ver Serviços
          </button>

          <button
            className={`ec-btn-ghost${tab === "horarios" ? " active" : ""}`}
            onClick={() => setTab(tab === "horarios" ? null : "horarios")}
          >
            Ver Horários Disponíveis
          </button>

          {/* Serviços */}
          {tab === "servicos" && (
            <div className="ec-panel">
              {services.map((s) => (
                <div className="ec-service" key={s.title}>
                  <span className="ec-svc-icon">{s.icon}</span>
                  <div>
                    <p className="ec-svc-title">{s.title}</p>
                    <p className="ec-svc-desc">{s.desc}</p>
                    <span className="ec-svc-price">{s.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Horários */}
          {tab === "horarios" && (
            <div className="ec-panel">
              {selectedSlot && (
                <div className="ec-selected-info">
                  Selecionado: {selectedSlot.dia} às {selectedSlot.hora}
                </div>
              )}
              {horarios.map((h) => (
                <div className="ec-day" key={h.dia}>
                  <p className="ec-day-label">{h.dia}</p>
                  <div className="ec-slots">
                    {h.slots.map((s) => (
                      <button
                        key={s}
                        className={`ec-slot${
                          selectedSlot?.dia === h.dia && selectedSlot?.hora === s
                            ? " selected"
                            : ""
                        }`}
                        onClick={() =>
                          setSelectedSlot(
                            selectedSlot?.dia === h.dia && selectedSlot?.hora === s
                              ? null
                              : { dia: h.dia, hora: s }
                          )
                        }
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="ec-footer">© 2026 Eliane Camurça · Beauty Studio</div>
      </div>
    </div>
  );
}
