import { FC, useRef } from "react";
import { Bill } from "../types";
import { Column } from "primereact/column";
import { Divider } from "primereact/divider";
import ViewAmountDetails from "./ViewAmountDetails";
import {
  amountBodyTemplate,
  weightTemplate,
  grossWeightTemplate,
  viewNetWeightTemplate,
  makingChargeTemplate,
  purityTemplate,
} from "utils/currency.utils";
import { itemTypeBodyTemplate } from "../AddBill/common";
import ReactToPrint from "react-to-print";
import { Container, Name, Table, Row, Cell, DataTable } from "./styles";
import logo from "./logo.png";
import { CustomerType } from "component/Customers/types";

type ViewBillProps = {
  bill: Bill;
};

const ViewBill: FC<ViewBillProps> = ({
  bill: { customer, oldItems, newItems, billDetail, invoiceDate, billNo },
}) => {
  const billRef = useRef(null);

  return (
    <>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => billRef.current}
      />
      <div ref={billRef} style={{ width: "220mm" }}>
        <Container>
          <div className="p-grid">
            <div className="p-col-2">
              <img src={logo} width={130} height={100} alt="logo" />
            </div>
            <div className="p-col-3">
              <Name>आर. के. ज्वेलर्स</Name>
              <br />
              सराफा बाजार, जावद (म. प्र.) <br />
              प्रो. नरेश राधेश्याम जी सोनी
              <br />
              <i className="pi pi-mobile">9425975329</i>
            </div>

            <div className="p-col-4">
              <CustomerDetails customer={customer} />
            </div>
            <div className="p-col-3">
              <Header icon="pi-book" text={`बिल क्र. : ${billNo}`} />
              <Header icon="pi-calendar" text={`दिनांक : ${invoiceDate}`} />
            </div>
          </div>

          <div className="p-grid">
            <div className="p-col-9">
              {!!newItems.length && (
                <div className="card">
                  <Header icon="pi-list" text="नया सामान" />
                  <DataTable value={newItems}>
                    <Column
                      field="type"
                      body={itemTypeBodyTemplate}
                      header="प्रकार"
                    />
                    <Column field="item" header="सामान" />
                    <Column field="weight" header="वज़न" body={weightTemplate} />
                    <Column field="rate" header="भाव" />
                    <Column
                      field="makingCharges"
                      header="मजदूरी"
                      body={makingChargeTemplate}
                    />
                    <Column field="otherCharges" header="अन्य" />
                    <Column
                      field="amount"
                      header="कुल राषि"
                      body={amountBodyTemplate}
                    />
                  </DataTable>
                </div>
              )}

              {!!oldItems.length && (
                <div className="card">
                  <Header icon="pi-list" text="पुराना सामान" />
                  <DataTable value={oldItems}>
                    <Column
                      field="type"
                      body={itemTypeBodyTemplate}
                      header="प्रकार"
                    />
                    <Column field="item" header="सामान" />
                    <Column
                      field="grossWeight"
                      header="वज़न"
                      body={grossWeightTemplate}
                    />
                    <Column
                      field="purity"
                      header="शुद्धता"
                      body={purityTemplate}
                    />
                    <Column
                      field="netWeight"
                      header="शुद्ध वज़न"
                      body={viewNetWeightTemplate}
                    />
                    <Column field="rate" header="भाव" />
                    <Column
                      field="amount"
                      header="कुल राषि"
                      body={amountBodyTemplate}
                    />
                  </DataTable>
                </div>
              )}
            </div>

            <div className="p-col-3">
              <ViewAmountDetails billDetail={billDetail} />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ViewBill;

function Header({ icon, text }: any) {
  return (
    <Divider align="left">
      <div className="p-d-inline-flex p-ai-center">
        <i className={`pi ${icon} p-mr-2`}></i>
        <b>{text}</b>
      </div>
    </Divider>
  );
}

function CustomerDetails({ customer }: { customer: CustomerType }) {
  return (
    <>
      <Header icon="pi-user" text="ग्राहक" />
      <Table>
        <Row>
          <Cell>नाम:</Cell>
          <Cell>{customer?.name}</Cell>
        </Row>
        <Row>
          <Cell>निवासी:</Cell>
          <Cell>{customer?.place}</Cell>
        </Row>
        {customer?.mobile && (
          <Row>
            <Cell>मोबाइल:</Cell>
            <Cell>{customer?.mobile}</Cell>
          </Row>
        )}
      </Table>
    </>
  );
}
