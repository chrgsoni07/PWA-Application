import { getCustomers } from "api";
import { CustomerType } from "component/Customers/types";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";

function Customer({ selectedCustomer, setSelectedCustomer }: any) {
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  useEffect(() => {
    getCustomers().then((allCustomers) => setCustomers(allCustomers));
  }, []);
  return (
    <div className="p-col-8">
      <div className="p-formgrid p-grid">
        <div className="p-field p-col-12">
          <label htmlFor="customerSelect">Select customer</label>
          <Dropdown
            disabled={!customers.length}
            ariaLabel="Select customer"
            inputId="customerSelect"
            value={selectedCustomer}
            options={customers}
            onChange={(e) => setSelectedCustomer(e.value || {})}
            optionLabel="name"
            filter
            showClear
            filterBy="name"
            placeholder="Select a customer"
            style={{
              width: "100%",
            }}
          />
        </div>
      </div>

      <div className="p-fluid p-formgrid p-grid">
        <div className="p-field p-col">
          <label htmlFor="name">Name: </label>
          <span id="name">{selectedCustomer?.name}</span>
        </div>

        <div className="p-field p-col">
          <label htmlFor="place">Place: </label>
          <span id="place">{selectedCustomer?.place}</span>
        </div>

        <div className="p-field p-col">
          <label htmlFor="mobile">Mobile: </label>
          <span id="mobile">{selectedCustomer?.mobile}</span>
        </div>
      </div>
    </div>
  );
}
export default Customer;
