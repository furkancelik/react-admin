import { ApolloClient } from "apollo-client";

import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

import { createUploadLink } from "apollo-upload-client";
import { API_URL } from "../config";

import {
  initialState as flashMessageInitialState,
  resolvers as flashMessageResolvers,
} from "./FlashMessage/index";

import {
  initialState as themeInitialState,
  resolvers as themeResolvers,
} from "./Theme/index";

const cache = new InMemoryCache();

const initialState = {
  data: {
    ...flashMessageInitialState,
    ...themeInitialState,
  },
};

const linkWithFileUpload = createUploadLink({
  uri: API_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = `${localStorage.getItem("TOKEN")}`;
  return {
    headers: {
      ...headers,
      authorization: token || null,
    },
  };
});

const client = new ApolloClient({
  cache,
  resolvers: {
    Mutation: { ...flashMessageResolvers.Mutation, ...themeResolvers.Mutation },
    Query: { ...flashMessageResolvers.Query, ...themeResolvers.Query },
  },
  link: authLink.concat(linkWithFileUpload),
});

client.cache.writeData(initialState);

export default client;
