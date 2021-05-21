import { RETRIEVE_MENUS, CREATE_MENU, UPDATE_MENU, DELETE_MENU } from "./types";

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
/*
export const updateMenu = (id, data) => async (dispatch) => {
  try {
    const res = await dummy(id, data);

    dispatch({
      type: UPDATE_MENU,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteMenu = (id) => async (dispatch) => {
  try {
    await dummy(id);

    dispatch({
      type: DELETE_MENU,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};*/