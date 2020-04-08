import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import MenuItem from "../MenuItem";
import MenuItemTree from "../MenuItem/Tree";

export default function SideBar({ sidebar }) {
  return (
    <div ref={sidebar} className={"sidebar"}>
      <div className={"sidebar-header"}>
        <Link to="/">
          <span className={"logo-lg"}>
            <strong>Yönetim</strong>Paneli
          </span>
          <span className={"logo-xs"}>
            <strong>Y</strong>P
          </span>
        </Link>
      </div>
      <nav>
        <ul>
          <MenuItem to={"/dashboard"}>
            <span>
              <FontAwesomeIcon icon={["fab", "apple"]} />
            </span>
            <p>Yönetim Paneli</p>
          </MenuItem>

          {/* <MenuItemTree>
            <MenuItemTree.Link to="/a">
              <span>
                <FontAwesomeIcon icon={["fab", "apple"]} />
              </span>
              <p>Yönetim Paneli</p>
            </MenuItemTree.Link>
            <MenuItemTree.List>
              <MenuItemTree.Item to="/a">
                <span>
                  <FontAwesomeIcon icon={["far", "circle"]} />
                </span>
                <p>Yönetim Paneli</p>
              </MenuItemTree.Item>
              <MenuItemTree.Item to="/a">
                <span>
                  <FontAwesomeIcon icon={["far", "circle"]} />
                </span>
                <p>Yönetim Paneli</p>
              </MenuItemTree.Item>
              <MenuItemTree.Item to="/a">
                <span>
                  <FontAwesomeIcon icon={["far", "circle"]} />
                </span>
                <p>Yönetim Paneli</p>
              </MenuItemTree.Item>
              <MenuItemTree.Item to="/a">
                <span>
                  <FontAwesomeIcon icon={["far", "circle"]} />
                </span>
                <p>Yönetim Paneli</p>
              </MenuItemTree.Item>
            </MenuItemTree.List>
          </MenuItemTree> */}

          <MenuItem to={"/post"}>
            <span>
              <FontAwesomeIcon icon={["fas", "paste"]} />
            </span>
            <p>İçerikler</p>
          </MenuItem>

          <MenuItem to={"/user"}>
            <span>
              <FontAwesomeIcon icon={["fas", "users"]} />
            </span>
            <p>Yöneticiler</p>
          </MenuItem>

          <li>
            <Link
              to={"/#"}
              onClick={(e) => {
                e.preventDefault();
                localStorage.removeItem("TOKEN");
                window.location = "/";
              }}>
              <span>
                <FontAwesomeIcon icon={["fas", "power-off"]} />
              </span>
              <p>Çıkış Yap</p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
