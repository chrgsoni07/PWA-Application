import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useState, useEffect } from "react";
import { RateType } from "./types";
import { deleteFromDB, edit, getRates, save } from "api";
import { useToast } from "toasts";
import { updateList } from "utils/state.utils";
import { FormikErrors, useFormik } from "formik";
import { classNames } from "primereact/utils";
import { InputNumber } from "primereact/inputnumber";

const Rates = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rates, setRates] = useState<RateType[]>([]);
  const [selectedItem, setSelectedItem] = useState<RateType>({
    id: "",
    silverRate: "",
    goldRate: "",
    date: "",
  });

  const [showDialog, setShowDialog] = useState(false);

  const { toastSuccess, toastError } = useToast();

  const editSelectedRate = (rowData: any) => {
    setShowDialog(true);
    setSelectedItem(rowData);
  };
  type formType = {
    id: string;
    silverRate: number;
    goldRate: number;
    date: Date;
  };

  const formik = useFormik<formType>({
    initialValues: {
      id: "",
      silverRate: 0,
      goldRate: 0,
      date: new Date(),
    },
    validate: (data) => {
      let errors: FormikErrors<formType> = {};

      if (!data.goldRate) {
        errors.goldRate = "gold rate is required.";
      }

      if (!data.silverRate) {
        errors.silverRate = "silver rate is required.";
      }
      return errors;
    },

    onSubmit: (data) => {
      console.log("formik on submit", data);
      formik.resetForm();
    },
  });

  const isFormFieldValid = (name: keyof formType) => {
    return !!(formik.touched[name] && formik.errors[name]);
  };

  const getFormErrorMessage = (name: keyof formType) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
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
    setSelectedItem({
      id: "",
      silverRate: "",
      goldRate: "",
      date: new Date().toLocaleDateString("en-IN"),
    });
    setShowDialog(true);
  };

  const hideDialog = () => {
    setShowDialog(false);
  };

  const saveNewRate = () => {
    if (selectedItem?.id) {
      editRateToFireStore();
    } else {
      saveRateToFireStore();
    }
    hideDialog();
  };

  const editRateToFireStore = () => {
    edit("goldSilverRates", selectedItem)
      .then(() => {
        toastSuccess("rate successfully updated");
        const newRates = updateList(rates, selectedItem);
        setRates(newRates);
      })
      .catch(() => {
        toastError("Error updating rates");
      });
  };

  const saveRateToFireStore = async () => {
    try {
      const savedItem: RateType = await save("goldSilverRates", selectedItem);
      toastSuccess("rate successfully saved");
      setRates([...rates, savedItem]);
    } catch (err) {
      toastError("Error saving rates");
    }
  };

  const itemDialogFooter = (
    <>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button type="submit" label="Submit" className="p-mt-2" />
    </>
  );

  return (
    <Card>
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
        <form onSubmit={formik.handleSubmit} className="p-fluid">
          <div className="p-field">
            <label htmlFor="goldRate">Gold rate</label>
            <InputNumber
              id="goldRate"
              name="goldRate"
              value={formik.values.goldRate}
              onValueChange={formik.handleChange}
              autoFocus
              className={classNames({
                "p-invalid": isFormFieldValid("goldRate"),
              })}
            />
            {getFormErrorMessage("goldRate")}
          </div>

          <div className="p-field">
            <label htmlFor="silverRate">Silver rate</label>
            <InputNumber
              id="silverRate"
              name="silverRate"
              value={formik.values.silverRate}
              onValueChange={formik.handleChange}
              autoFocus
              className={classNames({
                "p-invalid": isFormFieldValid("silverRate"),
              })}
            />
            {getFormErrorMessage("silverRate")}
          </div>

          <Button type="submit" label="Submit" className="p-mt-2" />
        </form>
      </Dialog>
    </Card>
  );
};
export default Rates;
