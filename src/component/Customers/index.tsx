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

const Customers = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CustomerType>({
    id: "",
    mobile: "",
    place: "",
    address: "",
    name: "",
  });

  const { toastSuccess, toastError } = useToast();

  useEffect(() => {
    getCustomers().then((allCustomers) => setCustomers(allCustomers));
  }, []);

  const editSelectedCustomer = (rowData: any) => {
    setShowDialog(true);
    setSelectedItem(rowData);
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

  const openNew = () => {
    setSelectedItem({
      id: "",
      mobile: "",
      name: "",
      address: "",
      place: "",
    });
    setSubmitted(false);
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

  const saveNewCustomer = () => {
    if (selectedItem?.id) {
      editCustomerToFireStore();
    } else {
      saveCustomerToFireStore();
    }
    setSubmitted(true);
    hideDialog();
  };

  const saveCustomerToFireStore = async () => {
    save("customers", selectedItem)
      .then((newCustomer) => {
        setCustomers([...customers, newCustomer]);
        toastSuccess("customer details successfully saved");
      })
      .catch(function () {
        toastError("Error saving customer details");
      });
  };

  const editCustomerToFireStore = () => {
    edit("customers", selectedItem)
      .then(() => {
        toastSuccess("customer details successfully updated");
        const newCustomer = updateList(customers, selectedItem);

        setCustomers(newCustomer);
      })
      .catch(function () {
        toastError("Error updating customer details");
      });
  };

  const hideDialog = () => {
    setSubmitted(false);
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
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveNewCustomer}
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
          selection={selectedProduct}
          onSelectionChange={(e) => setSelectedProduct(e.value)}
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
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-6">
            <label htmlFor="name">Name</label>
            <InputText
              id="name"
              type="text"
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
                  name: e.currentTarget.value,
                })
              }
              value={selectedItem?.name}
              required
              autoFocus
              className={submitted && !selectedItem?.name ? "p-invalid" : ""}
            />
            {submitted && !selectedItem?.name && (
              <small className="p-error">name is required.</small>
            )}
          </div>

          <div className="p-field p-col-6">
            <label htmlFor="mobile">Mobile</label>
            <InputText
              id="mobile"
              type="text"
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
                  mobile: e.currentTarget.value,
                })
              }
              value={selectedItem?.mobile}
              required
              autoFocus
              className={submitted && !selectedItem?.mobile ? "p-invalid" : ""}
            />
            {submitted && !selectedItem?.mobile && (
              <small className="p-error">mobilee no is required.</small>
            )}
          </div>
        </div>

        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-6">
            <label htmlFor="place">Place</label>
            <InputText
              id="place"
              type="text"
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
                  place: e.currentTarget.value,
                })
              }
              value={selectedItem?.place}
              required
              autoFocus
              className={submitted && !selectedItem?.place ? "p-invalid" : ""}
            />
            {submitted && !selectedItem?.place && (
              <small className="p-error">place no is required.</small>
            )}
          </div>

          <div className="p-field p-col-6">
            <label htmlFor="address">Address</label>
            <InputTextarea
              id="address"
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
                  address: e.currentTarget.value,
                })
              }
              value={selectedItem?.address}
              required
              autoFocus
              className={submitted && !selectedItem?.address ? "p-invalid" : ""}
            />
            {submitted && !selectedItem?.address && (
              <small className="p-error">address no is required.</small>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Customers;
