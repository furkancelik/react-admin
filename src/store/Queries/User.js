import gql from "graphql-tag";
import { USER_FRAGMENT } from "../Fragment/User";

export const USER = {
  data: gql`
    query Users {
      users {
        ...UserFragment
      }
    }
    ${USER_FRAGMENT}
  `,
  create: gql`
    mutation CreateUser($data: registerUserInput!) {
      createUser(data: $data) {
        ...UserFragment
      }
    }
    ${USER_FRAGMENT}
  `,
  remove: gql`
    mutation RemoveUser($id: ID!) {
      removeUser(id: $id)
    }
  `,
  item: gql`
    query User($id: ID!) {
      user(id: $id) {
        ...UserFragment
      }
    }
    ${USER_FRAGMENT}
  `,
  update: gql`
    mutation UpdateUser($id: ID!, $data: updateUserInput!) {
      updateUser(id: $id, data: $data) {
        ...UserFragment
      }
    }
    ${USER_FRAGMENT}
  `,
};

export const GET_ME = gql`
  query Me {
    me {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const LOGIN = gql`
  mutation Login($data: loginUserInput!) {
    login(data: $data) {
      token
    }
  }
`;
