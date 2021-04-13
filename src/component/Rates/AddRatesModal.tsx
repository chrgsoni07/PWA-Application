import React, { FC } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Dialog } from "primereact/dialog";
type Props = {
  show: boolean;
  onHide: () => void;
};

const AddRatesModal: FC<Props> = (props) => {
  return (
    <Dialog
      modal
      header="Add gold and silver rates"
      visible={props.show}
      style={{ width: "50vw" }}
      footer={
        <Modal.Footer>
          <Button>Save</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      }
      onHide={props.onHide}
    >
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
    </Dialog>
  );
};

export default AddRatesModal;
