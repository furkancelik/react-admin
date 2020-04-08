import React from "react";
import { Row, Col } from "react-bootstrap";

export default function Footer({ footer }) {
  return (
    <footer ref={footer}>
      <Row>
        <Col md={6} className={"text-md-left text-center"}>
          <strong>Tüm hakkı saklıdır &copy; {new Date().getFullYear()}</strong>
        </Col>
        <Col md={6} className={"text-md-right text-center"}>
          <p>SW Bilişim Yönetim Paneli</p>
        </Col>
      </Row>
    </footer>
  );
}
