import { Divider } from "primereact/divider";
import { formatCurrencyNoFraction } from "utils/currency.utils";
import { BillDetails } from "../types";
import "./ViewBill.css";
const ViewAmountDetails = ({ billDetail }: { billDetail?: BillDetails }) => {
  if (!billDetail) {
    return null;
  }

  const {
    newTotal,
    oldTotal,
    discount,
    oldNewDifference,
    amountPayable,
    due,
    paid,
  } = billDetail;

  return (
    <>
      <Divider align="right">
        <div className="p-d-inline-flex p-ai-center">
          <i className="pi pi-wallet p-mr-2"></i>
          <b>राशि विवरण</b>
        </div>
      </Divider>
      <table id="details">
        <tbody>
          {newTotal ? (
            <tr>
              <td>नए सामान की कुल राशि</td>
              <td>{formatCurrencyNoFraction(newTotal)}</td>
            </tr>
          ) : null}

          {oldTotal ? (
            <tr>
              <td>पुराने सामान की कुल राशि</td>
              <td>{formatCurrencyNoFraction(oldTotal)}</td>
            </tr>
          ) : null}

          {newTotal && oldTotal ? (
            <tr className="highlight">
              <td>अंतर</td>
              <td>{formatCurrencyNoFraction(oldNewDifference)}</td>
            </tr>
          ) : null}

          {discount ? (
            <tr>
              <td>छूट</td>
              <td>{formatCurrencyNoFraction(discount)}</td>
            </tr>
          ) : null}

          {amountPayable ? (
            <tr className="highlight">
              <td>कुल देय राशि</td>
              <td>{formatCurrencyNoFraction(amountPayable)}</td>
            </tr>
          ) : null}

          <tr>
            <td>प्राप्त राशि</td>
            <td>
              <b>{formatCurrencyNoFraction(paid) || 0}</b>
            </td>
          </tr>

          <tr>
            <td>कुल बकाया राशि</td>
            <td>
              <b>{formatCurrencyNoFraction(due) || 0}</b>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ViewAmountDetails;
