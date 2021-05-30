import { Button, ButtonProps } from "primereact/button";
import { Column, ColumnProps } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable, DataTableProps } from "primereact/datatable";
import { Dropdown, DropdownProps } from "primereact/dropdown";
import { Row } from "primereact/row";
import { FC } from "react";
import { amountBodyTemplate } from "utils/currency.utils";
import { itemType } from "../commonData";

export const DeleteButton: FC<ButtonProps> = ({ onClick }) => (
  <Button
    icon="pi pi-trash"
    className="p-button-rounded p-button-warning p-button-sm"
    onClick={onClick}
  />
);

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

export const ItemTypeEditor: FC<DropdownProps> = ({ onChange, value }) => (
  <Dropdown
    value={value}
    options={itemType}
    optionLabel="label"
    optionValue="value"
    onChange={onChange}
    style={{ width: "100%" }}
    placeholder="Select a item type"
    itemTemplate={(option) => {
      return <span>{option.label}</span>;
    }}
  />
);

export const ItemsTable: FC<DataTableProps> = ({
  id,
  value,
  footerColumnGroup,
  children,
}) => (
  <DataTable
    id={id}
    value={value}
    editMode="row"
    dataKey="id"
    scrollable
    scrollHeight="150px"
    footerColumnGroup={footerColumnGroup}
    className="p-datatable-sm"
    resizableColumns
    columnResizeMode="expand"
  >
    {children}
  </DataTable>
);
