import styled from "@emotion/styled";
import { Button, ButtonProps } from "primereact/button";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable, DataTableProps } from "primereact/datatable";
import { Dropdown, DropdownProps } from "primereact/dropdown";
import {
  InputNumber,
  InputNumberValueChangeParams,
} from "primereact/inputnumber";
import { Row } from "primereact/row";
import { Toolbar } from "primereact/toolbar";
import { FC } from "react";
import { itemType } from "../commonData";

export const DeleteButton: FC<ButtonProps> = ({ onClick }) => (
  <Button
    icon="pi pi-trash"
    className="p-button-rounded p-button-warning p-button-sm"
    onClick={onClick}
  />
);

export const FooterAmount = (amount: number) => (
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

export const ItemTypeEditor: FC<DropdownProps> = (props) => (
  <Dropdown
    {...props}
    options={itemType}
    optionLabel="label"
    optionValue="value"
    style={{ width: "100%" }}
    placeholder="Select a item type"
    itemTemplate={(option) => {
      return <span>{option.label}</span>;
    }}
  />
);

export const ItemsTable: FC<DataTableProps> = (props) => (
  <DataTable
    {...props}
    editMode="row"
    dataKey="id"
    scrollable
    scrollHeight="150px"
    className="p-datatable-sm"
    resizableColumns
    columnResizeMode="expand"
  >
    {props.children}
  </DataTable>
);

export const AddNewRow = ({ onClick }: any) => (
  <Toolbar
    left={
      <Button
        aria-label="addNewRow"
        icon="pi pi-plus"
        className="p-button-rounded"
        onClick={onClick}
      />
    }
    style={{ padding: 5 }}
  />
);

export const itemTypeBodyTemplate = (rowData: any) =>
  itemType.find(({ value }) => rowData.type === value)?.label;

export const AmountEditor: FC<{
  props: any;
  onValueChange: (e: InputNumberValueChangeParams) => void;
}> = ({ props, onValueChange }: any) => {
  if (props.rowData["type"] !== "fixed") return null;
  const value = props.rowData["amount"] || null;
  const id = `${props.rowIndex}_${props.field}`;
  return (
    <>
      <HiddenLabel htmlFor={id}>{`Enter ${props.field}`}</HiddenLabel>
      <InputNumber inputId={id} value={value} onValueChange={onValueChange} />
    </>
  );
};

export const HiddenLabel = styled.label`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;
