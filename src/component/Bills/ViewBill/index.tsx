import { FC } from "react";
import { Bill } from "../types";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Divider } from "primereact/divider";
import ViewAmountDetails from "./ViewAmountDetails";
import {
  amountBodyTemplate,
  weightTemplate,
  grossWeightTemplate,
  viewNetWeightTemplate,
  makingChargeTemplate,
  purityTemplate,
} from "utils/currency.utils";

type ViewBillProps = {
  displayDialog: boolean;
  bill: Bill;
  setDisplayDialog: (flag: boolean) => void;
};

const ViewBill: FC<ViewBillProps> = ({
  bill,
  displayDialog,
  setDisplayDialog,
}) => {
  const { customer, oldItems, newItems, billDetail, invoiceDate } = bill;
  const onHide = () => {
    setDisplayDialog(false);
  };

  return (
    <Dialog
      visible={displayDialog}
      onHide={onHide}
      header="R K JEWELLERS JAWAD"
      modal
      breakpoints={{
        "960px": "75vw",
        "640px": "100vw",
      }}
      style={{
        width: "50vw",
      }}
      maximized={true}
    >
      <Divider align="right">
        <div className="p-d-inline-flex p-ai-center">
          <i className="pi pi-calendar p-mr-2"></i>
          <b>{invoiceDate.toDateString()}</b>
        </div>
      </Divider>

      <Divider align="left">
        <div className="p-d-inline-flex p-ai-center">
          <i className="pi pi-user p-mr-2"></i>
          <b>Customer</b>
        </div>
      </Divider>

      <div className="p-grid">
        <div className="p-col">
          <label id="name">Name:</label>
          <span id="name"> {customer?.name}</span>
        </div>

        <div className="p-col">
          <label id="place">Place:</label>
          <span id="place"> {customer?.place}</span>
        </div>

        <div className="p-col">
          <label id="mobile">Mobile:</label>
          <span id="mobile"> {customer?.mobile}</span>
        </div>

        <div className="p-col">
          <label id="address">Address:</label>
          <span id="address"> {customer?.address}</span>
        </div>
      </div>

      {newItems.length && (
        <div className="card">
          <DataTable
            value={newItems}
            header="New Items"
            className="p-datatable-sm"
          >
            <Column field="type" header="Type"></Column>
            <Column field="item" header="Item"></Column>
            <Column
              field="weight"
              header="Weight"
              body={weightTemplate}
            ></Column>
            <Column field="rate" header="Rate"></Column>
            <Column
              field="makingCharges"
              header="Making charge"
              body={makingChargeTemplate}
            ></Column>
            <Column field="otherCharges" header="Other Charges"></Column>
            <Column
              field="amount"
              header="Amount"
              body={amountBodyTemplate}
            ></Column>
          </DataTable>
        </div>
      )}

      {!!oldItems.length && (
        <div className="card">
          <DataTable
            value={oldItems}
            header="Old Items"
            className="p-datatable-sm"
          >
            <Column field="type" header="Type"></Column>
            <Column field="item" header="Item"></Column>
            <Column
              field="grossWeight"
              header="GR. WT"
              body={grossWeightTemplate}
            ></Column>
            <Column
              field="purity"
              header="Purity"
              body={purityTemplate}
            ></Column>
            <Column
              field="netWeight"
              header="NT. Wt"
              body={viewNetWeightTemplate}
            ></Column>
            <Column field="rate" header="Rate"></Column>
            <Column
              field="amount"
              header="Amount"
              body={amountBodyTemplate}
            ></Column>
          </DataTable>
        </div>
      )}

      <ViewAmountDetails billDetail={billDetail} />
    </Dialog>
  );
};

export default ViewBill;
