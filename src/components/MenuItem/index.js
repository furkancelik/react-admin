import React from "react";
import { NavLink } from "react-router-dom";

export default function MenuItem({
  as = NavLink,
  to = null,
  icon = null,
  children,
  iconProps = {},
  linkProps: _linkProps = {}
}) {
  const linkProps = { ..._linkProps };
  if (linkProps) linkProps.to = to;
  if (!to) delete linkProps.to;

  return (
    <li>
      {React.createElement(
        as,
        { activeClassName: "active", ...linkProps },
        children
      )}
    </li>
  );
}
