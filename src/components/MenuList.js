import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Button, Modal, Navbar, Nav } from "react-bootstrap";
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
    id: "",
    name: "",
    description: "",
  };
  const [menuItemDetails, setMenuItemDetails] = useState(initialMenuState);

  const [showAdd, setShowAdd] = useState(false);

  const showAddMenu = () => setShowAdd(true);
  const closeAddMenu = () => {
    resetFields();
    setShowAdd(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setMenuItemDetails({
        ...menuItemDetails,
        id: value.toLowerCase().replace(/ /g, "-"),
        name: value,
      });
    } else {
      setMenuItemDetails({ ...menuItemDetails, [name]: value });
    }
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
      <React.Fragment>
        <h1>Restaurant Menu List</h1>
        <Navbar bg="light" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              {menus &&
                menus.map((menu, id) => {
                  return (
                    <Nav.Link href={menu.name} key={id}>
                      {menu.name}
                    </Nav.Link>
                  );
                })}
            </Nav>
            <div className="add-menu">
              <Button variant="dark" onClick={showAddMenu}>
                Add Menu
              </Button>
            </div>
          </Navbar.Collapse>
        </Navbar>

        <hr />

        <Switch>
          {menus &&
            menus.map((menu, id) => {
              return (
                <Route path={createRouterPath(menu.name)} key={id}>
                  <MenuItem menuDetails={menu} />
                </Route>
              );
            })}
        </Switch>
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
      </React.Fragment>
    </Router>
  );
};

export default MenuList;
