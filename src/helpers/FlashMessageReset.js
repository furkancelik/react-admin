import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { FLASH_MESSAGE } from "../store/FlashMessage";
export default function FlashMessageReset() {
  const client = useApolloClient();
  const history = useHistory();
  const [setMessage] = useMutation(FLASH_MESSAGE.setMessage);
  const { pathname, state } = useLocation();

  useEffect(() => {
    client.writeData({
      data: { flashMessage: null }
    });
    if (state && state.flashMessage) {
      setMessage({ variables: { ...state.flashMessage } });
      history.replace(pathname, { ...state, flashMessage: null });
    }
  }, [pathname]);

  return null;
}
