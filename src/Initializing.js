import React, { useState, useEffect } from "react";
import Router from "./pages/router";
import Login from "./pages/Login/index";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { THEME } from "./store/Theme/index";
export default function Initializing() {
  const [login, setLogin] = useState(null);
  const [setTheme] = useMutation(THEME.setTheme, {
    variables: { theme: localStorage.getItem("DATA_THEME") }
  });

  const {
    data: { theme }
  } = useQuery(THEME.getTheme);

  async function isLoading() {
    const token = localStorage.getItem("TOKEN");
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }

  useEffect(() => {
    isLoading();
    setTheme();
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  if (login === null) return <div>Yükleniyor...</div>;
  if (login) return <Router />;
  return <Login />;
}
