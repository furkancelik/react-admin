import React from "react";
import Layout from "../components/Layout";
import ContentHeader from "../components/Layout/ContentHeader";

export default function NoMatch() {
  return (
    <Layout>
      <ContentHeader
        title={"Sayfa Bulunamadı!"}
        breadcrumb={[
          { title: "Anasayfa", link: "#" },
          { title: "Sayfa Bulunamadı" }
        ]}
      />
      <Layout.Content>
        <div className={"no-match-page"}>
          <h1 className={"text-center text-warning"}>404</h1>
          <p className={"text-center"}>Sayfa Bulunamadı!</p>
        </div>
      </Layout.Content>
    </Layout>
  );
}
