import { AddNewBill } from "./AddNewBill";
import { BillTotals } from "./BillTotals";
import { BillsMeta } from "./BillsMeta";
import { OldItems } from "./OldItems";
import { NewItems } from "./NewItems";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { TabView, TabPanel } from "primereact/tabview";
import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { db, save } from "api";
import { CustomerType } from "component/Customers/types";
import Customer from "./Customer";
import "./DataTableDemo.css";
import { Bill, BillDetails, NewItem, OldItem } from "./types";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

const Bills = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [displayDialog, setDisplayDialog] = useState(false);

  const [editingRows, setEditingRows] = useState({});
  const [savedBills, setSavedBills] = useState<Bill[]>([]);

  const [selectedSavedBill, setSelectedSavedBill] = useState<Bill>();

  useEffect(() => {
    const collection = db.collection("bills");

    collection.get().then((querySnapshot) => {
      const allBills: Bill[] = [];
      querySnapshot.forEach((bill) => {
        const billData = bill.data();
        allBills.push({
          billNo: billData.billNo,
          invoiceDate: billData.invoiceDate,
          newItems: billData.newItems,
          customer: billData.customer,
          oldItems: billData.oldItems,
          billDetail: billData.billDetail,
        });
      });
      setSavedBills(allBills);
    });
  }, []);

  const saveBillToFirestore = async (newBill: Bill) => {
    const savedBill: Bill = await save("bills", newBill);
    console.log(savedBill);
  };

  const header = () => {
    <Button label="New" icon="pi pi-plus" className="p-button-sm" />;
  };

  let originalRows: any = {};

  const displayModel = () => {
    setDisplayDialog(true);
  };

  const onRowEditChange = (event: any) => {
    setEditingRows(event.data);
  };

  const actionBodyTemplate = (rowData: any) => {
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
          onClick={() => editItem(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteItem(rowData)}
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
                id="test2"
                value={savedBills}
                selection={selectedSavedBill}
                onSelectionChange={(e) => setSelectedSavedBill(e.value)}
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
                ></Column>
                <Column field="invoiceDate" header="Date"></Column>
                <Column field="customer.name" header="Customer"></Column>
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
        displayDialog={displayDialog}
        setDisplayDialog={setDisplayDialog}
      />
    </>
  );
};

export default Bills;
function viewBill(rowData: any): void {
  throw new Error("Function not implemented.");
}

function confirmDeleteItem(rowData: any): void {
  throw new Error("Function not implemented.");
}

function editItem(rowData: any): void {
  throw new Error("Function not implemented.");
}
