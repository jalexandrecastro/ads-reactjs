import { useContext, useState, type FormEvent } from "react";
import {
  additionalFields,
  UserContext,
  type AdditionalDetails,
} from "./DetailsContext";
import "./style.css";

// ============================================================
// MODAL DE EDIÇÃO - ABERTO PELO BOTÃO "ALTERAR"
// Lê e grava os detalhes via Context API (sem props).
// ============================================================
function EditModalContext() {
  const { isEditModalOpen, closeEditModal } = useContext(UserContext);

  // Só monta o formulário quando o modal está aberto, para que o
  // rascunho comece sempre com os valores atuais do contexto.
  if (!isEditModalOpen) {
    return null;
  }

  return <EditForm onClose={closeEditModal} />;
}

type EditFormProps = {
  onClose: () => void;
};

function EditForm({ onClose }: EditFormProps) {
  const { details, saveDetails } = useContext(UserContext);

  // Rascunho local: só é aplicado ao contexto ao clicar em "Salvar".
  const [draft, setDraft] = useState<AdditionalDetails>(details);

  const handleChange = (key: keyof AdditionalDetails, value: string) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    saveDetails(draft);
    onClose();
  };

  return (
    <div className="delete-modal-overlay" onClick={onClose}>
      <form
        className="delete-modal"
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h2 className="delete-modal-title">Editar informações</h2>
        <p className="delete-modal-text">
          Atualize os dados adicionais e clique em salvar.
        </p>

        <div className="edit-modal-fields">
          {additionalFields.map(({ key, label }) => (
            <label className="edit-modal-field" key={key}>
              <span className="details-label">{label}</span>
              <input
                className="details-input edit-modal-input"
                value={draft[key]}
                onChange={(event) => handleChange(key, event.target.value)}
              />
            </label>
          ))}
        </div>

        <div className="delete-modal-actions">
          <button
            className="delete-modal-button delete-modal-button--cancel"
            type="button"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="delete-modal-button delete-modal-button--save"
            type="submit"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditModalContext;
