import { CustomerType } from "component/Customers/types";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { TabPanel, TabView } from "primereact/tabview";
import { FC, useEffect, useReducer, useState } from "react";

import { BillsMeta } from "./BillsMeta";
import { BillTotals } from "./BillTotals";
import Customer from "./Customer";
import { NewItems } from "./NewItems";
import { OldItems } from "./OldItems";
import { Bill } from "../types";
import reducer, {
  amountPaidChanged,
  discountChanged,
  updateTotalAmount,
} from "./slice";
import { save, getCounterValue, increaseCounterValue } from "api";

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
  const [invoiceDate, setInvoiceDate] = useState<Date>(
    bill.invoiceDate || new Date()
  );
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerType>(
    bill.customer
  );
  const [{ newItems, oldItems, billDetails }, dispatch] = useReducer(reducer, {
    newItems: bill.newItems || [],
    oldItems: bill.oldItems || [],
    billDetails: bill.billDetail || {},
  });

  const onDiscoutChange = (discount: number) =>
    dispatch(discountChanged(discount));

  const onAmountPaidChange = (paid: number) =>
    dispatch(amountPaidChanged(paid));

  useEffect(() => {
    dispatch(updateTotalAmount());
  }, [newItems, oldItems]);

  const onHide = () => {
    setDisplayDialog(false);
    setBill({} as Bill);
  };

  const onShow = async () => {
    const invoiceNumber = await getCounterValue();
  };

  const onSave = () => {
    const newBill = {
      ...bill,
      invoiceDate,
      customer: selectedCustomer,
      newItems,
      oldItems,
      billDetail: billDetails,
    };
    setBill(newBill);
    saveBillToFirestore(newBill);
  };

  const saveBillToFirestore = async (newBill: Bill) => {
    const savedBill: Bill = await save("bills", newBill);
    await increaseCounterValue();
    console.log(savedBill);
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
      onShow={onShow}
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
            billDetails={billDetails}
            dispatch={dispatch}
          />
        </TabPanel>
        <TabPanel header="Old Item">
          <OldItems
            oldItems={oldItems}
            billDetails={billDetails}
            dispatch={dispatch}
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
