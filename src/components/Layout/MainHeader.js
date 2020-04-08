import React from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { THEME } from "../../store/Theme";
import { Link } from "react-router-dom";

export default function MainHeader({
  mainHeader,
  sidebar,
  mainContent,
  footer
}) {
  const {
    data: { theme }
  } = useQuery(THEME.getTheme);
  const [setTheme] = useMutation(THEME.setTheme);

  return (
    <>
      <nav ref={mainHeader} className={"main-header"}>
        <ul>
          <li>
            <a
              href="/#"
              onClick={e => {
                e.preventDefault();
                mainHeader.current.classList.toggle("sidebar-hidden");
                mainContent.current.classList.toggle("sidebar-hidden");
                footer.current.classList.toggle("sidebar-hidden");
                sidebar.current.classList.toggle("hidden");
              }}>
              <FontAwesomeIcon icon={["fas", "bars"]} />
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <span style={{ display: "flex" }}>
              <Toggle
                className={"dark-mode-toggle"}
                id="cheese-status"
                defaultChecked={
                  theme === null ? false : theme === "light" ? false : true
                }
                icons={{
                  checked: <span className={"icon moon"}></span>,
                  unchecked: <span className={"icon sun"}></span>
                }}
                onChange={e => {
                  if (e.target.checked) {
                    setTheme({ variables: { theme: "dark" } });
                  } else {
                    setTheme({ variables: { theme: "light" } });
                  }
                }}
              />
            </span>
          </li>
          <li>
            <a href="/#">
              <FontAwesomeIcon icon={["fas", "redo-alt"]} />
            </a>
          </li>
          <li>
            <a href="/#">
              <FontAwesomeIcon icon={["fas", "user"]} />
            </a>
          </li>
          <li>
            <Link
              to={"/#"}
              onClick={e => {
                e.preventDefault();
                localStorage.removeItem("TOKEN");
                window.location = "/";
              }}>
              <FontAwesomeIcon icon={["fas", "power-off"]} />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
