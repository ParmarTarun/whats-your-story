import { useState } from "react";
import Router from "next/router";
import { Form, Button, Row, Col } from "react-bootstrap";

import { noEmpty } from "../../utils/validations";
import { login } from "../../utils/authCalls";
import { loginForm } from "../../utils/formobjects";

const SignIn = () => {
  const [data, setData] = useState(loginForm);
  const [msg, setMsg] = useState({ id: "", content: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
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
    login(data)
      .then((token) => Router.push("/home"))
      .catch((e) => setMsg({ id: "ERROR", content: e.message }));
  };
  return (
    <Row className="jcc">
      <Col lg={5} sm={12}>
        <div className="form-container mtb3">
          <h5>Sign In</h5>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={handleChange}
              />
            </Form.Group>
            <p id={msg.id}>{msg.content}</p>
            <Row className="jcc">
              <Button style={{ border: 0 }} onClick={handleSubmit}>
                LOGIN
              </Button>
            </Row>
          </Form>
        </div>
      </Col>
    </Row>
  );
};
export default SignIn;
