import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import React, { useState, useEffect } from "react";
import { RateType } from "./types";
import { deleteFromDB, getRates } from "api";
import { useToast } from "toasts";
import RateForm from "./RateForm";
import { updateList } from "utils/state.utils";

const Rates = () => {
  const [rates, setRates] = useState<RateType[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const { toastSuccess } = useToast();
  const [formData, setFormData] = useState<RateType | undefined>(undefined);

  const editSelectedRate = (rowData: any) => {
    setShowDialog(true);
    setFormData(rowData);
  };

  const dateTemplate = (rowData: any) => {
    var date = new Date(rowData.date);
    return date.toLocaleDateString("en-In");
  };

  useEffect(() => {
    getRates().then((response) => setRates(response));
  }, []);

  const actionBodyTemplate = (rowData: any) => (
    <>
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-success p-mr-2"
        onClick={() => editSelectedRate(rowData)}
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-warning"
        onClick={() => confirmDeleteSelected(rowData)}
      />
    </>
  );

  const leftToolbarTemplate = () => (
    <Button
      label="New"
      icon="pi pi-plus"
      className="p-button-success p-mr-2"
      onClick={openNew}
    />
  );

  const confirmDeleteSelected = (rowData: RateType) => {
    deleteFromDB("goldSilverRates", rowData.id)
      .then(() => {
        toastSuccess("rate deleted successfully");
        setRates(rates.filter((i) => i.id !== rowData.id));
      })
      .catch((error: any) => {
        console.error("Error deleting rates", error);
      });
  };

  const openNew = () => {
    setShowDialog(true);
  };

  const hideDialog = () => {
    setShowDialog(false);
    setFormData(undefined);
  };

  const itemDialogFooter = (
    <>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button type="submit" label="Submit" className="p-mt-2" form="rateForm" />
    </>
  );

  return (
    <>
      <Toolbar left={leftToolbarTemplate}></Toolbar>
      <DataTable
        value={rates}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
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
        <Column field="goldRate" header="Gold (10 gram)"></Column>
        <Column field="silverRate" header="Silver (1 kg)"></Column>
        <Column field="date" header="Date" body={dateTemplate}></Column>
        <Column body={actionBodyTemplate}></Column>
      </DataTable>

      <Dialog
        header={"Add new rate"}
        visible={showDialog}
        style={{ width: "450px" }}
        modal
        className="p-fluid"
        footer={itemDialogFooter}
        onHide={hideDialog}
      >
        <RateForm
          formData={formData}
          onAdd={(data: RateType) => {
            toastSuccess("rate successfully updated");
            const newRates = updateList(rates, data);
            setRates(newRates);
          }}
          onEdit={(data: RateType) => {
            toastSuccess("rate successfully saved");
            setRates([...rates, data]);
          }}
          hideDialog={hideDialog}
        />
      </Dialog>
    </>
  );
};
export default Rates;
