import { Button } from "primereact/button";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { CustomerType } from "./types";
import { db } from "api";
import { createNextState } from "@reduxjs/toolkit";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";

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

  useEffect(() => {
    const collection = db.collection("customers");

    collection.get().then((querySnapshot) => {
      const allCustomers: CustomerType[] = [];
      querySnapshot.forEach((customer) => {
        console.log(customer.id);
        const customerData = customer.data();
        console.log(JSON.stringify(customerData));
        allCustomers.push({
          name: customerData.name,
          mobile: customerData.mobile,
          place: customerData.place,
          address: customerData.address,
          id: customer.id,
        });
      });
      setCustomers(allCustomers);
    });
  }, []);

  const editSelectedCustomer = (rowData: any) => {
    setShowDialog(true);
    setSelectedItem(rowData);
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <React.Fragment>
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
      </React.Fragment>
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
    db.collection("customers")
      .doc()
      .set({
        name: selectedItem.name,
        mobile: selectedItem.mobile,
        place: selectedItem.place,
        address: selectedItem.address,
      })
      .then(() => {
        setCustomers([...customers, selectedItem]);
        console.log("Document successfully updated!");
      })
      .catch(function () {
        console.error("Error writing document: ");
      });
  };

  const editCustomerToFireStore = () => {
    db.collection("customers")
      .doc(selectedItem.id)
      .set({
        name: selectedItem.name,
        mobile: selectedItem.mobile,
        place: selectedItem.place,
        address: selectedItem.address,
      })
      .then(() => {
        console.log("Document successfully updated!");
        const newCustomer = createNextState(customers, (draft) =>
          draft.forEach((i) => {
            if (i.id === selectedItem?.id) {
              i.mobile = selectedItem.mobile;
              i.name = selectedItem.name;
              i.place = selectedItem.place;
              i.address = selectedItem.address;
            }
          })
        );
        setCustomers(newCustomer);
      })
      .catch(function () {
        console.error("Error writing document: ");
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
    db.collection("customers")
      .doc(rowData.id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        setCustomers(
          createNextState(customers, (draft) =>
            draft.filter((i) => i.id !== rowData.id)
          )
        );
      })
      .catch((error: any) => {
        console.error("Error removing document: ", error);
      });
  };

  // const [validated, setValidated] = useState(false);

  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }

  //   setValidated(true);
  // };

  // const leftToolbarTemplate = () => {
  //   return (
  //     <React.Fragment>
  //       <Button
  //         label="New"
  //         icon="pi pi-plus"
  //         className="p-button-success p-mr-2"
  //         onClick={openNew}
  //       />
  //     </React.Fragment>
  //   );
  // };

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
              type="text"
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
