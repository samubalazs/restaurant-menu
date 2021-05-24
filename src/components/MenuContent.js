import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { editContent, deleteContent } from "../actions/menuActions";

const MenuContent = (props) => {
  const contentDetails = props.content;
  const parentId = props.parentId;

  const [contentItemDetails, setContentItemDetails] = useState(contentDetails);
  const [showEdit, setShowEdit] = useState(false);

  const showEditContent = () => setShowEdit(true);
  const closeEditContent = () => setShowEdit(false);

  const handleContentDetailsChange = (event) => {
    const { name, value } = event.target;
    setContentItemDetails({ ...contentItemDetails, [name]: value });
  };

  const dispatch = useDispatch();

  const saveChanges = () => {
    dispatch(
      editContent(contentItemDetails._id, contentItemDetails, parentId)
    ).then(closeEditContent());
  };

  const removeCurrentContent = () => {
    dispatch(deleteContent(contentItemDetails._id, parentId));
  };

  return (
    <div>
      {contentDetails.name} - {contentDetails.price} - {contentDetails.parentId}
      <Button variant="primary" onClick={showEditContent}>
        Edit Content
      </Button>
      <Button variant="primary" onClick={removeCurrentContent}>
        Delete Menu
      </Button>
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
              <textarea
                rows="10"
                cols="100"
                className="form-control"
                id="price"
                required
                defaultValue={contentDetails.price}
                onChange={handleContentDetailsChange}
                name="price"
              />
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
    </div>
  );
};

export default MenuContent;
