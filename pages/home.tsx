import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
const Home = () => {
  if (!localStorage.getItem("token")) return <h2>unauthorized</h2>;

  return (
    <React.Fragment>
      <h1>Home Page</h1>

      <Link href="/stories/create">
        <Button className="fab-btn ">
          <FontAwesomeIcon icon={faPlus} className="mr1" />
          <span>ADD STORY</span>
        </Button>
      </Link>
    </React.Fragment>
  );
};

export default Home;
