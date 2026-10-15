import { useContext } from "react";
import { additionalFields, UserContext } from "./DetailsContext";
import "./style.css";

// ============================================================
// MODAL 2 - RECEBE AS INFORMAÇÕES VIA CONTEXT API
// NÃO recebe props: lê os dados e o estado de abertura do contexto.
// ============================================================
function DeleteModalContext() {
  const { user, details, isDeleteModalOpen, closeDeleteModal, clearDetails } =
    useContext(UserContext);

  // O próprio modal decide se aparece, lendo o estado do contexto.
  if (!isDeleteModalOpen) {
    return null;
  }

  const handleConfirm = () => {
    clearDetails();
    closeDeleteModal();
  };

  return (
    <div className="delete-modal-overlay" onClick={closeDeleteModal}>
      <div
        className="delete-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="delete-modal-title">Confirmar exclusão</h2>
        <p className="delete-modal-text">
          Deseja realmente excluir as informações adicionais deste usuário?
        </p>

        <div className="delete-modal-user">
          <p>
            <strong>Nome:</strong> {user.fullName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          {additionalFields.map(({ key, label }) => (
            <p key={key}>
              <strong>{label}:</strong> {details[key] || "—"}
            </p>
          ))}
        </div>

        <div className="delete-modal-actions">
          <button
            className="delete-modal-button delete-modal-button--delete"
            type="button"
            onClick={handleConfirm}
          >
            Excluir
          </button>
          <button
            className="delete-modal-button delete-modal-button--cancel"
            type="button"
            onClick={closeDeleteModal}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModalContext;
