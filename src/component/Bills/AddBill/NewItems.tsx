import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Row } from "primereact/row";
import { Toolbar } from "primereact/toolbar";
import { amountBodyTemplate, formatCurrency } from "utils/currency.utils";
import { itemType } from "../commonData";
import { NewItem } from "../types";
import { addNewItem, deleteNewItem, updateNewItemField } from "./slice";

export function NewItems({ newItems, billDetails, dispatch }: any) {
  // const updateNewAmount = (props: any) => {
  //   // let amount = calculateNewItemAmount(props.rowData);
  //   let updatedProducts = [...props.value];
  //   updatedProducts[props.rowIndex]["amount"] = amount;
  //   setNewItems(updatedProducts);
  // };
  const onEditorValueChangeNew = (props: any, value: any) => {
    // let updatedProducts = [...props.value];
    // updatedProducts[props.rowIndex][props.field] = value;
    // setNewItems(updatedProducts);
    dispatch(
      updateNewItemField({ index: props.rowIndex, value, field: props.field })
    );
    // updateNewAmount(props);
  };
  const inputTextEditorNew = (props: any, field: string) => {
    return (
      <InputText
        type="text"
        value={props.rowData[field]}
        onChange={(e) => onEditorValueChangeNew(props, e.currentTarget.value)}
      />
    );
  };
  const newItemsTotalAmount = () => {
    return formatCurrency(billDetails?.newTotal);
  };
  const newItemfooterGroup = (
    <ColumnGroup>
      <Row>
        <Column
          footer="Totals:"
          colSpan={6}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={newItemsTotalAmount} />
      </Row>
    </ColumnGroup>
  );
  const otherChargesTemplate = (rowData: any) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(rowData.otherCharges);
  };
  const newItemTypeEditor = (props: any) => {
    return (
      <Dropdown
        value={props.rowData["type"]}
        options={itemType}
        optionLabel="label"
        optionValue="value"
        onChange={(e) => onEditorValueChangeNew(props, e.value)}
        style={{ width: "100%" }}
        placeholder="Select a item type"
        itemTemplate={(option) => {
          return <span>{option.label}</span>;
        }}
      />
    );
  };
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
    return inputTextEditorNew(props, "rate");
  };
  const newWeightEditor = (props: any) => {
    return inputTextEditorNew(props, "weight");
  };
  const makingChargesTemplate = (rowData: any) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(rowData.makingCharges);
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

  const deleteNewItemRow = (rowData: any, { rowIndex }: any) => (
    <Button
      icon="pi pi-trash"
      className="p-button-rounded p-button-warning p-button-sm"
      onClick={() => dispatch(deleteNewItem(rowIndex))}
    />
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
        footerColumnGroup={newItemfooterGroup}
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
