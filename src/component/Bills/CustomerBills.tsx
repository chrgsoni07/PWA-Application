import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { CustomerType } from "component/Customers/types";
import { useEffect, useState } from "react";
import { getCustomers } from "api";

const CustomerBills = ({
  onCustomerSelect,
  dt,
  billsByCustomerId,
  actionBodyTemplate,
}: any) => {
  const [customers, setCustomers] = useState<CustomerType[]>([]);

  useEffect(() => {
    getCustomers().then((allCustomers) => setCustomers(allCustomers));
  }, []);

  return (
    <>
      <div className="p-formgrid p-grid">
        <div className="p-field p-col-12">
          <label htmlFor="customerSelect">Select customer</label>
          <Dropdown
            disabled={!customers.length}
            ariaLabel="Select customer"
            inputId="customerSelect"
            options={customers}
            onChange={(e) => onCustomerSelect(e.value || {})}
            optionLabel="name"
            filter
            showClear
            filterBy="name"
            placeholder="Select customer"
            style={{
              width: "100%",
            }}
          />
        </div>
      </div>

      <DataTable
        ref={dt}
        value={billsByCustomerId}
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
        <Column
          field="billNo"
          header="Bill No"
          data-testid="test"
          key="test3"
          filter
          sortable
          filterPlaceholder="Search by bill no"
        />

        <Column
          field="customer.name"
          header="Customer"
          filter
          sortable
          filterPlaceholder="Search by customer no"
        />
        <Column field="billDetail.amountPayable" header="Amount Payable" />
        <Column field="billDetail.paid" header="Paid" />
        <Column field="billDetail.due" header="Due" />
        <Column body={actionBodyTemplate} />
      </DataTable>
    </>
  );
};

export default CustomerBills;
