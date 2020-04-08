import React from "react";
import Layout from "../../components/Layout";
import ContentHeader from "../../components/Layout/ContentHeader";
import { Row, Col, Button } from "react-bootstrap";
import Card from "../../components/Layout/Card";
import { Link } from "react-router-dom";
import InfoBox from "../../components/InfoBox";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { FLASH_MESSAGE } from "../../store/FlashMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function () {
  const [setMessage] = useMutation(FLASH_MESSAGE.setMessage);

  return (
    <Layout>
      <ContentHeader title={"Yönetim Paneli"} />
      <Layout.Content>
        <Row>
          <Col md={3}>
            <InfoBox
              link={"#"}
              variant={"primary"}
              icon={<FontAwesomeIcon icon={["fas", "users"]} size={"2x"} />}>
              <InfoBox.Title variant={"primary"}>
                Kullanıcı Sayısı
              </InfoBox.Title>
              <InfoBox.SubTitle>2863</InfoBox.SubTitle>
            </InfoBox>
          </Col>
          <Col md={3}>
            <InfoBox
              link={"#"}
              variant={"primary"}
              icon={
                <FontAwesomeIcon icon={["fas", "shopping-cart"]} size={"2x"} />
              }>
              <InfoBox.Title variant={"primary"}>Yeni Siparişler</InfoBox.Title>
              <InfoBox.SubTitle>130</InfoBox.SubTitle>
            </InfoBox>
          </Col>
          <Col md={3}>
            <InfoBox
              link={"#"}
              variant={"primary"}
              icon={<FontAwesomeIcon icon={["fas", "inbox"]} size={"2x"} />}>
              <InfoBox.Title variant={"primary"}>Mesajlar</InfoBox.Title>
              <InfoBox.SubTitle>128</InfoBox.SubTitle>
            </InfoBox>
          </Col>
          <Col md={3}>
            <InfoBox
              link={"#"}
              variant={"primary"}
              icon={<FontAwesomeIcon icon={["fas", "box-open"]} size={"2x"} />}>
              <InfoBox.Title variant={"primary"}>
                Toplam Ürün Sayısı
              </InfoBox.Title>
              <InfoBox.SubTitle>762</InfoBox.SubTitle>
            </InfoBox>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
}
