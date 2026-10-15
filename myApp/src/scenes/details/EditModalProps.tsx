import { useState, type FormEvent } from "react";
import { additionalFields, type AdditionalDetails } from "./DetailsProps";
import "./style.css";

export type EditModalPropsProps = {
  details: AdditionalDetails;
  onSave: (next: AdditionalDetails) => void;
  onClose: () => void;
};

// ============================================================
// MODAL 1 (EDIÇÃO) - RECEBE AS INFORMAÇÕES VIA PROPS
// Dados e callbacks chegam pelo componente pai. Como só é
// montado quando aberto, o rascunho já começa com os valores atuais.
// ============================================================
function EditModalProps({ details, onSave, onClose }: EditModalPropsProps) {
  const [draft, setDraft] = useState<AdditionalDetails>(details);

  const handleChange = (key: keyof AdditionalDetails, value: string) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSave(draft);
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

export default EditModalProps;
