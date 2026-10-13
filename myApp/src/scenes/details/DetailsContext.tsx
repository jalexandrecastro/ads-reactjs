import { createContext, useState } from "react";
import { useLocation } from "react-router-dom";
import DeleteModalContext from "./DeleteModalContext";
import EditModalContext from "./EditModalContext";
import "./style.css";

// ============================================================
// CENA 2 - CONTEXT API
// ============================================================

export type AdditionalDetails = {
  address: string;
  phone: string;
  maritalStatus: string;
  age: string;
};

// Exportado para o modal usar os mesmos rótulos.
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

type UserInfo = {
  fullName: string;
  email: string;
};

const fallbackUser: UserInfo = {
  fullName: "Usuário Demonstração",
  email: "usuario.demo@email.com",
};

// ---------- Contexto ----------

type UserContextValue = {
  user: UserInfo;
  details: AdditionalDetails;
  updateDetail: (key: keyof AdditionalDetails, value: string) => void;
  saveDetails: (next: AdditionalDetails) => void;
  clearDetails: () => void;
  isDeleteModalOpen: boolean;
  openDeleteModal: () => void;
  closeDeleteModal: () => void;
  isEditModalOpen: boolean;
  openEditModal: () => void;
  closeEditModal: () => void;
};

// Opção 1: contexto exportado diretamente, com um valor default já tipado.
// O modal consome com useContext(UserContext), sem hook auxiliar.
const defaultUserContext: UserContextValue = {
  user: fallbackUser,
  details: initialAdditionalDetails,
  updateDetail: () => {},
  saveDetails: () => {},
  clearDetails: () => {},
  isDeleteModalOpen: false,
  openDeleteModal: () => {},
  closeDeleteModal: () => {},
  isEditModalOpen: false,
  openEditModal: () => {},
  closeEditModal: () => {},
};

export const UserContext = createContext<UserContextValue>(defaultUserContext);

// ---------- Cena (provê o contexto e mostra o card) ----------

function DetailsContext() {
  const location = useLocation();
  const user =
    (location.state as { user?: UserInfo } | null)?.user ?? fallbackUser;

  const [details, setDetails] = useState(initialAdditionalDetails);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const updateDetail = (key: keyof AdditionalDetails, value: string) =>
    setDetails((prev) => ({ ...prev, [key]: value }));

  return (
    <UserContext.Provider
      value={{
        user,
        details,
        updateDetail,
        saveDetails: (next) => setDetails(next),
        clearDetails: () =>
          setDetails({ address: "", phone: "", maritalStatus: "", age: "" }),
        isDeleteModalOpen,
        openDeleteModal: () => setIsDeleteModalOpen(true),
        closeDeleteModal: () => setIsDeleteModalOpen(false),
        isEditModalOpen,
        openEditModal: () => setIsEditModalOpen(true),
        closeEditModal: () => setIsEditModalOpen(false),
      }}
    >
      <section className="details-card">
        <span className="details-badge">Dados via Context API</span>
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
            onClick={() => setIsEditModalOpen(true)}
          >
            Alterar
          </button>
          <button
            className="details-button details-button--delete"
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Excluir
          </button>
        </div>

        {/* Os modais pegam tudo do contexto */}
        <EditModalContext />
        <DeleteModalContext />
      </section>
    </UserContext.Provider>
  );
}

export default DetailsContext;
