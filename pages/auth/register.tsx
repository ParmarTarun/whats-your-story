import { useState } from "react";
import Router from "next/router";
import { Form, Button, Row, Col } from "react-bootstrap";

import { register } from "../../utils/authCalls";
import { registerForm } from "../../utils/formobjects";
import { noEmpty } from "../../utils/validations";
const SignUp = () => {
  const [data, setData] = useState(registerForm);
  const [msg, setMsg] = useState({ id: "", content: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setMsg({id:"", content:""});
  };
  const handleSubmit = async () => {
    setMsg({ id: "LOADING", content: "Loading..." });
    const { password, passwordR } = data;
    if (!noEmpty({ ...data, passwordR })) {
      setMsg({
        id: "ERROR",
        content: "Please provide required inputs before submitting",
      });
      return;
    }
    if (password !== passwordR) {
      setMsg({
        id: "ERROR",
        content: "Passwords do not match",
      });
      return;
    }
    register(data)
      .then((token) => Router.push("/auth/login"))
      .catch((e) => setMsg({ id: "ERROR", content: e.message }));
  };
  return (
    <Row className="jcc">
      <Col lg={5} sm={12}>
        <div className="form-container mtb3">
          <h5>Sign Up</h5>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter name"
                value={data.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={data.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Create a secure password"
                value={data.password}
                onChange={handleChange}
              />
              <Form.Text className="text-muted w-75">
                Password must be 8 characters long with atleast an uppercase, a
                numeric &amp; a special character.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword1">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control
                type="password"
                name="passwordR"
                placeholder="Password"
                onChange={handleChange}
              />
            </Form.Group>
            <p id={msg.id}>{msg.content}</p>
            <Row className="jcc">
              <Button
                style={{ border: 0 }}
                onClick={handleSubmit}
                disabled={msg.id === "LOADING"}
              >
                REGISTER
              </Button>
            </Row>
          </Form>
        </div>
      </Col>
    </Row>
  );
};
export default SignUp;
