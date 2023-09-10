import { gql } from "@apollo/client";

export const INIT_RESULT = gql`
  mutation initResult($options: [IAnwser!]!, $examId: Float!) {
    initResult(options: $options, examId: $examId) {
      code
      success
      message
      result {
        id
        score
        exam {
          id
          name
        }
      }
    }
  }
`;

export const CREATE_RESULT = gql`
  mutation createResult($options: [IAnwser!]!, $examId: Float!) {
    createResult(options: $options, examId: $examId) {
      code
      success
      message
      result {
        id
        score
        exam {
          id
          name
        }
      }
    }
  }
`;
