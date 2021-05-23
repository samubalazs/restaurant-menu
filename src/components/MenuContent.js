import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";

const MenuContent = (props) => {
  const [showEdit, setShowEdit] = useState(false);

  const showEditMenu = () => setShowEdit(true);
  const closeEditMenu = () => setShowEdit(false);
  return (
    <div>
      {props.content.name} - {props.content.price}
    </div>
  );
};

export default MenuContent;
