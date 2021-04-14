import { FC, useState } from "react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { DataTable } from "primereact/datatable";
import { TabView, TabPanel } from "primereact/tabview";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import {
  goldItems as mockGoldItems,
  silverPerPriceItems as mockSilverPerPriceItems,
  silverPerWeightItems as mockSilverPerWeightItems,
} from "./mockData";

const Items = () => {
  const confirmDeleteSelected = () => {};

  const [goldItems, setGoldItems] = useState(mockGoldItems);
  const [silverPerPriceItems, setSilverPerPriceItems] = useState(
    mockSilverPerPriceItems
  );
  const [silverPerWeightItems, setSilverPerWeightItems] = useState(
    mockSilverPerWeightItems
  );

  return (
    <>
      <div className="card">
        <TabView>
          <TabPanel header="Gold Items">
            <ItemsPanel items={goldItems} updateItems={setGoldItems} />
          </TabPanel>
          <TabPanel header="Silver per price items">
            <ItemsPanel
              items={silverPerPriceItems}
              updateItems={setSilverPerPriceItems}
            />
          </TabPanel>
          <TabPanel header="Silver per weight items">
            <ItemsPanel
              items={silverPerWeightItems}
              updateItems={setSilverPerWeightItems}
            />
          </TabPanel>
        </TabView>
      </div>
    </>
  );
};

export default Items;

type ItemType = { id: string; name: string };
type Props = {
  items: ItemType[];
  updateItems: (items: ItemType[]) => void;
};
const ItemsPanel: FC<Props> = ({ items, updateItems }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [goldItem, setGoldItem] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [newGoldItemDialog, setNewGoldItemDialog] = useState(false);
  const editProduct = (rowData: any) => {
    console.log(rowData);
  };
  const confirmDeleteProduct = (rowData: any) => {};

  const actionBodyTemplate = (rowData: any) => {
    return (
      <>
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
      </>
    );
  };

  const openNew = () => {
    setGoldItem("");
    setSubmitted(false);
    setNewGoldItemDialog(true);
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
      </>
    );
  };
  const saveNewGoldItem = () => {
    setSubmitted(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setNewGoldItemDialog(false);
  };

  const productDialogFooter = (
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
            value={goldItem}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !goldItem,
            })}
          />
          {submitted && !goldItem && (
            <small className="p-error">Name is required.</small>
          )}
        </div>
      </Dialog>
    </>
  );
};
