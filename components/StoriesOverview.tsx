import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faExclamation,
  faHeart,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Card, Button, Row, Col, Modal } from "react-bootstrap";
import Router from "next/router";
import Error, { ErrorProps } from "next/error";
import { Story } from "../utils/customTypes";
import { deleteStory } from "../utils/storyCalls";
import ConfirmationModal from "./common/ConfirmationModal";
import AddStoryFab from "./common/AddStoryFab";

const StroiesOverview = ({
  stories,
  error,
}: {
  stories: Array<Story>;
  error: ErrorProps;
}) => {
  const [show, setShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState<String>("");

  const handleDelete = (id: String) => {
    setShow(false);
    deleteStory(id)
      .then((result) => Router.replace("/stories"))
      .catch((e) => alert(e.message));
  };

  const showConfirmation = (id: String) => {
    setIdToDelete(id);
    setShow(true);
  };

  if (error.statusCode >= 400) return <Error {...error} />;

  return (
    <Row className="mtb3">
      {stories.length === 0 ? (
        <Col>
          <Row className="jcc align-items-center" noGutters>
            <FontAwesomeIcon icon={faExclamation} size="2x" />
            <span className="ml-3">No Data to show</span>
          </Row>
        </Col>
      ) : (
        stories.map(({ _id, title }, i) => (
          <Col sm={12} lg={4} className="mb3" key={i}>
            <Card>
              <Card.Header>
                <Row className="jcb align-items-center" noGutters>
                  <span>CATEGORY</span>
                  <FontAwesomeIcon icon={faHeart} className="ml-auto" />{" "}
                  <span className="ml-1">5</span>
                </Row>
              </Card.Header>
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>#Tag #Tag #Tag</Card.Text>
                <Card.Text></Card.Text>

                <Row className="jcb" noGutters>
                  <Link href={`/stories/read/${_id}`} passHref>
                    <Button>READ</Button>
                  </Link>

                  <Link href={`/stories/edit/${_id}`} passHref>
                    <Button className="ml-auto icon-btn">
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                  </Link>

                  <Button
                    className="icon-btn"
                    onClick={() => showConfirmation(_id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))
      )}
      <AddStoryFab />
      {show && (
        <ConfirmationModal
          show={show}
          hide={() => setShow(false)}
          cb={handleDelete}
          id={idToDelete}
        />
      )}
    </Row>
  );
};

export default StroiesOverview;
