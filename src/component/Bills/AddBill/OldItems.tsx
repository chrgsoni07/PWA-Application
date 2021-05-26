import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Row } from "primereact/row";
import { Toolbar } from "primereact/toolbar";
import { itemType } from "../commonData";

import {
  amountBodyTemplate,
  formatCurrency,
  netWeightTemplate,
} from "utils/currency.utils";
import { InputText } from "primereact/inputtext";
import { addOldItem, deleteOldItem, updateOldItemField } from "./slice";
export function OldItems({ oldItems, billDetails, dispatch }: any) {
  const onEditorValueChangeOld = (props: any, value: any) => {
    dispatch(
      updateOldItemField({ index: props.rowIndex, value, field: props.field })
    );
  };
  const oldItemsTotalAmount = () => {
    return formatCurrency(billDetails.oldTotal);
  };

  const confirmDeleteRow = (rowData: any, rowIndex: any) => {
    dispatch(deleteOldItem(rowIndex));
  };

  const deleteOldItemRow = (rowData: any, { rowIndex }: any) => (
    <Button
      icon="pi pi-trash"
      className="p-button-rounded p-button-warning p-button-sm"
      onClick={() => confirmDeleteRow(rowData, rowIndex)}
    />
  );

  const inputTextEditorOld = (props: any, field: string) => {
    return (
      <InputText
        type="text"
        value={props.rowData[field]}
        onChange={(e) => onEditorValueChangeOld(props, e.currentTarget.value)}
      />
    );
  };
  const oldPurityEditor = (props: any) => {
    return (
      <InputNumber
        value={props.rowData["purity"]}
        onChange={(e) => onEditorValueChangeOld(props, e.value)}
        suffix="%"
      />
    );
  };

  const oldItemTypeEditor = (props: any) => {
    return (
      <Dropdown
        value={props.rowData["type"]}
        options={itemType}
        optionLabel="label"
        optionValue="value"
        onChange={(e) => onEditorValueChangeOld(props, e.value)}
        style={{ width: "100%" }}
        placeholder="Select a item type"
        itemTemplate={(option) => {
          return <span>{option.label}</span>;
        }}
      />
    );
  };
  const oldItemEditor = (props: any) => {
    return inputTextEditorOld(props, "item");
  };

  const oldRateEditor = (props: any) => {
    return inputTextEditorOld(props, "rate");
  };
  const oldGrossWeightEditor = (props: any) => {
    return inputTextEditorOld(props, "grossWeight");
  };
  let oldItemfooterGroup = (
    <ColumnGroup>
      <Row>
        <Column
          footer="Totals:"
          colSpan={6}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={oldItemsTotalAmount} />
      </Row>
    </ColumnGroup>
  );

  const toolBarOldItem = () => {
    return (
      <>
        <Button
          aria-label="addOldItemRow"
          icon="pi pi-plus"
          className="p-button-rounded"
          onClick={() => dispatch(addOldItem())}
        />
      </>
    );
  };
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
        footerColumnGroup={oldItemfooterGroup}
      >
        <Column
          field="type"
          header="TYPE"
          editor={(props) => oldItemTypeEditor(props)}
        ></Column>
        <Column
          field="item"
          header="ITEM"
          editor={(props) => oldItemEditor(props)}
        ></Column>
        <Column
          field="grossWeight"
          header="GR.WT.(gram)"
          editor={(props) => oldGrossWeightEditor(props)}
        ></Column>
        <Column
          field="purity"
          header="PURITY(%)"
          editor={(props) => oldPurityEditor(props)}
        ></Column>
        <Column
          field="netWeight"
          header="NET.WT.(gram)"
          body={netWeightTemplate}
        ></Column>
        <Column
          field="rate"
          header="RATE"
          editor={(props) => oldRateEditor(props)}
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
        <Column body={deleteOldItemRow}></Column>
      </DataTable>
    </div>
  );
}
