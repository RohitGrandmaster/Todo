import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

function AddItem() {
  const [addItem, setAddItem] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(-2);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();

    setAddItem([...addItem, inputValue]);
    setInputValue("");
  };

  const handleDelete = (myindex) => {
    const updatedItems = addItem.filter((_, index) => index !== myindex);
    setAddItem(updatedItems);
  };

  const handleEdit = (myindex) => {
  
    setEditIndex(myindex);

    setInputValue(addItem[myindex]);
   
  };

  const handleSave = () => {
    if (inputValue.trim() !== "") {
      const updatedItems = addItem.map((item, index) =>
        index === editIndex ? inputValue : item
      );
      setAddItem(updatedItems);
      setInputValue("");
      setEditIndex(-1);
    }
  };

  return (
    <div style={{ position: "relative", top: "15px", left: "35%" }}>
      <Card style={{ border: "2px solid", width: "30rem", height: "35rem" }}>
        <Card.Body>
          <Card.Title
            style={{ fontWeight: "800", fontSize: "24px", textAlign: "center" }}
          >
            TODO LIST
          </Card.Title>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Add item..."
                value={inputValue}
                onChange={handleChange}
                className="font-bold"
              />
            </Form.Group>
            <Button type="submit" onClick={handleAdd} className="bg-green-600">
              ADD
            </Button>
          </Form>
          <div>
            {addItem.map((item, index) => (
              <div key={index}>
                {editIndex === index ? (
                  <div>
                    <Form.Control
                      type="text"
                      value={inputValue}
                      onChange={handleChange}
                    />
                    <Button onClick={handleSave}>Save</Button>
                  </div>
                ) : (
                  <div>
                    <p>{item}</p>
                    <Button
                      className="bg-red-600"
                      onClick={() => {
                        handleDelete(index);
                      }}
                    >
                      <DeleteIcon /> Delete
                    </Button>
                    <Button  className="bg-blue-600" onClick={() => handleEdit(index)}>
                      <EditIcon /> Edit
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AddItem;
