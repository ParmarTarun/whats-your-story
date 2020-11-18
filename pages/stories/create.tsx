import { useState } from "react";
import Router from "next/router";
import { Form, Button, Row, Col } from "react-bootstrap";

import { noEmpty } from "../../utils/validations";
import { createStory } from "../../utils/storyCalls";
import { createStoryForm } from "../../utils/formobjects";

const Create = () => {
  const [data, setData] = useState(createStoryForm);
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
    createStory(data)
      .then((result) => Router.push("/stories"))
      .catch((e) => setMsg({ id: "ERROR", content: e.message }));
  };
  return (
    <Row className="jcc">
      <Col lg={10} sm={12}>
        <div className="form-container mtb3">
          <h5>New Story</h5>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Give a suitable title"
                name="title"
                value={data.title}
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
                value={data.content}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Check
              type="switch"
              name="public"
              id="public"
              onChange={handleChange}
              label="Keep it Private"
            />
            <p id={msg.id}>{msg.content}</p>
            <Row className="jcc">
              <Button style={{ border: 0 }} onClick={handleSubmit}>
                CREATE
              </Button>
            </Row>
          </Form>
        </div>
      </Col>
    </Row>
  );
};
export default Create;
