import { Column } from "primereact/column";
import { Weight, Currency } from "component/common/PrimeReactOverrides";
import { InputText } from "primereact/inputtext";
import {
  amountBodyTemplate,
  formatCurrency,
  formatCurrencyNoFraction,
} from "utils/currency.utils";
import {
  AddNewRow,
  AmountEditor,
  DeleteButton,
  FooterAmount,
  ItemsTable,
  itemTypeBodyTemplate,
  ItemTypeEditor,
} from "./common";
import { addNewItem, deleteNewItem, updateNewItemField } from "./slice";

export const NewItems = ({ newItems, billDetails, dispatch }: any) => {
  const onEditorValueChangeNew = ({ rowIndex, field }: any, value: any) =>
    dispatch(updateNewItemField({ index: rowIndex, value, field }));
  const inputTextEditorNew = (props: any, field: string) => (
    <InputText
      type="text"
      aria-label={`Enter ${field}`}
      value={props.rowData[field]}
      onChange={(e) => onEditorValueChangeNew(props, e.currentTarget.value)}
    />
  );

  const otherChargesTemplate = ({ otherCharges }: any) =>
    formatCurrencyNoFraction(otherCharges);
  const newItemTypeEditor = (props: any) => (
    <ItemTypeEditor
      ariaLabel="Select an item type"
      value={props.rowData["type"]}
      onChange={(e) => onEditorValueChangeNew(props, e.value)}
    />
  );
  const newItemNameEditor = (props: any) => inputTextEditorNew(props, "item");
  const newMakingChargesEditor = (props: any) => (
    <Currency
      ariaLabel={`Enter ${props.field}`}
      value={props.rowData["makingCharges"]}
      onValueChange={(e) => onEditorValueChangeNew(props, e.value)}
    />
  );
  const newRateEditor = (props: any) => (
    <Currency
      ariaLabel={`Enter ${props.field}`}
      value={props.rowData["rate"]}
      onValueChange={(e) => onEditorValueChangeNew(props, e.value)}
    />
  );

  const newWeightEditor = (props: any) => (
    <Weight
      ariaLabel={`Enter ${props.field}`}
      value={props.rowData["weight"]}
      onValueChange={(e) => onEditorValueChangeNew(props, e.value)}
    />
  );

  const makingChargesTemplate = ({ makingCharges }: any) =>
    formatCurrencyNoFraction(makingCharges);
  const newOtherChargesEditor = (props: any) => (
    <Currency
      ariaLabel={`Enter ${props.field}`}
      value={props.rowData["otherCharges"]}
      onValueChange={(e) => onEditorValueChangeNew(props, e.value)}
    />
  );

  const newItemAmountEditor = (props: any) => (
    <AmountEditor
      props={props}
      onValueChange={(e) => onEditorValueChangeNew(props, e.value)}
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
        />
        <Column body={deleteNewItemRow} />
      </ItemsTable>
    </div>
  );
};
