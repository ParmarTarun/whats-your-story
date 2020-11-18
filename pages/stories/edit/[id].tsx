import React, { useState } from "react";
import Router from "next/router";
import { Row, Col, Form, Button } from "react-bootstrap";
import * as url from "../../../utils/urls";
import { GetServerSideProps } from "next";
import { noEmpty } from "../../../utils/validations";
import { updateStory } from "../../../utils/storyCalls";

const EditStory = ({ story }: { story: any }) => {
  const [data, setData] = useState(story);
  const [msg, setMsg] = useState({ id: "", content: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (name === "public") setData({ ...data, [name]: !checked });
    else setData({ ...data, [name]: value });
    setMsg({ id: "", content: "" });
  };

  const handleSubmit = async () => {
    setMsg({ id: "LOADING", content: "Loading..." });
    if (!noEmpty(data)) {
      setMsg({
        id: "ERROR",
        content: "Please provide required inputs before submitting",
      });
      return;
    }
    updateStory(story._id, data)
      .then((result) => Router.push("/stories/read/" + story._id))
      .catch((e) => setMsg({ id: "ERROR", content: e.message }));
  };
  return (
    <div className="mt3">
      <Row className="jcc">
        <Col lg={10} sm={12}>
          <div className="form-container mtb3">
            <h5>Update Story</h5>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="title"
                  placeholder="Give a suitable title"
                  name="title"
                  value={story.title}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Story</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  placeholder="Write here..."
                  name="content"
                  value={story.content}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Check
                type="switch"
                name="public"
                id="public"
                value={data.public}
                onChange={handleChange}
                label="Keep it Private"
              />
              <p id={msg.id}>{msg.content}</p>
              <Row className="jcc">
                <Button
                  style={{ border: 0 }}
                  className="mr1"
                  onClick={handleSubmit}
                >
                  UPDATE
                </Button>
                <Button style={{ border: 0 }} onClick={handleSubmit}>
                  CANCEL
                </Button>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: { id },
}) => {
  const res = await fetch(url.story + id);
  const json = await res.json();
  return { props: { story: json.data } };
};

export default EditStory;
