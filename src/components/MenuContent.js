import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Tabs, Tab } from "react-bootstrap";

const MenuContent = (props) => {
  const [showEdit, setShowEdit] = useState(false);

  const showEditMenu = () => setShowEdit(true);
  const closeEditMenu = () => setShowEdit(false);
  return <div>{props.content.name}</div>;
};

export default MenuContent;
