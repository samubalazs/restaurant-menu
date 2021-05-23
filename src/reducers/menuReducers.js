import {
  RETRIEVE_MENUS,
  CREATE_MENU,
  EDIT_MENU,
  DELETE_MENU,
  CREATE_CONTENT,
  EDIT_CONTENT,
  DELETE_CONTENT,
} from "../actions/types";

const initialState = [];

const menuReducer = (menus = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case RETRIEVE_MENUS:
      return payload;

    case CREATE_MENU:
      return payload;

    case EDIT_MENU:
      return payload;

    case DELETE_MENU:
      return payload;

    case CREATE_CONTENT:
      return payload;

    case EDIT_CONTENT:
      return payload;

    case DELETE_CONTENT:
      return payload;

    default:
      return menus;
  }
};

export default menuReducer;
