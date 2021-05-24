import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Row } from "primereact/row";
import { Toolbar } from "primereact/toolbar";
import { itemType } from "./commonData";
import { OldItem } from "./types";
import {
  amountBodyTemplate,
  formatCurrency,
  netWeightTemplate,
} from "utils/currency.utils";
import { InputText } from "primereact/inputtext";
export function OldItems({
  oldItems,
  setOldItems,
  onRowEditInit,
  onRowEditCancel,
  billDetails,
}: any) {
  const calculateOldItemAmount = (updatedProd: OldItem) => {
    let amount = 0;
    if (updatedProd.type === "gold") {
      amount =
        updatedProd.grossWeight *
        (updatedProd.purity / 100) *
        (updatedProd.rate / 10);
    }

    if (updatedProd.type === "silver") {
      amount = updatedProd.grossWeight * (updatedProd.rate / 1000);
    }

    return Math.round(amount);
  };
  const updateOldAmount = (props: any) => {
    let amount = calculateOldItemAmount(props.rowData);
    let updatedProducts = [...props.value];
    updatedProducts[props.rowIndex]["amount"] = amount;
    setOldItems(updatedProducts);
  };

  const updateNetWeight = (props: any) => {
    let updatedOldItem: OldItem = props.rowData;
    let updatedNetWeight =
      (updatedOldItem.grossWeight * updatedOldItem.purity) / 100;
    let updatedProducts = [...props.value];
    updatedProducts[props.rowIndex]["netWeight"] = updatedNetWeight;
    setOldItems(updatedProducts);
  };
  const onEditorValueChangeOld = (props: any, value: string) => {
    let updatedProducts = [...props.value];
    updatedProducts[props.rowIndex][props.field] = value;
    setOldItems(updatedProducts);
    updateOldAmount(props);
    updateNetWeight(props);
  };
  const oldItemsTotalAmount = () => {
    return formatCurrency(billDetails.oldTotal);
  };

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
        onValueChange={(e) => onEditorValueChangeOld(props, e.value)}
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

  const addBlankRowForOldItem = () => {
    let blankOldItem: OldItem = {
      amount: 0,
      item: "",
      purity: 100,
      rate: 0,
      grossWeight: 0,
      netWeight: 0,
      type: "gold",
    };

    setOldItems([...oldItems, blankOldItem]);
  };
  const toolBarOldItem = () => {
    return (
      <>
        <Button
          icon="pi pi-plus"
          className="p-button-rounded"
          onClick={addBlankRowForOldItem}
        />
        <Button
          icon="pi pi-times"
          className="p-button-rounded p-button-danger"
        />
      </>
    );
  };
  return (
    <div className="card">
      <Toolbar left={toolBarOldItem}></Toolbar>
      <DataTable
        id="oldItems"
        value={oldItems}
        editMode="row"
        dataKey="id"
        onRowEditInit={onRowEditInit}
        onRowEditCancel={onRowEditCancel}
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
      </DataTable>
    </div>
  );
}
