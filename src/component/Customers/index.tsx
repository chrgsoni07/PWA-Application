import { FormEvent, useState } from "react";
import { Form, Col, Row, Table } from "react-bootstrap";
import { Button } from "primereact/button";
const Customers = () => {
  const tableData = [
    {
      id: 1,
      customerName: "Mangilal ji Soni",
      place: "Dhamniya",
      mobileNo: "+91-784-874-6144",
    },
    {
      id: 2,
      customerName: "Bherulal ji Gayri",
      place: "Liliya",
      mobileNo: "+91-784-477-7541",
    },
    {
      id: 3,
      customerName: "Shambhulal ji Dhakad",
      place: "Khor",
      mobileNo: "+91-784-754-8745",
    },
    {
      id: 4,
      customerName: "Shantilal ji Dhakad",
      place: "Jawad",
      mobileNo: "+91-784-874-7850",
    },
  ];

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className="container">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="formGroupCustomerName">
              <Form.Label>Customer name</Form.Label>
              <Form.Control type="text" required />
              <Form.Control.Feedback type="invalid">
                Please provide customer name
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formGroupPlace">
              <Form.Label>Place</Form.Label>
              <Form.Control type="text" required />
              <Form.Control.Feedback type="invalid">
                Please provide place
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formGroupMobileNo">
              <Form.Label>Mobile no</Form.Label>
              <Form.Control type="number" required />
              <Form.Control.Feedback type="invalid">
                Please provide mobile no
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formGroupAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control as="textarea" rows={2} />
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" label="Submit form" />
      </Form>

      <hr />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Customer name</th>
            <th>Place</th>
            <th>Moblie no</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((d) => (
            <tr>
              <td>{d.id}</td>
              <td>{d.customerName}</td>
              <td>{d.place}</td>
              <td>{d.mobileNo}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Customers;
