import { gql } from "@apollo/client";
export const GET_EXAMS = gql`
  query getExam($limit: Float!, $cursor: String) {
    getExams(limit: $limit, cursor: $cursor) {
      totalCount
      cursor
      hasMore
      paginatedExams {
        id
        name
        createdAt
        timeStart
        timeEnd
        time
      }
    }
  }
`;

export const GET_ONE_EXAM = gql`
  query getOneExam($ExamIdInput: Float!) {
    getOneExam(ExamIdInput: $ExamIdInput) {
      name
      timeStart
      timeEnd
      time
      questions {
        id
        quiz
        options
        type
      }
    }
  }
`;
