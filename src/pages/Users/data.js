import React from "react";
import Layout from "../../components/Layout";
import ContentHeader from "../../components/Layout/ContentHeader";
import { Row, Col, Button } from "react-bootstrap";
import Card from "../../components/Layout/Card";
import { Link } from "react-router-dom";
import ReactTable, { EmptyFilter } from "../../include/Table";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Moment from "../../include/Moment";
import { FLASH_MESSAGE } from "../../store/FlashMessage";
import useErrorHanding from "../../helpers/useErrorHandling";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LINK, ITEMS, REMOVE_KEY, DATA_TEXT, QUERY } from "./index";

export default function () {
  const link = LINK;
  const [setMessage] = useMutation(FLASH_MESSAGE.setMessage);
  const [remove] = useMutation(QUERY.remove);
  const { data, error, loading } = useQuery(QUERY.data);
  useErrorHanding(error);

  function removeItem(id) {
    return async (e) => {
      e.preventDefault();
      if (window.confirm("Silmek istediğinize eminmisniz?")) {
        try {
          await remove({
            variables: { id },
            optimisticResponse: {
              [REMOVE_KEY]: true,
            },
            update: (state) => {
              const store = state.readQuery({
                query: QUERY.data,
              });
              state.writeQuery({
                query: QUERY.data,
                data: {
                  [ITEMS]: store[ITEMS].filter(
                    ({ id: itemId }) => id !== itemId
                  ),
                },
              });
            },
          });
          setMessage({
            variables: {
              title: "Başarıyla Silindi",
              type: "success",
              message: "",
            },
          });
        } catch (e) {
          setMessage({ variables: { message: e.toString() } });
        }
      }
    };
  }

  return (
    <Layout>
      <ContentHeader
        title={DATA_TEXT.contentHeaderTitle}
        breadcrumb={DATA_TEXT.breadcrumbs}
      />
      <Layout.Content>
        <Row>
          <Col md={12}>
            <Card
              title={DATA_TEXT.cardTitle}
              buttons={() => (
                <Button as={Link} to={`${link}/create`} size={"sm"}>
                  Yeni Ekle
                </Button>
              )}>
              <Card.Body className={"m-0 p-0"}>
                <ReactTable
                  loading={loading}
                  columns={React.useMemo(
                    () => [
                      {
                        Header: "Adı Soyadı",
                        accessor: "fullName",
                      },
                      {
                        Header: "E-Mail",
                        accessor: "email",
                      },
                      {
                        Header: "Kullanıcı Adı",
                        accessor: "username",
                      },
                      {
                        Header: "Üyelik Tarihi",
                        accessor: "createdAt",
                        Cell: ({ cell: { value } }) => {
                          return <Moment fromNow>{value}</Moment>;
                        },
                      },
                      {
                        Header: "İşlemler",
                        accessor: "id",
                        Filter: EmptyFilter,
                        Cell: ({ cell: { value } }) => {
                          return (
                            <>
                              <Button
                                as={Link}
                                to={`${link}/detail/${value}`}
                                size={"sm"}
                                className={"mr-2"}
                                variant={"warning"}>
                                <FontAwesomeIcon icon={["fas", "eye"]} /> Detay
                              </Button>
                              <Button
                                as={Link}
                                to={`${link}/edit/${value}`}
                                size={"sm"}
                                className={"mr-2"}
                                variant={"warning"}>
                                <FontAwesomeIcon icon={["fas", "edit"]} />{" "}
                                Düzelt
                              </Button>
                              <Button
                                onClick={removeItem(value)}
                                type={"button"}
                                size={"sm"}
                                variant="danger">
                                <FontAwesomeIcon icon={["fas", "trash"]} /> Sil
                              </Button>
                            </>
                          );
                        },
                      },
                    ],
                    []
                  )}
                  data={React.useMemo(() => (data ? data[ITEMS] : []), [
                    data && data[ITEMS],
                  ])}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
}
