import { Divider } from "primereact/divider";
import { formatCurrencyNoFraction } from "utils/currency.utils";
import { BillDetails } from "../types";
import { BorderTable, Cell, Row } from "./styles";
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
      <BorderTable>
        {newTotal ? (
          <Row>
            <Cell>नए सामान की कुल राशि</Cell>
            <Cell>{formatCurrencyNoFraction(newTotal)}</Cell>
          </Row>
        ) : null}

        {oldTotal ? (
          <Row>
            <Cell>पुराने सामान की कुल राशि</Cell>
            <Cell>{formatCurrencyNoFraction(oldTotal)}</Cell>
          </Row>
        ) : null}

        {newTotal && oldTotal ? (
          <Row className="highlight">
            <Cell>अंतर</Cell>
            <Cell>{formatCurrencyNoFraction(oldNewDifference)}</Cell>
          </Row>
        ) : null}

        {discount ? (
          <Row>
            <Cell>छूट</Cell>
            <Cell>{formatCurrencyNoFraction(discount)}</Cell>
          </Row>
        ) : null}

        {amountPayable ? (
          <Row className="highlight">
            <Cell>कुल देय राशि</Cell>
            <Cell>{formatCurrencyNoFraction(amountPayable)}</Cell>
          </Row>
        ) : null}

        <Row>
          <Cell>प्राप्त राशि</Cell>
          <Cell>
            <b>{formatCurrencyNoFraction(paid) || 0}</b>
          </Cell>
        </Row>

        <Row>
          <Cell>कुल बकाया राशि</Cell>
          <Cell>
            <b>{formatCurrencyNoFraction(due) || 0}</b>
          </Cell>
        </Row>
      </BorderTable>
    </>
  );
};

export default ViewAmountDetails;
