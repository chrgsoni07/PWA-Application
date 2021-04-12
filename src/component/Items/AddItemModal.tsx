import React, { FC } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


type Props = {
    show: boolean;
    onHide: () => void;
};

const AddItemModal: FC<Props> = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add item
        </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <Form>
                        <Form.Group controlId="formGroup">
                            <Form.Label>Item name</Form.Label>
                            <Form.Control type="text" placeholder="Enter item name" />
                        </Form.Group>
                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button >Save</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );

};

export default AddItemModal;