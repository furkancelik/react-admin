import React, { useState } from "react";
import { Spinner, Card, Button, Form } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "../../store/Queries/User";
import { FLASH_MESSAGE } from "../../store/FlashMessage";
import FlashMessage from "../../components/FlashMessage/index";

export default function Login() {
  const [setMessage] = useMutation(FLASH_MESSAGE.setMessage);
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [login, { loading }] = useMutation(LOGIN);

  function setToken(token) {
    localStorage.setItem("TOKEN", token);
    window.location = "/";
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { data: input } });
      if (data.login && data.login.token) setToken(data.login.token);
    } catch (e) {
      setMessage({ variables: { message: e.toString() } });
    }
  }

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  return (
    <div
      className={
        "login-wrapper d-flex flex-column align-items-center justify-content-center"
      }>
      <div className={"login-box"}>
        <div className={"login-logo mb-4"}>
          <strong>Yönetim</strong>Paneli
        </div>

        <FlashMessage />
        <Card>
          <Card.Body>
            <Form className={"pt-2"} onSubmit={onSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  name={"username"}
                  type="text"
                  placeholder={"Kullanıcı Adınız"}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  name={"password"}
                  type="password"
                  placeholder={"Şifreniz"}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button
                disabled={loading}
                type={"submit"}
                variant={"primary"}
                className={"w-100"}>
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" /> Yükleniyor...
                  </>
                ) : (
                  "Giriş Yap"
                )}
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className={"login-footer mt-4"}>
          Bu bir <a href="#"> SW Bilişim</a> ürünüdür. &copy;{" "}
          {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
