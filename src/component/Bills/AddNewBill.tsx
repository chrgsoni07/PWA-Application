import { CustomerType } from "component/Customers/types";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { TabPanel, TabView } from "primereact/tabview";
import { FC, useEffect, useState } from "react";
import { sum } from "utils/number.utils";
import { BillsMeta } from "./BillsMeta";
import { BillTotals } from "./BillTotals";
import { defaultBill } from "./commonData";
import Customer from "./Customer";
import { NewItems } from "./NewItems";
import { OldItems } from "./OldItems";
import { Bill, BillDetails, NewItem, OldItem } from "./types";

type AddNewBillProps = {
  displayDialog: boolean;
  bill: Bill;
  setDisplayDialog: (flag: boolean) => void;
  setBill: (bill: Bill) => void;
};
export const AddNewBill: FC<AddNewBillProps> = ({
  displayDialog,
  setDisplayDialog,
  bill,
  setBill,
}) => {
  const [newItems, setNewItems] = useState<NewItem[]>([]);
  const [oldItems, setOldItems] = useState<OldItem[]>([]);
  const [invoiceDate, setInvoiceDate] = useState<Date>(new Date());

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
    setNewItems(bill.newItems);
    setOldItems(bill.oldItems);
    bill.billDetail && setBillDetails(bill.billDetail);
    setInvoiceDate(bill.invoiceDate);
  }, [bill]);

  useEffect(() => {
    const newTotal = sum(newItems);
    const oldTotal = sum(oldItems);
    const oldNewDifference = newTotal - oldTotal;

    setBillDetails({
      ...billDetails,
      oldTotal,
      newTotal,
      oldNewDifference,
      amountPayable: oldNewDifference > 0 ? oldNewDifference : 0,
    });
  }, [newItems, oldItems]);

  const onHide = () => {
    setDisplayDialog(false);
    setBill(defaultBill());
  };

  const onRowEditInit = () => {};

  const onRowEditCancel = () => {};

  const onSave = () => {
    const newBill = {
      ...bill,
      invoiceDate,
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
};
