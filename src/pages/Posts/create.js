import React from "react";
import Layout from "../../components/Layout";
import ContentHeader from "../../components/Layout/ContentHeader";
import { Spinner, Row, Col, Button } from "react-bootstrap";
import Card from "../../components/Layout/Card";
import Form from "./_form";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

import { FLASH_MESSAGE } from "../../store/FlashMessage";
import { LINK, CREATE_TEXT, QUERY } from "./index";

export default function () {
  const link = LINK;
  const [setMessage] = useMutation(FLASH_MESSAGE.setMessage);
  const [createItem, { loading }] = useMutation(QUERY.create);
  const history = useHistory();

  async function onSubmit(input) {
    try {
      await createItem({
        variables: { data: input },
        refetchQueries: [{ query: QUERY.data }],
      });
      history.push(link, {
        flashMessage: {
          type: "success",
          title: "Başarıyla Eklendi",
          message: "",
        },
      });
    } catch (e) {
      setMessage({ variables: { message: e.toString() } });
    }
  }

  return (
    <Layout>
      <ContentHeader
        title={CREATE_TEXT.contentHeaderTitle}
        breadcrumb={CREATE_TEXT.breadcrumbs}
      />
      <Layout.Content>
        <Row>
          <Col md={12}>
            <Card title={CREATE_TEXT.cardTitle}>
              <Form onSubmit={onSubmit} disabled={loading}>
                <Button type={"submit"} variant="primary">
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" /> Yükleniyor...
                    </>
                  ) : (
                    "Kaydet"
                  )}
                </Button>
                <Button
                  as={Link}
                  to={link}
                  variant="outline-primary float-right">
                  İptal
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
}
