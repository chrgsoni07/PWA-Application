import { Button } from "primereact/button";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { CustomerType } from "./types";
import { deleteFromDB, edit, getCustomers, save } from "api";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { useToast } from "toasts";
import { updateList } from "utils/state.utils";
import { FormikErrors, useFormik } from "formik";
import { classNames } from "primereact/utils";

const Customers = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [showDialog, setShowDialog] = useState(false);

  const { toastSuccess, toastError } = useToast();

  useEffect(() => {
    getCustomers().then((allCustomers) => setCustomers(allCustomers));
  }, []);

  const editSelectedCustomer = (rowData: any) => {
    setShowDialog(true);
    formik.setValues(rowData);
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => editSelectedCustomer(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </>
    );
  };

  const formik = useFormik<CustomerType>({
    initialValues: {
      id: "",
      name: "",
      place: "",
      mobile: "",
      address: "",
    },
    validate: (data) => {
      let errors: FormikErrors<CustomerType> = {};

      if (!data.name) {
        errors.name = "name is required.";
      }

      if (!data.place) {
        errors.place = "place is required.";
      }
      return errors;
    },

    onSubmit: (data) => {
      saveOrUpdateCustomer(data);
      formik.resetForm();
    },
  });

  const isFormFieldValid = (name: keyof CustomerType) => {
    return !!(formik.touched[name] && formik.errors[name]);
  };

  const getFormErrorMessage = (name: keyof CustomerType) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  const openNew = () => {
    setShowDialog(true);
  };

  const header = (
    <div className="table-header">
      <Button
        label="New"
        icon="pi pi-plus"
        className="p-button-success p-mr-2"
        onClick={openNew}
      />

      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.currentTarget.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  const saveOrUpdateCustomer = (data: CustomerType) => {
    if (data.id) {
      editCustomerToFireStore(data);
    } else {
      saveCustomerToFireStore(data);
    }
    hideDialog();
  };

  const saveCustomerToFireStore = async (data: CustomerType) => {
    save("customers", data)
      .then((newCustomer) => {
        setCustomers([...customers, newCustomer]);
        toastSuccess("customer details successfully saved");
      })
      .catch(function () {
        toastError("Error saving customer details");
      });
  };

  const editCustomerToFireStore = (data: CustomerType) => {
    edit("customers", data)
      .then(() => {
        toastSuccess("customer details successfully updated");
        const newCustomer = updateList(customers, data);

        setCustomers(newCustomer);
      })
      .catch(function () {
        toastError("Error updating customer details");
      });
  };

  const hideDialog = () => {
    setShowDialog(false);
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

  const confirmDeleteProduct = (rowData: CustomerType) => {
    deleteFromDB("customers", rowData.id)
      .then(() => {
        toastSuccess("customer details deleted successfully");
        setCustomers(customers.filter((i) => i.id !== rowData.id));
      })
      .catch((error: any) => {
        toastError("Error deleting customer details");
      });
  };

  return (
    <>
      <div className="card">
        <DataTable
          value={customers}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
          header={header}
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
          <Column field="name" header="Name"></Column>
          <Column field="mobile" header="Mobile no"></Column>
          <Column field="place" header="Place"></Column>
          <Column field="address" header="Address"></Column>
          <Column body={actionBodyTemplate}></Column>
        </DataTable>
      </div>

      <Dialog
        header={"Add new customer"}
        visible={showDialog}
        style={{ width: "600px" }}
        modal
        className="p-fluid"
        footer={itemDialogFooter}
        onHide={hideDialog}
      >
        <form onSubmit={formik.handleSubmit} className="p-fluid" id="rateForm">
          <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-6">
              <label htmlFor="name">Name</label>
              <InputText
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                autoFocus
                className={classNames({
                  "p-invalid": isFormFieldValid("name"),
                })}
              />
              {getFormErrorMessage("name")}
            </div>

            <div className="p-field p-col-6">
              <label htmlFor="mobile">Mobile</label>
              <InputText
                id="mobile"
                name="mobile"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.mobile}
              />
            </div>
          </div>

          <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-6">
              <label htmlFor="place">Place</label>
              <InputText
                id="place"
                name="place"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.place}
                autoFocus
                className={classNames({
                  "p-invalid": isFormFieldValid("place"),
                })}
              />
              {getFormErrorMessage("place")}
            </div>

            <div className="p-field p-col-6">
              <label htmlFor="address">Address</label>
              <InputTextarea
                id="address"
                onChange={formik.handleChange}
                value={formik.values.address}
              />
            </div>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default Customers;
