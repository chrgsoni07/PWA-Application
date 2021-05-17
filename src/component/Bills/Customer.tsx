import { Dropdown } from "primereact/dropdown";

function Customer({ selectedCustomer, customers, setSelectedCustomer }: any) {
  return (
    <div className="p-col-8">
      {/* drop down */}
      <div className="p-formgrid p-grid">
        <div className="p-field p-col-12">
          <label htmlFor="customerSelect">Select customer</label>
          <Dropdown
            id="customerSelect"
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
          <label htmlFor="mobile">Mobile: </label>
          <span id="mobile">{selectedCustomer?.mobile}</span>
        </div>

        <div className="p-field p-col">
          <label htmlFor="place">Place: </label>
          <span id="place">{selectedCustomer?.place}</span>
        </div>

        <div className="p-field p-col">
          <label htmlFor="address">Address: </label>
          <span id="address">{selectedCustomer?.address}</span>
        </div>
      </div>
    </div>
  );
}
export default Customer;
