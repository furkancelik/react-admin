import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useRouteMatch } from "react-router-dom";

function MenuItemTree({ children }) {
  const [show, setShow] = useState(false);

  return (
    <li className={`has-treeview ${show ? "show-menu" : ""}`}>
      {React.Children.map(children, child =>
        React.cloneElement(child, { show, setShow })
      )}
    </li>
  );
}

function MenuItemTreeLink({ children, ...props }) {
  return (
    <a
      href="/#"
      onClick={e => {
        e.preventDefault();
        props.setShow(!props.show);
      }}>
      {children}
      <span>
        <FontAwesomeIcon icon={["fas", "angle-left"]} />
      </span>
    </a>
  );
}

function MenuItemTreeList({ children, ...props }) {
  return (
    <ul className={"nav-tree"}>
      {React.Children.map(children, child => React.cloneElement(child, props))}
    </ul>
  );
}

function MenuItemTreeItem({
  as = NavLink,
  linkProps: _linkProps = {},
  to = null,
  children,
  ...props
}) {
  let match = useRouteMatch({ path: to });

  const linkProps = { ..._linkProps };
  if (linkProps) linkProps.to = to;

  useEffect(() => {
    props.setShow(match ? true : false);
  }, []);

  return (
    <li>
      {React.createElement(
        as,
        { exact: true, activeClassName: "active", ...linkProps },
        children
      )}
    </li>
  );
}

MenuItemTree.Link = MenuItemTreeLink;
MenuItemTree.List = MenuItemTreeList;
MenuItemTree.Item = MenuItemTreeItem;

export default MenuItemTree;
