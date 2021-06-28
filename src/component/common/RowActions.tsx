import { Button } from "primereact/button";
import { ButtonGroup } from "component/common/styles";

type Props = {
  onView?(): void;
  onEdit?(): void;
  onDelete?(): void;
};

const RowActions = ({ onDelete, onEdit, onView }: Props) => (
  <ButtonGroup>
    {onView && (
      <Button
        aria-label="viewBill"
        icon="pi pi-eye"
        className="p-button-rounded p-button-help"
        onClick={onView}
      />
    )}
    {onEdit && (
      <Button
        aria-label="editBill"
        icon="pi pi-pencil"
        className="p-button-rounded p-button-success"
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
  </ButtonGroup>
);

export default RowActions;
