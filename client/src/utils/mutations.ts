// --------------------- ??? saveBook & removeBook ??? ---------------------
import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($input: UserInput!) {
    addUser(input: $input) {
      token
      customer {
        id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      customer {
        id
        username
        email
      }
    }
  }
`;
