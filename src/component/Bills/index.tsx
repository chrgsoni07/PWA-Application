import PreviousBills from "./PreviousBills";
import CustomerBills from "./CustomerBills";
import { AddNewBill } from "./AddBill/AddNewBill";
import ViewBill from "./ViewBill";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import React, { useState, useEffect } from "react";
import "./DataTableDemo.css";
import { Bill } from "./types";
import { Column, ColumnBodyType } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { deleteBill, getBills } from "api";
import { Dialog } from "primereact/dialog";
import { useToast } from "toasts";
import { Toolbar } from "primereact/toolbar";
import useToggle from "hooks/useToggle";
import RowActions from "component/common/RowActions";

const Bills = () => {
  const [displayDialog, toggleDisplayDialog] = useToggle(false);
  const [displayViewDialog, setDisplayViewDialog] = useState(false);
  const [savedBills, setSavedBills] = useState<Bill[]>([]);
  const [draftBills, setDraftBills] = useState<Bill[]>([]);
  const [bill, setBill] = useState({} as Bill);
  const { toastSuccess, toastError } = useToast();

  useEffect(() => {
    getBills().then((bills) => setSavedBills(bills));
    let draftBills = JSON.parse(localStorage.getItem("draftBills") || "[]");
    setDraftBills(draftBills);
  }, []);

  const resetDialog = () => {
    toggleDisplayDialog();
    setBill({} as Bill);
  };

  const dateBodyTemplate = (rowData: any) =>
    rowData.invoiceDate.toLocaleDateString("en-IN");

  function viewBill(rowData: any): void {
    setBill({ ...rowData, invoiceDate: dateBodyTemplate(rowData) });
    setDisplayViewDialog(true);
  }

  function deleteSavedBill(rowData: any): void {
    deleteBill(rowData.id)
      .then(() => {
        toastSuccess("bill successfully deleted");
        setSavedBills(savedBills.filter((i) => i.id !== rowData.id));
      })
      .catch((error: Error) => {
        toastError("Error deleting bill" + error.message);
      });
  }

  const editBill = (rowData: any) => {
    setBill({ ...rowData });
    toggleDisplayDialog();
  };

  const deleteDraft = (rowIndex: number) => {
    let localStoredBills: Bill[] = JSON.parse(
      localStorage.getItem("draftBills") || "[]"
    );
    localStoredBills.splice(rowIndex, 1);
    localStorage.setItem("draftBills", JSON.stringify(localStoredBills));
    setDraftBills(localStoredBills);
  };

  return (
    <>
      <Toolbar
        left={
          <Button
            label="New"
            icon="pi pi-plus"
            className="p-button-success p-mr-2"
            onClick={resetDialog}
          />
        }
      />
      <TabView>
        <TabPanel header="Previous Bills">
          <PreviousBills
            savedBills={savedBills}
            dateBodyTemplate={dateBodyTemplate}
            actionBodyTemplate={(rowData: any) => (
              <RowActions
                onView={() => viewBill(rowData)}
                onEdit={() => editBill(rowData)}
                onDelete={() => deleteSavedBill(rowData)}
              />
            )}
          />
        </TabPanel>
        <TabPanel header="Draft">
          <DraftBills
            draftBills={draftBills}
            actionBodyTemplate={(rowData: any, { rowIndex }: any) => (
              <RowActions
                onEdit={() => editBill(rowData)}
                onDelete={() => deleteDraft(rowIndex)}
              />
            )}
          />
        </TabPanel>
        <TabPanel header="Search">
          <CustomerBills
            actionBodyTemplate={(rowData: any) => (
              <RowActions
                onView={() => viewBill(rowData)}
                onEdit={() => editBill(rowData)}
                onDelete={() => deleteSavedBill(rowData)}
              />
            )}
          />
        </TabPanel>
      </TabView>
      <AddNewBill
        bill={bill}
        displayDialog={displayDialog}
        hideDialog={resetDialog}
        setSavedBills={setSavedBills}
        setDraftBills={setDraftBills}
      />
      <Dialog
        visible={displayViewDialog}
        onHide={() => setDisplayViewDialog(false)}
        header="View bill"
        modal
      >
        <ViewBill bill={bill} />
      </Dialog>
    </>
  );
};

export default Bills;

const DraftBills = ({
  draftBills,
  actionBodyTemplate,
}: {
  draftBills: Bill[];
  actionBodyTemplate: ColumnBodyType;
}) => {
  const draftInvoiceDateTemplate = (rowData: any) => {
    var invoiceDate = new Date(rowData.invoiceDate);
    return invoiceDate.toLocaleDateString("en-IN");
  };

  return (
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
      <Column field="billDetail.amountPayable" header="Amount Payable" />
      <Column field="billDetail.paid" header="Paid" />
      <Column field="billDetail.due" header="Due" />
      <Column body={actionBodyTemplate} />
    </DataTable>
  );
};
