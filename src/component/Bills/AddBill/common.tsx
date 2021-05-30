import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";

export const DeleteButton = ({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  return (
    <Button
      icon="pi pi-trash"
      className="p-button-rounded p-button-warning p-button-sm"
      onClick={onClick}
    />
  );
};

export const FooterAmount = ({ amount }: { amount: number }) => (
  <ColumnGroup>
    <Row>
      <Column
        footer="Totals:"
        colSpan={6}
        footerStyle={{ textAlign: "right" }}
      />
      <Column footer={amount} />
    </Row>
  </ColumnGroup>
);
