import gql from "graphql-tag";

export const initialState = {
  flashMessage: null,
};

export const FLASH_MESSAGE = {
  getMessage: gql`
    {
      flashMessage {
        type @client
        title @client
        message @client
      }
    }
  `,
  setMessage: gql`
    mutation setFlashMessage(
      $type: String!
      $title: String!
      $message: String
    ) {
      setFlashMessage(type: $type, title: $title, message: $message) @client
    }
  `,
};

export const resolvers = {
  Mutation: {
    setFlashMessage: async (_, args, { cache, getCacheKey }) => {
      const data = {
        type: (args && args.type) || "danger",
        message:
          args && args.message === ""
            ? ""
            : (args && args.message) ||
              `Beklenmedik bir hata meydana geldi: \n ${args.message.toString()}`,
        title: (args && args.title) || "Bir Hata Meydana Geldi!",
      };
      cache.writeData({
        data: { flashMessage: { ...data, __typename: "FlashMessage" } },
      });
      return null;
    },
  },
  Query: {},
};
