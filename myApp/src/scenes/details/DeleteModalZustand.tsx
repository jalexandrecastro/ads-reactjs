import { additionalFields, useUserStore } from "./DetailsZustand";
import "./style.css";

// ============================================================
// MODAL 3 - RECEBE AS INFORMAÇÕES VIA ZUSTAND
// Não recebe props: tudo vem da store global.
// ============================================================
function DeleteModalZustand() {
  const userName = useUserStore((state) => state.userName);
  const userEmail = useUserStore((state) => state.userEmail);
  const details = useUserStore((state) => state.details);
  const isDeleteModalOpen = useUserStore((state) => state.isDeleteModalOpen);
  const closeDeleteModal = useUserStore((state) => state.closeDeleteModal);
  const clearDetails = useUserStore((state) => state.clearDetails);

  if (!isDeleteModalOpen) {
    return null;
  }

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
            <strong>Nome:</strong> {userName}
          </p>
          <p>
            <strong>Email:</strong> {userEmail}
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
            onClick={() => {
              clearDetails();
              closeDeleteModal();
            }}
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

export default DeleteModalZustand;
