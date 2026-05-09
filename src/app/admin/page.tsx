"use client";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const SENHA = "Mud@r1885";

type Agendamento = {
  id: number;
  nome: string;
  telefone: string;
  servico: string;
  data: string;
  hora: string;
  status: string;
};

export default function AdminPage() {
  const [autenticado, setAutenticado] = useState(false);
  const [senha, setSenha] = useState("");
  const [erroSenha, setErroSenha] = useState(false);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [filtro, setFiltro] = useState("todos");
  const [loading, setLoading] = useState(false);

  const login = () => {
    if (senha === SENHA) {
      setAutenticado(true);
      setErroSenha(false);
    } else {
      setErroSenha(true);
    }
  };

  const buscarAgendamentos = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("agendamentos")
      .select("*")
      .order("data", { ascending: true })
      .order("hora", { ascending: true });
    if (data) setAgendamentos(data);
    setLoading(false);
  };

  useEffect(() => {
    if (autenticado) buscarAgendamentos();
  }, [autenticado]);

  const atualizarStatus = async (id: number, status: string) => {
    await supabase.from("agendamentos").update({ status }).eq("id", id);
    setAgendamentos((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  const filtrados = agendamentos.filter((a) =>
    filtro === "todos" ? true : a.status === filtro
  );

  const formatarData = (data: string) => {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const formatarHora = (hora: string) => hora.slice(0, 5);

  const corStatus = (status: string) => {
    if (status === "confirmado") return "#2e7d32";
    if (status === "cancelado") return "#c0392b";
    return "#7a5010";
  };

  if (!autenticado) {
    return (
      <div style={{ minHeight: "100vh", background: "#f5efe6", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500&family=Montserrat:wght@300;400;500;600&display=swap');
        `}</style>
        <div style={{ background: "#fff", border: "1px solid #d4a84c", borderRadius: 4, padding: "3rem 2.5rem", width: "100%", maxWidth: 380, boxShadow: "0 4px 32px rgba(180,140,60,0.10)" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{ width: 60, height: 60, borderRadius: "50%", border: "1px solid #d4a84c", margin: "0 auto 1rem", display: "flex", alignItems: "center", justifyContent: "center", color: "#7a5010", fontSize: 22, fontStyle: "italic", background: "#fffbf3" }}>EC</div>
            <h1 style={{ fontWeight: 400, color: "#3a1f00", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "1.4rem", margin: "0 0 0.25rem" }}>Painel Admin</h1>
            <p style={{ fontFamily: "Montserrat", fontSize: 10, color: "#7a5010", letterSpacing: "0.3em", textTransform: "uppercase", margin: 0 }}>Eliane Camurça</p>
          </div>
          <label style={{ fontFamily: "Montserrat", fontSize: 10, letterSpacing: "0.2em", color: "#5a3a00", textTransform: "uppercase", display: "block", marginBottom: 4, fontWeight: 600 }}>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            placeholder="Digite a senha"
            style={{ width: "100%", padding: "0.75rem 1rem", border: `1px solid ${erroSenha ? "#c0392b" : "#d4a84c"}`, background: "#fffbf3", color: "#3a1f00", fontFamily: "Montserrat", fontSize: 12, borderRadius: 2, outline: "none", marginBottom: "0.75rem", boxSizing: "border-box" }}
          />
          {erroSenha && <p style={{ fontFamily: "Montserrat", fontSize: 11, color: "#c0392b", margin: "0 0 0.75rem", letterSpacing: "0.05em" }}>Senha incorreta.</p>}
          <button
            onClick={login}
            style={{ width: "100%", padding: "1rem", background: "#7a5010", color: "#fff", border: "none", fontFamily: "Montserrat", fontSize: 11, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer", borderRadius: 2 }}
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5efe6", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500&family=Montserrat:wght@300;400;500;600&display=swap');
        table { width: 100%; border-collapse: collapse; }
        th { font-family: Montserrat; font-size: 10px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #7a5010; padding: 0.75rem 1rem; text-align: left; border-bottom: 2px solid #f0e6d0; background: #fdf8f0; }
        td { font-family: Montserrat; font-size: 12px; color: #3a1f00; padding: 0.85rem 1rem; border-bottom: 1px solid #f5ece0; vertical-align: middle; }
        tr:hover td { background: #fffbf3; }
        .btn-acao { padding: 4px 12px; border-radius: 2px; border: none; cursor: pointer; font-family: Montserrat; font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; transition: opacity 0.2s; }
        .btn-acao:hover { opacity: 0.8; }
        @media (max-width: 600px) {
          table, thead, tbody, th, td, tr { display: block; }
          thead tr { display: none; }
          td { border: none; padding: 0.4rem 1rem; }
          td:first-child { padding-top: 1rem; font-weight: 600; font-size: 13px; }
          td:last-child { padding-bottom: 1rem; border-bottom: 1px solid #f0e6d0; }
        }
      `}</style>

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #f0e6d0", padding: "1.25rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 400, color: "#3a1f00", letterSpacing: "0.2em", textTransform: "uppercase" }}>Agenda</h1>
          <p style={{ margin: 0, fontFamily: "Montserrat", fontSize: 10, color: "#7a5010", letterSpacing: "0.25em", textTransform: "uppercase" }}>Eliane Camurça · Beauty Studio</p>
        </div>
        <button onClick={() => setAutenticado(false)} style={{ background: "transparent", border: "1px solid #d4a84c", color: "#7a5010", fontFamily: "Montserrat", fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.5rem 1rem", borderRadius: 2, cursor: "pointer" }}>
          Sair
        </button>
      </div>

      <div style={{ padding: "1.5rem 2rem" }}>
        {/* Filtros */}
        <div style={{ display: "flex", gap: 8, marginBottom: "1.5rem", flexWrap: "wrap" }}>
          {["todos", "pendente", "confirmado", "cancelado"].map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              style={{ padding: "0.5rem 1.25rem", border: `1px solid ${filtro === f ? "#7a5010" : "#d4a84c"}`, background: filtro === f ? "#7a5010" : "transparent", color: filtro === f ? "#fff" : "#5a3a00", fontFamily: "Montserrat", fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", borderRadius: 2, cursor: "pointer" }}
            >
              {f}
            </button>
          ))}
          <button onClick={buscarAgendamentos} style={{ marginLeft: "auto", padding: "0.5rem 1.25rem", border: "1px solid #d4a84c", background: "transparent", color: "#5a3a00", fontFamily: "Montserrat", fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", borderRadius: 2, cursor: "pointer" }}>
            ↻ Atualizar
          </button>
        </div>

        {/* Tabela */}
        <div style={{ background: "#fff", border: "1px solid #f0e6d0", borderRadius: 4, overflow: "hidden", boxShadow: "0 2px 16px rgba(180,140,60,0.07)" }}>
          {loading ? (
            <p style={{ fontFamily: "Montserrat", fontSize: 12, color: "#7a5010", textAlign: "center", padding: "2rem" }}>Carregando...</p>
          ) : filtrados.length === 0 ? (
            <p style={{ fontFamily: "Montserrat", fontSize: 12, color: "#b09060", textAlign: "center", padding: "2rem" }}>Nenhum agendamento encontrado.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Hora</th>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th>Serviço</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((a) => (
                  <tr key={a.id}>
                    <td>{formatarData(a.data)}</td>
                    <td>{formatarHora(a.hora)}</td>
                    <td style={{ fontWeight: 500 }}>{a.nome}</td>
                    <td>{a.telefone}</td>
                    <td>{a.servico}</td>
                    <td>
                      <span style={{ fontFamily: "Montserrat", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: corStatus(a.status), background: `${corStatus(a.status)}18`, padding: "3px 10px", borderRadius: 20 }}>
                        {a.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 6 }}>
                        {a.status !== "confirmado" && (
                          <button className="btn-acao" onClick={() => atualizarStatus(a.id, "confirmado")} style={{ background: "#2e7d32", color: "#fff" }}>✓</button>
                        )}
                        {a.status !== "cancelado" && (
                          <button className="btn-acao" onClick={() => atualizarStatus(a.id, "cancelado")} style={{ background: "#c0392b", color: "#fff" }}>✕</button>
                        )}
                        {a.status !== "pendente" && (
                          <button className="btn-acao" onClick={() => atualizarStatus(a.id, "pendente")} style={{ background: "#7a5010", color: "#fff" }}>↺</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
