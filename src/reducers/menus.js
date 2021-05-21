import {
  RETRIEVE_MENUS,
  CREATE_MENU,
  UPDATE_MENU,
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

    case UPDATE_MENU:
      return menus.map((menu) => {
        if (menu.id === payload.id) {
          return {
            ...menu,
            ...payload,
          };
        } else {
          return menu;
        }
      });

    case DELETE_MENU:
      return menus.filter(({ id }) => id !== payload.id);

    default:
      return menus;
  }
};

export default menuReducer;
