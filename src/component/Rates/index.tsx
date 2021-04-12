import { useState } from 'react';
import { Card, Button, Table } from 'react-bootstrap';
import AddRatesModal from './AddRatesModal';

const Rates = () => {
  const [modalShow, setModalShow] = useState(false);

  const tableData = [
    { id: 1, gold: 47500, silver: 67500, date: '11-04-2021' },
    { id: 2, gold: 47200, silver: 67200, date: '10-04-2021' },
    { id: 3, gold: 46500, silver: 67500, date: '09-04-2021' },
    { id: 4, gold: 46200, silver: 66900, date: '08-04-2021' },
  ];
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
              {tableData.map((d) => (
                <tr>
                  <td>{d.id}</td>
                  <td>{d.gold}</td>
                  <td>{d.silver}</td>
                  <td>{d.date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};
export default Rates;
