import React from "react";
import { Card as BootstrapCard, Row, Col } from "react-bootstrap";

function Card({ title, buttons = null, children }) {
  return (
    <BootstrapCard className={"mb-4"}>
      <BootstrapCard.Header>
        <Row>
          <Col className="d-flex align-items-center">
            <h3 className={"card-title"}>{title}</h3>
          </Col>
          <Col className={"text-right"}>{buttons && buttons()}</Col>
        </Row>
      </BootstrapCard.Header>
      {children}
    </BootstrapCard>
  );
}

Card.Body = ({ children, ...props }) => {
  return <BootstrapCard.Body {...props}>{children}</BootstrapCard.Body>;
};

Card.Footer = function({ children, ...a }) {
  return <BootstrapCard.Footer>{children}</BootstrapCard.Footer>;
};

export default Card;
