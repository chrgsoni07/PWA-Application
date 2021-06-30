import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { MouseEventHandler, ReactElement } from "react";

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const TableToolbar = ({ onClick }: Props): ReactElement => (
  <Toolbar
    left={
      <Button
        label="New"
        icon="pi pi-plus"
        className="p-button-success"
        onClick={onClick}
      />
    }
  />
);

export default TableToolbar;
