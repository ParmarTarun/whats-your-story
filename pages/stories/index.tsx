import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Card, Button, Row, Col } from "react-bootstrap";
import { GetServerSideProps } from "next";

import * as url from "../../utils/urls";
import { Story } from "../../utils/customTypes";

const Stories = ({ stories }: { stories: Array<Story> }) => {
  return (
    <React.Fragment>
      <div className="container">
        <Row>
          {stories.map(({ _id, title }, i) => (
            <Col sm={12} lg={4} className="mt-4" key={i}>
              <Card>
                <Card.Header>
                  <Row
                    className="justify-content-between align-items-center"
                    noGutters
                  >
                    <span>CATEGORY</span>
                    <FontAwesomeIcon icon={faHeart} className="ml-auto" />{" "}
                    <span className="ml-1">5</span>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Text>#Tag #Tag #Tag</Card.Text>
                  <Card.Text></Card.Text>

                  <Link href={`/stories/${_id}`} passHref>
                    <Button className="text-right">READ</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(url.getStories);
  const json = await res.json();
  return { props: { stories: json.data } };
};

export default Stories;
