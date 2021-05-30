import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputNumber } from "primereact/inputnumber";
import { Toolbar } from "primereact/toolbar";
import {
  amountBodyTemplate,
  formatCurrency,
  netWeightTemplate,
} from "utils/currency.utils";
import { InputText } from "primereact/inputtext";
import { addOldItem, deleteOldItem, updateOldItemField } from "./slice";
import { OldItem } from "../types";
import { DeleteButton, FooterAmount, ItemTypeEditor } from "./common";
export function OldItems({ oldItems, billDetails, dispatch }: any) {
  const onEditorValueChangeOld = ({ rowIndex, field }: any, value: any) =>
    dispatch(updateOldItemField({ index: rowIndex, value, field }));

  const deleteOldItemRow = (_: any, { rowIndex }: any) => (
    <DeleteButton onClick={() => dispatch(deleteOldItem(rowIndex))} />
  );

  const inputTextEditorOld = (props: any, field: keyof OldItem) => (
    <InputText
      type="text"
      value={props.rowData[field]}
      onChange={(e) => onEditorValueChangeOld(props, e.currentTarget.value)}
    />
  );
  const oldPurityEditor = (props: any) => (
    <InputNumber
      value={props.rowData["purity"]}
      onChange={(e) => onEditorValueChangeOld(props, e.value)}
      suffix="%"
    />
  );

  const oldItemTypeEditor = (props: any) => (
    <ItemTypeEditor
      value={props.rowData["type"]}
      onChange={(e) => onEditorValueChangeOld(props, e.value)}
    />
  );

  const oldItemEditor = (props: any) => {
    return inputTextEditorOld(props, "item");
  };

  const oldRateEditor = (props: any) => (
    <InputNumber
      value={props.rowData["rate"]}
      onValueChange={(e) => onEditorValueChangeOld(props, e.value)}
      locale="en-IN"
    />
  );
  const oldGrossWeightEditor = (props: any) => (
    <InputNumber
      value={props.rowData["grossWeight"]}
      onValueChange={(e) => onEditorValueChangeOld(props, e.value)}
      locale="en-IN"
      mode="decimal"
      minFractionDigits={1}
      maxFractionDigits={3}
    />
  );

  const toolBarOldItem = () => (
    <Button
      aria-label="addOldItemRow"
      icon="pi pi-plus"
      className="p-button-rounded"
      onClick={() => dispatch(addOldItem())}
    />
  );
  return (
    <div className="card">
      <Toolbar left={toolBarOldItem} style={{ padding: 5 }}></Toolbar>
      <DataTable
        id="oldItems"
        value={oldItems}
        editMode="row"
        dataKey="id"
        className="p-datatable-sm"
        resizableColumns
        columnResizeMode="expand"
        scrollable
        scrollHeight="150px"
        footerColumnGroup={
          <FooterAmount amount={formatCurrency(billDetails.oldTotal)} />
        }
      >
        <Column
          field="type"
          header="TYPE"
          editor={(props) => oldItemTypeEditor(props)}
        />
        <Column
          field="item"
          header="ITEM"
          editor={(props) => oldItemEditor(props)}
        />
        <Column
          field="grossWeight"
          header="GR.WT.(gram)"
          editor={(props) => oldGrossWeightEditor(props)}
        />
        <Column
          field="purity"
          header="PURITY(%)"
          editor={(props) => oldPurityEditor(props)}
        />
        <Column
          field="netWeight"
          header="NET.WT.(gram)"
          body={netWeightTemplate}
        />
        <Column
          field="rate"
          header="RATE"
          editor={(props) => oldRateEditor(props)}
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
        />
        <Column body={deleteOldItemRow} />
      </DataTable>
    </div>
  );
}
