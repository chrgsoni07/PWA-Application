import { NewItems } from "./NewItems";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { TabView, TabPanel } from "primereact/tabview";
import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { db, save } from "api";
import { CustomerType } from "component/Customers/types";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar";
import { Toolbar } from "primereact/toolbar";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import Customer from "./Customer";
import { amountBodyTemplate, formatCurrency } from "utils/currency.utils";
import "./DataTableDemo.css";
import { Bill, BillDetails, NewItem, OldItem } from "./types";
import { itemType } from "./commonData";

const Bills = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [invoiceDate, setInvoiceDate] = useState<Date | Date[]>(new Date());
  const [advanceAmount, setAdvanceAmount] = useState();
  const [previousAmount, setPreviousAmount] = useState();
  const [newItems, setNewItems] = useState<NewItem[]>([]);
  const [oldItems, setOldItems] = useState<OldItem[]>([]);
  const [editingRows, setEditingRows] = useState({});
  const [savedBills, setSavedBills] = useState<String[]>([]);
  const [billDetails, setBillDetails] = useState<BillDetails>({
    newTotal: 0,
    oldTotal: 0,
    oldNewDifference: 0,
    discount: 0,
    paid: 0,
    due: 0,
    amountPayable: 0,
  });

  const [selectedCustomer, setSelectedCustomer] = useState<CustomerType>();

  const [bill, setBill] = useState<Bill>({
    billNo: 101,
    invoiceDate: "",
    customer: selectedCustomer,
    newItems: [],
    oldItems: [],
    billDetail: billDetails,
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

  /*
   useEffect(() => {
     const collection = db.collection("bills");
 
     collection.get().then((querySnapshot) => {
       querySnapshot.forEach((bill) => {
         const billData = bill.data();
         alert(JSON.stringify(billData));
       });
     });
   }, []);
 
  
   useEffect(() => {
     let newItem: NewItem = {
       amount: 76500,
       item: "Chain",
       makingCharges: 200,
       rate: 49000,
       weight: 15,
       otherCharges: 0,
       type: 'gold'
     };
 
     let oldItem: OldItem = {
       amount: 17640,
       item: "old chain",
       rate: 49000,
       grossWeight: 4.5,
       netWeight: 4.5,
       purity: 80,
       type: 'gold'
     };
     newItems.push(newItem);
     oldItems.push(oldItem);
   }, []);
 
   */

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

  let oldItemfooterGroup = (
    <ColumnGroup>
      <Row>
        <Column
          footer="Totals:"
          colSpan={6}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={oldItemsTotalAmount} />
      </Row>
    </ColumnGroup>
  );

  const addBlankRowForOldItem = () => {
    let blankOldItem: OldItem = {
      amount: 0,
      item: "",
      purity: 100,
      rate: 0,
      grossWeight: 0,
      netWeight: 0,
      type: "gold",
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

  const netWeightTemplate = (rowData: any) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 3,
    }).format(rowData.netWeight);
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

  const oldItemTypeEditor = (props: any) => {
    return (
      <Dropdown
        value={props.rowData["type"]}
        options={itemType}
        optionLabel="label"
        optionValue="value"
        onChange={(e) => onEditorValueChangeOld(props, e.value)}
        style={{ width: "100%" }}
        placeholder="Select a item type"
        itemTemplate={(option) => {
          return <span>{option.label}</span>;
        }}
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

  const calculateOldItemAmount = (updatedProd: OldItem) => {
    let amount = 0;
    if (updatedProd.type === "gold") {
      amount =
        updatedProd.grossWeight *
        (updatedProd.purity / 100) *
        (updatedProd.rate / 10);
    }

    if (updatedProd.type === "silver") {
      amount = updatedProd.grossWeight * (updatedProd.rate / 1000);
    }

    return Math.round(amount);
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
          <Customer
            selectedCustomer={selectedCustomer}
            customers={customers}
            setSelectedCustomer={setSelectedCustomer}
          />

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
            <NewItems
              newItems={newItems}
              onRowEditInit={onRowEditInit}
              onRowEditCancel={onRowEditCancel}
              billDetails={billDetails}
              setNewItems={setNewItems}
            />
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
                resizableColumns
                columnResizeMode="expand"
                scrollable
                scrollHeight="150px"
                footerColumnGroup={oldItemfooterGroup}
              >
                <Column
                  field="type"
                  header="TYPE"
                  editor={(props) => oldItemTypeEditor(props)}
                ></Column>
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
          </TabPanel>
        </TabView>
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="totalNew"> Total new </label>
            <InputNumber id="totalNew" value={billDetails.newTotal} />
          </div>

          <div className="p-field p-col">
            <label htmlFor="totalOld">Total old </label>
            <InputNumber id="totalOld" value={billDetails.oldTotal} />
          </div>

          <div className="p-field p-col">
            <label htmlFor="oldNewDifference"> Old New Difference </label>
            <InputNumber
              id="oldNewDifference"
              value={billDetails.oldNewDifference}
            />
          </div>

          <div className="p-field p-col">
            <label htmlFor="discount">Discount</label>
            <InputNumber
              id="discount"
              value={billDetails.discount}
              onChange={(e) => onDiscoutChange(e.value)}
            />
          </div>

          <div className="p-field p-col">
            <label htmlFor="amountPayable"> Amount payable </label>
            <InputNumber id="amountPayable" value={billDetails.amountPayable} />
          </div>

          <div className="p-field p-col">
            <label htmlFor="paid"> Amount paid </label>
            <InputNumber
              id="paid"
              value={billDetails.paid}
              onChange={(e) => onAmountPaidChange(e.value)}
            />
          </div>

          <div className="p-field p-col">
            <label htmlFor="due"> Due </label>
            <InputNumber id="due" value={billDetails.due} />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Bills;
