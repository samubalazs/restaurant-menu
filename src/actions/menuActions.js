import { RETRIEVE_MENUS, CREATE_MENU, EDIT_MENU, DELETE_MENU } from "./types";

import menuList from "./initMenu";

export const initLocalStorage = () => {
  if (!window.localStorage.getItem("menuList")) {
    window.localStorage.clear();
    window.localStorage.setItem("menuList", JSON.stringify(menuList));
  }
};

export const retrieveMenus = () => async (dispatch) => {
  try {
    const res = await JSON.parse(window.localStorage.getItem("menuList"));

    dispatch({
      type: RETRIEVE_MENUS,
      payload: res,
    });
  } catch (err) {
    console.log(err);
  }
};

export const createMenu = (name, description) => async (dispatch) => {
  try {
    let currentMenuList = JSON.parse(window.localStorage.getItem("menuList"));
    currentMenuList.push({ name: name, description: description });
    window.localStorage.setItem("menuList", JSON.stringify(currentMenuList));

    const res = await JSON.parse(window.localStorage.getItem("menuList"));

    dispatch({
      type: CREATE_MENU,
      payload: res,
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const editMenu = (id, data) => async (dispatch) => {
  try {
    let currentMenuList = JSON.parse(window.localStorage.getItem("menuList"));
    const updatedMenuList = currentMenuList.map((menu) => {
      if (menu._id === id) {
        return {
          ...menu,
          ...data,
        };
      } else {
        return menu;
      }
    });
    window.localStorage.setItem("menuList", JSON.stringify(updatedMenuList));

    const res = await JSON.parse(window.localStorage.getItem("menuList"));

    dispatch({
      type: EDIT_MENU,
      payload: res,
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteMenu = (id) => async (dispatch) => {
  try {
    let currentMenuList = JSON.parse(window.localStorage.getItem("menuList"));
    const updatedMenuList = currentMenuList.filter(({ _id }) => _id !== id);
    window.localStorage.setItem("menuList", JSON.stringify(updatedMenuList));

    const res = await JSON.parse(window.localStorage.getItem("menuList"));

    dispatch({
      type: DELETE_MENU,
      payload: res,
    });
  } catch (err) {
    console.log(err);
  }
};
