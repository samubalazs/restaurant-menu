import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import {
  initLocalStorage,
  retrieveMenus,
  createMenu,
} from "../actions/menuActions";

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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      .then(handleClose());
  };

  return (
    <div className="list row">
      <div className="col-md-12">
        <h4>Menus List</h4>
        <ul className="list-group">
          {menus &&
            menus.map((menu, index) => (
              <li className={"list-group-item"} key={index}>
                {menu.name}
              </li>
            ))}
        </ul>
        <Button variant="primary" onClick={handleShow}>
          Add Menu
        </Button>

        <div>
          <Modal show={show} onHide={handleClose} centered animation={false}>
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
              <Button variant="outline-danger" onClick={handleClose}>
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
