import { useEffect } from "react";
import { FLASH_MESSAGE } from "../store/FlashMessage";
import { useMutation } from "@apollo/react-hooks";

export default function useErrorHanding(error, message = null) {
  const [setMessage] = useMutation(FLASH_MESSAGE.setMessage);
  useEffect(() => {
    if (error) {
      setMessage({
        variables: {
          type: (message && message.type) || "danger",
          message:
            (message && message.message) ||
            `Beklenmedik bir hata meydana geldi: \n ${error.message.toString()}`,
          title: (message && message.title) || "Bir Hata Meydana Geldi!"
        }
      });
    }
  }, [error]);
  return null;
}
