import React from "react";
import Router from "next/router";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faHeart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import * as url from "../../utils/urls";

const Story = ({ story }) => {
  return (
    <div className="mt3">
      <Row className="align-items-center justify-content-between" noGutters>
        <FontAwesomeIcon
          icon={faAngleLeft}
          size="2x"
          className="mr1 cp fl"
          onClick={Router.back}
        />
        <h3 className="mr-auto">{story.title}</h3>

        <FontAwesomeIcon icon={faHeart}/>
        <span className="ml-1">5</span>
      </Row>
      <Row className="text-justify">
        <div className="container mt3">{story.content}</div>
      </Row>
    </div>
  );
};

Story.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(url.getStory + id);
  const json = await res.json();
  return { story: json.data };
};

export default Story;
