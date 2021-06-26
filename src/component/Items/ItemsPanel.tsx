import { FC, useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { ItemType } from "./types";
import { deleteFromDB, edit, getItems, save } from "api";
import { ItemCategoryType } from "api/types";
import { useToast } from "toasts";
import { updateList } from "utils/state.utils";
import { FormikErrors, useFormik } from "formik";
import { classNames } from "primereact/utils";

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
  const [showDialog, setShowDialog] = useState(false);
  const { toastSuccess, toastError } = useToast();

  const editItem = (rowData: any) => {
    setShowDialog(true);
    formik.setValues(rowData);
  };

  const formik = useFormik<ItemType>({
    initialValues: {
      id: "",
      name: "",
    },
    validate: (data) => {
      let errors: FormikErrors<ItemType> = {};

      if (!data.name) {
        errors.name = "name is required.";
      }

      return errors;
    },

    onSubmit: (data) => {
      saveOrUpdateItemName(data);
      formik.resetForm();
    },
  });

  const isFormFieldValid = (name: keyof ItemType) => {
    return !!(formik.touched[name] && formik.errors[name]);
  };

  const getFormErrorMessage = (name: keyof ItemType) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
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

  const openNew = () => setShowDialog(true);
  const hideDialog = () => setShowDialog(false);

  useEffect(() => {
    getItems(category).then((allItems) => setItems(allItems));
  }, [category]);

  const leftToolbarTemplate = () => (
    <Button
      label="New"
      icon="pi pi-plus"
      className="p-button-success p-mr-2"
      onClick={openNew}
    />
  );
  const saveOrUpdateItemName = (data: ItemType) => {
    if (data?.id) {
      editItemToFireStore(data);
    } else {
      saveItemToFireStore(data);
    }
    hideDialog();
  };

  const editItemToFireStore = (data: ItemType) => {
    edit(category, data)
      .then(() => {
        toastSuccess("item successfully updated");
        const newItems = updateList(items, data);
        setItems(newItems);
      })
      .catch((error: Error) => {
        toastError("Error updating item " + error.message);
      });
  };

  const saveItemToFireStore = async (data: ItemType) => {
    try {
      const savedItem = await save(category, data);
      setItems([...items, savedItem]);
      toastSuccess("item successfully saved");
    } catch (err) {
      toastError("Error saving item " + err.message);
    }
  };

  const itemDialogFooter = (
    <>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button type="submit" label="Submit" className="p-mt-2" form="itemForm" />
    </>
  );

  return (
    <>
      <Toolbar left={leftToolbarTemplate}></Toolbar>
      <DataTable
        value={items}
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
        />
        <Column field="name" header="Name" sortable />
        <Column body={actionBodyTemplate} />
      </DataTable>

      <Dialog
        header={`Add new ${categoryMap[category]} item`}
        visible={showDialog}
        style={{ width: "450px" }}
        modal
        className="p-fluid"
        footer={itemDialogFooter}
        onHide={hideDialog}
      >
        <form onSubmit={formik.handleSubmit} className="p-fluid" id="itemForm">
          <div className="p-field">
            <label htmlFor="name">Name</label>
            <InputText
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className={classNames({
                "p-invalid": isFormFieldValid("name"),
              })}
            />
            {getFormErrorMessage("name")}
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default ItemsPanel;
