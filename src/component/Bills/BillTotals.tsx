import { InputNumber } from "primereact/inputnumber";
import React from "react";
import { defaultNum } from "utils/number.utils";
export function BillTotals({
  onDiscoutChange,
  onAmountPaidChange,
  billDetails,
}: any) {
  return (
    <div className="p-fluid p-formgrid p-grid">
      <div className="p-field p-col">
        <label htmlFor="totalNew"> Total new </label>
        <InputNumber id="totalNew" value={defaultNum(billDetails.newTotal)} />
      </div>

      <div className="p-field p-col">
        <label htmlFor="totalOld">Total old </label>
        <InputNumber id="totalOld" value={defaultNum(billDetails.oldTotal)} />
      </div>

      <div className="p-field p-col">
        <label htmlFor="oldNewDifference"> Old New Difference </label>
        <InputNumber
          id="oldNewDifference"
          value={defaultNum(billDetails.oldNewDifference)}
        />
      </div>

      <div className="p-field p-col">
        <label htmlFor="discount">Discount</label>
        <InputNumber
          id="discount"
          value={defaultNum(billDetails.discount)}
          onChange={(e) => onDiscoutChange(e.value)}
        />
      </div>

      <div className="p-field p-col">
        <label htmlFor="amountPayable"> Amount payable </label>
        <InputNumber
          id="amountPayable"
          value={defaultNum(billDetails.amountPayable)}
        />
      </div>

      <div className="p-field p-col">
        <label htmlFor="paid"> Amount paid </label>
        <InputNumber
          id="paid"
          value={defaultNum(billDetails.paid)}
          onChange={(e) => onAmountPaidChange(e.value)}
        />
      </div>

      <div className="p-field p-col">
        <label htmlFor="due"> Due </label>
        <InputNumber id="due" value={defaultNum(billDetails.due)} />
      </div>
    </div>
  );
}
