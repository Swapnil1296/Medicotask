import axios from "axios";
import React, { useEffect, useState } from "react";
import {  Form, InputGroup, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import Products from "./Products";
import { ImCross } from "react-icons/im";
const FormThree = ({
  divCode,
  dist_id,
  validateTwo,
  clearLast,
  disabledOther,
  disableThree,
}) => {
  const [show, setShow] = useState(false);
  const [getData, setGetData] = useState([]);
  const [valueForHolder, setValueForHolder] = useState("");
  const [cfaNumber, setCfaNum] = useState(0);
  const [clearProThree, setclearProThree] = useState(false);

  useEffect(() => {
    if (disabledOther) {
      setValueForHolder("");
    }
  }, [disabledOther]);

  useEffect(() => {
    if (disableThree) {
      setValueForHolder("");
    }
  }, [disableThree]);
  /* for clearing the selected fields on reselect */
  useEffect(() => {
     setGetData("");
     setValueForHolder("");
  }, [clearLast]);

  const handleClose = (cfa) => {
    setShow(false);
    setCfaNum(cfa);
  };
  const handleShow = () => {
    setShow(true);
    setclearProThree(false);
    if (dist_id !== 0 && divCode !== 0) {
      handleData();
    }
  };

  const Token = useSelector((state) => state.Auth);

  const handleData = () => {
    axios
      .get(
        `https://alkemapi.indusnettechnologies.com/api/feed/dist_depot/E?dist_id=${dist_id}&dc=${divCode}`,
        {
          headers: { Authorization: `Bearer ${Token}` },
        }
      )
      .then(function (response) {
        // console.log("response data in formTHree:-", response.data);
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
    setGetData("");
    setclearProThree(true);
  };

  return (
    <>
      <InputGroup className="mb-3" style={{ width: "300px", margin: "5px" }}>
        <Form.Control
          aria-describedby="basic-addon1"
          value={valueForHolder}
          onClick={handleShow}
          className="mb-3"
          placeholder="Select Depot"
          disabled={disableThree}
        />
        <InputGroup.Text
          id="basic-addon1"
          style={{ height: "38px" }}
          onClick={() => handleClearField()}
        >
          <ImCross />
        </InputGroup.Text>
      </InputGroup>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Search Depot </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search Your Division"
              className="mb-3"
              value={valueForHolder}
            />
          </InputGroup>
          {getData &&
            getData.map((item, i) => (
              //   console.log("items in getData:-", item)

              <div key={i}>
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value={item.location_name}
                  onChange={handleChangedValue}
                  onClick={() => handleClose(item.cfa_code)}
                  className="roundCheckbox"
                  defaultChecked={item.location_name === valueForHolder}
                />
                <label for="vehicle1" style={{ margin: "2px" }}>
                  {item.location_name}
                </label>
                <hr></hr>
              </div>
            ))}
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
      <Products
        divCode={divCode}
        dist_id={dist_id}
        cfaNumber={cfaNumber}
        disabledOther={disabledOther}
        disableThree={disableThree}
        valueForHolder={valueForHolder}
        clearProThree={clearProThree}
      />
    </>
  );
};

export default FormThree;
