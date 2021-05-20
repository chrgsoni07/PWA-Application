import { Divider } from "primereact/divider";
import { formatCurrencyNoFraction } from "utils/currency.utils";
import { BillDetails } from "../types";

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
          <b>Amount Details</b>
        </div>
      </Divider>
      <div className="p-grid">
        <div className="p-col">
          {/*  <table>
                     <tr>
                         <td>New item total</td>
                         <td>{newTotal}</td>
                     </tr>
                     <tr>
                         <td>Old item total</td>
                         <td>{oldTotal}</td>
                     </tr>
                     <tr>
                         <td>Difference</td>
                         <td>{oldNewDifference}</td>
                     </tr>
                 </table>
                 */}
        </div>
        <div className="p-col">
          {/* <table>
                     <tr>
                         <td>Difference</td>
                         <td>{oldNewDifference}</td>
                     </tr>
                     <tr>
                         <td>Discount</td>
                         <td>{discount}</td>
                     </tr>
                     <tr>
                         <td>Amount Payable</td>
                         <td>{amountPayable}</td>
                     </tr>
                 </table>
                 */}
        </div>
        <div className="p-col">
          <table>
            <tr>
              <td>New item total</td>
              <td>{newTotal}</td>
            </tr>
            <tr>
              <td>Old item total</td>
              <td>{oldTotal}</td>
            </tr>
            <tr className="highlight">
              <td>Difference</td>
              <td>{formatCurrencyNoFraction(oldNewDifference)}</td>
            </tr>
            <tr>
              <td>Discount</td>
              <td>{discount}</td>
            </tr>
            <tr className="highlight">
              <td>Amount Payable</td>
              <td>{amountPayable}</td>
            </tr>
            <tr>
              <td>Paid</td>
              <td>
                <b>{paid}</b>
              </td>
            </tr>
            <tr>
              <td>Due</td>
              <td>
                <b>{due}</b>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};

export default ViewAmountDetails;
