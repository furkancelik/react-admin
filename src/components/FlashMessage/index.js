import React from "react";
import { Alert } from "react-bootstrap";
import { useQuery } from "@apollo/react-hooks";
import { FLASH_MESSAGE } from "../../store/FlashMessage/index";

export default function FlashMessage() {
  const {
    data: { flashMessage },
    client
  } = useQuery(FLASH_MESSAGE.getMessage);

  if (!flashMessage) return null;

  return (
    <Alert
      variant={flashMessage.type}
      onClose={() => {
        client.writeData({
          data: { flashMessage: null }
        });
      }}
      dismissible>
      {flashMessage.title !== "" && (
        <Alert.Heading>{flashMessage.title}</Alert.Heading>
      )}
      {flashMessage.message !== "" &&
      typeof flashMessage.message !== "string" ? (
        <ul>
          {flashMessage.message.map((message, i) => (
            <li key={i}>{message}</li>
          ))}
        </ul>
      ) : (
        <p>{flashMessage.message.toString()}</p>
      )}
    </Alert>
  );
}
