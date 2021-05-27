import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useState, useEffect, useRef } from "react";
import { RateType } from "./types";
import { db, getRates, save } from "api";
import { createNextState } from "@reduxjs/toolkit";
import { Toast } from "primereact/toast";

const Rates = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const toast = useRef<Toast>(null);
  const [rates, setRates] = useState<RateType[]>([]);
  const [selectedItem, setSelectedItem] = useState<RateType>({
    id: "",
    silverRate: "",
    goldRate: "",
    date: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const editSelectedRate = (rowData: any) => {
    setShowDialog(true);
    setSelectedItem(rowData);
  };

  useEffect(() => {
    getRates().then((response) => setRates(response));
  }, []);

  const actionBodyTemplate = (rowData: any) => {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={openNew}
        />
      </React.Fragment>
    );
  };

  const confirmDeleteSelected = (rowData: RateType) => {
    db.collection("goldSilverRates")
      .doc(rowData.id)
      .delete()
      .then(() => {
        showSuccessToast("rate deleted successfully");
        setRates(
          createNextState(rates, (draft) =>
            draft.filter((i) => i.id !== rowData.id)
          )
        );
      })
      .catch((error: any) => {
        console.error("Error removing document: ", error);
      });
  };

  const openNew = () => {
    setSelectedItem({
      id: "",
      silverRate: "",
      goldRate: "",
      date: new Date().toLocaleDateString(),
    });
    setSubmitted(false);
    setShowDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setShowDialog(false);
  };

  const saveNewRate = () => {
    if (selectedItem?.id) {
      editRateToFireStore();
    } else {
      saveRateToFireStore();
    }
    setSubmitted(true);
    hideDialog();
  };

  const editRateToFireStore = () => {
    db.collection("goldSilverRates")
      .doc(selectedItem.id)
      .set({
        silverRate: selectedItem.silverRate,
        goldRate: selectedItem.goldRate,
        date: selectedItem.date,
      })
      .then(() => {
        console.log("Document successfully updated!");
        showSuccessToast("rate updated successfully");
        const newRates = createNextState(rates, (draft) =>
          draft.forEach((i) => {
            if (i.id === selectedItem?.id) {
              i.silverRate = selectedItem.silverRate;
              i.goldRate = selectedItem.goldRate;
              i.date = selectedItem.date;
            }
          })
        );
        setRates(newRates);
      })
      .catch(function () {
        console.error("Error writing document: ");
      });
  };

  const showSuccessToast = (message: any) => {
    console.log("running success");
    toast?.current?.show({
      severity: "success",
      summary: "Success Message",
      detail: message,
      life: 3000,
    });
  };

  const saveRateToFireStore = async () => {
    const savedItem: RateType = await save("goldSilverRates", selectedItem);
    showSuccessToast("rate saved successfully");
    setRates([...rates, savedItem]);
  };

  const itemDialogFooter = (
    <>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveNewRate}
      />
    </>
  );

  return (
    <>
      <Card>
        <Toast ref={toast} position="top-left" />
        <div style={{ height: 235 }}>
          <iframe
            title="current rates"
            src="https://www.goldpriceindia.com/wmshare-wlifop-001.php"
            style={{
              position: "relative",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              width: "100%",
              height: "100%",
              border: "none",
              margin: 0,
              padding: 0,
              overflow: "hidden",
            }}
          />
        </div>
        <div className="card">
          <Toolbar left={leftToolbarTemplate}></Toolbar>
          <DataTable
            value={rates}
            selection={selectedProduct}
            onSelectionChange={(e) => setSelectedProduct(e.value)}
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
            <Column field="date" header="Date"></Column>
            <Column body={actionBodyTemplate}></Column>
          </DataTable>
        </div>

        <Dialog
          header={"Add new rate"}
          visible={showDialog}
          style={{ width: "450px" }}
          modal
          className="p-fluid"
          footer={itemDialogFooter}
          onHide={hideDialog}
        >
          <div className="p-field">
            <label htmlFor="silverRate">Silver rate</label>
            <InputText
              id="silverRate"
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
                  silverRate: e.currentTarget.value,
                })
              }
              value={selectedItem?.silverRate}
              required
              autoFocus
              className={
                submitted && !selectedItem?.silverRate ? "p-invalid" : ""
              }
            />
            {submitted && !selectedItem?.silverRate && (
              <small className="p-error">silver rate is required.</small>
            )}
          </div>
          <div className="p-field">
            <label htmlFor="goldRate">Gold rate</label>
            <InputText
              id="goldRate"
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
                  goldRate: e.currentTarget.value,
                })
              }
              value={selectedItem?.goldRate}
              required
              className={
                submitted && !selectedItem?.goldRate ? "p-invalid" : ""
              }
            />
            {submitted && !selectedItem?.goldRate && (
              <small className="p-error">gold rate is required.</small>
            )}
          </div>
        </Dialog>
      </Card>
    </>
  );
};
export default Rates;
