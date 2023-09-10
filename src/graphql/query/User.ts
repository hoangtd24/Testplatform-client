import { gql } from "@apollo/client";
export const GET_PROFILE = gql`
  query GetProfile {
    getProfile {
      username
      email
      birthday
      phone
      address
    }
  }
`;

export const LOAD_USER = gql`
  query Me {
    me {
      code
      success
      message
      user {
        id
        username
        birthday
        phone
        address
      }
    }
  }
`;
