import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Card from "../../components/Layout/Card";
import CKEditor from "../../include/CKEditor";
import FileManagerItem from "../../components/FileManager/Item";
export default function ({
  children,
  item = null,
  onSubmit = null,
  disabled = false,
}) {
  const [input, setInput] = useState({
    image: "",
    document: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    if (item) {
      setInput((oldInput) => {
        const newInput = {};
        Object.keys(oldInput).forEach((key) => {
          newInput[key] = item[key] || "";
        });
        return newInput;
      });
    }
  }, []);

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
              Resim Seçiniz
            </Form.Label>
            <Col sm={10}>
              <FileManagerItem
                value={input.image}
                onSelectFile={(path) => {
                  setInput({ ...input, image: path });
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Döküman Seçiniz
            </Form.Label>
            <Col sm={10}>
              <FileManagerItem
                as={"input"}
                value={input.document}
                onSelectFile={(path) => {
                  setInput({ ...input, document: path });
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Başlık
            </Form.Label>
            <Col sm="10">
              <Form.Control
                required
                type="text"
                name={"title"}
                value={input.title}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              İçerik
            </Form.Label>
            <Col sm="10">
              <CKEditor
                value={input.description}
                onChange={(text) => {
                  setInput({ ...input, description: text });
                }}
              />
            </Col>
          </Form.Group>
        </Card.Body>
        <Card.Footer>{children}</Card.Footer>
      </fieldset>
    </Form>
  );
}
