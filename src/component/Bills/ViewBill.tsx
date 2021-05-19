import React, { FC } from "react";
import { Bill } from "./types";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Divider } from "primereact/divider";
import "./DataTableDemo.css";
import { InputNumber } from "primereact/inputnumber";

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
  const onHide = () => {
    setDisplayDialog(false);
  };

  const isOldExist = () => {
    return bill.oldItems.length > 0;
  };

  const numberFormat = (value: number | undefined) => {
    if (value) {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
      }).format(value);
    } else {
      return value;
    }
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
          <b>{bill.invoiceDate.toDateString()}</b>
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
          <span id="name"> {bill.customer?.name}</span>
        </div>

        <div className="p-col">
          <label id="place">Place:</label>
          <span id="place"> {bill.customer?.place}</span>
        </div>

        <div className="p-col">
          <label id="mobile">Mobile:</label>
          <span id="mobile"> {bill.customer?.mobile}</span>
        </div>

        <div className="p-col">
          <label id="address">Address:</label>
          <span id="address"> {bill.customer?.address}</span>
        </div>
      </div>

      <div className="card">
        <DataTable
          value={bill.newItems}
          header="New Items"
          className="p-datatable-sm"
        >
          <Column field="type" header="Type"></Column>
          <Column field="item" header="Item"></Column>
          <Column field="weight" header="Weight"></Column>
          <Column field="rate" header="Rate"></Column>
          <Column field="makingCharges" header="Making charge"></Column>
          <Column field="otherCharges" header="Other Charges"></Column>
          <Column field="amount" header="Amount"></Column>
        </DataTable>
      </div>

      <div className="card">
        <DataTable
          value={bill.oldItems}
          header="Old Items"
          className="p-datatable-sm"
        >
          <Column field="type" header="Type"></Column>
          <Column field="item" header="Item"></Column>
          <Column field="grossWeight" header="GR. WT"></Column>
          <Column field="purity" header="Purity"></Column>
          <Column field="netWeight" header="NT. Wt"></Column>
          <Column field="rate" header="Rate"></Column>
          <Column field="amount" header="Amount"></Column>
        </DataTable>
      </div>

      <Divider align="right">
        <div className="p-d-inline-flex p-ai-center">
          <i className="pi pi-wallet p-mr-2"></i>
          <b>Amount Details</b>
        </div>
      </Divider>
      <div className="p-grid">
        <div className="p-col">
          {/*  <table>
                        <tr>
                            <td>New item total</td>
                            <td>{bill.billDetail?.newTotal}</td>
                        </tr>
                        <tr>
                            <td>Old item total</td>
                            <td>{bill.billDetail?.oldTotal}</td>
                        </tr>
                        <tr>
                            <td>Difference</td>
                            <td>{bill.billDetail?.oldNewDifference}</td>
                        </tr>
                    </table>
                    */}
        </div>
        <div className="p-col">
          {/* <table>
                        <tr>
                            <td>Difference</td>
                            <td>{bill.billDetail?.oldNewDifference}</td>
                        </tr>
                        <tr>
                            <td>Discount</td>
                            <td>{bill.billDetail?.discount}</td>
                        </tr>
                        <tr>
                            <td>Amount Payable</td>
                            <td>{bill.billDetail?.amountPayable}</td>
                        </tr>
                    </table>
                    */}
        </div>
        <div className="p-col">
          <table>
            <tr>
              <td>New item total</td>
              <td>{bill.billDetail?.newTotal}</td>
            </tr>
            <tr>
              <td>Old item total</td>
              <td>{bill.billDetail?.oldTotal}</td>
            </tr>
            <tr className="highlight">
              <td>Difference</td>
              <td>{numberFormat(bill.billDetail?.oldNewDifference)}</td>
            </tr>
            <tr>
              <td>Discount</td>
              <td>{bill.billDetail?.discount}</td>
            </tr>
            <tr className="highlight">
              <td>Amount Payable</td>
              <td>{bill.billDetail?.amountPayable}</td>
            </tr>
            <tr>
              <td>Paid</td>
              <td>
                <b>{bill.billDetail?.paid}</b>
              </td>
            </tr>
            <tr>
              <td>Due</td>
              <td>
                <b>{bill.billDetail?.due}</b>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </Dialog>
  );
};

export default ViewBill;
