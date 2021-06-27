import { Button } from "primereact/button";

type Props = {
  onView?(): void;
  onEdit?(): void;
  onDelete?(): void;
};

const RowActions = ({ onDelete, onEdit, onView }: Props) => (
  <>
    {onView && (
      <Button
        aria-label="viewBill"
        icon="pi pi-eye"
        className="p-button-rounded p-button-help p-mr-2"
        onClick={onView}
      />
    )}
    {onEdit && (
      <Button
        aria-label="editBill"
        icon="pi pi-pencil"
        className="p-button-rounded p-button-success p-mr-2"
        onClick={onEdit}
      />
    )}
    {onDelete && (
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger"
        onClick={onDelete}
      />
    )}
  </>
);

export default RowActions;
