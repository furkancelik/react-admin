import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../thema/style.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import MainHeader from "./MainHeader";
import SideBar from "./SideBar";
import Footer from "./Footer";
import { Container } from "react-bootstrap";
library.add(fas, fab, far);

function Layout({ children }) {
  const mainHeader = useRef();
  const sidebar = useRef();
  const mainContent = useRef();
  const footer = useRef();

  return (
    <>
      <MainHeader
        mainHeader={mainHeader}
        mainContent={mainContent}
        sidebar={sidebar}
        footer={footer}
      />
      <SideBar sidebar={sidebar} />
      <div ref={mainContent} className={"main-content"}>
        {children}
      </div>
      <Footer footer={footer} />
    </>
  );
}

Layout.Content = ({ children }) => {
  return (
    <section className={"content"}>
      <Container fluid>{children}</Container>
    </section>
  );
};

export default Layout;
