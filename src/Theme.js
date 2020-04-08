import React, { useEffect } from "react";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { THEME } from "./store/Theme/index";

export default function Theme({ children }) {
  const [setTheme] = useMutation(THEME.setTheme, {
    variables: { theme: localStorage.getItem("DATA_THEME") },
  });

  const {
    data: { theme },
  } = useQuery(THEME.getTheme);

  useEffect(() => {
    setTheme();
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return children;
}
