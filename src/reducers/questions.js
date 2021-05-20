import {
  CREATE_QUESTION,
  RETRIEVE_QUESTIONS,
  UPDATE_QUESTION,
  DELETE_QUESTION,
} from "../actions/types";

const initialState = [];

const questionReducer = (questions = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_QUESTION:
      return payload;

    case RETRIEVE_QUESTIONS:
      return payload;

    case UPDATE_QUESTION:
      return questions.map((question) => {
        if (question.id === payload.id) {
          return {
            ...question,
            ...payload,
          };
        } else {
          return question;
        }
      });

    case DELETE_QUESTION:
      return questions.filter(({ id }) => id !== payload.id);

    default:
      return questions;
  }
};

export default questionReducer;
