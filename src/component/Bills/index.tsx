import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { TabView, TabPanel } from "primereact/tabview";
import React, { useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { db } from "api";
import { CustomerType } from "component/Customers/types";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar";
import { NewItem } from "./NetItem";
import { OldItem } from "./OldItem";
import { Toolbar } from "primereact/toolbar";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";

const Bills = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [invoiceDate, setInvoiceDate] = useState<Date | Date[] | undefined>(
    undefined
  );
  const [advanceAmount, setAdvanceAmount] = useState();
  const [priviousAmount, setPriviousAmount] = useState();
  const [newItems, setNewItems] = useState<NewItem[]>([]);
  const [oldItems, setOldItems] = useState<OldItem[]>([]);

  const [selectedCustomer, setSelectedCustomer] = useState<CustomerType>({
    id: "",
    mobile: "",
    place: "",
    address: "",
    name: "",
  });

  const [customers, setCustomers] = useState<CustomerType[]>([]);

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
    let newItem: NewItem = {
      amount: 25000,
      item: "Jhumki",
      makingCharges: 200,
      rate: 49000,
      weight: 5,
    };

    let oldItem: OldItem = {
      amount: 42000,
      item: "old chain",
      rate: 40000,
      weight: 4.5,
      percentage: 100,
    };
    newItems.push(newItem);
    oldItems.push(oldItem);
  }, []);

  const header = () => {
    <Button label="New" icon="pi pi-plus" className="p-button-sm" />;
  };

  const footer = (
    <span style={{ display: "table", margin: "0 auto" }}>
      <Button label="Save" icon="pi pi-save" style={{ marginRight: ".25em" }} />
      <Button label="Draft" icon="pi pi-check" className="p-button-secondary" />
    </span>
  );

  const toolBarNewItem = () => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-plus"
          className="p-button-rounded"
          onClick={addBlankRowForNewItem}
        />
        <Button
          icon="pi pi-times"
          className="p-button-rounded p-button-danger"
        />
      </React.Fragment>
    );
  };

  const toolBarOldItem = () => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-plus"
          className="p-button-rounded"
          onClick={addBlankRowForOldItem}
        />
        <Button
          icon="pi pi-times"
          className="p-button-rounded p-button-danger"
        />
      </React.Fragment>
    );
  };

  const formatCurrency = (value: any) => {
    return value.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  const newTotalAmount = () => {
    let total = 0;
    for (let newItem of newItems) {
      total += newItem.amount;
    }
    return formatCurrency(total);
  };

  let newItemfooterGroup = (
    <ColumnGroup>
      <Row>
        <Column
          footer="Totals:"
          colSpan={4}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={newTotalAmount} />
      </Row>
    </ColumnGroup>
  );

  const OldItemAmount = () => {
    let total = 0;
    for (let oldItem of oldItems) {
      total += oldItem.amount;
    }
    return formatCurrency(total);
  };

  let oldItemfooterGroup = (
    <ColumnGroup>
      <Row>
        <Column
          footer="Totals:"
          colSpan={4}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={OldItemAmount} />
      </Row>
    </ColumnGroup>
  );

  const addBlankRowForNewItem = () => {
    let blankNewItem: NewItem = {
      amount: 0,
      item: "",
      makingCharges: 0,
      rate: 0,
      weight: 0,
    };

    setNewItems([...newItems, blankNewItem]);
  };

  const addBlankRowForOldItem = () => {
    let blankOldItem: OldItem = {
      amount: 0,
      item: "",
      percentage: 100,
      rate: 0,
      weight: 0,
    };

    setOldItems([...oldItems, blankOldItem]);
  };

  let originalRows = {};

  const onHide = () => {
    setDisplayDialog(false);
  };

  const displayModel = () => {
    setDisplayDialog(true);
  };

  const onRowEditInit = () => {};

  const onRowEditCancel = () => {};

  const amountBodyTemplate = (rowData: any) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(rowData.amount);
  };

  const makingChargesTemplate = (rowData: any) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(rowData.makingCharges);
  };

  const inputTextEditor = (productKey: string, props: any, field: string) => {
    return (
      <InputText
        type="text"
        value={props.rowData[field]}
        onChange={(e) =>
          onEditorValueChange(productKey, props, e.currentTarget.value)
        }
      />
    );
  };

  const itemEditor = (productKey: string, props: any) => {
    return inputTextEditor(productKey, props, "item");
  };

  const rateEditor = (productKey: string, props: any) => {
    return inputTextEditor(productKey, props, "rate");
  };

  const weightEditor = (productKey: string, props: any) => {
    return inputTextEditor(productKey, props, "weight");
  };

  const percentEditor = (productKey: string, props: any) => {
    return (
      <InputNumber
        value={props.rowData["percentage"]}
        onValueChange={(e) => onEditorValueChange(productKey, props, e.value)}
        suffix="%"
      />
    );
  };

  const makingChargesEditor = (productKey: string, props: any) => {
    return (
      <InputNumber
        value={props.rowData["makingCharges"]}
        onValueChange={(e) => onEditorValueChange(productKey, props, e.value)}
        mode="currency"
        currency="INR"
        locale="en-IN"
        minFractionDigits={0}
      />
    );
  };

  const amountEditor = (productKey: string, props: any) => {
    return (
      <InputNumber
        value={props.rowData["amount"]}
        onValueChange={(e) => onEditorValueChange(productKey, props, e.value)}
        mode="currency"
        currency="INR"
        locale="en-IN"
        minFractionDigits={0}
      />
    );
  };

  const onEditorValueChange = (
    productKey: string,
    props: any,
    value: string
  ) => {
    let updatedProducts = [...props.value];
    updatedProducts[props.rowIndex][props.field] = value;
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
          <TabPanel header="Privious Bills">Customer detail</TabPanel>
          <TabPanel header="Draft">Draft</TabPanel>
        </TabView>
      </Card>

      <Dialog
        visible={displayDialog}
        onHide={onHide}
        header="New Bill"
        footer={footer}
        maximizable
        modal
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        style={{ width: "50vw" }}
      >
        <div className="p-grid">
          <div className="p-col-8">
            {/* drop down */}
            <div className="p-formgrid p-grid">
              <div className="p-field p-col-12">
                <label htmlFor="customerSelect">Select customer</label>
                <Dropdown
                  id="customerSelect"
                  value={selectedCustomer}
                  options={customers}
                  onChange={(e) => setSelectedCustomer(e.value || {})}
                  optionLabel="name"
                  filter
                  showClear
                  filterBy="name"
                  placeholder="Select a customer"
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div className="p-formgrid p-grid">
              <div className="p-field p-col-4">
                <label htmlFor="name">Name: </label>
                <span id="name">{selectedCustomer.name}</span>
              </div>

              <div className="p-field p-col-4">
                <label htmlFor="mobile">Mobile: </label>
                <span id="mobile">{selectedCustomer.mobile}</span>
              </div>

              <div className="p-field p-col-4">
                <label htmlFor="place">Place: </label>
                <span id="place">{selectedCustomer.place}</span>
              </div>
            </div>

            <div className="p-formgrid  p-grid">
              <div className="p-field p-col-12">
                <label htmlFor="address">Address: </label>
                <span id="name">{selectedCustomer.address}</span>
              </div>
            </div>
          </div>

          <div className="p-col-4">
            <div className="p-formgrid p-grid">
              <div className="p-field p-col">
                <label htmlFor="invoiceNo">Invoice no</label>
                <InputText value={101} />
              </div>

              <div className="p-field p-col">
                <label htmlFor="invoiceDate">Invoice Date</label>
                <Calendar
                  id="invoiceDate"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.value)}
                  showIcon
                />
              </div>
            </div>

            <div className="p-formgrid  p-grid">
              <div className="p-field p-col">
                <label htmlFor="advanceAmount">Advance Amount</label>
                <InputNumber
                  id="advanceAmount"
                  value={advanceAmount}
                  onChange={(e) => setAdvanceAmount(e.value)}
                />
              </div>

              <div className="p-field p-col">
                <label htmlFor="priviousAmount">Privious Amount</label>
                <InputNumber
                  id="priviousAmount"
                  value={priviousAmount}
                  onChange={(e) => setPriviousAmount(e.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <TabView>
          <TabPanel header="New Item">
            <div className="card">
              <Toolbar left={toolBarNewItem}></Toolbar>
              <DataTable
                value={newItems}
                editMode="row"
                dataKey="id"
                onRowEditInit={onRowEditInit}
                onRowEditCancel={onRowEditCancel}
                className="p-datatable-sm"
                scrollable
                scrollHeight="150px"
                footerColumnGroup={newItemfooterGroup}
              >
                <Column
                  field="item"
                  header="Item"
                  editor={(props) => itemEditor("newItems", props)}
                ></Column>
                <Column
                  field="weight"
                  header="Weight"
                  editor={(props) => weightEditor("newItems", props)}
                ></Column>
                <Column
                  field="rate"
                  header="Rate"
                  editor={(props) => rateEditor("newItems", props)}
                ></Column>
                <Column
                  field="makingCharges"
                  header="Making Charges (per gram)"
                  body={makingChargesTemplate}
                  editor={(props) => makingChargesEditor("newItems", props)}
                ></Column>
                <Column
                  field="amount"
                  header="Total Amount"
                  body={amountBodyTemplate}
                  editor={(props) => amountEditor("newItems", props)}
                ></Column>
                <Column
                  rowEditor
                  headerStyle={{ width: "7rem" }}
                  bodyStyle={{ textAlign: "center" }}
                ></Column>
              </DataTable>
            </div>
          </TabPanel>

          <TabPanel header="Old Item">
            <div className="card">
              <Toolbar left={toolBarOldItem}></Toolbar>
              <DataTable
                value={oldItems}
                editMode="row"
                dataKey="id"
                onRowEditInit={onRowEditInit}
                onRowEditCancel={onRowEditCancel}
                className="p-datatable-sm"
                scrollable
                scrollHeight="150px"
                footerColumnGroup={oldItemfooterGroup}
              >
                <Column
                  field="item"
                  header="Item"
                  editor={(props) => itemEditor("oldItems", props)}
                ></Column>
                <Column
                  field="weight"
                  header="Weight"
                  editor={(props) => weightEditor("oldItems", props)}
                ></Column>
                <Column
                  field="percentage"
                  header="percentage"
                  editor={(props) => percentEditor("oldItems", props)}
                ></Column>
                <Column
                  field="rate"
                  header="Rate"
                  editor={(props) => rateEditor("oldItems", props)}
                ></Column>
                <Column
                  field="amount"
                  header="Total Amount"
                  body={amountBodyTemplate}
                  editor={(props) => amountEditor("oldItems", props)}
                ></Column>
                <Column
                  rowEditor
                  headerStyle={{ width: "7rem" }}
                  bodyStyle={{ textAlign: "center" }}
                ></Column>
              </DataTable>
            </div>
          </TabPanel>
        </TabView>
      </Dialog>
    </>
  );
};

export default Bills;
