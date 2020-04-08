import React from "react";
import { GET_ME } from "../store/Queries/User";
import { useQuery } from "@apollo/react-hooks";
import { Spinner } from "react-bootstrap";

export default (Component) => (props) => {
  const { data, error, loading } = useQuery(GET_ME);

  if (loading) {
    return (
      <div>
        <Spinner animation="border" size="sm" />
        Yönetim paneline yönlendiriliyorsunuz.
      </div>
    );
  }

  if (error) {
    localStorage.removeItem("TOKEN");
    window.location = "/";
  }

  return <Component {...props} session={data} />;
};
