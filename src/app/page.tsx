"use client";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";

const services = [
  { icon: "✦", title: "Limpeza simples", desc: "", detail: "A partir de R$ 20" },
  { icon: "✦", title: "Design personalizado", desc: "Sobrancelhas alinhadas ao contorno do seu rosto.", detail: "A partir de R$ 25" },
  { icon: "✦", title: "Design com henna", desc: "", detail: "A partir de R$ 35" },
  { icon: "✦", title: "Design com tintura", desc: "Preenchimento natural com efeito sofisticado.", detail: "A partir de R$ 45" },
  { icon: "✦", title: "Brow Lamination", desc: "Efeito moderno que realça cada fio.", detail: "A partir de R$ 60" },
  { icon: "✦", title: "Buço", desc: "", detail: "A partir de R$ 5" },
];

const horarios = [
  { dia: "Segunda", slots: ["13:30", "14:30", "15:30", "19:00", "20:00"] },
  { dia: "Terça", slots: ["13:30", "14:30", "15:30", "19:00", "20:00"] },
  { dia: "Quarta", slots: ["13:30", "14:30", "15:30", "19:00", "20:00"] },
  { dia: "Quinta", slots: ["13:30", "14:30", "15:30", "19:00", "20:00"] },
  { dia: "Sexta", slots: ["13:30", "14:30", "15:30", "19:00", "20:00"] },
  { dia: "Sábado", slots: ["13:00", "14:00", "15:00", "16:00", "17:00"] },
  { dia: "Domingo", slots: ["13:00", "14:00", "15:00", "16:00", "17:00"] },
];

const diasSemana = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];

export default function AgendamentoPage() {
  const [tab, setTab] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{ dia: string; hora: string } | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [form, setForm] = useState({ nome: "", telefone: "", servico: "Design personalizado" });
  const [ocupados, setOcupados] = useState<{ data: string; hora: string }[]>([]);

  useEffect(() => {
    supabase
      .from("agendamentos")
      .select("data, hora")
      .in("status", ["pendente", "confirmado"])
      .then(({ data }) => {
        if (data) setOcupados(data);
      });
  }, []);

  const isOcupado = (dia: string, hora: string) => {
    const hoje = new Date();
    const diaIndex = diasSemana.indexOf(dia);
    const diff = (diaIndex - hoje.getDay() + 7) % 7 || 7;
    const data = new Date(hoje);
    data.setDate(hoje.getDate() + diff);
    const dataStr = data.toISOString().split("T")[0];
    return ocupados.some((o) => o.data === dataStr && o.hora === hora);
  };

  const handleAgendar = () => {
    if (!selectedSlot) { setTab("horarios"); return; }
    setShowForm(true);
  };

  const handleConfirmar = async () => {
    if (!form.nome || !form.telefone) return;
    setLoading(true);
    const hoje = new Date();
    const diaIndex = diasSemana.indexOf(selectedSlot!.dia);
    const diff = (diaIndex - hoje.getDay() + 7) % 7 || 7;
    const data = new Date(hoje);
    data.setDate(hoje.getDate() + diff);
    const dataStr = data.toISOString().split("T")[0];

    const { error } = await supabase.from("agendamentos").insert({
      nome: form.nome,
      telefone: form.telefone,
      servico: form.servico,
      data: dataStr,
      hora: selectedSlot!.hora,
      status: "pendente",
    });

    setLoading(false);
    if (!error) {
      setSucesso(true);
      setOcupados((prev) => [...prev, { data: dataStr, hora: selectedSlot!.hora }]);
      const waMsg = `https://wa.me/5585999611885?text=Olá!%20Meu%20nome%20é%20${encodeURIComponent(form.nome)}%20e%20gostaria%20de%20confirmar%20meu%20agendamento%20de%20${encodeURIComponent(form.servico)}%20para%20${selectedSlot!.dia}%20às%20${selectedSlot!.hora}.`;
      setTimeout(() => window.open(waMsg, "_blank"), 1000);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5efe6", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1rem", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        .ec-card { width:100%; max-width:480px; background:#fff; border:1px solid #d4a84c; border-radius:4px; overflow:hidden; box-shadow:0 4px 32px rgba(180,140,60,0.10); }
        .ec-header { padding:3rem 2.5rem 2rem; text-align:center; border-bottom:1px solid #f0e6d0; background:#fdf8f0; }
        .ec-ornament { font-size:11px; letter-spacing:0.5em; color:#7a5010; font-family:'Montserrat',sans-serif; font-weight:400; display:block; margin-bottom:1.5rem; }
        .ec-monogram { width:72px; height:72px; border-radius:50%; border:1px solid #d4a84c; margin:0 auto 1.5rem; display:flex; align-items:center; justify-content:center; color:#7a5010; font-size:28px; font-weight:400; font-family:'Cormorant Garamond',serif; font-style:italic; background:#fffbf3; }
        .ec-name { font-size:2rem; font-weight:400; color:#3a1f00; letter-spacing:0.3em; text-transform:uppercase; margin:0 0 0.5rem; }
        .ec-sub { font-family:'Montserrat',sans-serif; font-size:10px; font-weight:500; letter-spacing:0.35em; color:#7a5010; text-transform:uppercase; }
        .ec-divider { display:flex; align-items:center; gap:10px; margin:1.5rem auto 0; width:160px; }
        .ec-divider::before,.ec-divider::after { content:''; flex:1; height:1px; background:#d4a84c; }
        .ec-divider span { color:#9a6e1a; font-size:10px; }
        .ec-body { padding:2rem 2.5rem; background:#fff; }
        .ec-btn-primary { display:block; width:100%; padding:1rem; background:#7a5010; color:#fff; text-align:center; text-decoration:none; font-family:'Montserrat',sans-serif; font-size:11px; font-weight:600; letter-spacing:0.25em; text-transform:uppercase; border:none; cursor:pointer; border-radius:2px; transition:background 0.3s ease; margin-bottom:0.75rem; }
        .ec-btn-primary:hover { background:#5a3a00; }
        .ec-btn-primary:disabled { background:#c9a84c; cursor:not-allowed; }
        .ec-btn-ghost { display:block; width:100%; padding:0.85rem; background:transparent; color:#5a3a00; border:1px solid #c9a84c; font-family:'Montserrat',sans-serif; font-size:10px; font-weight:500; letter-spacing:0.25em; text-transform:uppercase; cursor:pointer; border-radius:2px; transition:border-color 0.3s,background 0.3s,color 0.3s; margin-bottom:0.75rem; text-align:center; }
        .ec-btn-ghost:hover,.ec-btn-ghost.active { border-color:#7a5010; background:#fdf3e0; color:#3a1f00; }
        .ec-panel { margin-top:1.5rem; border-top:1px solid #f0e6d0; padding-top:1.5rem; animation:fadeIn 0.3s ease; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .ec-service { display:flex; gap:1rem; padding:1rem 0; border-bottom:1px solid #f5ece0; }
        .ec-service:last-child { border-bottom:none; }
        .ec-svc-icon { color:#9a6e1a; font-size:16px; padding-top:2px; flex-shrink:0; }
        .ec-svc-title { font-size:1.1rem; font-weight:500; color:#3a1f00; letter-spacing:0.1em; margin:0 0 3px; font-style:italic; }
        .ec-svc-desc { font-family:'Montserrat',sans-serif; font-size:11px; color:#5a4020; font-weight:400; margin:0 0 4px; line-height:1.6; }
        .ec-svc-price { font-family:'Montserrat',sans-serif; font-size:10px; color:#7a5010; letter-spacing:0.1em; font-weight:500; }
        .ec-day { margin-bottom:1rem; }
        .ec-day-label { font-family:'Montserrat',sans-serif; font-size:10px; font-weight:600; letter-spacing:0.25em; color:#5a3a00; text-transform:uppercase; margin-bottom:8px; }
        .ec-slots { display:flex; flex-wrap:wrap; gap:6px; }
        .ec-slot { padding:5px 14px; border:1px solid #d4a84c; background:#fffbf3; color:#5a3a00; font-family:'Montserrat',sans-serif; font-size:11px; font-weight:500; cursor:pointer; border-radius:2px; transition:all 0.2s; letter-spacing:0.05em; }
        .ec-slot:hover { border-color:#7a5010; color:#3a1f00; background:#fdf3e0; }
        .ec-slot.selected { border-color:#7a5010; background:#fdf3e0; color:#3a1f00; font-weight:600; }
        .ec-slot.ocupado { border-color:#c0392b !important; background:#fdf0ee !important; color:#c0392b !important; cursor:not-allowed !important; text-decoration:line-through !important; font-weight:600 !important; }
        .ec-selected-info { background:#fdf3e0; border:1px solid #c9a84c; border-radius:2px; padding:0.75rem 1rem; margin-bottom:0.75rem; font-family:'Montserrat',sans-serif; font-size:11px; color:#5a3a00; font-weight:500; letter-spacing:0.05em; text-align:center; }
        .ec-footer { padding:1.25rem 2.5rem; border-top:1px solid #f0e6d0; text-align:center; background:#fdf8f0; font-family:'Montserrat',sans-serif; font-size:9px; letter-spacing:0.25em; color:#7a5010; text-transform:uppercase; font-weight:500; }
        .ec-input { width:100%; padding:0.75rem 1rem; border:1px solid #d4a84c; background:#fffbf3; color:#3a1f00; font-family:'Montserrat',sans-serif; font-size:12px; font-weight:500; border-radius:2px; outline:none; margin-bottom:0.75rem; box-sizing:border-box; transition:border-color 0.2s; }
        .ec-input:focus { border-color:#7a5010; }
        .ec-input::placeholder { color:#b09060; }
        .ec-label { font-family:'Montserrat',sans-serif; font-size:10px; letter-spacing:0.2em; color:#5a3a00; text-transform:uppercase; display:block; margin-bottom:4px; font-weight:600; }
        .ec-select { width:100%; padding:0.75rem 1rem; border:1px solid #d4a84c; background:#fffbf3; color:#3a1f00; font-family:'Montserrat',sans-serif; font-size:12px; font-weight:500; border-radius:2px; outline:none; margin-bottom:0.75rem; box-sizing:border-box; cursor:pointer; }
        .ec-sucesso { text-align:center; padding:1.5rem 0; animation:fadeIn 0.3s ease; }
        .ec-sucesso-icon { font-size:2.5rem; margin-bottom:0.5rem; color:#7a5010; }
        .ec-sucesso-title { font-size:1.4rem; color:#3a1f00; font-style:italic; margin:0 0 0.5rem; font-weight:500; }
        .ec-sucesso-sub { font-family:'Montserrat',sans-serif; font-size:11px; color:#5a3a00; letter-spacing:0.1em; font-weight:500; }
      `}</style>

      <div className="ec-card">
        <div className="ec-header">
          <span className="ec-ornament">✦ &nbsp; Beauty Studio &nbsp; ✦</span>
          <div className="ec-monogram">EC</div>
          <h1 className="ec-name">Eliane Camurça</h1>
          <p className="ec-sub">Design de Sobrancelhas</p>
          <div className="ec-divider"><span>◆</span></div>
        </div>

        <div className="ec-body">
          {sucesso ? (
            <div className="ec-sucesso">
              <div className="ec-sucesso-icon">✦</div>
              <p className="ec-sucesso-title">Agendamento Enviado!</p>
              <p className="ec-sucesso-sub">Redirecionando para o WhatsApp...</p>
            </div>
          ) : showForm ? (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              <div className="ec-selected-info">{selectedSlot?.dia} às {selectedSlot?.hora}</div>
              <label className="ec-label">Nome completo</label>
              <input className="ec-input" placeholder="Seu nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
              <label className="ec-label">Telefone / WhatsApp</label>
              <input className="ec-input" placeholder="(85) 99999-0000" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} />
              <label className="ec-label">Serviço</label>
              <select className="ec-select" value={form.servico} onChange={(e) => setForm({ ...form, servico: e.target.value })}>
                <option>Limpeza simples</option>
                <option>Design personalizado</option>
                <option>Design com henna</option>
                <option>Design com tintura</option>
                <option>Brow Lamination</option>
                <option>Buço</option>
              </select>
              <button className="ec-btn-primary" onClick={handleConfirmar} disabled={loading || !form.nome || !form.telefone}>
                {loading ? "Salvando..." : "Confirmar Agendamento"}
              </button>
              <button className="ec-btn-ghost" onClick={() => setShowForm(false)}>Voltar</button>
            </div>
          ) : (
            <>
              <button className="ec-btn-primary" onClick={handleAgendar}>
                {selectedSlot ? `Agendar ${selectedSlot.dia} às ${selectedSlot.hora}` : "Agendar pelo WhatsApp"}
              </button>
              <button className={`ec-btn-ghost${tab === "servicos" ? " active" : ""}`} onClick={() => setTab(tab === "servicos" ? null : "servicos")}>Ver Serviços</button>
              <button className={`ec-btn-ghost${tab === "horarios" ? " active" : ""}`} onClick={() => setTab(tab === "horarios" ? null : "horarios")}>Ver Horários Disponíveis</button>
              {tab === "servicos" && (
                <div className="ec-panel">
                  {services.map((s) => (
                    <div className="ec-service" key={s.title}>
                      <span className="ec-svc-icon">{s.icon}</span>
                      <div>
                        <p className="ec-svc-title">{s.title}</p>
                        {s.desc && <p className="ec-svc-desc">{s.desc}</p>}
                        <span className="ec-svc-price">{s.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {tab === "horarios" && (
                <div className="ec-panel">
                  {selectedSlot && <div className="ec-selected-info">Selecionado: {selectedSlot.dia} às {selectedSlot.hora}</div>}
                  {horarios.map((h) => (
                    <div className="ec-day" key={h.dia}>
                      <p className="ec-day-label">{h.dia}</p>
                      <div className="ec-slots">
                        {h.slots.map((s) => {
                          const ocupado = isOcupado(h.dia, s);
                          return (
                            <button
                              key={s}
                              className={`ec-slot${selectedSlot?.dia === h.dia && selectedSlot?.hora === s ? " selected" : ""}${ocupado ? " ocupado" : ""}`}
                              disabled={ocupado}
                              onClick={() => !ocupado && setSelectedSlot(selectedSlot?.dia === h.dia && selectedSlot?.hora === s ? null : { dia: h.dia, hora: s })}
                            >
                              {s}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        <div className="ec-footer">© 2026 Eliane Camurça · Beauty Studio</div>
      </div>
    </div>
  );
}
