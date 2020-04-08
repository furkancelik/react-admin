import React from "react";
import Layout from "../../components/Layout";
import ContentHeader from "../../components/Layout/ContentHeader";
import { Row, Col, Button, Spinner } from "react-bootstrap";
import Card from "../../components/Layout/Card";
import Form from "./_form";
import { useHistory, useParams, Link } from "react-router-dom";
import useErrorHanding from "../../helpers/useErrorHandling";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "../../components/Loader";
import { FLASH_MESSAGE } from "../../store/FlashMessage";
import { LINK, ITEM, EDIT_TEXT, QUERY } from "./index";

export default function() {
  const link = LINK;
  const { id } = useParams();
  const history = useHistory();
  const [setMessage] = useMutation(FLASH_MESSAGE.setMessage);

  const { data, loading: itemLoading, error } = useQuery(QUERY.item, {
    variables: { id }
  });
  useErrorHanding(error);

  const { [ITEM]: item } = data || {};

  const [updateItem, { loading }] = useMutation(QUERY.update);

  async function onSubmit(input) {
    console.log(input);
    try {
      await updateItem({
        variables: { id, data: input },
        refetchQueries: [{ query: QUERY.data }]
      });
      history.push(link, {
        flashMessage: {
          type: "success",
          title: "Başarıyla Düzenlendi",
          message: ""
        }
      });
    } catch (e) {
      setMessage({ variables: { message: e.toString() } });
    }
  }

  return (
    <Layout>
      <ContentHeader
        title={EDIT_TEXT.contentHeaderTitle}
        breadcrumb={EDIT_TEXT.breadcrumbs}
      />
      <Layout.Content>
        <Row>
          <Col md={12}>
            <Card title={EDIT_TEXT.cardTitle}>
              {itemLoading ? (
                <Card.Body>
                  <Loader rowSize={4} />
                </Card.Body>
              ) : (
                <Form item={item} onSubmit={onSubmit} disabled={loading}>
                  <Button type={"submit"} variant="primary">
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" /> Yükleniyor...
                      </>
                    ) : (
                      "Düzenle"
                    )}
                  </Button>
                  <Button
                    as={Link}
                    to={link}
                    variant="outline-primary float-right">
                    İptal
                  </Button>
                </Form>
              )}
            </Card>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
}
