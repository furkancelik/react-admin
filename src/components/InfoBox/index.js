import React from "react";

import { Col, Card, Row } from "react-bootstrap";

export default function InfoBox({
  children,
  variant = "primary",
  icon,
  footer = null,
  link = null,
  asLink = "a"
}) {
  return (
    <Card className={`card-border-left border-${variant} mb-4`}>
      <Card.Body>
        <Row className="no-gutters">
          <Col className="mr-2">{children}</Col>
          <Col xs={"auto"} className={"d-flex align-items-center text-muted"}>
            {icon}
          </Col>
        </Row>
      </Card.Body>

      {link &&
        React.createElement(
          asLink,
          { href: link, className: "stretched-link hidden" },
          null
        )}
      {footer && (
        <Card.Footer className={"m-0 p-1 text-right card-footer-link"}>
          {footer()}
        </Card.Footer>
      )}
    </Card>
  );
}

InfoBox.Title = ({ children, variant = "primary" }) => {
  return (
    <div
      className={`text-xs font-weight-bold text-${variant} text-uppercase mb-1`}>
      {children}
    </div>
  );
};

InfoBox.SubTitle = ({ children }) => {
  return <div className="h5 mb-0 font-weight-bold text-muted">{children}</div>;
};
