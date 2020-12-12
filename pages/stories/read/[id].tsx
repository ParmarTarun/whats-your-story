import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faHeart } from "@fortawesome/free-solid-svg-icons";
import Error from "next/error";
import { getStory } from "../../../utils/storyCalls";
import { createStoryForm } from "../../../utils/formobjects";

const FullStory = () => {
  const router = useRouter();
  const id = router.query.id;
  const [story, setStory] = useState(createStoryForm);
  const [error, setError] = useState({
    statusCode: 200,
    title: "OK",
  });

  useEffect(() => {
    getStory(id)
      .then((story) => setStory(story))
      .catch((e) => setError({ statusCode: 400, title: e.message }));
  }, []);

  if (error.statusCode >= 400) return <Error {...error} />;
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

        <FontAwesomeIcon icon={faHeart} />
        <span className="ml-1">5</span>
      </Row>
      <Row className="text-justify">
        <div className="container mt3">{story.content}</div>
      </Row>
    </div>
  );
};

export default FullStory;
