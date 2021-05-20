import {
  CREATE_QUESTION,
  RETRIEVE_QUESTIONS,
  UPDATE_QUESTION,
  DELETE_QUESTION,
} from "./types";

export const createQuestion = (name, description) => async (dispatch) => {
  try {
    let currentMenuList = JSON.parse(window.localStorage.getItem("menuList"));
    currentMenuList.push({ name: name, description: description });
    window.localStorage.setItem("menuList", JSON.stringify(currentMenuList));

    const res = await JSON.parse(window.localStorage.getItem("menuList"));
    console.log(res);

    dispatch({
      type: CREATE_QUESTION,
      payload: res,
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveQuestions = () => async (dispatch) => {
  try {
    const res = await JSON.parse(window.localStorage.getItem("menuList"));

    dispatch({
      type: RETRIEVE_QUESTIONS,
      payload: res,
    });
  } catch (err) {
    console.log(err);
  }
};
/*
export const updateQuestion = (id, data) => async (dispatch) => {
  try {
    const res = await QuestionDataService.update(id, data);

    dispatch({
      type: UPDATE_QUESTION,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteQuestion = (id) => async (dispatch) => {
  try {
    await QuestionDataService.remove(id);

    dispatch({
      type: DELETE_QUESTION,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};*/
