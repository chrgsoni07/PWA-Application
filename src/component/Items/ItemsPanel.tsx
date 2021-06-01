import { FC, useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { ItemType } from "./types";
import { deleteFromDB, edit, get, save } from "api";
import { ItemCategoryType } from "api/types";
import { useToast } from "toasts";
import { updateList } from "utils/state.utils";

const categoryMap = {
  goldItems: "Gold",
  silverItems: "Silver",
  fixed: "Fixed",
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
  const { toastSuccess, toastError } = useToast();

  const editItem = (rowData: any) => {
    setShowDialog(true);
    setSelectedItem(rowData);
  };

  const confirmDeleteItem = (rowData: ItemType) => {
    deleteFromDB(category, rowData.id)
      .then(() => {
        toastSuccess("item successfully deleted");
        setItems(items.filter((i) => i.id !== rowData.id));
      })
      .catch((error: Error) => {
        toastError("Error deleting item " + error.message);
      });
  };

  const actionBodyTemplate = (rowData: any) => (
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

  const openNew = () => {
    setSelectedItem({ id: "", name: "" });
    setSubmitted(false);
    setShowDialog(true);
  };

  useEffect(() => {
    get<ItemType>(category).then((allItems) => setItems(allItems));
  }, [category]);

  const leftToolbarTemplate = () => (
    <>
      <Button
        label="New"
        icon="pi pi-plus"
        className="p-button-success p-mr-2"
        onClick={openNew}
      />
    </>
  );
  const saveNewItem = () => {
    if (selectedItem?.id) {
      editItemToFireStore();
    } else {
      saveItemToFireStore();
    }
    setSubmitted(true);
    hideDialog();
  };

  const editItemToFireStore = () => {
    edit(category, selectedItem)
      .then(() => {
        toastSuccess("item successfully updated");
        const newItems = updateList(items, selectedItem);
        setItems(newItems);
      })
      .catch((error: Error) => {
        toastError("Error updating item " + error.message);
      });
  };

  const saveItemToFireStore = async () => {
    try {
      const savedItem = await save(category, selectedItem);
      setItems([...items, savedItem]);
      toastSuccess("item successfully saved");
    } catch (err) {
      toastError("Error saving item " + err.message);
    }
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
