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
      amount: 49000,
      item: "Jhumki",
      makingCharges: 200,
      rate: 49000,
      weight: 10,
    };

    let oldItem: OldItem = {
      amount: 42000,
      item: "old chain",
      rate: 40000,
      weight: 4.5,
    };
    newItems.push(newItem);
    oldItems.push(oldItem);
  }, []);

  const header = () => {
    <Button
      label="New"
      icon="pi pi-plus"
      className="p-button-success p-mr-2"
    />;
  };

  const footer = (
    <span style={{ display: "table", margin: "0 auto" }}>
      {/* <Button label="Save" icon="pi pi-save" style={{ marginRight: ".25em" }} />
      <Button label="Draft" icon="pi pi-check" className="p-button-secondary" /> */}
    </span>
  );

  let originalRows = {};

  const onHide = () => {
    setDisplayDialog(false);
  };

  const displayModel = () => {
    setDisplayDialog(true);
  };

  const onRowEditInit = () => {};

  const onRowEditCancel = () => {};

  const priceBodyTemplate = (rowData: any) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(rowData.price);
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

  const makingChargesEditor = (productKey: string, props: any) => {
    return (
      <InputNumber
        value={props.rowData["makingCharges"]}
        onValueChange={(e) => onEditorValueChange(productKey, props, e.value)}
        mode="currency"
        currency="USD"
        locale="en-US"
      />
    );
  };

  const amountEditor = (productKey: string, props: any) => {
    return (
      <InputNumber
        value={props.rowData["amount"]}
        onValueChange={(e) => onEditorValueChange(productKey, props, e.value)}
        mode="currency"
        currency="USD"
        locale="en-US"
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
        <div className="p-formgrid p-grid">
          <div className="p-field p-col-12">
            <label htmlFor="customerSelect">Select customer :</label>
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
              style={{ width: "80%" }}
            />
          </div>
        </div>

        <div className="p-grid">
          <div className="p-col-8">
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

            <div className="p-formgrid  p-grid">
              <div className="p-field p-col-6">
                <label htmlFor="advanceAmount">Advance Amount</label>
                <InputNumber
                  id="advanceAmount"
                  value={advanceAmount}
                  onChange={(e) => setAdvanceAmount(e.value)}
                />
              </div>

              <div className="p-field p-col-6">
                <label htmlFor="priviousAmount">Privious Amount</label>
                <InputNumber
                  id="priviousAmount"
                  value={priviousAmount}
                  onChange={(e) => setPriviousAmount(e.value)}
                />
              </div>
            </div>
          </div>

          <div className="p-col-4">
            <div className="p-formgrid p-grid">
              <div className="p-field p-col">
                <label htmlFor="invoiceNo">Invoice no.: </label>
                <span id="invoiceNo">1</span>
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
          </div>
        </div>

        <TabView>
          <TabPanel header="New Item">
            <div className="card">
              <DataTable
                value={newItems}
                editMode="row"
                dataKey="id"
                onRowEditInit={onRowEditInit}
                onRowEditCancel={onRowEditCancel}
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
                  body={priceBodyTemplate}
                  editor={(props) => makingChargesEditor("newItems", props)}
                ></Column>
                <Column
                  field="amount"
                  header="Total Amount"
                  body={priceBodyTemplate}
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
              <DataTable
                value={oldItems}
                editMode="row"
                dataKey="id"
                onRowEditInit={onRowEditInit}
                onRowEditCancel={onRowEditCancel}
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
                  field="rate"
                  header="Rate"
                  editor={(props) => rateEditor("oldItems", props)}
                ></Column>
                <Column
                  field="amount"
                  header="Total Amount"
                  body={priceBodyTemplate}
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
