import { InputNumber } from "primereact/inputnumber";
import React from "react";
export function BillTotals({
  onDiscoutChange,
  onAmountPaidChange,
  billDetails,
}: any) {
  return (
    <div className="p-fluid p-formgrid p-grid">
      <div className="p-field p-col">
        <label htmlFor="totalNew"> Total new </label>
        <InputNumber id="totalNew" value={billDetails.newTotal} />
      </div>

      <div className="p-field p-col">
        <label htmlFor="totalOld">Total old </label>
        <InputNumber id="totalOld" value={billDetails.oldTotal} />
      </div>

      <div className="p-field p-col">
        <label htmlFor="oldNewDifference"> Old New Difference </label>
        <InputNumber
          id="oldNewDifference"
          value={billDetails.oldNewDifference}
        />
      </div>

      <div className="p-field p-col">
        <label htmlFor="discount">Discount</label>
        <InputNumber
          id="discount"
          value={billDetails.discount}
          onChange={(e) => onDiscoutChange(e.value)}
        />
      </div>

      <div className="p-field p-col">
        <label htmlFor="amountPayable"> Amount payable </label>
        <InputNumber id="amountPayable" value={billDetails.amountPayable} />
      </div>

      <div className="p-field p-col">
        <label htmlFor="paid"> Amount paid </label>
        <InputNumber
          id="paid"
          value={billDetails.paid}
          onChange={(e) => onAmountPaidChange(e.value)}
        />
      </div>

      <div className="p-field p-col">
        <label htmlFor="due"> Due </label>
        <InputNumber id="due" value={billDetails.due} />
      </div>
    </div>
  );
}
