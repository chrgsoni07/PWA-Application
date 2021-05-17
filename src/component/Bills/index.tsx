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
  const [invoiceDate, setInvoiceDate] = useState<Date | Date[]>(new Date());
  const [advanceAmount, setAdvanceAmount] = useState();
  const [previousAmount, setPreviousAmount] = useState();
  const [newItems, setNewItems] = useState<NewItem[]>([]);
  const [oldItems, setOldItems] = useState<OldItem[]>([]);
  const [editingRows, setEditingRows] = useState({});
  const [savedBills, setSavedBills] = useState<Bill[]>([]);
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerType>();

  const [billDetails, setBillDetails] = useState<BillDetails>({
    newTotal: 0,
    oldTotal: 0,
    oldNewDifference: 0,
    discount: 0,
    paid: 0,
    due: 0,
    amountPayable: 0,
  });

  const [selectedSavedBill, setSelectedSavedBill] = useState<Bill>();

  const [bill, setBill] = useState<Bill>({
    billNo: 101,
    invoiceDate: "",
    customer: selectedCustomer,
    newItems: [],
    oldItems: [],
    billDetail: billDetails,
  });

  useEffect(() => {
    const collection = db.collection("customers");

    collection.get().then((querySnapshot) => {
      const allCustomers: CustomerType[] = [];
      querySnapshot.forEach((customer) => {
        console.log(customer.id);
        const customerData = customer.data();
        console.log(JSON.stringify(customerData));
        allCustomers.push({
          name: customerData.name,
          mobile: customerData.mobile,
          place: customerData.place,
          address: customerData.address,
          id: customer.id,
        });
      });
      setCustomers(allCustomers);
    });
  }, []);

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

  const onSave = () => {
    const newBill = {
      ...bill,
      invoiceDate: invoiceDate.toLocaleString(),
      customer: selectedCustomer,
      newItems,
      oldItems,
      billDetail: billDetails,
    };
    console.log("newItems", newItems);
    console.log("updated bill", newBill);
    setBill(newBill);

    console.log(newBill);
    //  saveBillToFirestore(newBill);
  };

  const saveBillToFirestore = async (newBill: Bill) => {
    const savedBill: Bill = await save("bills", newBill);
    console.log(savedBill);
  };

  const header = () => {
    <Button label="New" icon="pi pi-plus" className="p-button-sm" />;
  };

  const footer = (
    <span style={{ display: "table", margin: "0 auto" }}>
      <Button
        label="Save"
        icon="pi pi-save"
        style={{ marginRight: ".25em" }}
        onClick={onSave}
      />
      <Button label="Draft" icon="pi pi-check" className="p-button-secondary" />
    </span>
  );

  useEffect(() => {
    const newTotal = Math.round(
      newItems.reduce((acc, item) => acc + item.amount, 0)
    );
    const oldTotal = Math.round(
      oldItems.reduce((acc, item) => acc + item.amount, 0)
    );
    const oldNewDifference = newTotal - oldTotal;

    if (oldNewDifference > 0) {
      const amountPayable = oldNewDifference;
      setBillDetails({
        ...billDetails,
        oldTotal,
        newTotal,
        oldNewDifference,
        amountPayable,
      });
    } else {
      setBillDetails({ ...billDetails, oldTotal, newTotal, oldNewDifference });
    }
  }, [newItems, oldItems]);

  const onDiscoutChange = (discount: number) => {
    let amountPayable = billDetails.oldNewDifference - discount;

    if (discount) {
      setBillDetails({ ...billDetails, discount, amountPayable });
    }
  };

  const onAmountPaidChange = (paid: number) => {
    let due = billDetails.amountPayable - paid;
    setBillDetails({ ...billDetails, paid, due });
  };

  let originalRows: any = {};

  const onHide = () => {
    setDisplayDialog(false);
  };

  const displayModel = () => {
    setDisplayDialog(true);
  };

  const onRowEditInit = () => {};

  const onRowEditCancel = () => {};

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
                <Column field="billNo" header="Bill No"></Column>
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

      <Dialog
        visible={displayDialog}
        onHide={onHide}
        header="New Bill"
        footer={footer}
        modal
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        style={{ width: "50vw" }}
        maximized={true}
      >
        <div className="p-grid">
          <Customer
            selectedCustomer={selectedCustomer}
            customers={customers}
            setSelectedCustomer={setSelectedCustomer}
          />

          <BillsMeta
            invoiceDate={invoiceDate}
            setInvoiceDate={setInvoiceDate}
            advanceAmount={advanceAmount}
            setAdvanceAmount={setAdvanceAmount}
            previousAmount={previousAmount}
            setPreviousAmount={setPreviousAmount}
          />
        </div>

        <TabView>
          <TabPanel header="New Item">
            <NewItems
              newItems={newItems}
              onRowEditInit={onRowEditInit}
              onRowEditCancel={onRowEditCancel}
              billDetails={billDetails}
              setNewItems={setNewItems}
            />
          </TabPanel>
          <TabPanel header="Old Item">
            <OldItems
              setOldItems={setOldItems}
              oldItems={oldItems}
              onRowEditInit={onRowEditInit}
              onRowEditCancel={onRowEditCancel}
              billDetails={billDetails}
            />
          </TabPanel>
        </TabView>
        <BillTotals
          onDiscoutChange={onDiscoutChange}
          onAmountPaidChange={onAmountPaidChange}
          billDetails={billDetails}
        />
      </Dialog>
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
