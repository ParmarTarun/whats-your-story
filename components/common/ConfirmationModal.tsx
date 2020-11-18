import { Modal, Row, Button } from "react-bootstrap";
type ModalProps = {
  show: boolean;
  hide: any;
  cb: (id: String) => void;
  id: String;
};
const ConfirmationModal = ({ show, hide, cb, id }: ModalProps) => {
  return (
    <Modal size="sm" show={show} onHide={hide} centered>
      <Modal.Header closeButton>Are you sure?</Modal.Header>
      <Modal.Body>
        <Row className="jcc" noGutters>
          <Button className="mr1" onClick={() => cb(id)}>
            YES
          </Button>
          <Button onClick={hide}>NO</Button>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmationModal;
