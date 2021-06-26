import React from "react";
import { defaultNum } from "utils/number.utils";
import { Currency } from "component/common/PrimeReactOverrides";

export function BillTotals({
  onDiscoutChange,
  onAmountPaidChange,
  billDetails = {},
}: any) {
  return (
    <div className="p-fluid p-formgrid p-grid">
      <div className="p-field p-col">
        <label htmlFor="totalNew">Total new</label>
        <Currency
          inputId="totalNew"
          value={defaultNum(billDetails.newTotal)}
          readOnly
        />
      </div>

      <div className="p-field p-col">
        <label htmlFor="totalOld">Total old</label>
        <Currency
          inputId="totalOld"
          value={defaultNum(billDetails.oldTotal)}
          readOnly
        />
      </div>

      <div className="p-field p-col">
        <label htmlFor="oldNewDifference">Difference</label>
        <Currency
          inputId="oldNewDifference"
          value={defaultNum(billDetails.oldNewDifference)}
          readOnly
        />
      </div>

      <div className="p-field p-col">
        <label htmlFor="discount">Discount</label>
        <Currency
          inputId="discount"
          value={defaultNum(billDetails.discount)}
          onChange={(e) => onDiscoutChange(e.value)}
        />
      </div>

      <div className="p-field p-col">
        <label htmlFor="amountPayable">Amount payable</label>
        <Currency
          inputId="amountPayable"
          value={defaultNum(billDetails.amountPayable)}
          readOnly
        />
      </div>

      <div className="p-field p-col">
        <label htmlFor="paid">Amount paid</label>
        <Currency
          inputId="paid"
          value={defaultNum(billDetails.paid)}
          onChange={(e) => onAmountPaidChange(e.value)}
        />
      </div>

      <div className="p-field p-col">
        <label htmlFor="due">Due</label>
        <Currency inputId="due" value={defaultNum(billDetails.due)} readOnly />
      </div>
    </div>
  );
}
