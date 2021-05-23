import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { editMenu, retrieveMenus } from "../actions/menuActions";
import MenuContent from "./MenuContent";

const MenuItem = (props) => {
  const menuDetails = props.menuDetails;

  const [menuItemDetails, setMenuItemDetails] = useState(menuDetails);
  const [showEdit, setShowEdit] = useState(false);

  const showEditMenu = () => setShowEdit(true);
  const closeEditMenu = () => setShowEdit(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMenuItemDetails({ ...menuItemDetails, [name]: value });
  };

  const dispatch = useDispatch();

  const saveChanges = () => {
    console.log("clicked", menuItemDetails);

    dispatch(editMenu(menuItemDetails._id, menuItemDetails))
      .then(closeEditMenu())
      .then(
        window.history.replaceState(
          null,
          menuItemDetails.name,
          `/${menuItemDetails.name}`
        )
      );
  };

  //console.log(menuDetails);
  return (
    <div>
      <Button variant="primary" onClick={showEditMenu}>
        Edit Menu
      </Button>
      {menuDetails.description}
      {menuDetails.menuContents &&
        menuDetails.menuContents.map((content) => (
          <MenuContent content={content} />
        ))}
      <div>
        <Modal
          show={showEdit}
          onHide={closeEditMenu}
          centered
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Menu
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
                defaultValue={menuDetails.name}
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
                defaultValue={menuDetails.description}
                onChange={handleInputChange}
                name="description"
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
    </div>
  );
};

export default MenuItem;
