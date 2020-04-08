import gql from "graphql-tag";

export const initialState = {
  theme: "dark",
};

export const THEME = {
  getTheme: gql`
    {
      theme @client
    }
  `,
  setTheme: gql`
    mutation setTheme($theme: String!) {
      setTheme(theme: $theme) @client
    }
  `,
};

export const resolvers = {
  Mutation: {
    setTheme: async (_, { theme }, { cache, getCacheKey }) => {
      if (theme === null) {
        localStorage.setItem("DATA_THEME", "light");
        cache.writeData({ data: { theme: "light" } });
      } else {
        localStorage.setItem("DATA_THEME", theme);
        cache.writeData({ data: { theme } });
      }

      return null;
    },
  },
  Query: {},
};
