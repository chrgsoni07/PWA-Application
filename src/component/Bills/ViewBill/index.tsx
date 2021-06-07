import { FC, useRef } from "react";
import { Bill } from "../types";
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
import { itemTypeBodyTemplate } from "../AddBill/common";
import ReactToPrint from "react-to-print";

type ViewBillProps = {
  bill: Bill;
};

const ViewBill: FC<ViewBillProps> = ({ bill }) => {
  const { customer, oldItems, newItems, billDetail, invoiceDate, billNo } =
    bill;

  const billRef = useRef(null);

  return (
    <>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => billRef.current}
      />
      <div ref={billRef}>
        <div className="p-grid">
          <div className="p-col-8">
            <Divider align="left">
              <div className="p-d-inline-flex p-ai-center">
                <i className="pi pi-user p-mr-2"></i>
                <b>Customer</b>
              </div>
            </Divider>

            <div className="p-grid">
              <div className="p-col-12 p-md-6 p-lg-3">
                <label id="name">Name:</label>
                <span id="name"> {customer?.name}</span>
              </div>

              <div className="p-col-12 p-md-6 p-lg-3">
                <label id="place">Place:</label>
                <span id="place"> {customer?.place}</span>
              </div>

              {customer?.mobile && (
                <div className="p-col-12 p-md-6 p-lg-3">
                  <label id="mobile">Mobile:</label>
                  <span id="mobile"> {customer?.mobile}</span>
                </div>
              )}

              {customer?.address && (
                <div className="p-col-12 p-md-6 p-lg-3">
                  <label id="address">Address:</label>
                  <span id="address"> {customer?.address}</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-col-4">
            <div className="p-grid">
              <div className="p-col">
                <Divider align="left">
                  <div className="p-d-inline-flex p-ai-center">
                    <i className="pi pi-book p-mr-2"></i>
                    <b>Bill No. {billNo}</b>
                  </div>
                </Divider>
              </div>
              <div className="p-col">
                <Divider align="left">
                  <div className="p-d-inline-flex p-ai-center">
                    <i className="pi pi-calendar p-mr-2"></i>
                    <b>Date {invoiceDate}</b>
                  </div>
                </Divider>
              </div>
            </div>
          </div>
        </div>

        {!!newItems.length && (
          <div className="card">
            <DataTable
              value={newItems}
              header="New Items"
              className="p-datatable-sm"
            >
              <Column
                field="type"
                body={itemTypeBodyTemplate}
                header="Type"
              ></Column>
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
              <Column
                field="type"
                body={itemTypeBodyTemplate}
                header="Type"
              ></Column>
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
      </div>
    </>
  );
};

export default ViewBill;
