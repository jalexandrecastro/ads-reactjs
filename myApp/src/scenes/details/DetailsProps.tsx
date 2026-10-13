import { useState } from "react";
import { useLocation } from "react-router-dom";
import DeleteModalProps from "./DeleteModalProps";
import EditModalProps from "./EditModalProps";
import "./style.css";

// ============================================================
// CENA 1 - PROPS
// ============================================================

export type AdditionalDetails = {
  address: string;
  phone: string;
  maritalStatus: string;
  age: string;
};

// Campos exibidos (rótulo + chave).
export const additionalFields: {
  key: keyof AdditionalDetails;
  label: string;
}[] = [
  { key: "address", label: "Endereço" },
  { key: "phone", label: "Telefone" },
  { key: "maritalStatus", label: "Estado civil" },
  { key: "age", label: "Idade" },
];

// Objeto inicial já preenchido.
const initialAdditionalDetails: AdditionalDetails = {
  address: "Rua das Flores, 123 - Centro",
  phone: "(85) 99999-0000",
  maritalStatus: "Solteiro(a)",
  age: "28",
};

type User = {
  fullName: string;
  email: string;
};

const fallbackUser: User = {
  fullName: "Usuário Demonstração",
  email: "usuario.demo@email.com",
};

function DetailsProps() {
  // Usuário vem pelo state da navegação (botão "Ver - Props").
  const location = useLocation();
  const user = (location.state as { user?: User } | null)?.user ?? fallbackUser;

  const [details, setDetails] = useState(initialAdditionalDetails);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <section className="details-card">
      <span className="details-badge">Dados via Props</span>
      <h1 className="details-title">Detalhes do Usuário</h1>

      <div className="details-user">
        <h2>{user.fullName}</h2>
        <p>{user.email}</p>
      </div>

      <h3 className="details-subtitle">Informações adicionais</h3>

      <ul className="details-list">
        {additionalFields.map(({ key, label }) => (
          <li className="details-item" key={key}>
            <span className="details-label">{label}</span>
            <span className="details-value">{details[key] || "—"}</span>
          </li>
        ))}
      </ul>

      <div className="details-actions">
        <button
          className="details-button details-button--edit"
          type="button"
          onClick={() => setShowEditModal(true)}
        >
          Alterar
        </button>
        <button
          className="details-button details-button--delete"
          type="button"
          onClick={() => setShowDeleteModal(true)}
        >
          Excluir
        </button>
      </div>

      {/* Modais recebem tudo via props */}
      {showEditModal && (
        <EditModalProps
          details={details}
          onSave={(next) => setDetails(next)}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteModalProps
          userName={user.fullName}
          userEmail={user.email}
          extraInfo={additionalFields.map(({ key, label }) => ({
            label,
            value: details[key],
          }))}
          onConfirm={() => {
            setDetails({ address: "", phone: "", maritalStatus: "", age: "" });
            setShowDeleteModal(false);
          }}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </section>
  );
}

export default DetailsProps;
