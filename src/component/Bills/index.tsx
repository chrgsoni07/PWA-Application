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
import { BillDetails } from "./BillDetails";
import { Toolbar } from "primereact/toolbar";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import "./DataTableDemo.css";
import { log } from "node:console";

const Bills = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [invoiceDate, setInvoiceDate] = useState<Date | Date[] | undefined>(
    undefined
  );
  const [advanceAmount, setAdvanceAmount] = useState();
  const [previousAmount, setPreviousAmount] = useState();
  const [newItems, setNewItems] = useState<NewItem[]>([]);
  const [oldItems, setOldItems] = useState<OldItem[]>([]);
  const [editingRows, setEditingRows] = useState({});

  const [billDetails, setBillDetails] = useState<BillDetails>({
    customerId: 0,
    newTotal: 0,
    oldTotal: 0,
    oldNewDifference: 0,
    discount: 0,
    paid: 0,
    due: 0,
    amountPayable: 0,
  });

  const [selectedCustomer, setSelectedCustomer] = useState<CustomerType>({
    id: "",
    mobile: "",
    place: "",
    address: "",
    name: "",
  });

  const [customers, setCustomers] = useState<CustomerType[]>([]);
  /*
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
  */
  useEffect(() => {
    let newItem: NewItem = {
      amount: 25000,
      item: "Jhumki",
      makingCharges: 200,
      rate: 49000,
      weight: 5,
      otherCharges: 0,
    };

    let oldItem: OldItem = {
      amount: 42000,
      item: "old chain",
      rate: 40000,
      grossWeight: 4.5,
      netWeight: 4.5,
      purity: 100,
    };
    newItems.push(newItem);
    oldItems.push(oldItem);
  }, []);

  const items = [
    { label: "Jhumki", value: "Jhumki" },
    { label: "Latkan", value: "Latkan" },
    { label: "Bali", value: "Bali" },
  ];

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

  useEffect(() => {
    const newTotal = newItems.reduce((acc, item) => acc + item.amount, 0);
    const oldTotal = oldItems.reduce((acc, item) => acc + item.amount, 0);
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

  const newItemsTotalAmount = () => {
    return formatCurrency(billDetails.newTotal);
  };

  const oldItemsTotalAmount = () => {
    return formatCurrency(billDetails.oldTotal);
  };

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

  let newItemfooterGroup = (
    <ColumnGroup>
      <Row>
        <Column
          footer="Totals:"
          colSpan={5}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={newItemsTotalAmount} />
      </Row>
    </ColumnGroup>
  );

  let oldItemfooterGroup = (
    <ColumnGroup>
      <Row>
        <Column
          footer="Totals:"
          colSpan={5}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={oldItemsTotalAmount} />
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
      otherCharges: 0,
    };

    setNewItems([...newItems, blankNewItem]);
  };

  const addBlankRowForOldItem = () => {
    let blankOldItem: OldItem = {
      amount: 0,
      item: "",
      purity: 100,
      rate: 0,
      grossWeight: 0,
      netWeight: 0,
    };

    setOldItems([...oldItems, blankOldItem]);
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

  const amountBodyTemplate = (rowData: any) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(rowData.amount);
  };

  const netWeightTemplate = (rowData: any) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 3,
    }).format(rowData.netWeight);
  };

  const makingChargesTemplate = (rowData: any) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(rowData.makingCharges);
  };

  const otherChargesTemplate = (rowData: any) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(rowData.otherCharges);
  };

  const inputTextEditorNew = (props: any, field: string) => {
    return (
      <InputText
        type="text"
        value={props.rowData[field]}
        onChange={(e) => onEditorValueChangeNew(props, e.currentTarget.value)}
      />
    );
  };

  const newItemNameEditor = (props: any) => {
    return (
      <Dropdown
        value={props.rowData["item"]}
        options={items}
        optionLabel="label"
        optionValue="value"
        onChange={(e) => onEditorValueChangeNew(props, e.value)}
        style={{ width: "100%" }}
        placeholder="Select a item"
        itemTemplate={(option) => {
          return <span>{option.label}</span>;
        }}
      />
    );
  };

  const newRateEditor = (props: any) => {
    return inputTextEditorNew(props, "rate");
  };

  const newWeightEditor = (props: any) => {
    return inputTextEditorNew(props, "weight");
  };

  const newMakingChargesEditor = (props: any) => {
    return (
      <InputNumber
        value={props.rowData["makingCharges"]}
        onValueChange={(e) => onEditorValueChangeNew(props, e.value)}
        mode="currency"
        currency="INR"
        locale="en-IN"
        minFractionDigits={0}
      />
    );
  };

  const newOtherChargesEditor = (props: any) => {
    return (
      <InputNumber
        value={props.rowData["otherCharges"]}
        onValueChange={(e) => onEditorValueChangeNew(props, e.value)}
        mode="currency"
        currency="INR"
        locale="en-IN"
        minFractionDigits={0}
      />
    );
  };

  const onEditorValueChangeOld = (props: any, value: string) => {
    let updatedProducts = [...props.value];
    updatedProducts[props.rowIndex][props.field] = value;
    setOldItems(updatedProducts);
    updateOldAmount(props);
    updateNetWeight(props);
  };

  const inputTextEditorOld = (props: any, field: string) => {
    return (
      <InputText
        type="text"
        value={props.rowData[field]}
        onChange={(e) => onEditorValueChangeOld(props, e.currentTarget.value)}
      />
    );
  };

  const oldGrossWeightEditor = (props: any) => {
    return inputTextEditorOld(props, "grossWeight");
  };

  const oldPurityEditor = (props: any) => {
    return (
      <InputNumber
        value={props.rowData["purity"]}
        onValueChange={(e) => onEditorValueChangeOld(props, e.value)}
        suffix="%"
      />
    );
  };

  const oldItemEditor = (props: any) => {
    return inputTextEditorOld(props, "item");
  };

  const oldRateEditor = (props: any) => {
    return inputTextEditorOld(props, "rate");
  };

  {
    /* 
  const amountEditor = (props: any) => {
    return (
      <InputNumber
        value={props.rowData["amount"]}
        onValueChange={(e) => onEditorValueChange( props, e.value)}
        mode="currency"
        currency="INR"
        locale="en-IN"
        minFractionDigits={0}
      />
    );
  };

  */
  }

  const updateNewAmount = (props: any) => {
    let amount = calculateNewItemAmount(props.rowData);
    let updatedProducts = [...props.value];
    updatedProducts[props.rowIndex]["amount"] = amount;
    setNewItems(updatedProducts);
  };

  const updateOldAmount = (props: any) => {
    let amount = calculateOldItemAmount(props.rowData);
    let updatedProducts = [...props.value];
    updatedProducts[props.rowIndex]["amount"] = amount;
    setOldItems(updatedProducts);
  };

  const updateNetWeight = (props: any) => {
    let updatedOldItem: OldItem = props.rowData;
    let updatedNetWeight =
      (updatedOldItem.grossWeight * updatedOldItem.purity) / 100;
    let updatedProducts = [...props.value];
    updatedProducts[props.rowIndex]["netWeight"] = updatedNetWeight;
    setOldItems(updatedProducts);
  };

  const onEditorValueChangeNew = (props: any, value: string) => {
    let updatedProducts = [...props.value];
    updatedProducts[props.rowIndex][props.field] = value;
    setNewItems(updatedProducts);
    updateNewAmount(props);
  };

  const calculateNewItemAmount = (updatedProd: NewItem) => {
    let amount =
      updatedProd.weight * (updatedProd.rate / 10) +
      updatedProd.weight * updatedProd.makingCharges +
      updatedProd.otherCharges;

    return amount;
  };

  const calculateOldItemAmount = (updatedProd: OldItem) => {
    let amount =
      updatedProd.grossWeight *
      (updatedProd.purity / 100) *
      (updatedProd.rate / 10);
    return amount;
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
        modal
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        style={{ width: "50vw" }}
        maximized={true}
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
                <label htmlFor="previousAmount">Privious Amount</label>
                <InputNumber
                  id="previousAmount"
                  value={previousAmount}
                  onChange={(e) => setPreviousAmount(e.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <TabView>
          <TabPanel header="New Item">
            <div className="datatable-responsive-demo">
              <div className="card">
                <Toolbar left={toolBarNewItem}></Toolbar>
                <DataTable
                  value={newItems}
                  editMode="row"
                  dataKey="id"
                  onRowEditInit={onRowEditInit}
                  onRowEditCancel={onRowEditCancel}
                  scrollable
                  scrollHeight="150px"
                  footerColumnGroup={newItemfooterGroup}
                  className="p-datatable-responsive-demo"
                >
                  <Column
                    field="item"
                    header="ITEM"
                    editor={(props) => newItemNameEditor(props)}
                  ></Column>
                  <Column
                    field="weight"
                    header="WEIGHT(gram)"
                    editor={(props) => newWeightEditor(props)}
                  ></Column>
                  <Column
                    field="rate"
                    header="RATE"
                    editor={(props) => newRateEditor(props)}
                  ></Column>
                  <Column
                    field="makingCharges"
                    header="MAKING CHARGES(per gram)"
                    body={makingChargesTemplate}
                    editor={(props) => newMakingChargesEditor(props)}
                  ></Column>
                  <Column
                    field="otherCharges"
                    header="OTHER CHARGES"
                    body={otherChargesTemplate}
                    editor={(props) => newOtherChargesEditor(props)}
                  ></Column>
                  <Column
                    field="amount"
                    header="AMOUNT"
                    body={amountBodyTemplate}
                  ></Column>
                  <Column
                    rowEditor
                    headerStyle={{ width: "7rem" }}
                    bodyStyle={{ textAlign: "center" }}
                  ></Column>
                </DataTable>
              </div>
            </div>
          </TabPanel>

          <TabPanel header="Old Item">
            <div className="datatable-responsive-demo">
              <div className="card">
                <Toolbar left={toolBarOldItem}></Toolbar>
                <DataTable
                  value={oldItems}
                  editMode="row"
                  dataKey="id"
                  onRowEditInit={onRowEditInit}
                  onRowEditCancel={onRowEditCancel}
                  className="p-datatable-responsive-demo"
                  scrollable
                  scrollHeight="150px"
                  footerColumnGroup={oldItemfooterGroup}
                >
                  <Column
                    field="item"
                    header="ITEM"
                    editor={(props) => oldItemEditor(props)}
                  ></Column>
                  <Column
                    field="grossWeight"
                    header="GR.WT.(gram)"
                    editor={(props) => oldGrossWeightEditor(props)}
                  ></Column>
                  <Column
                    field="purity"
                    header="PURITY(%)"
                    editor={(props) => oldPurityEditor(props)}
                  ></Column>
                  <Column
                    field="netWeight"
                    header="NET.WT.(gram)"
                    body={netWeightTemplate}
                  ></Column>
                  <Column
                    field="rate"
                    header="RATE"
                    editor={(props) => oldRateEditor(props)}
                  ></Column>
                  <Column
                    field="amount"
                    header="AMOUNT"
                    body={amountBodyTemplate}
                  ></Column>
                  <Column
                    rowEditor
                    headerStyle={{ width: "7rem" }}
                    bodyStyle={{ textAlign: "center" }}
                  ></Column>
                </DataTable>
              </div>
            </div>
          </TabPanel>
        </TabView>
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-2">
            <label htmlFor="totalNew"> Total new </label>
            <InputNumber id="totalNew" value={billDetails.newTotal} />
          </div>

          <div className="p-field p-col-12 p-md-2">
            <label htmlFor="totalOld">Total old </label>
            <InputNumber id="totalOld" value={billDetails.oldTotal} />
          </div>

          <div className="p-field p-col-12 p-md-2">
            <label htmlFor="oldNewDifference"> Old New Difference </label>
            <InputNumber
              id="oldNewDifference"
              value={billDetails.oldNewDifference}
            />
          </div>

          <div className="p-field p-col-12 p-md-2">
            <label htmlFor="discount">Discount</label>
            <InputNumber
              id="discount"
              value={billDetails.discount}
              onChange={(e) => onDiscoutChange(e.value)}
            />
          </div>

          <div className="p-field p-col-12 p-md-2">
            <label htmlFor="amountPayable"> Amount payable </label>
            <InputNumber id="amountPayable" value={billDetails.amountPayable} />
          </div>

          <div className="p-field p-col-12 p-md-2">
            <label htmlFor="paid"> Amount paid </label>
            <InputNumber
              id="paid"
              value={billDetails.paid}
              onChange={(e) => onAmountPaidChange(e.value)}
            />
          </div>

          <div className="p-field p-col-12 p-md-2">
            <label htmlFor="due"> Due </label>
            <InputNumber id="due" value={billDetails.due} />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Bills;
