import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function CreateTask() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const createTask = () => {
    console.log('Task created');
    handleClose();
  };

  return (
    <>
    </>
  );
}

