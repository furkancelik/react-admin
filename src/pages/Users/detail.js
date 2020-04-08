import React from "react";
import Layout from "../../components/Layout";
import ContentHeader from "../../components/Layout/ContentHeader";
import { Table, Row, Col, Button } from "react-bootstrap";
import Card from "../../components/Layout/Card";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import useErrorHanding from "../../helpers/useErrorHandling";
import Loader from "../../components/Loader";
import { LINK, ITEM, DETAIL_TEXT, QUERY } from "./index";

export default function() {
  const link = LINK;
  const { id } = useParams();
  const { data, loading, error } = useQuery(QUERY.item, { variables: { id } });
  useErrorHanding(error);

  const { [ITEM]: item } = data || {};

  function renderDetail() {
    return (
      <Table borderless={true} hover responsive>
        <tbody>
          <tr>
            <th width={"20%"}>Adı Soyadı</th>
            <td width={"1%"}>:</td>
            <td>{item && item.fullName}</td>
          </tr>
          <tr>
            <th>Kullanıcı Adı</th>
            <td>:</td>
            <td>{item && item.username}</td>
          </tr>
          <tr>
            <th>E-Mail</th>
            <td>:</td>
            <td>{item && item.email}</td>
          </tr>
        </tbody>
      </Table>
    );
  }

  return (
    <Layout>
      <ContentHeader
        title={DETAIL_TEXT.contentHeaderTitle}
        breadcrumb={DETAIL_TEXT.breadcrumbs}
      />
      <Layout.Content>
        <Row>
          <Col md={12}>
            <Card title={DETAIL_TEXT.cardTitle}>
              <Card.Body>
                {loading ? <Loader rowSize={3} /> : renderDetail()}
              </Card.Body>
              <Card.Footer>
                <Button
                  as={Link}
                  to={`${link}/edit/${item && item.id}`}
                  variant="primary">
                  Düzelt
                </Button>
                <Button
                  as={Link}
                  to={link}
                  variant="outline-primary float-right">
                  Geri
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
}
