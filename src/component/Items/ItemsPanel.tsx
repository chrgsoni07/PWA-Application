import { FC, useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { createNextState } from "@reduxjs/toolkit";
import { ItemType } from "./types";
import { db, save } from "api";
import { ItemCategoryType } from "api/types";

const categoryMap = {
  goldItems: "Gold",
  silverPerPriceItems: "Silver per price",
  silverPerWeightItems: "Silver per weight",
};
type Props = {
  category: ItemCategoryType;
};

const ItemsPanel: FC<Props> = ({ category }) => {
  const [items, setItems] = useState<ItemType[]>([]);
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

  const confirmDeleteItem = (rowData: ItemType) => {
    db.collection(category)
      .doc(rowData.id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        setItems(
          createNextState(items, (draft) =>
            draft.filter((i) => i.id !== rowData.id)
          )
        );
      })
      .catch((error: Error) => {
        console.error("Error removing document: ", error);
      });
  };

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

  useEffect(() => {
    const collection = db.collection(category);

    collection.get().then((querySnapshot) => {
      const allItems: ItemType[] = [];
      querySnapshot.forEach((item) => {
        console.log(item.id);
        const itemData = item.data();
        console.log(JSON.stringify(itemData));
        allItems.push({ name: itemData.name, id: item.id });
      });
      setItems(allItems);
    });
  }, []);

  const leftToolbarTemplate = () => {
    return (
      <>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={openNew}
        />
      </>
    );
  };
  const saveNewItem = () => {
    if (selectedItem?.id) {
      editItemToFireStore();
    } else {
      // call API to retrieve new ID
      saveItemToFireStore();
    }
    setSubmitted(true);
    hideDialog();
  };

  const editItemToFireStore = () => {
    db.collection(category)
      .doc(selectedItem.id)
      .set({
        name: selectedItem.name,
      })
      .then(() => {
        console.log("Document successfully updated!");
        const newItems = createNextState(items, (draft) =>
          draft.forEach((i) => {
            if (i.id === selectedItem?.id) {
              i.name = selectedItem.name;
            }
          })
        );
        setItems(newItems);
      })
      .catch(function () {
        console.error("Error writing document: ");
      });
  };
  const saveItemToFireStore = async () => {
    const savedItem: ItemType = await save(category, selectedItem);
    setItems([...items, savedItem]);
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
        onClick={saveNewItem}
      />
    </>
  );

  return (
    <>
      <div className="card">
        <Toolbar left={leftToolbarTemplate}></Toolbar>
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
          className="p-datatable-gridlines p-datatable-sm"
        >
          <Column
            field="id"
            header="Id"
            sortable
            body={(_: any, prop: any) => prop.rowIndex + 1}
          ></Column>
          <Column field="name" header="Name" sortable></Column>
          <Column body={actionBodyTemplate}></Column>
        </DataTable>
      </div>
      <Dialog
        header={`Add new ${categoryMap[category]} item`}
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
            className={submitted && !selectedItem?.name ? "p-invalid" : ""}
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
