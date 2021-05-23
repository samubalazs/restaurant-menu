import {
  RETRIEVE_MENUS,
  CREATE_MENU,
  EDIT_MENU,
  DELETE_MENU,
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
      return menus.filter(({ id }) => id !== payload.id);

    default:
      return menus;
  }
};

export default menuReducer;
