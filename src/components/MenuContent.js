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
import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import { editContent, deleteContent } from "../actions/menuActions";
import { currency, ingredientOptions, createMeasurmentOptions } from "./utils";

const MenuContent = (props) => {
  const contentDetails = props.content;

  const [contentItemDetails, setContentItemDetails] = useState(contentDetails);
  const [showEdit, setShowEdit] = useState(false);

  const showEditContent = () => setShowEdit(true);
  const closeEditContent = () => setShowEdit(false);

  const handleContentDetailsChange = (event) => {
    if (event.target) {
      const { name, value } = event.target;
      if (name === "name") {
        setContentItemDetails({
          ...contentItemDetails,
          id: value.toLowerCase().replace(/ /g, "-"),
          name: value,
        });
      } else {
        setContentItemDetails({
          ...contentItemDetails,
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

  const dispatch = useDispatch();

  const saveChanges = () => {
    dispatch(editContent(contentItemDetails)).then(closeEditContent());
  };

  const removeCurrentContent = () => {
    dispatch(deleteContent(contentItemDetails.id, contentDetails.parentId));
  };

  const listIngredients = (ingredients) => {
    return ingredients.map((item) => item.label).join(", ");
  };

  return (
    <React.Fragment>
      <Container className="content">
        <Row>
          <Col xs={10}>
            <div>
              {contentDetails.name} - {currency}
              {contentDetails.price}
            </div>
            <div>
              Ingredients: {listIngredients(contentDetails.ingredients)} / Unit:{" "}
              {contentDetails.quantity}
              {contentDetails.measurment}
            </div>
          </Col>
          <Col>
            <div className="content-menu">
              <OverlayTrigger
                key={`bottom-${contentDetails.id}-edit`}
                placement="bottom"
                overlay={<Tooltip id={`tooltip-bottom`}>Edit Content</Tooltip>}
              >
                <BsPencil onClick={showEditContent} />
              </OverlayTrigger>
              <OverlayTrigger
                key={`bottom-${contentDetails.id}-remove`}
                placement="bottom"
                overlay={
                  <Tooltip id={`tooltip-bottom`}>Remove Content</Tooltip>
                }
              >
                <BsFillTrashFill onClick={removeCurrentContent} />
              </OverlayTrigger>
            </div>
          </Col>
        </Row>
      </Container>

      <div>
        <Modal
          show={showEdit}
          onHide={closeEditContent}
          centered
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Content
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
                defaultValue={contentDetails.name}
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
                defaultValue={contentDetails.price}
                onChange={handleContentDetailsChange}
                name="price"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ingredients">Ingredients</label>
              <Select
                className="dropdown"
                placeholder="Select Option"
                defaultValue={contentDetails.ingredients}
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
                defaultValue={contentDetails.quantity}
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
                defaultValue={contentDetails.measurment}
                onChange={handleContentDetailsChange}
                name="measurment"
              >
                {createMeasurmentOptions}
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-success" onClick={saveChanges}>
              Save
            </Button>
            <Button variant="outline-danger" onClick={closeEditContent}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default MenuContent;
