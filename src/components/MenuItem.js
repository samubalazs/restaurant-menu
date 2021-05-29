import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Modal,
  OverlayTrigger,
  Tooltip,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import {
  BsPencil,
  BsFillTrashFill,
  BsFillPlusSquareFill,
} from "react-icons/bs";
import {
  editMenu,
  deleteMenu,
  retrieveMenus,
  createContent,
} from "../actions/menuActions";
import MenuContent from "./MenuContent";

const MenuItem = (props) => {
  const menuDetails = props.menuDetails;

  const [menuItemDetails, setMenuItemDetails] = useState(menuDetails);
  const [showEdit, setShowEdit] = useState(false);

  const showEditMenu = () => setShowEdit(true);
  const closeEditMenu = () => setShowEdit(false);

  const handleMenuDetailsChange = (event) => {
    const { name, value } = event.target;
    setMenuItemDetails({ ...menuItemDetails, [name]: value });
  };

  const dispatch = useDispatch();

  const saveChanges = () => {
    dispatch(editMenu(menuItemDetails.id, menuItemDetails))
      .then(closeEditMenu())
      .then(
        window.history.replaceState(
          null,
          menuItemDetails.name,
          `/${menuItemDetails.name}`
        )
      );
  };

  const removeCurrentMenu = () => {
    dispatch(deleteMenu(menuDetails.id)).then(
      window.history.replaceState(null, "Restaurant Menus", "/")
    );
  };

  //---------------

  const initialContentState = {
    name: "",
    price: "",
    parentId: menuDetails.parentId,
  };

  const [contentItemDetails, setContentItemDetails] =
    useState(initialContentState);
  const [showAddContent, setShowAddContent] = useState(false);

  const showAddContentMenu = () => setShowAddContent(true);
  const closeAddContentMenu = () => setShowAddContent(false);

  const handleContentDetailsChange = (event) => {
    const { name, value } = event.target;
    setContentItemDetails({ ...contentItemDetails, [name]: value });
  };

  const resetFields = () => {
    contentItemDetails.name = "";
    contentItemDetails.price = "";
  };

  const saveContent = () => {
    dispatch(createContent(contentItemDetails))
      .then(retrieveMenus())
      .then(resetFields())
      .then(closeAddContentMenu());
  };

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col xs={10} className="menu-description">
            {menuDetails.description}
          </Col>
          <Col>
            <div className="control-menu">
              <OverlayTrigger
                key={`bottom-${menuDetails.id}-edit`}
                placement="bottom"
                overlay={<Tooltip id={`tooltip-bottom`}>Edit Menu</Tooltip>}
              >
                <BsPencil onClick={showEditMenu} />
              </OverlayTrigger>
              <OverlayTrigger
                key={`bottom-${menuDetails.id}-remove`}
                placement="bottom"
                overlay={<Tooltip id={`tooltip-bottom`}>Remove Menu</Tooltip>}
              >
                <BsFillTrashFill onClick={removeCurrentMenu} />
              </OverlayTrigger>
              <OverlayTrigger
                key={`bottom-${menuDetails.id}-addcontent`}
                placement="bottom"
                overlay={<Tooltip id={`tooltip-bottom`}>Add Content</Tooltip>}
              >
                <BsFillPlusSquareFill onClick={showAddContentMenu} />
              </OverlayTrigger>
            </div>
          </Col>
        </Row>

        <hr />
        <Row>
          <Col xs={10}>
            {menuDetails.menuContents &&
              menuDetails.menuContents.map((content) => (
                <MenuContent content={content} />
              ))}
          </Col>
        </Row>
      </Container>

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
                onChange={handleMenuDetailsChange}
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
                onChange={handleMenuDetailsChange}
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
      <div>
        <Modal
          show={showAddContent}
          onHide={closeAddContentMenu}
          centered
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Content
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
                value={showAddContent.name}
                onChange={handleContentDetailsChange}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <textarea
                rows="10"
                cols="100"
                className="form-control"
                id="price"
                required
                value={showAddContent.price}
                onChange={handleContentDetailsChange}
                name="price"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-success" onClick={saveContent}>
              Submit
            </Button>
            <Button variant="outline-danger" onClick={closeAddContentMenu}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default MenuItem;
