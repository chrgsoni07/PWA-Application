import React from 'react';
import { Card, Button, Table, Modal } from "react-bootstrap";
import MyVerticallyCenteredModal  from "../Rates/MyVerticallyCenteredModal";

const rates = () => {
  return (<>
    <Card>
      <Card.Body>

        <MyVerticallyCenteredModal></MyVerticallyCenteredModal>
        
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
export default rates;