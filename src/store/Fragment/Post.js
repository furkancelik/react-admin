import gql from "graphql-tag";
import { USER_FRAGMENT } from "./User";
export const POST_FRAGMENT = gql`
  fragment PostFragment on Post {
    id
    document
    image
    title
    description
    user {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;
