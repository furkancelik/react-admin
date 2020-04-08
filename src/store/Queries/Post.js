import gql from "graphql-tag";
import { POST_FRAGMENT } from "../Fragment/Post";

export const POST = {
  data: gql`
    query Posts {
      posts {
        ...PostFragment
      }
    }
    ${POST_FRAGMENT}
  `,
  create: gql`
    mutation CreatePost($data: postFieldInput!) {
      createPost(data: $data) {
        ...PostFragment
      }
    }
    ${POST_FRAGMENT}
  `,
  remove: gql`
    mutation RemovePost($id: ID!) {
      removePost(id: $id)
    }
  `,
  item: gql`
    query Post($id: ID!) {
      post(id: $id) {
        ...PostFragment
      }
    }
    ${POST_FRAGMENT}
  `,
  update: gql`
    mutation UpdatePost($id: ID!, $data: postFieldInput!) {
      updatePost(id: $id, data: $data) {
        ...PostFragment
      }
    }
    ${POST_FRAGMENT}
  `,
};
