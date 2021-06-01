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
import { Bill, BillDetails } from "../types";
import { useToast } from "toasts";
import { editBill } from "api";

import reducer, {
  amountPaidChanged,
  discountChanged,
  updateState,
  updateTotalAmount,
} from "./slice";
import { saveBill } from "api";

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
  const [invoiceDate, setInvoiceDate] = useState<Date>(new Date());
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerType>(
    {} as CustomerType
  );
  const [{ newItems, oldItems, billDetails }, dispatch] = useReducer(reducer, {
    newItems: [],
    oldItems: [],
    billDetails: {} as BillDetails,
  });

  const { toastSuccess, toastError } = useToast();

  const onDiscoutChange = (discount: number) =>
    dispatch(discountChanged(discount));

  const onAmountPaidChange = (paid: number) =>
    dispatch(amountPaidChanged(paid));

  useEffect(() => {
    if (bill) {
      setInvoiceDate(bill.invoiceDate || new Date());
      setSelectedCustomer(bill.customer);
      dispatch(
        updateState({
          newItems: bill.newItems || [],
          oldItems: bill.oldItems || [],
          billDetails: bill.billDetail || {},
        })
      );
    }
  }, [bill]);
  useEffect(() => {
    dispatch(updateTotalAmount());
  }, [newItems, oldItems]);

  const onHide = () => {
    setDisplayDialog(false);
    setBill({} as Bill);
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

    if (bill?.id) {
      editBillToFirestore(newBill);
    } else {
      saveBillToFirestore(newBill);
    }
    setBill(newBill);
    setDisplayDialog(false);
  };

  const saveBillToFirestore = async (newBill: Bill) => {
    try {
      const savedBill: Bill = await saveBill(newBill);
      console.log("saved bill" + savedBill);
      toastSuccess("bill successfully saved");
    } catch (err) {
      toastError("Error saving bill");
    }
  };

  const editBillToFirestore = async (newBill: Bill) => {
    editBill(newBill)
      .then(() => {
        toastSuccess("bill successfully updated");
      })
      .catch(function () {
        toastError("Error updating bill");
      });
  };

  const saveToDraft = () => {
    let priviousBills = JSON.parse(localStorage.getItem("draftBills") || "[]");

    const draftBill = {
      ...bill,
      invoiceDate,
      customer: selectedCustomer,
      newItems,
      oldItems,
      billDetail: billDetails,
    };

    priviousBills.push(draftBill);

    localStorage.setItem("draftBills", JSON.stringify(priviousBills));

    setDisplayDialog(false);
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
      <Button
        label="Draft"
        icon="pi pi-check"
        className="p-button-secondary"
        onClick={saveToDraft}
      />
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
