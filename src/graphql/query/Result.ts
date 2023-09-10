import { gql } from "@apollo/client";

export const GET_RESULTS_OF_USER = gql`
  query getResults {
    getResults {
      code
      success
      message
      results {
        id
        score
        exam {
          id
          time
          name
        }
      }
    }
  }
`;

export const GET_ONE_RESULT = gql`
  query getOneResult($resultId: Float!) {
    getOneResult(resultId: $resultId) {
      code
      success
      message
      result {
        score
        exam {
          name
          time
          questions {
            id
            quiz
            options
            type
          }
        }
        userAnswer
        timeStart
      }
    }
  }
`;

export const GET_RESULT = gql`
  query getResult($examId: Float!) {
    getResult(examId: $examId) {
      code
      success
      message
      result {
        score
        exam {
          name
          time
          questions {
            id
            quiz
            options
            type
          }
        }
        userAnswer
        timeStart
      }
    }
  }
`;
