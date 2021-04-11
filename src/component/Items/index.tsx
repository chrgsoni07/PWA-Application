import React from 'react';
import {
  Col,
  Nav,
  Row,
  Tab,
  Tabs,
  Table,
  Card,
  Container,
  Button,
} from 'react-bootstrap';

const Items = () => {
  return (
    <>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={1}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Gold</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Silver</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={11}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Card>
                  <Card.Body>
                    <Button variant="primary">ADD</Button>{' '}
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Item</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Jhumki</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Haar</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Mangal Sutra</td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>Anguthi</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
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
                        <Button variant="primary">ADD</Button>{' '}
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Item</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>Anguthi</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Pendil</td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>Chandrama</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Tab>
                      <Tab
                        eventKey="silverItemsOnWeight"
                        title="Items on  weight"
                      >
                        <Button variant="primary">ADD</Button>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Item</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>Payjab</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Bicchi</td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>Chain</td>
                            </tr>
                            <tr>
                              <td>4</td>
                              <td>Gugru</td>
                            </tr>
                          </tbody>
                        </Table>
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
