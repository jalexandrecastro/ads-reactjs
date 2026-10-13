import { useLocation } from "react-router-dom";
import { create } from "zustand";
import DeleteModalZustand from "./DeleteModalZustand";
import EditModalZustand from "./EditModalZustand";
import "./style.css";

// ============================================================
// CENA 3 - ZUSTAND
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

// ---------- Store global ----------

type UserStore = {
  userName: string;
  userEmail: string;
  details: AdditionalDetails;
  isDeleteModalOpen: boolean;
  openDeleteModal: (userName: string, userEmail: string) => void;
  closeDeleteModal: () => void;
  isEditModalOpen: boolean;
  openEditModal: () => void;
  closeEditModal: () => void;
  updateDetail: (key: keyof AdditionalDetails, value: string) => void;
  saveDetails: (next: AdditionalDetails) => void;
  clearDetails: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  userName: "",
  userEmail: "",
  details: { ...initialAdditionalDetails },
  isDeleteModalOpen: false,

  openDeleteModal: (userName, userEmail) =>
    set({ userName, userEmail, isDeleteModalOpen: true }),

  closeDeleteModal: () => set({ isDeleteModalOpen: false }),

  isEditModalOpen: false,

  openEditModal: () => set({ isEditModalOpen: true }),

  closeEditModal: () => set({ isEditModalOpen: false }),

  updateDetail: (key, value) =>
    set((state) => ({ details: { ...state.details, [key]: value } })),

  saveDetails: (next) => set({ details: next }),

  clearDetails: () =>
    set({ details: { address: "", phone: "", maritalStatus: "", age: "" } }),
}));

// ---------- Cena (lê e escreve direto na store) ----------

function DetailsZustand() {
  const location = useLocation();
  const user =
    (location.state as { user?: UserInfo } | null)?.user ?? fallbackUser;

  const details = useUserStore((state) => state.details);
  const openDeleteModal = useUserStore((state) => state.openDeleteModal);
  const openEditModal = useUserStore((state) => state.openEditModal);

  return (
    <section className="details-card">
      <span className="details-badge">Dados via Zustand</span>
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
          onClick={() => openEditModal()}
        >
          Alterar
        </button>
        <button
          className="details-button details-button--delete"
          type="button"
          onClick={() => openDeleteModal(user.fullName, user.email)}
        >
          Excluir
        </button>
      </div>

      {/* Os modais pegam tudo da store */}
      <EditModalZustand />
      <DeleteModalZustand />
    </section>
  );
}

export default DetailsZustand;
