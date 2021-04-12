import gql from "graphql-tag";

export const GET_USERS = gql`
  query getUsers {
    users {
      id
      name
      rocket
      twitter
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($name: String!, $rocket: String!, $twitter: String!) {
    insert_users(objects: { name: $name, rocket: $rocket, twitter: $twitter }) {
      returning {
        id
        name
        rocket
        twitter
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUserQuery($id: uuid!) {
    delete_users(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;

export const EDIT_USER = gql`
  mutation EditUserQuery($id: uuid!,$name: String!, $rocket: String!, $twitter: String) {
    update_users(
      where: { id: { _eq: $id } }
      _set: { name: $name, rocket: $rocket, twitter: $twitter }
    ) {
      returning {
        name
        rocket
        twitter
      }
    }
  }
`;

export const ADD_USER_SUBSCRIBE = gql`
  subscription AddUserSubscribe($id: uuid!,$name: String!, $rocket: String!, $twitter: String) {
      users(where: {id: {}}) {
        id
        name
        rocket
        twitter
      }
  }
`;

