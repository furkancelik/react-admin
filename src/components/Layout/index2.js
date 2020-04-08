import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../thema/style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import InfoBox from "../InfoBox";
import MainHeader from "./MainHeader";
import SideBar from "./SideBar";
import ContentHeader from "./ContentHeader";
import Footer from "./Footer";
import Card from "./Card";
import {
  Accordion,
  Tabs,
  Tab,
  Alert,
  FormControl,
  InputGroup,
  Form,
  Breadcrumb,
  Container,
  Row,
  Col,
  Button
} from "react-bootstrap";
import ReactTable, {
  EmptyFilter,
  SelectFilter,
  CheckFilter
} from "../../include/Table";

library.add(fas, fab);

function App() {
  const mainHeader = useRef();
  const sidebar = useRef();
  const mainContent = useRef();

  const columns = React.useMemo(() => [
    {
      Header: "#",
      accessor: "id",
      Filter: EmptyFilter
    },
    {
      Header: "First Name",
      accessor: "firstName"
    },
    {
      Header: "Last Name",
      accessor: "lastName"
    },
    {
      Header: "Age",
      accessor: "age",
      Filter: SelectFilter
    },
    {
      Header: "Visits",
      accessor: "visits"
    },
    {
      Header: "Status",
      accessor: "status",
      Filter: CheckFilter
    },
    {
      Header: "Profile Progress",
      accessor: "progress"
    }
  ]);

  const data = [];
  React.useMemo(
    () =>
      Array(100)
        .fill(null)
        .map((v, i) => {
          return {
            id: i + 1,
            firstName: "Furkan",
            lastName: "Çelik",
            age: 25 + i,
            visits: 10,
            status: i % 2 == 0 ? true : false,
            progress: "İşlem"
          };
        }),
    []
  );

  return (
    <>
      <MainHeader
        mainHeader={mainHeader}
        mainContent={mainContent}
        sidebar={sidebar}
      />
      <SideBar sidebar={sidebar} />

      <div ref={mainContent} className={"main-content"}>
        <ContentHeader
          title={"Yönetim Paneli"}
          breadcrumb={[
            { title: "Yönetim Paneli", link: "#" },
            { title: "Anasayfa" }
          ]}
        />

        <section className={"content"}>
          <Container fluid>
            <Row>
              {[
                "primary",
                "secondary",
                "success",
                "danger",
                "warning",
                "info",
                "light",
                "dark"
              ].map(v => (
                <Col md={3}>
                  <InfoBox
                    link={"#"}
                    variant={v}
                    icon={
                      <FontAwesomeIcon icon={["fas", "search"]} size={"2x"} />
                    }>
                    <InfoBox.Title variant={v}>
                      Tamamlanan Sipariş Sayısı
                    </InfoBox.Title>
                    <InfoBox.SubTitle>10</InfoBox.SubTitle>
                  </InfoBox>
                </Col>
              ))}
            </Row>
            <Row>
              <Col md={12}>
                <Card
                  title={"Tablo"}
                  buttons={() => <Button size={"sm"}>Kaydet</Button>}>
                  <Card.Body className={"m-0 p-0"}>
                    <ReactTable
                      loading={false}
                      columns={columns}
                      data={data}
                      pageSize={10}
                    />
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card title={"Alert Mesajlar"}>
                  {[
                    "primary",
                    "secondary",
                    "success",
                    "danger",
                    "warning",
                    "info",
                    "light",
                    "dark"
                  ].map((variant, idx) => (
                    <Alert key={idx} variant={variant}>
                      This is a {variant} alert with{" "}
                      <Alert.Link href="#">an example link</Alert.Link>. Give it
                      a click if you like.
                    </Alert>
                  ))}
                </Card>
              </Col>
              <Col md={6}>
                <Card title={"Tab Menü"}>
                  <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example">
                    <Tab eventKey="home" title="Home">
                      <p>
                        Lorem ipsum dolar sit ametorem ipsum dolar sit amet orem
                        ipsum dolar sit ametorem ipsum dolar sit amet orem ipsum
                        dolar sit amet
                      </p>
                    </Tab>
                    <Tab eventKey="profile" title="Profile">
                      <p>
                        Lorem ipsum dolar sit ametorem ipsum dolar sit amet orem
                        ipsum dolar sit ametorem ipsum dolar sit amet orem ipsum
                        dolar sit amet
                      </p>
                    </Tab>
                    <Tab eventKey="contact" title="Contact" disabled>
                      <p>
                        Lorem ipsum dolar sit ametorem ipsum dolar sit amet orem
                        ipsum dolar sit ametorem ipsum dolar sit amet orem ipsum
                        dolar sit amet
                      </p>
                    </Tab>
                  </Tabs>
                </Card>
              </Col>
              <Col md={12}>
                <Card title={"Form"}>
                  <Form>
                    <Card.Body>
                      asdas <a href="#">ASasd</a> asdsad
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                          placeholder="Username"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                        />
                      </InputGroup>
                      <Form.Group as={Row}>
                        <Form.Label column sm="2">
                          Name
                        </Form.Label>
                        <Col sm="10">
                          <Form.Control
                            disabled
                            placeholder={"Deneme"}
                            type="text"
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row}>
                        <Form.Label column sm="2">
                          Example select
                        </Form.Label>
                        <Col sm="10">
                          <Form.Control as="select">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </Form.Control>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row}>
                        <Form.Label column sm="2">
                          E-mail
                        </Form.Label>
                        <Col sm="10">
                          <Form.Control type="text" />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row}>
                        <Form.Label column sm="2">
                          Example multiple select
                        </Form.Label>
                        <Col sm="10">
                          <Form.Control as="select" multiple>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </Form.Control>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row}>
                        <Form.Label column sm="2">
                          Example textarea
                        </Form.Label>
                        <Col sm="10">
                          <Form.Control as="textarea" rows="3" />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row}>
                        <Form.Label as="legend" column sm={2}>
                          Radios
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Check
                            type="radio"
                            label="first radio"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                          />
                          <Form.Check
                            type="radio"
                            label="second radio"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                          />
                          <Form.Check
                            type="radio"
                            label="third radio"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} controlId="formHorizontalCheck">
                        <Form.Label as="legend" column sm={2}>
                          Checkbox
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Check label="Remember me" />
                        </Col>
                      </Form.Group>
                    </Card.Body>
                    <Card.Footer>
                      <Button variant="primary">Kaydet</Button>
                      <Button variant="outline-primary float-right">
                        İptal
                      </Button>
                    </Card.Footer>
                  </Form>
                </Card>
              </Col>
              <Col md={12}>
                <Card title={"Feature"}>asdsd asds</Card>
              </Col>
            </Row>
          </Container>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default App;
