import { FC } from "react";
import { useState } from "react";
import { Col, Nav, Row, Tab, Tabs, Table, Card } from "react-bootstrap";
import { Button } from "primereact/button";
import AddItemModal from "./AddItemModal";

const Items = () => {
  const [modalShow, setModalShow] = useState(false);

  const goldItems = ["Jhumki", "Haar", "Mangal Sutra", "Anguthi"];
  const silverPerPriceItems = ["Anguthi", "Pendil", "Chandrama"];
  const silverPerWeightItems = ["Payjab", "Bicchi", "Chain", "Gugru"];
  return (
    <>
      <AddItemModal show={modalShow} onHide={() => setModalShow(false)} />

      <Tab.Container id="left-tabs-example" defaultActiveKey="gold">
        <Row>
          <Col sm={1}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="gold">Gold</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="silver">Silver</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={11}>
            <Tab.Content>
              <Tab.Pane eventKey="gold">
                <Card>
                  <Card.Body>
                    <Button label="Add" onClick={() => setModalShow(true)} />
                    <DataTable items={goldItems} />
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="silver">
                <Card>
                  <Card.Body>
                    <Tabs
                      defaultActiveKey="profile"
                      id="uncontrolled-tab-example"
                    >
                      <Tab
                        eventKey="silverItemPerPiece"
                        title="Items per piece"
                      >
                        <Button
                          label="Add"
                          onClick={() => setModalShow(true)}
                        />
                        <DataTable items={silverPerPriceItems} />
                      </Tab>
                      <Tab
                        eventKey="silverItemsOnWeight"
                        title="Items on  weight"
                      >
                        <Button
                          label="Add"
                          onClick={() => setModalShow(true)}
                        />
                        <DataTable items={silverPerWeightItems} />
                      </Tab>
                    </Tabs>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

export default Items;

const DataTable: FC<{ items: string[] }> = ({ items }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Item</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, idx) => (
          <tr>
            <td>{idx}</td>
            <td>{item}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
