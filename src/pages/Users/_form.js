import React, { useState, useEffect } from "react";
import { InputGroup, Form, Row, Col } from "react-bootstrap";
import Card from "../../components/Layout/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function({
  children,
  item = null,
  onSubmit = null,
  disabled = false
}) {
  const [input, setInput] = useState({
    fullName: "",
    username: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    if (item) {
      setInput(oldInput => {
        const newInput = {};
        Object.keys(oldInput).forEach(key => {
          newInput[key] = item[key] || "";
        });
        return newInput;
      });
    }
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit && onSubmit(input);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <fieldset disabled={disabled}>
        <Card.Body>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Adı Soyadı
            </Form.Label>
            <Col sm="10">
              <Form.Control
                required
                type="text"
                name={"fullName"}
                value={input.fullName}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Kullanıcı Adı
            </Form.Label>
            <Col sm="10">
              <Form.Control
                required
                type="text"
                name={"username"}
                value={input.username}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              E-Mail
            </Form.Label>
            <Col sm="10">
              <Form.Control
                required
                type="email"
                name={"email"}
                value={input.email}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Şifre
            </Form.Label>
            <Col sm="10">
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}>
                    <FontAwesomeIcon
                      icon={["fas", showPassword ? "eye" : "eye-slash"]}
                    />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  required={!item ? true : false}
                  type={showPassword ? "text" : "password"}
                  name={"password"}
                  value={input.password}
                  onChange={handleChange}
                />
              </InputGroup>
            </Col>
          </Form.Group>
        </Card.Body>
        <Card.Footer>{children}</Card.Footer>
      </fieldset>
    </Form>
  );
}
