import React from "react";
import Link from "next/link";
import { Col, Row, Carousel, Card } from "react-bootstrap";
import { slides } from "../utils/data";
const LandingPage = () => {
  return (
    <div className="container" style={{ minHeight: "80vh", padding: "2rem 0" }}>
      <Row className="justify-content-center align-items-end">
        <Col className="text-center" sm={12} lg={8}>
          <Carousel controls={false} indicators={false} pause={false}>
            {slides.map(({ title, image }) => (
              <Carousel.Item interval={3000} key={title}>
                <img className="w-75" src={image} alt="banner" />
              </Carousel.Item>
            ))}
          </Carousel>

          <Row className="justify-content-center mx-auto mt3">
            <Col className="text-left mb-4" sm={12} lg={6}>
              <Link href="/stories">
                <Card className="cp alive">
                  <Card.Body>
                    <h2>Read</h2>
                    <h5 className="mb-2 text-muted">Read public stories</h5>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col className="text-left mb-4" sm={12} lg={6}>
              <Link href="/create">
                <Card className="cp alive">
                  <Card.Body>
                    <h2>Create</h2>
                    <h5 className="mb-2 text-muted">Create your own</h5>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default LandingPage;
