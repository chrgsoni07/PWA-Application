import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
export const BillsMeta = ({ invoiceDate, setInvoiceDate }: any) => (
  <div className="p-col-4">
    <div className="p-formgrid p-grid">
      <div className="p-field p-col">
        <label htmlFor="invoiceNo">Invoice no</label>
        <InputText value={101} />
      </div>

      <div className="p-field p-col">
        <label htmlFor="invoiceDate">Invoice Date</label>
        <Calendar
          inputId="invoiceDate"
          value={invoiceDate}
          onChange={(e) => setInvoiceDate(e.value)}
          showIcon
          dateFormat="dd/mm/yy"
        />
      </div>
    </div>
  </div>
);
