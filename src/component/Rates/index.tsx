import { Button } from "primereact/button";
import AddRatesModal from "./AddRatesModal";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Card } from "primereact/card";
import React, { useState, useEffect, useRef, FormEvent } from "react";

const Rates = () => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const tableData = [
    { id: 1, gold: 47500, silver: 67500, date: "11-04-2021" },
    { id: 2, gold: 47200, silver: 67200, date: "10-04-2021" },
    { id: 3, gold: 46500, silver: 67500, date: "09-04-2021" },
    { id: 4, gold: 46200, silver: 66900, date: "08-04-2021" },
  ];
  return (
    <>
      <Card>
        <AddRatesModal show={modalShow} onHide={() => setModalShow(false)} />
        <div style={{ height: 235 }}>
          <iframe
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
          <Toolbar className="p-mb-4" left={leftToolbarTemplate}></Toolbar>
          <DataTable
            value={tableData}
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
            <Column field="gold" header="Gold (10 gram)"></Column>
            <Column field="silver" header="Silver (1 kg)"></Column>
            <Column field="date" header="Date"></Column>
            <Column body={actionBodyTemplate}></Column>
          </DataTable>
        </div>
      </Card>
    </>
  );
};
export default Rates;
