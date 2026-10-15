import "./style.css";

export type ExtraInfoRow = {
  label: string;
  value: string;
};

type DeleteModalPropsProps = {
  userName: string;
  userEmail: string;
  extraInfo: ExtraInfoRow[];
  onConfirm: () => void;
  onClose: () => void;
};

// ============================================================
// MODAL 1 - RECEBE AS INFORMAÇÕES VIA PROPS
// Todos os dados e callbacks chegam por props (componente pai).
// ============================================================
function DeleteModalProps({
  userName,
  userEmail,
  extraInfo,
  onConfirm,
  onClose,
}: DeleteModalPropsProps) {
  return (
    <div className="delete-modal-overlay" onClick={onClose}>
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
          {extraInfo.map((item) => (
            <p key={item.label}>
              <strong>{item.label}:</strong> {item.value || "—"}
            </p>
          ))}
        </div>

        <div className="delete-modal-actions">
          <button
            className="delete-modal-button delete-modal-button--delete"
            type="button"
            onClick={onConfirm}
          >
            Excluir
          </button>
          <button
            className="delete-modal-button delete-modal-button--cancel"
            type="button"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModalProps;
