import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import FormThree from "./FormThree";

import { ImCross } from "react-icons/im";

const FormTwo = ({ dist_id, validate, clearField, clearData }) => {
  
  console.log("clearField:-", clearField);
  const [show, setShow] = useState(false);
  const [getData, setGetData] = useState([]);
 
  const [valueForHolder, setValueForHolder] = useState("");
  const [divCode, setDivCode] = useState(0);
  const [validateTwo, setValidateTwo] = useState(true);
  

  const handleClose = (dc) => {
    setShow(false);
    setDivCode(dc);
    setValidateTwo(false);
  };

  const handleShow = () => {
    setShow(true);
    if (!validate) {
      handleData();
    }
  };
  useEffect(() => {
    if (clearField) {
      setValueForHolder("");
    }
  }, [clearField]);

  const Token = useSelector((state) => state.Auth);
  
  const handleData = () => {
    axios
      .get(
        `https://alkemapi.indusnettechnologies.com/api/feed/dist_divisions/E?dist_id=${dist_id}`,
        {
          headers: { Authorization: `Bearer ${Token}` },
        }
      )
      .then(function (response) {
        console.log("response data in formTwo:-", response.data.data);
        setGetData(response.data.data);
      
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChangedValue = (e) => {
   
    setValueForHolder(e.target.value);
  };
  const handleClearField = (e) => {
    setValueForHolder("");
   
  };

  useEffect(() => {
    if (clearData) {
      setValueForHolder("");
    }
  }, [clearData]);
  
  return (
    <>
      <div style={{ display: "flex" }}>
        <InputGroup className="mb-3" style={{ width: "300px", margin: "5px" }}>
          <Form.Control
            aria-describedby="basic-addon1"
            value={valueForHolder}
            onClick={handleShow}
            className="mb-3"
            disabled={clearField}
            placeholder="Select Division"
          />
          <InputGroup.Text
            id="basic-addon1"
            style={{ height: "38px" }}
            onClick={() => handleClearField()}
          >
            <ImCross />
          </InputGroup.Text>
        </InputGroup>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Division</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search Your Division"
              className="mb-3"
            />
            <InputGroup.Text
              id="basic-addon1"
              style={{ height: "38px" }}
              onClick={() => handleClearField()}
            >
              <ImCross />
            </InputGroup.Text>
          </InputGroup>
          {getData &&
            getData.map((item, i) => (
              //   console.log("items in getData:-", item)

              <div key={i}>
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value={item.division_name}
                  onChange={handleChangedValue}
                  onClick={() => handleClose(item.division_code)}
                  className="roundCheckbox"
                />
                <label htmlFor="vehicle1" style={{ margin: "2px" }}>
                  {item.division_name}
                </label>
                <hr></hr>
              </div>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <FormThree
        divCode={divCode}
        dist_id={dist_id}
        validateTwo={validateTwo}
        clearField={clearField}
        clearData={clearData}
      />
    </>
  );
};

export default FormTwo;
