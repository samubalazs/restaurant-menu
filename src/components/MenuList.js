import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import {
  initLocalStorage,
  retrieveMenus,
  createMenu,
} from "../actions/menuActions";
import MenuItem from "./MenuItem";

const MenuList = () => {
  const menus = useSelector((state) => state.menus);
  const dispatch = useDispatch();

  useEffect(() => {
    initLocalStorage();
    dispatch(retrieveMenus());
  }, []);

  const initialMenuState = {
    name: "",
    description: "",
  };
  const [menuItemDetails, setMenuItemDetails] = useState(initialMenuState);

  const [showAdd, setShowAdd] = useState(false);

  const showAddMenu = () => setShowAdd(true);
  const closeAddMenu = () => setShowAdd(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMenuItemDetails({ ...menuItemDetails, [name]: value });
  };

  const resetFields = () => {
    menuItemDetails.name = "";
    menuItemDetails.description = "";
  };

  const saveMenu = () => {
    dispatch(createMenu(menuItemDetails))
      .then(retrieveMenus())
      .then(resetFields())
      .then(closeAddMenu());
  };

  const createRouterPath = (routerName) => {
    return `/${routerName}`;
  };

  return (
    <Router>
      <div>
        <h4>Restaurant Menu List</h4>
        <Button variant="primary" onClick={showAddMenu}>
          Add Menu
        </Button>
        <ul>
          {menus &&
            menus.map((menu) => {
              return (
                <li key={menu.name}>
                  <Link to={menu.name}>{menu.name}</Link>
                </li>
              );
            })}
        </ul>

        <hr />

        <Switch>
          {menus &&
            menus.map((menu) => {
              return (
                <Route path={createRouterPath(menu.name)}>
                  <MenuItem menuDetails={menu} />
                </Route>
              );
            })}
        </Switch>
      </div>
      <div>
        <Modal show={showAdd} onHide={closeAddMenu} centered animation={false}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Menu
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={menuItemDetails.name}
                onChange={handleInputChange}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                rows="10"
                cols="100"
                className="form-control"
                id="description"
                required
                value={menuItemDetails.description}
                onChange={handleInputChange}
                name="description"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-success" onClick={saveMenu}>
              Submit
            </Button>
            <Button variant="outline-danger" onClick={closeAddMenu}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Router>
  );
};

export default MenuList;
