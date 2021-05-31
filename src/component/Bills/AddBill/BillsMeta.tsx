import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
export function BillsMeta({ invoiceDate, setInvoiceDate }: any) {
  const [previousAmount, setPreviousAmount] = useState(0);
  const [advanceAmount, setAdvanceAmount] = useState(0);
  return (
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

      <div className="p-formgrid  p-grid">
        <div className="p-field p-col">
          <label htmlFor="advanceAmount">Advance Amount</label>
          <InputNumber
            id="advanceAmount"
            value={advanceAmount}
            onChange={(e) => setAdvanceAmount(e.value)}
          />
        </div>

        <div className="p-field p-col">
          <label htmlFor="previousAmount">Previous Amount</label>
          <InputNumber
            id="previousAmount"
            value={previousAmount}
            onChange={(e) => setPreviousAmount(e.value)}
          />
        </div>
      </div>
    </div>
  );
}
