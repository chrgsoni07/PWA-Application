import { CustomerType } from "component/Customers/types";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { TabPanel, TabView } from "primereact/tabview";
import { useEffect, useState } from "react";
import { BillsMeta } from "./BillsMeta";
import { BillTotals } from "./BillTotals";
import Customer from "./Customer";
import { NewItems } from "./NewItems";
import { OldItems } from "./OldItems";
import { Bill, BillDetails, NewItem, OldItem } from "./types";

export function AddNewBill({ displayDialog, setDisplayDialog }: any) {
  const [newItems, setNewItems] = useState<NewItem[]>([]);
  const [oldItems, setOldItems] = useState<OldItem[]>([]);
  const [invoiceDate, setInvoiceDate] = useState<Date | Date[]>(new Date());

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
  const [bill, setBill] = useState<Bill>({
    billNo: 101,
    invoiceDate: "",
    customer: selectedCustomer,
    newItems: [],
    oldItems: [],
    billDetail: billDetails,
  });

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

  const onHide = () => {
    setDisplayDialog(false);
  };

  const onRowEditInit = () => {};

  const onRowEditCancel = () => {};

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
    console.log(newBill); //  saveBillToFirestore(newBill);
  };

  const footer = (
    <span
      style={{
        display: "table",
        margin: "0 auto",
      }}
    >
      <Button
        label="Save"
        icon="pi pi-save"
        style={{
          marginRight: ".25em",
        }}
        onClick={onSave}
      />
      <Button label="Draft" icon="pi pi-check" className="p-button-secondary" />
    </span>
  );
  return (
    <Dialog
      visible={displayDialog}
      onHide={onHide}
      header="New Bill"
      footer={footer}
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
      <div className="p-grid">
        <Customer
          selectedCustomer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
        />

        <BillsMeta invoiceDate={invoiceDate} setInvoiceDate={setInvoiceDate} />
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
  );
}
