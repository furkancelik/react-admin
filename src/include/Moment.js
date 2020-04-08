import React from "react";
import Moment from "react-moment";
import "moment/locale/tr";

export default function ({ children, ...prosp }) {
  return (
    <Moment element={React.Fragment} {...prosp}>
      {children}
    </Moment>
  );
}
