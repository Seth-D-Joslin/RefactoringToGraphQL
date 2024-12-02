//-------------------------------- ??? query savedBooks ??? --------------------------------
import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query allusers {
    users {
      id
      username
      email
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      id
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      id
      username
      email
    }
  }
`;
