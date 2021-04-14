import { Form, Col, Row } from "react-bootstrap";
import { Button } from "primereact/button";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";

const Customers = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [globalFilter, setGlobalFilter] = useState([]);

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
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0">Manage Products</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        {/* TODO for search */}
        <InputText type="search" placeholder="Search..." />
      </span>
    </div>
  );

  const confirmDeleteSelected = () => {};

  const openNew = () => {};

  const editProduct = (rowData: any) => {};

  const confirmDeleteProduct = (rowData: any) => {};

  const tableData = [
    {
      id: 1,
      customerName: "Mangilal ji Soni",
      place: "Dhamniya",
      mobileNo: "+91-784-874-6144",
    },
    {
      id: 2,
      customerName: "Bherulal ji Gayri",
      place: "Liliya",
      mobileNo: "+91-784-477-7541",
    },
    {
      id: 3,
      customerName: "Shambhulal ji Dhakad",
      place: "Khor",
      mobileNo: "+91-784-754-8745",
    },
    {
      id: 4,
      customerName: "Shantilal ji Dhakad",
      place: "Jawad",
      mobileNo: "+91-784-874-7850",
    },
  ];

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className="container">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="formGroupCustomerName">
              <Form.Label>Customer name</Form.Label>
              <Form.Control type="text" required />
              <Form.Control.Feedback type="invalid">
                Please provide customer name
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formGroupPlace">
              <Form.Label>Place</Form.Label>
              <Form.Control type="text" required />
              <Form.Control.Feedback type="invalid">
                Please provide place
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formGroupMobileNo">
              <Form.Label>Mobile no</Form.Label>
              <Form.Control type="number" required />
              <Form.Control.Feedback type="invalid">
                Please provide mobile no
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formGroupAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control as="textarea" rows={2} />
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" label="Submit form" />
      </Form>

      <hr />
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
          globalFilter={globalFilter}
          header={header}
          selectionMode="single"
          dataKey="id"
        >
          <Column field="id" header="Id"></Column>
          <Column field="customerName" header="Customer name"></Column>
          <Column field="place" header="Place"></Column>
          <Column field="mobileNo" header="Mobile no"></Column>
          <Column body={actionBodyTemplate}></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default Customers;
