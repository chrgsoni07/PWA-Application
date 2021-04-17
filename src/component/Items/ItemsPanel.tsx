import { FC, useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import { createNextState } from "@reduxjs/toolkit";
import { ItemType } from "./types";
import { db } from "../../firebase";

type Props = {
  items: ItemType[];
  updateItems: (items: ItemType[]) => void;
};

const ItemsPanel: FC<Props> = ({ items, updateItems }) => {
  const [selectedItem, setSelectedItem] = useState<ItemType>({
    id: "",
    name: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const editItem = (rowData: any) => {
    setShowDialog(true);
    setSelectedItem(rowData);
  };

  const confirmDeleteItem = (rowData: any) => {};

  const actionBodyTemplate = (rowData: any) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => editItem(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteItem(rowData)}
        />
      </>
    );
  };

  const openNew = () => {
    setSelectedItem({ id: "", name: "" });
    setSubmitted(false);
    setShowDialog(true);
  };

  const getAllItemsFromFireStore = () => {
    var goldItemCollection = db.collection("goldItems");

    goldItemCollection.get().then((querySnapshot) => {
      querySnapshot.forEach((goldItem) => {
        console.log(goldItem.id);

        var goldItemDetail = goldItem.data();
        console.log(JSON.stringify(goldItemDetail));
      });
    });
  };

  const leftToolbarTemplate = () => {
    return (
      <>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={openNew}
        />

        <Button
          label="refresh"
          icon="pi pi-refresh"
          className="p-button-success p-mr-2"
          onClick={getAllItemsFromFireStore}
        />
      </>
    );
  };
  const saveNewGoldItem = () => {
    if (selectedItem?.id) {
      const newItems = createNextState(items, (draft) =>
        draft.forEach((i) => {
          if (i.id === selectedItem?.id) {
            i.name = selectedItem.name;
          }
        })
      );

      updateItems(newItems);
    } else {
      // call API to retrieve new ID
      saveItemToFireStore();
      updateItems([...items, { ...selectedItem, id: `${items.length + 1}` }]);
    }
    setSubmitted(true);
    hideDialog();
  };

  const saveItemToFireStore = () => {
    db.collection("goldItems")
      .doc()
      .set({
        name: selectedItem.name,
      })
      .then(function () {
        console.log("Document successfully written!");
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
        onClick={saveNewGoldItem}
      />
    </>
  );

  return (
    <>
      <div className="card">
        <Toolbar className="p-mb-4" left={leftToolbarTemplate}></Toolbar>
        <DataTable
          value={items}
          selection={selectedItem}
          onSelectionChange={(e) => setSelectedItem(e.value)}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
          selectionMode="single"
          dataKey="id"
        >
          <Column field="id" header="Id" sortable></Column>
          <Column field="name" header="Name" sortable></Column>
          <Column body={actionBodyTemplate}></Column>
        </DataTable>
      </div>
      <Dialog
        header="Add new gold item"
        visible={showDialog}
        style={{ width: "450px" }}
        modal
        className="p-fluid"
        footer={itemDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="name">Name</label>
          <InputText
            id="name"
            onChange={(e) =>
              setSelectedItem({ ...selectedItem, name: e.currentTarget.value })
            }
            value={selectedItem?.name}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !selectedItem?.name,
            })}
          />
          {submitted && !selectedItem?.name && (
            <small className="p-error">Name is required.</small>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default ItemsPanel;
