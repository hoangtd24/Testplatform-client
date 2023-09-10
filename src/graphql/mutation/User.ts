import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation regiter($registerInput: registerInput!) {
    register(registerInput: $registerInput) {
      code
      success
      message
      user {
        id
        email
        username
        birthday
        phone
        address
      }
      accessToken
      errors{
        field
        message
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($loginInput: loginInput!) {
    login(loginInput: $loginInput) {
      code
      success
      message
      user {
        email
        username
      }
      accessToken
      errors{
        field
        message
      }
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation logout($userId: Float!) {
    logout(userId: $userId) {
      code
      success
      message
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($ProfileInput: ProfileInput!) {
    updateProfile(ProfileInput: $ProfileInput) {
      code
      success
      message
      user {
        email
        username
        address
        phone
        birthday
      }
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($PasswordInput: PasswordInput!) {
    changePassword(PasswordInput: $PasswordInput) {
      code
      success
      message
    }
  }
`;

export const FORGET_PASSWORD = gql`
  mutation forgetPassword($email: String!) {
    forgetPassword(email: $email)
  }
`;
