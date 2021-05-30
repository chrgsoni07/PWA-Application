import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Row } from "primereact/row";
import { Toolbar } from "primereact/toolbar";
import {
  amountBodyTemplate,
  formatCurrency,
  formatCurrencyNoFraction,
} from "utils/currency.utils";
import { itemType } from "../commonData";
import { DeleteButton, FooterAmount, ItemTypeEditor } from "./common";
import { addNewItem, deleteNewItem, updateNewItemField } from "./slice";

export function NewItems({ newItems, billDetails, dispatch }: any) {
  const onEditorValueChangeNew = ({ rowIndex, field }: any, value: any) =>
    dispatch(updateNewItemField({ index: rowIndex, value, field }));
  const inputTextEditorNew = (props: any, field: string) => {
    return (
      <InputText
        type="text"
        value={props.rowData[field]}
        onChange={(e) => onEditorValueChangeNew(props, e.currentTarget.value)}
      />
    );
  };

  const otherChargesTemplate = (rowData: any) => {
    return formatCurrencyNoFraction(rowData.otherCharges);
  };
  const newItemTypeEditor = (props: any) => (
    <ItemTypeEditor
      value={props.rowData["type"]}
      onChange={(e) => onEditorValueChangeNew(props, e.value)}
    />
  );
  const newItemNameEditor = (props: any) => {
    return inputTextEditorNew(props, "item");
  };
  const newMakingChargesEditor = (props: any) => {
    return (
      <InputNumber
        value={props.rowData["makingCharges"]}
        onValueChange={(e) => onEditorValueChangeNew(props, e.value)}
        mode="currency"
        currency="INR"
        locale="en-IN"
        minFractionDigits={0}
      />
    );
  };
  const newRateEditor = (props: any) => {
    return (
      <InputNumber
        value={props.rowData["rate"]}
        onValueChange={(e) => onEditorValueChangeNew(props, e.value)}
        locale="en-IN"
      />
    );
  };
  const newWeightEditor = (props: any) => {
    return (
      <InputNumber
        value={props.rowData["weight"]}
        onValueChange={(e) => onEditorValueChangeNew(props, e.value)}
        locale="en-IN"
        mode="decimal"
        minFractionDigits={1}
        maxFractionDigits={3}
      />
    );
  };
  const makingChargesTemplate = (rowData: any) => {
    return formatCurrencyNoFraction(rowData.makingCharges);
  };
  const newOtherChargesEditor = (props: any) => {
    return (
      <InputNumber
        value={props.rowData["otherCharges"]}
        onValueChange={(e) => onEditorValueChangeNew(props, e.value)}
        mode="currency"
        currency="INR"
        locale="en-IN"
        minFractionDigits={0}
      />
    );
  };

  const deleteNewItemRow = (_: any, { rowIndex }: any) => (
    <DeleteButton onClick={() => dispatch(deleteNewItem(rowIndex))} />
  );

  const newItemButton = () => (
    <Button
      aria-label="addNewItemRow"
      icon="pi pi-plus"
      className="p-button-rounded"
      onClick={() => dispatch(addNewItem())}
    />
  );
  return (
    <div className="card">
      <Toolbar left={newItemButton} style={{ padding: 5 }}></Toolbar>
      <DataTable
        id="newItems"
        value={newItems}
        editMode="row"
        dataKey="id"
        scrollable
        scrollHeight="150px"
        footerColumnGroup={
          <FooterAmount amount={formatCurrency(billDetails?.newTotal)} />
        }
        className="p-datatable-sm"
        resizableColumns
        columnResizeMode="expand"
      >
        <Column
          field="type"
          header="TYPE"
          editor={(props) => newItemTypeEditor(props)}
        ></Column>
        <Column
          field="item"
          header="ITEM"
          editor={(props) => newItemNameEditor(props)}
        ></Column>
        <Column
          field="weight"
          header="WEIGHT(gram)"
          editor={(props) => newWeightEditor(props)}
        ></Column>
        <Column
          field="rate"
          header="RATE"
          editor={(props) => newRateEditor(props)}
        ></Column>
        <Column
          field="makingCharges"
          header="MAKING CHARGES(per gram)"
          body={makingChargesTemplate}
          editor={(props) => newMakingChargesEditor(props)}
        ></Column>
        <Column
          field="otherCharges"
          header="OTHER CHARGES"
          body={otherChargesTemplate}
          editor={(props) => newOtherChargesEditor(props)}
        ></Column>
        <Column
          field="amount"
          header="AMOUNT"
          body={amountBodyTemplate}
        ></Column>
        <Column
          rowEditor
          headerStyle={{
            width: "7rem",
          }}
          bodyStyle={{
            textAlign: "center",
          }}
        ></Column>
        <Column body={deleteNewItemRow}></Column>
      </DataTable>
    </div>
  );
}
