import React, { FC } from "react";
import { Modal, Button, Form } from "react-bootstrap";

type Props = {
  show: boolean;
  onHide: () => void;
};

const AddRatesModal: FC<Props> = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add gold and silver rates
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <Form>
            <Form.Group controlId="formGroupGoldRate">
              <Form.Label>Gold Rate (10 g)</Form.Label>
              <Form.Control type="number" placeholder="Enter gold rate" />
            </Form.Group>
            <Form.Group controlId="formGroupSilverRate">
              <Form.Label>Silver Rate (1 kg)</Form.Label>
              <Form.Control type="number" placeholder="Enter silver rate" />
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button>Save</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddRatesModal;
