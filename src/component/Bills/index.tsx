import { AddNewBill } from "./AddBill/AddNewBill";
import ViewBill from "./ViewBill";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { TabView, TabPanel } from "primereact/tabview";
import React, { useState, useEffect } from "react";
import "./DataTableDemo.css";
import { Bill } from "./types";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { createNextState } from "@reduxjs/toolkit";
import { db } from "api";
import { Dialog } from "primereact/dialog";

const Bills = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [displayViewDialog, setDisplayViewDialog] = useState(false);
  const [savedBills, setSavedBills] = useState<Bill[]>([]);
  const [bill, setBill] = useState<Bill>({} as Bill);

  useEffect(() => {
    const collection = db.collection("bills");

    collection.get().then((querySnapshot) => {
      const allBills: Bill[] = [];
      querySnapshot.forEach((bill) => {
        const billData = bill.data();
        allBills.push({
          id: bill.id,
          billNo: billData.billNo,
          invoiceDate: billData.invoiceDate,
          newItems: billData.newItems,
          customer: billData.customer,
          oldItems: billData.oldItems,
          billDetail: billData.billDetail,
        });
      });
      console.log(allBills);
      setSavedBills(allBills);
    });
  }, []);

  const header = () => {
    <Button label="New" icon="pi pi-plus" className="p-button-sm" />;
  };

  const displayModel = () => {
    setDisplayDialog(true);
  };

  const dateBodyTemplate = (rowData: any) => {
    var invoiceDate = rowData.invoiceDate.toDate();
    return invoiceDate.toLocaleDateString("en-In");
  };

  const actionBodyTemplate = (rowData: any) => {
    function viewBill(rowData: any): void {
      setBill({ ...rowData, invoiceDate: dateBodyTemplate(rowData) });
      setDisplayViewDialog(true);
    }

    function editBill(rowData: any): void {
      setBill({ ...rowData, invoiceDate: rowData.invoiceDate.toDate() });
      setDisplayDialog(true);
    }

    function confirmDeleteBill(rowData: any): void {
      alert(JSON.stringify(rowData));
      db.collection("bills")
        .doc(rowData.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          setSavedBills(
            createNextState(savedBills, (draft) =>
              draft.filter((i) => i.id !== rowData.id)
            )
          );
        })
        .catch((error: Error) => {
          console.error("Error removing document: ", error);
        });
    }

    return (
      <>
        <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-help p-mr-2"
          onClick={() => viewBill(rowData)}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => editBill(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteBill(rowData)}
        />
      </>
    );
  };

  return (
    <>
      <Card header={header}>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={() => displayModel()}
        />
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel header="Previous Bills">
            <div className="card">
              <DataTable
                value={savedBills}
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
                selectionMode="single"
                dataKey="id"
                className="p-datatable-gridlines p-datatable-sm"
              >
                <Column
                  field="id"
                  header="Id"
                  sortable
                  body={(_: any, prop: any) => prop.rowIndex + 1}
                ></Column>
                <Column
                  field="billNo"
                  header="Bill No"
                  data-testid="test"
                  key="test3"
                  filter
                  filterPlaceholder="Search by bill no"
                ></Column>
                <Column
                  field="invoiceDate"
                  header="Date"
                  body={dateBodyTemplate}
                  filter
                  filterPlaceholder="Search by date"
                ></Column>
                <Column
                  field="customer.name"
                  header="Customer"
                  filter
                  filterPlaceholder="Search by customer no"
                ></Column>
                <Column
                  field="billDetail.amountPayable"
                  header="Amount Payable"
                ></Column>
                <Column field="billDetail.paid" header="Paid"></Column>
                <Column field="billDetail.due" header="Due"></Column>
                <Column body={actionBodyTemplate}></Column>
              </DataTable>
            </div>
          </TabPanel>
          <TabPanel header="Draft">Draft</TabPanel>
        </TabView>
      </Card>

      <AddNewBill
        bill={bill}
        setBill={setBill}
        displayDialog={displayDialog}
        setDisplayDialog={setDisplayDialog}
      />
      <Dialog
        visible={displayViewDialog}
        onHide={() => setDisplayViewDialog(false)}
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
        <ViewBill bill={bill} />
      </Dialog>
    </>
  );
};

export default Bills;
