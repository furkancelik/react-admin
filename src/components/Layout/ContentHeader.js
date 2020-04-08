import React from "react";
import { Breadcrumb, Container, Row, Col } from "react-bootstrap";
import FlashMessage from "../FlashMessage";
import { Link } from "react-router-dom";
export default function ContentHeader({ title = null, breadcrumb = null }) {
  return (
    <section className={"content-header"}>
      <Container fluid>
        <Row>
          <Col sm={6}>{title && <h1>{title}</h1>}</Col>
          <Col sm={6}>
            {breadcrumb && (
              <Breadcrumb className={"float-sm-right"}>
                {breadcrumb.map((item, i) =>
                  item.link ? (
                    <Breadcrumb.Item
                      key={`breadcrumb_${i}`}
                      linkAs={Link}
                      linkProps={{ to: item.link }}>
                      {item.title}
                    </Breadcrumb.Item>
                  ) : (
                    <Breadcrumb.Item key={"breadcrumb_active"} active>
                      {item.title}
                    </Breadcrumb.Item>
                  )
                )}
              </Breadcrumb>
            )}
          </Col>
          <Col md={12} className={"mt-3"}>
            <FlashMessage />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
