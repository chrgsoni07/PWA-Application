import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import {
  amountBodyTemplate,
  formatCurrency,
  formatCurrencyNoFraction,
} from "utils/currency.utils";
import {
  DeleteButton,
  FooterAmount,
  ItemsTable,
  ItemTypeEditor,
} from "./common";
import { addNewItem, deleteNewItem, updateNewItemField } from "./slice";

export function NewItems({ newItems, billDetails, dispatch }: any) {
  const onEditorValueChangeNew = ({ rowIndex, field }: any, value: any) =>
    dispatch(updateNewItemField({ index: rowIndex, value, field }));
  const inputTextEditorNew = (props: any, field: string) => (
    <InputText
      type="text"
      value={props.rowData[field]}
      onChange={(e) => onEditorValueChangeNew(props, e.currentTarget.value)}
    />
  );

  const otherChargesTemplate = ({ otherCharges }: any) =>
    formatCurrencyNoFraction(otherCharges);
  const newItemTypeEditor = (props: any) => (
    <ItemTypeEditor
      value={props.rowData["type"]}
      onChange={(e) => onEditorValueChangeNew(props, e.value)}
    />
  );
  const newItemNameEditor = (props: any) => inputTextEditorNew(props, "item");
  const newMakingChargesEditor = (props: any) => (
    <InputNumber
      value={props.rowData["makingCharges"]}
      onValueChange={(e) => onEditorValueChangeNew(props, e.value)}
      mode="currency"
      currency="INR"
      locale="en-IN"
      minFractionDigits={0}
    />
  );
  const newRateEditor = (props: any) => (
    <InputNumber
      value={props.rowData["rate"]}
      onValueChange={(e) => onEditorValueChangeNew(props, e.value)}
      locale="en-IN"
    />
  );
  const newWeightEditor = (props: any) => (
    <InputNumber
      value={props.rowData["weight"]}
      onValueChange={(e) => onEditorValueChangeNew(props, e.value)}
      locale="en-IN"
      mode="decimal"
      minFractionDigits={1}
      maxFractionDigits={3}
    />
  );
  const makingChargesTemplate = ({ makingCharges }: any) =>
    formatCurrencyNoFraction(makingCharges);
  const newOtherChargesEditor = (props: any) => (
    <InputNumber
      value={props.rowData["otherCharges"]}
      onValueChange={(e) => onEditorValueChangeNew(props, e.value)}
      mode="currency"
      currency="INR"
      locale="en-IN"
      minFractionDigits={0}
    />
  );

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
      <ItemsTable
        id="newItems"
        value={newItems}
        footerColumnGroup={
          <FooterAmount amount={formatCurrency(billDetails?.newTotal)} />
        }
      >
        <Column field="type" header="TYPE" editor={newItemTypeEditor} />
        <Column field="item" header="ITEM" editor={newItemNameEditor} />
        <Column field="weight" header="WEIGHT(gram)" editor={newWeightEditor} />
        <Column field="rate" header="RATE" editor={newRateEditor} />
        <Column
          field="makingCharges"
          header="MAKING CHARGES(per gram)"
          body={makingChargesTemplate}
          editor={newMakingChargesEditor}
        />
        <Column
          field="otherCharges"
          header="OTHER CHARGES"
          body={otherChargesTemplate}
          editor={newOtherChargesEditor}
        />
        <Column field="amount" header="AMOUNT" body={amountBodyTemplate} />
        <Column
          rowEditor
          headerStyle={{
            width: "7rem",
          }}
          bodyStyle={{
            textAlign: "center",
          }}
        ></Column>
        <Column body={deleteNewItemRow} />
      </ItemsTable>
    </div>
  );
}
