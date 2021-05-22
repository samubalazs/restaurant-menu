import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Tabs, Tab } from "react-bootstrap";
import {
  initLocalStorage,
  retrieveMenus,
  createMenu,
} from "../actions/menuActions";
import MenuContent from "./MenuContent";

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
  const [menuGroup, setMenu] = useState(initialMenuState);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const showAddMenu = () => setShowAdd(true);
  const closeAddMenu = () => setShowAdd(false);
  const showEditMenu = () => setShowEdit(true);
  const closeEditMenu = () => setShowEdit(false);

  const nameInputRef = useRef();
  const descriptionInputRef = useRef();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMenu({ ...menuGroup, [name]: value });
  };

  const resetFields = () => {
    menuGroup.name = "";
    menuGroup.description = "";
  };

  const saveMenu = () => {
    const { name, description } = menuGroup;

    dispatch(createMenu(name, description))
      .then(retrieveMenus())
      .then(resetFields())
      .then(closeAddMenu());
  };

  const saveChanges = () => {
    console.log("clicked");
  };

  const menuListItem = (menu, index) => {
    return (
      <Tab eventKey={menu.name} title={menu.name} key={index}>
        {menu.description}
        <Button variant="primary" onClick={showEditMenu}>
          Edit Menu
        </Button>
        {menu.menuContents &&
          menu.menuContents.map((content) => <MenuContent content={content} />)}
        <div>
          <Modal
            show={showEdit}
            onHide={closeEditMenu}
            centered
            animation={false}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Modal heading
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
                  value={menu.name}
                  onChange={handleInputChange}
                  name="name"
                  ref={nameInputRef}
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
                  value={menu.description}
                  onChange={handleInputChange}
                  name="description"
                  ref={descriptionInputRef}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-success" onClick={saveChanges}>
                Save
              </Button>
              <Button variant="outline-danger" onClick={closeEditMenu}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Tab>
    );
  };

  return (
    <div className="list row">
      <div className="col-md-12">
        <h4>Restaurant Menu List</h4>
        <Button variant="primary" onClick={showAddMenu}>
          Add Menu
        </Button>

        <Tabs>
          {menus && menus.map((menu, index) => menuListItem(menu, index))}
        </Tabs>

        <div>
          <Modal
            show={showAdd}
            onHide={closeAddMenu}
            centered
            animation={false}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Modal heading
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
                  value={menuGroup.name}
                  onChange={handleInputChange}
                  name="name"
                  ref={nameInputRef}
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
                  value={menuGroup.description}
                  onChange={handleInputChange}
                  name="description"
                  ref={descriptionInputRef}
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
      </div>
    </div>
  );
};

export default MenuList;
