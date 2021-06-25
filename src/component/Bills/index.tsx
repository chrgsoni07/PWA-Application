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
import { deleteBill, getBills, getBillsByCustomerId } from "api";
import { Dialog } from "primereact/dialog";
import { useToast } from "toasts";
import { Calendar, CalendarChangeParams } from "primereact/calendar";
import { CustomerType } from "component/Customers/types";
import { getCustomers } from "api";
import { Dropdown } from "primereact/dropdown";

const Bills = () => {
  const [displayDialog, setDisplayDialog] = useState(false);
  const [displayViewDialog, setDisplayViewDialog] = useState(false);
  const [savedBills, setSavedBills] = useState<Bill[]>([]);
  const [draftBills, setDraftBills] = useState<Bill[]>([]);
  const [bill, setBill] = useState<Bill>({} as Bill);
  const { toastSuccess, toastError } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const dt = useRef<DataTable>(null);
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [billsByCustomerId, setBillsByCustomerId] = useState<Bill[]>([]);

  useEffect(() => {
    getBills().then((bills) => setSavedBills(bills));
    let draftBills = JSON.parse(localStorage.getItem("draftBills") || "[]");
    setDraftBills(draftBills);
  }, []);

  useEffect(() => {
    getCustomers().then((allCustomers) => setCustomers(allCustomers));
  }, []);

  const header = () => {
    <Button label="New" icon="pi pi-plus" className="p-button-sm" />;
  };

  const openNewBillDialog = () => {
    setBill({} as Bill);
    setDisplayDialog(true);
  };

  const hideDialog = () => {
    setDisplayDialog(false);
    setBill({} as Bill);
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

  const onCustomerSelect = (selectedCustomer: CustomerType) => {
    getBillsByCustomerId(selectedCustomer.id).then((allBills) =>
      setBillsByCustomerId(allBills)
    );
  };

  return (
    <>
      <Card header={header}>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={() => openNewBillDialog()}
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
                />
                <Column
                  field="billNo"
                  header="Bill No"
                  data-testid="test"
                  key="test3"
                  filter
                  sortable
                  filterPlaceholder="Search by bill no"
                />
                <Column
                  field="invoiceDate"
                  header="Date"
                  body={dateBodyTemplate}
                  filter
                  filterElement={dateFilter}
                  filterFunction={filterDate}
                />
                <Column
                  field="customer.name"
                  header="Customer"
                  filter
                  sortable
                  filterPlaceholder="Search by customer no"
                />
                <Column
                  field="billDetail.amountPayable"
                  header="Amount Payable"
                />
                <Column field="billDetail.paid" header="Paid" />
                <Column field="billDetail.due" header="Due" />
                <Column body={actionBodyTemplate} />
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
                />
                <Column
                  field="invoiceDate"
                  header="Date"
                  body={draftInvoiceDateTemplate}
                />
                <Column field="customer.name" header="Customer" />
                <Column
                  field="billDetail.amountPayable"
                  header="Amount Payable"
                />
                <Column field="billDetail.paid" header="Paid" />
                <Column field="billDetail.due" header="Due" />
                <Column body={actionBodyTemplateDraft} />
              </DataTable>
            </div>
          </TabPanel>
          <TabPanel header="Search">
            <div className="p-formgrid p-grid">
              <div className="p-field p-col-12">
                <label htmlFor="customerSelect">Select customer</label>
                <Dropdown
                  disabled={!customers.length}
                  ariaLabel="Select customer"
                  inputId="customerSelect"
                  options={customers}
                  onChange={(e) => onCustomerSelect(e.value || {})}
                  optionLabel="name"
                  filter
                  showClear
                  filterBy="name"
                  placeholder="Select a customer"
                  style={{
                    width: "100%",
                  }}
                />
              </div>
            </div>

            <div className="card">
              <DataTable
                ref={dt}
                value={billsByCustomerId}
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
                />
                <Column
                  field="billNo"
                  header="Bill No"
                  data-testid="test"
                  key="test3"
                  filter
                  sortable
                  filterPlaceholder="Search by bill no"
                />

                <Column
                  field="customer.name"
                  header="Customer"
                  filter
                  sortable
                  filterPlaceholder="Search by customer no"
                />
                <Column
                  field="billDetail.amountPayable"
                  header="Amount Payable"
                />
                <Column field="billDetail.paid" header="Paid" />
                <Column field="billDetail.due" header="Due" />
                <Column body={actionBodyTemplate} />
              </DataTable>
            </div>
          </TabPanel>
        </TabView>
      </Card>

      <AddNewBill
        bill={bill}
        displayDialog={displayDialog}
        hideDialog={hideDialog}
        setSavedBills={setSavedBills}
        setDraftBills={setDraftBills}
      />
      <Dialog
        visible={displayViewDialog}
        onHide={() => setDisplayViewDialog(false)}
        header="View bill"
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
