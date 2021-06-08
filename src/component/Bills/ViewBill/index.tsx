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
      <div ref={billRef} style={{ width: "210mm" }}>
        <div className="print-div">
          <div className="p-grid">
            <div className="p-col-3">
              <div className="p-grid">
                <div className="p-col-12">
                  <b>आर. के. ज्वेलर्स</b>
                </div>
                <div className="p-col-12">
                  सराफा बाजार, जावद (म. प्र.) प्रो. नरेश राधेश्याम जी सोनी{" "}
                  <i className="pi pi-mobile">9425975329</i>
                </div>
              </div>
            </div>

            <div className="p-col-6">
              <Divider align="left">
                <div className="p-d-inline-flex p-ai-center">
                  <i className="pi pi-user p-mr-2"></i>
                  <b>ग्राहक</b>
                </div>
              </Divider>

              <div className="p-grid">
                <div className="p-col-12">
                  <label id="name">नाम: </label>
                  <span id="name"> {customer?.name}</span>
                </div>

                <div className="p-col-12">
                  <label id="place">निवासी: </label>
                  <span id="place"> {customer?.place}</span>
                </div>

                {customer?.mobile && (
                  <div className="p-col-12">
                    <label id="mobile">मोबाइल: </label>
                    <span id="mobile"> {customer?.mobile}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-col-3">
              <div className="p-grid">
                <div className="p-col">
                  <Divider align="left">
                    <div className="p-d-inline-flex p-ai-center">
                      <i className="pi pi-book p-mr-2"></i>
                      <b>बिल क्र. : {billNo}</b>
                    </div>
                  </Divider>
                </div>
                <div className="p-col">
                  <Divider align="left">
                    <div className="p-d-inline-flex p-ai-center">
                      <i className="pi pi-calendar p-mr-2"></i>
                      <b>दिनांक : {invoiceDate}</b>
                    </div>
                  </Divider>
                </div>
              </div>
            </div>
          </div>

          <div className="p-grid">
            <div className="p-col-8">
              {!!newItems.length && (
                <div className="card">
                  <DataTable
                    value={newItems}
                    header="नया सामान"
                    className="p-datatable-sm p-datatable-gridlines"
                  >
                    <Column
                      field="type"
                      body={itemTypeBodyTemplate}
                      header="प्रकार"
                    ></Column>
                    <Column field="item" header="सामान"></Column>
                    <Column
                      field="weight"
                      header="वज़न"
                      body={weightTemplate}
                    ></Column>
                    <Column field="rate" header="भाव"></Column>
                    <Column
                      field="makingCharges"
                      header="मजदूरी"
                      body={makingChargeTemplate}
                    ></Column>
                    <Column field="otherCharges" header="अन्य"></Column>
                    <Column
                      field="amount"
                      header="राशि"
                      body={amountBodyTemplate}
                    ></Column>
                  </DataTable>
                </div>
              )}

              {!!oldItems.length && (
                <div className="card">
                  <DataTable
                    value={oldItems}
                    header="पुराना सामान"
                    className="p-datatable-sm p-datatable-gridlines"
                  >
                    <Column
                      field="type"
                      body={itemTypeBodyTemplate}
                      header="प्रकार"
                    ></Column>
                    <Column field="item" header="सामान"></Column>
                    <Column
                      field="grossWeight"
                      header="वजन"
                      body={grossWeightTemplate}
                    ></Column>
                    <Column
                      field="purity"
                      header="शुद्धता"
                      body={purityTemplate}
                    ></Column>
                    <Column
                      field="netWeight"
                      header="शुद्ध वजन"
                      body={viewNetWeightTemplate}
                    ></Column>
                    <Column field="rate" header="भाव"></Column>
                    <Column
                      field="amount"
                      header="राशि"
                      body={amountBodyTemplate}
                    ></Column>
                  </DataTable>
                </div>
              )}
            </div>

            <div className="p-col-4">
              <ViewAmountDetails billDetail={billDetail} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewBill;
