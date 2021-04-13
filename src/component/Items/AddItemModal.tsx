import { Dialog } from "primereact/dialog";
import { FC } from "react";
import { Button, Form } from "react-bootstrap";

type Props = {
  show: boolean;
  onHide: () => void;
};

const AddItemModal: FC<Props> = (props) => {
  return (
    <Dialog
      modal
      header="Add item"
      visible={props.show}
      style={{ width: "50vw" }}
      footer={
        <>
          <Button>Save</Button>
          <Button onClick={props.onHide}>Close</Button>
        </>
      }
      onHide={props.onHide}
    >
      <Form>
        <Form.Group controlId="formGroup">
          <Form.Label>Item name</Form.Label>
          <Form.Control type="text" placeholder="Enter item name" />
        </Form.Group>
      </Form>
    </Dialog>
  );
};

export default AddItemModal;
