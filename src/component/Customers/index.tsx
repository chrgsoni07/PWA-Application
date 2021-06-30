import { Button } from "primereact/button";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { CustomerType } from "./types";
import { deleteFromDB, edit, getCustomers, save } from "api";
import { Dialog } from "primereact/dialog";
import { useToast } from "toasts";
import { updateList } from "utils/state.utils";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  FormikInputText,
  FormikTransliterate,
} from "component/common/FormikFields";
import { ButtonGroup } from "component/common/styles";

const Customers = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerType>();
  const { toastSuccess, toastError } = useToast();

  useEffect(() => {
    getCustomers().then((allCustomers) => setCustomers(allCustomers));
  }, []);

  const editSelectedCustomer = (rowData: any) => {
    setShowDialog(true);
    setSelectedCustomer(rowData);
  };

  const actionBodyTemplate = (rowData: any) => (
    <ButtonGroup>
      <Button
        aria-label="Edit customer"
        icon="pi pi-pencil"
        className="p-button-rounded p-button-success"
        onClick={() => editSelectedCustomer(rowData)}
      />
      <Button
        aria-label="Delete customer"
        icon="pi pi-trash"
        className="p-button-rounded p-button-warning"
        onClick={() => confirmDeleteProduct(rowData)}
      />
    </ButtonGroup>
  );

  const openNew = () => setShowDialog(true);

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

  const FormikComponent = () => (
    <Formik
      initialValues={
        selectedCustomer ||
        ({ name: "", place: "", mobile: "" } as CustomerType)
      }
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(data) => saveOrUpdateCustomer(data)}
      validationSchema={Yup.object({
        name: Yup.string().required("name is required"),
        place: Yup.string().required("place  is required"),
      })}
    >
      <Form className="p-fluid" id="customerForm">
        <div className="p-field">
          <label htmlFor="name">Name</label>
          <FormikTransliterate id="name" name="name" />
          {/* <FormikInputText id="name" name="name" autoFocus /> */}
        </div>

        <div className="p-field">
          <label htmlFor="place">Place</label>
          <FormikInputText id="place" name="place" />
        </div>

        <div className="p-field">
          <label htmlFor="mobile">Mobile</label>
          <FormikInputText id="mobile" name="mobile" />
        </div>
      </Form>
    </Formik>
  );

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
    setSelectedCustomer(undefined);
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
        type="submit"
        label="Submit"
        className="p-mt-2"
        form="customerForm"
      />
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
          />
          <Column field="name" header="Name" />
          <Column field="place" header="Place" />
          <Column field="mobile" header="Mobile no" />
          <Column body={actionBodyTemplate} />
        </DataTable>
      </div>

      <Dialog
        header="Add new customer"
        visible={showDialog}
        style={{ width: "600px" }}
        modal
        className="p-fluid"
        footer={itemDialogFooter}
        onHide={hideDialog}
      >
        <FormikComponent />
      </Dialog>
    </>
  );
};

export default Customers;
