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
      <div className="p-grid">
        <div className="p-col"></div>
        <div className="p-col"></div>
        <div className="p-col">
          <table id="details">
            <tbody>
              <tr>
                <td>नए सामान की कुल राशि</td>
                <td>{formatCurrencyNoFraction(newTotal)}</td>
              </tr>
              <tr>
                <td>पुराने सामान का कुल राशि</td>
                <td>{formatCurrencyNoFraction(oldTotal)}</td>
              </tr>
              <tr className="highlight">
                <td>अंतर</td>
                <td>{formatCurrencyNoFraction(oldNewDifference)}</td>
              </tr>
              <tr>
                <td>छूट</td>
                <td>{formatCurrencyNoFraction(discount)}</td>
              </tr>
              <tr className="highlight">
                <td>कुल देय राशि</td>
                <td>{formatCurrencyNoFraction(amountPayable)}</td>
              </tr>
              <tr>
                <td>प्राप्त राशि</td>
                <td>
                  <b> {formatCurrencyNoFraction(paid)}</b>
                </td>
              </tr>
              <tr>
                <td>कुल बकाया राशि</td>
                <td>
                  <b>{formatCurrencyNoFraction(due)}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ViewAmountDetails;
