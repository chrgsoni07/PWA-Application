import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import {
  amountBodyTemplate,
  formatCurrency,
  formatCurrencyNoFraction,
} from "utils/currency.utils";
import {
  AddNewRow,
  DeleteButton,
  FooterAmount,
  ItemsTable,
  itemTypeBodyTemplate,
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

  const isTypeSilverPerPrice = (props: any) => {
    let type = props.rowData["type"];

    return type !== "fixed";
  };

  const newItemAmountEditor = (props: any) => (
    <InputNumber
      value={props.rowData["amount"]}
      onChange={(e) => onEditorValueChangeNew(props, e.value)}
      disabled={isTypeSilverPerPrice(props)}
    />
  );

  const deleteNewItemRow = (_: any, { rowIndex }: any) => (
    <DeleteButton onClick={() => dispatch(deleteNewItem(rowIndex))} />
  );

  return (
    <div className="card">
      <AddNewRow onClick={() => dispatch(addNewItem())} />
      <ItemsTable
        id="newItems"
        value={newItems}
        footerColumnGroup={FooterAmount(formatCurrency(billDetails?.newTotal))}
      >
        <Column
          field="type"
          header="TYPE"
          body={itemTypeBodyTemplate}
          editor={newItemTypeEditor}
        />
        <Column field="item" header="ITEM" editor={newItemNameEditor} />
        <Column field="weight" header="WEIGHT(gram)" editor={newWeightEditor} />
        <Column field="rate" header="RATE" editor={newRateEditor} />
        <Column
          field="makingCharges"
          header="MAKING CHARGES"
          body={makingChargesTemplate}
          editor={newMakingChargesEditor}
        />
        <Column
          field="otherCharges"
          header="OTHER CHARGES"
          body={otherChargesTemplate}
          editor={newOtherChargesEditor}
        />
        <Column
          field="amount"
          header="AMOUNT"
          body={amountBodyTemplate}
          editor={newItemAmountEditor}
        />
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
