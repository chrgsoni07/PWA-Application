import { AddNewBill } from "./AddBill/AddNewBill";
import ViewBill from "./ViewBill";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { TabView, TabPanel } from "primereact/tabview";
import React, { useState, useEffect, useRef } from "react";
import "./DataTableDemo.css";
import { Bill } from "./types";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { deleteBill, getBills } from "api";
import { Dialog } from "primereact/dialog";
import { useToast } from "toasts";
import { Calendar, CalendarChangeParams } from "primereact/calendar";

const Bills = () => {
  const [displayDialog, setDisplayDialog] = useState(false);
  const [displayViewDialog, setDisplayViewDialog] = useState(false);
  const [savedBills, setSavedBills] = useState<Bill[]>([]);
  const [draftBills, setDraftBills] = useState<Bill[]>([]);
  const [bill, setBill] = useState<Bill>({} as Bill);
  const { toastSuccess, toastError } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const dt = useRef<DataTable>(null);

  useEffect(() => {
    getBills().then((bills) => setSavedBills(bills));
    let draftBills = JSON.parse(localStorage.getItem("draftBills") || "[]");
    setDraftBills(draftBills);
  }, []);

  const header = () => {
    <Button label="New" icon="pi pi-plus" className="p-button-sm" />;
  };

  const displayModel = () => {
    setDisplayDialog(true);
  };

  const dateBodyTemplate = (rowData: any) => {
    var invoiceDate = rowData.invoiceDate;
    return invoiceDate.toLocaleDateString("en-In");
  };

  const draftInvoiceDateTemplate = (rowData: any) => {
    var invoiceDate = new Date(rowData.invoiceDate);
    return invoiceDate.toLocaleDateString("en-In");
  };

  const actionBodyTemplate = (rowData: any) => {
    function viewBill(rowData: any): void {
      setBill({ ...rowData, invoiceDate: dateBodyTemplate(rowData) });
      setDisplayViewDialog(true);
    }

    function editBill(rowData: any): void {
      setBill({ ...rowData, invoiceDate: rowData.invoiceDate });
      setDisplayDialog(true);
    }

    function confirmDeleteBill(rowData: any): void {
      deleteBill(rowData.id)
        .then(() => {
          toastSuccess("bill successfully deleted");
          setSavedBills(savedBills.filter((i) => i.id !== rowData.id));
        })
        .catch((error: Error) => {
          toastError("Error deleting bill" + error.message);
        });
    }

    return (
      <>
        <Button
          aria-label="viewBill"
          icon="pi pi-eye"
          className="p-button-rounded p-button-help p-mr-2"
          onClick={() => viewBill(rowData)}
        />
        <Button
          aria-label="editBill"
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

  const actionBodyTemplateDraft = (rowData: any, { rowIndex }: any) => {
    function editBill(): void {
      setBill({ ...rowData, invoiceDate: rowData.invoiceDate });
      setDisplayDialog(true);
    }

    function confirmDeleteBill(): void {
      let localStoredBills: Bill[] = JSON.parse(
        localStorage.getItem("draftBills") || "[]"
      );
      localStoredBills.splice(rowIndex, 1);
      localStorage.setItem("draftBills", JSON.stringify(localStoredBills));
      setDraftBills(localStoredBills);
    }

    return (
      <>
        <Button
          aria-label="editBill"
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={editBill}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={confirmDeleteBill}
        />
      </>
    );
  };

  const onDateChange = (e: CalendarChangeParams) => {
    dt.current?.filter(e.value, "invoiceDate", "custom");
    setSelectedDate(e.value as any);
  };

  const dateFilter = (
    <Calendar
      value={selectedDate}
      onChange={onDateChange}
      dateFormat="dd/mm/yy"
      className="p-column-filter"
      placeholder="Search by date"
    />
  );
  const filterDate = (value: any, filter: any) => {
    if (
      filter === undefined ||
      filter === null ||
      (typeof filter === "string" && filter.trim() === "")
    ) {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }

    return (
      value.toLocaleDateString("en-In") === filter.toLocaleDateString("en-In")
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
        <TabView>
          <TabPanel header="Previous Bills">
            <div className="card">
              <DataTable
                ref={dt}
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
                  sortable
                  filterPlaceholder="Search by bill no"
                ></Column>
                <Column
                  field="invoiceDate"
                  header="Date"
                  body={dateBodyTemplate}
                  filter
                  filterElement={dateFilter}
                  filterFunction={filterDate}
                ></Column>
                <Column
                  field="customer.name"
                  header="Customer"
                  filter
                  sortable
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
          <TabPanel header="Draft">
            <div className="card">
              <DataTable
                value={draftBills}
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
                  field="invoiceDate"
                  header="Date"
                  body={draftInvoiceDateTemplate}
                ></Column>
                <Column field="customer.name" header="Customer"></Column>
                <Column
                  field="billDetail.amountPayable"
                  header="Amount Payable"
                ></Column>
                <Column field="billDetail.paid" header="Paid"></Column>
                <Column field="billDetail.due" header="Due"></Column>
                <Column body={actionBodyTemplateDraft}></Column>
              </DataTable>
            </div>
          </TabPanel>
        </TabView>
      </Card>

      <AddNewBill
        bill={bill}
        displayDialog={displayDialog}
        setDisplayDialog={setDisplayDialog}
        setSavedBills={setSavedBills}
        setDraftBills={setDraftBills}
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
