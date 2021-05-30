import {
  RETRIEVE_MENUS,
  CREATE_MENU,
  EDIT_MENU,
  DELETE_MENU,
  CREATE_CONTENT,
  EDIT_CONTENT,
  DELETE_CONTENT,
} from "./types";

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

export const createMenu = (details) => async (dispatch) => {
  try {
    let currentMenuList = JSON.parse(window.localStorage.getItem("menuList"));
    currentMenuList.push({
      id: details.id,
      name: details.name,
      description: details.description,
      menuContents: [],
    });
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
      if (menu.id === id) {
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

export const deleteMenu = (removeId) => async (dispatch) => {
  try {
    let currentMenuList = JSON.parse(window.localStorage.getItem("menuList"));
    const updatedMenuList = currentMenuList.filter(({ id }) => id !== removeId);
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

export const createContent = (details) => async (dispatch) => {
  try {
    let currentMenuList = JSON.parse(window.localStorage.getItem("menuList"));
    const updatedMenuList = currentMenuList.map((menu) => {
      if (menu.id === details.parentId) {
        const updatedContentList = menu.menuContents.push({
          id: details.id,
          parentId: details.parentId,
          name: details.name,
          price: details.price,
          ingredients: [],
          quantity: details.quantity,
          measurment: details.measurment,
        });
        return {
          ...menu,
          updatedContentList,
        };
      } else {
        return menu;
      }
    });
    currentMenuList = updatedMenuList;
    window.localStorage.setItem("menuList", JSON.stringify(currentMenuList));

    const res = await JSON.parse(window.localStorage.getItem("menuList"));

    dispatch({
      type: CREATE_CONTENT,
      payload: res,
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const editContent = (id, details, parentId) => async (dispatch) => {
  try {
    let currentMenuList = JSON.parse(window.localStorage.getItem("menuList"));

    const menuItemToChange = currentMenuList.find((obj) => {
      return obj.id === parentId;
    });
    const updatedItem = menuItemToChange.menuContents.map((content) => {
      if (content.id === id) {
        return {
          ...content,
          ...details,
        };
      } else {
        return content;
      }
    });

    menuItemToChange.menuContents = updatedItem;

    const updatedMenuList = currentMenuList.map((menu) => {
      if (menu.id === parentId) {
        return {
          ...menuItemToChange,
        };
      } else {
        return menu;
      }
    });

    window.localStorage.setItem("menuList", JSON.stringify(updatedMenuList));

    const res = await JSON.parse(window.localStorage.getItem("menuList"));

    dispatch({
      type: EDIT_CONTENT,
      payload: res,
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteContent = (removeId, parentId) => async (dispatch) => {
  try {
    let currentMenuList = JSON.parse(window.localStorage.getItem("menuList"));

    const menuItemToChange = currentMenuList.find((obj) => {
      return obj.id === parentId;
    });

    const updatedContentList = menuItemToChange.menuContents.filter(
      ({ id }) => id !== removeId
    );

    menuItemToChange.menuContents = updatedContentList || {};

    const updatedMenuList = currentMenuList.map((menu) => {
      if (menu.id === parentId) {
        return {
          ...menuItemToChange,
        };
      } else {
        return menu;
      }
    });

    if (menuItemToChange.menuContents.length < 1) {
      window.history.go();
    }

    window.localStorage.setItem("menuList", JSON.stringify(updatedMenuList));

    const res = await JSON.parse(window.localStorage.getItem("menuList"));

    dispatch({
      type: DELETE_CONTENT,
      payload: res,
    });
  } catch (err) {
    console.log(err);
  }
};
