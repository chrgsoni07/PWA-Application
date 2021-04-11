import React, { useState } from 'react';
import { Card, Button, Table, Modal, ButtonGroup } from 'react-bootstrap';
import AddRatesModal from './AddRatesModal';

const Rates = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Card>
        <Card.Body>
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Add rates
          </Button>

          <AddRatesModal show={modalShow} onHide={() => setModalShow(false)} />
          <div style={{ height: 235 }}>
            <iframe
              src="https://www.goldpriceindia.com/wmshare-wlifop-001.php"
              style={{
                position: 'relative',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                width: '100%',
                height: '100%',
                border: 'none',
                margin: 0,
                padding: 0,
                overflow: 'hidden',
              }}
            />
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Gold (10G)</th>
                <th>Silver (1KG)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>47500</td>
                <td>67500</td>
                <td>11-04-2021</td>
              </tr>
              <tr>
                <td>2</td>
                <td>47200</td>
                <td>67200</td>
                <td>10-04-2021</td>
              </tr>
              <tr>
                <td>3</td>
                <td>46500</td>
                <td>67500</td>
                <td>09-04-2021</td>
              </tr>
              <tr>
                <td>4</td>
                <td>46200</td>
                <td>66900</td>
                <td>08-04-2021</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};
export default Rates;
