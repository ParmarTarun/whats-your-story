import React from "react";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddStoryFab = () => {
  return (
    <Link href="/stories/create">
      <Button className="fab-btn ">
        <FontAwesomeIcon icon={faPlus} className="mr1" />
        <span>ADD STORY</span>
      </Button>
    </Link>
  );
};

export default AddStoryFab;
