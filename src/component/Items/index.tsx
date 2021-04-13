import { FC } from "react";
import { Button } from "primereact/button";
import AddItemModal from "./AddItemModal";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { TabView, TabPanel } from "primereact/tabview";
import React, { useState } from "react";

const Items = () => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const openNew = () => {};

  const editProduct = (rowData: any) => {};

  const confirmDeleteProduct = (rowData: any) => {};

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
                <Column field="id" header="Id"></Column>
                <Column field="name" header="Name"></Column>
                <Column body={actionBodyTemplate}></Column>
              </DataTable>
            </div>
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
                <Column field="id" header="Id"></Column>
                <Column field="name" header="Name"></Column>
                <Column body={actionBodyTemplate}></Column>
              </DataTable>
            </div>
          </TabPanel>

          <TabPanel header="Silver per weight items">
            <div className="card">
              <Toolbar className="p-mb-4" left={leftToolbarTemplate}></Toolbar>
              <DataTable
                value={silverPerWeightItems}
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
                <Column field="id" header="Id"></Column>
                <Column field="name" header="Name"></Column>
                <Column body={actionBodyTemplate}></Column>
              </DataTable>
            </div>
          </TabPanel>
        </TabView>
      </div>
    </>
  );
};

export default Items;
