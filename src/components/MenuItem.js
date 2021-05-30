import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
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
import { ingredientOptions, createMeasurmentOptions } from "./utils";

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
    id: "",
    parentId: "",
    name: "",
    price: "",
    ingredients: [],
    quantity: "",
    measurment: "Gr",
  };

  const [contentItemDetails, setContentItemDetails] =
    useState(initialContentState);
  const [showAddContent, setShowAddContent] = useState(false);

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const showAddContentMenu = () => setShowAddContent(true);
  const closeAddContentMenu = () => setShowAddContent(false);

  const handleContentDetailsChange = (event) => {
    if (event.target) {
      const { name, value } = event.target;
      if (name === "name") {
        setContentItemDetails({
          ...contentItemDetails,
          id: value.toLowerCase().replace(/ /g, "-"),
          name: value,
          parentId: menuDetails.id,
        });
      } else {
        setContentItemDetails({
          ...contentItemDetails,
          parentId: menuDetails.id,
          [name]: value,
        });
      }
    } else {
      setContentItemDetails({
        ...contentItemDetails,
        ingredients: event,
      });
    }
  };

  const handleIngredientsChange = (e) => {
    setSelectedIngredients(Array.isArray(e) ? e.map((x) => x.value) : []);
    setContentItemDetails({
      ...contentItemDetails,
      ingredients: selectedIngredients,
    });
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
              menuDetails.menuContents.map((content, id) => (
                <MenuContent content={content} key={id} />
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
              <input
                type="number"
                className="form-control"
                id="price"
                required
                value={showAddContent.price}
                onChange={handleContentDetailsChange}
                name="price"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ingredients">Ingredients</label>
              <Select
                className="dropdown"
                placeholder="Select Option"
                value={ingredientOptions.filter((obj) =>
                  selectedIngredients.includes(obj.value)
                )}
                options={ingredientOptions}
                onChange={handleContentDetailsChange}
                isMulti
                isClearable
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                required
                value={showAddContent.quantity}
                onChange={handleContentDetailsChange}
                name="quantity"
              />
            </div>

            <div className="form-group">
              <label htmlFor="measurment">Measurment</label>
              <select
                className="form-control"
                id="measurment"
                required
                value={showAddContent.measurment}
                onChange={handleContentDetailsChange}
                name="measurment"
              >
                {createMeasurmentOptions}
              </select>
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
