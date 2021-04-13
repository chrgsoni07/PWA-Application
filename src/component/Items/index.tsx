import { FC } from "react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { DataTable } from "primereact/datatable";
import { TabView, TabPanel } from "primereact/tabview";
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";

const Items = () => {
  let emptyGoldItem = {
    id: null,
    name: "",
  };

  const [modalShow, setModalShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [goldItem, setGoldItem] = useState(emptyGoldItem);
  const [submitted, setSubmitted] = useState(false);
  const [newGoldItemDialog, setNewGoldItemDialog] = useState(false);

  const goldItems = [
    { id: "1", name: "Jhumki" },
    { id: "2", name: "Haar" },
    { id: "3", name: "Mangal Sutra" },
    { id: "4", name: "Anguthi" },
  ];

  const silverPerPriceItems = [
    { id: "1", name: "Anguthi" },
    { id: "2", name: "Pendil" },
    { id: "3", name: "Chandrama" },
  ];

  const silverPerWeightItems = [
    { id: "1", name: "Payjab" },
    { id: "2", name: "Bicchi" },
    { id: "3", name: "Chain" },
    { id: "4", name: "Baccha ka kada" },
  ];

  const actionBodyTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteProduct(rowData)}
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

  const confirmDeleteSelected = () => {};

  const openNew = () => {
    setGoldItem(emptyGoldItem);
    setSubmitted(false);
    setNewGoldItemDialog(true);
  };

  const editProduct = (rowData: any) => {};

  const confirmDeleteProduct = (rowData: any) => {};

  const saveNewGoldItem = () => {
    setSubmitted(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setNewGoldItemDialog(false);
  };

  const goldItemDialogFooter = (
    <React.Fragment>
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
        onClick={saveNewGoldItem}
      />
    </React.Fragment>
  );

  const productDialogFooter = (
    <React.Fragment>
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
        onClick={saveNewGoldItem}
      />
    </React.Fragment>
  );

  return (
    <>
      <div className="card">
        <TabView>
          <TabPanel header="Gold Items">
            <div className="card">
              <Toolbar className="p-mb-4" left={leftToolbarTemplate}></Toolbar>
              <DataTable
                value={goldItems}
                selection={selectedProduct}
                onSelectionChange={(e) => setSelectedProduct(e.value)}
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                selectionMode="single"
                dataKey="id"
              >
                <Column field="id" header="Id" sortable></Column>
                <Column field="name" header="Name" sortable></Column>
                <Column body={actionBodyTemplate}></Column>
              </DataTable>
            </div>
            {/* dialog to add new item*/}

            <Dialog
              header="Add new gold item"
              visible={newGoldItemDialog}
              style={{ width: "450px" }}
              modal
              className="p-fluid"
              footer={productDialogFooter}
              onHide={hideDialog}
            >
              <div className="p-field">
                <label htmlFor="name">Name</label>
                <InputText
                  id="name"
                  value={goldItem.name}
                  required
                  autoFocus
                  className={classNames({
                    "p-invalid": submitted && !goldItem.name,
                  })}
                />
                {submitted && !goldItem.name && (
                  <small className="p-error">Name is required.</small>
                )}
              </div>
            </Dialog>
          </TabPanel>

          <TabPanel header="Silver per price items">
            <div className="card">
              <Toolbar className="p-mb-4" left={leftToolbarTemplate}></Toolbar>
              <DataTable
                value={silverPerPriceItems}
                selection={selectedProduct}
                onSelectionChange={(e) => setSelectedProduct(e.value)}
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                selectionMode="single"
                dataKey="id"
              >
                <Column field="id" header="Id" sortable></Column>
                <Column field="name" header="Name" sortable></Column>
                <Column body={actionBodyTemplate}></Column>
              </DataTable>
            </div>
          </TabPanel>

          <TabPanel header="Silver per weight items">
            <div className="datatable-responsive-demo">
              <div className="card">
                <Toolbar
                  className="p-mb-4"
                  left={leftToolbarTemplate}
                ></Toolbar>
                <DataTable
                  value={silverPerWeightItems}
                  selection={selectedProduct}
                  onSelectionChange={(e) => setSelectedProduct(e.value)}
                  paginator
                  rows={10}
                  className="p-datatable-responsive-demo"
                  rowsPerPageOptions={[5, 10, 25]}
                  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                  currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                  selectionMode="single"
                  dataKey="id"
                >
                  <Column field="id" header="Id" sortable></Column>
                  <Column field="name" header="Name" sortable></Column>
                  <Column body={actionBodyTemplate}></Column>
                </DataTable>
              </div>
            </div>
          </TabPanel>
        </TabView>
      </div>
    </>
  );
};

export default Items;
