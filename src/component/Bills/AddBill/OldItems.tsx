import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
import {
  amountBodyTemplate,
  formatCurrency,
  netWeightTemplate,
} from "utils/currency.utils";
import { InputText } from "primereact/inputtext";
import { addOldItem, deleteOldItem, updateOldItemField } from "./slice";
import { OldItem } from "../types";
import {
  AddNewRow,
  AmountEditor,
  DeleteButton,
  FooterAmount,
  ItemsTable,
  itemTypeBodyTemplate,
  ItemTypeEditor,
} from "./common";
export function OldItems({ oldItems, billDetails, dispatch }: any) {
  const onEditorValueChangeOld = ({ rowIndex, field }: any, value: any) =>
    dispatch(updateOldItemField({ index: rowIndex, value, field }));

  const deleteOldItemRow = (_: any, { rowIndex }: any) => (
    <DeleteButton onClick={() => dispatch(deleteOldItem(rowIndex))} />
  );

  const inputTextEditorOld = (props: any, field: keyof OldItem) => (
    <InputText
      aria-label={`Enter ${field}`}
      type="text"
      value={props.rowData[field]}
      onChange={(e) => onEditorValueChangeOld(props, e.currentTarget.value)}
    />
  );
  const oldPurityEditor = (props: any) => {
    const id = `${props.rowIndex}_${props.field}`;
    return (
      <>
        <label
          htmlFor={id}
          className="p-sr-only"
        >{`Enter ${props.field}`}</label>
        <InputNumber
          inputId={id}
          value={props.rowData["purity"]}
          onChange={(e) => onEditorValueChangeOld(props, e.value)}
          suffix="%"
        />
      </>
    );
  };

  const oldItemTypeEditor = (props: any) => (
    <ItemTypeEditor
      ariaLabel="Select an item type"
      value={props.rowData["type"]}
      onChange={(e) => onEditorValueChangeOld(props, e.value)}
    />
  );

  const OldAmountEditor = (props: any) => (
    <AmountEditor
      props={props}
      onValueChange={(e) => onEditorValueChangeOld(props, e.value)}
    />
  );
  const oldItemEditor = (props: any) => inputTextEditorOld(props, "item");

  const oldRateEditor = (props: any) => {
    const id = `${props.rowIndex}_${props.field}`;
    return (
      <>
        <label
          htmlFor={id}
          className="p-sr-only"
        >{`Enter ${props.field}`}</label>
        <InputNumber
          inputId={id}
          value={props.rowData["rate"]}
          onValueChange={(e) => onEditorValueChangeOld(props, e.value)}
          locale="en-IN"
        />
      </>
    );
  };
  const oldGrossWeightEditor = (props: any) => {
    const id = `${props.rowIndex}_${props.field}`;
    return (
      <>
        <label
          htmlFor={id}
          className="p-sr-only"
        >{`Enter ${props.field}`}</label>
        <InputNumber
          inputId={id}
          value={props.rowData["grossWeight"]}
          onValueChange={(e) => onEditorValueChangeOld(props, e.value)}
          locale="en-IN"
          mode="decimal"
          minFractionDigits={1}
          maxFractionDigits={3}
        />
      </>
    );
  };

  return (
    <div className="card">
      <AddNewRow onClick={() => dispatch(addOldItem())} />
      <ItemsTable
        id="oldItems"
        value={oldItems}
        footerColumnGroup={FooterAmount(formatCurrency(billDetails.oldTotal))}
      >
        <Column
          field="type"
          body={itemTypeBodyTemplate}
          header="TYPE"
          editor={oldItemTypeEditor}
        />
        <Column field="item" header="ITEM" editor={oldItemEditor} />
        <Column
          field="grossWeight"
          header="GR.WT.(gram)"
          editor={oldGrossWeightEditor}
        />
        <Column field="purity" header="PURITY(%)" editor={oldPurityEditor} />
        <Column
          field="netWeight"
          header="NET.WT.(gram)"
          body={netWeightTemplate}
        />
        <Column field="rate" header="RATE" editor={oldRateEditor} />
        <Column
          field="amount"
          header="AMOUNT"
          body={amountBodyTemplate}
          editor={OldAmountEditor}
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
        <Column body={deleteOldItemRow} />
      </ItemsTable>
    </div>
  );
}
