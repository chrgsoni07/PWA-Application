import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { TabView, TabPanel } from "primereact/tabview";
import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { db } from "api";
import { CustomerType } from "component/Customers/types";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";

const Bills = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerType>({
    id: "",
    mobile: "",
    place: "",
    address: "",
    name: "",
  });

  const [customers, setCustomers] = useState<CustomerType[]>([]);

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

  const header = () => {
    <Button
      label="New"
      icon="pi pi-plus"
      className="p-button-success p-mr-2"
    />;
  };

  const footer = (
    <span style={{ display: "table", margin: "0 auto" }}>
      <Button label="Save" icon="pi pi-save" style={{ marginRight: ".25em" }} />
      <Button label="Draft" icon="pi pi-check" className="p-button-secondary" />
    </span>
  );

  const onHide = () => {
    setDisplayDialog(false);
  };

  const displayModel = () => {
    setDisplayDialog(true);
  };

  return (
    <>
      <Card header={header}>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={() => displayModel()}
        />
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel header="Privious Bills">Customer detail</TabPanel>
          <TabPanel header="Draft">Draft</TabPanel>
        </TabView>
      </Card>

      <Dialog
        visible={displayDialog}
        onHide={onHide}
        header="New Bill"
        footer={footer}
        maximizable
        modal
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        style={{ width: "50vw" }}
      >
        <div className="p-grid">
          <div className="p-col-12">
            <label htmlFor="customerSelect">Select customer :</label>
            <Dropdown
              id="customerSelect"
              value={selectedCustomer}
              options={customers}
              onChange={(e) => setSelectedCustomer(e.value)}
              optionLabel="name"
              filter
              showClear
              filterBy="name"
              placeholder="Select a customer"
            />
          </div>
        </div>

        <div className="p-grid">
          <div className="p-col-4">
            <label htmlFor="name">Name :</label>
            <span id="name">{selectedCustomer.name}</span>
          </div>

          <div className="p-col-4">
            <label htmlFor="mobile">Mobile :</label>
            <span id="mobile">{selectedCustomer.mobile}</span>
          </div>

          <div className="p-col-4">
            <label htmlFor="place">Place :</label>
            <span id="place">{selectedCustomer.place}</span>
          </div>
        </div>

        <div className="p-grid">
          <div className="p-col-12">
            <label htmlFor="address">Address :</label>
            <span id="name">{selectedCustomer.address}</span>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Bills;
