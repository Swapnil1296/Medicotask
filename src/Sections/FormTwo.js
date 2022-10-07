import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import FormThree from "./FormThree";

import { ImCross } from "react-icons/im";

const FormTwo = ({
  dist_id,
  validate,

  disabledOther,
  clearOnReselect,
  disableSecond,
  clearAllField,
}) => {
  const [show, setShow] = useState(false);
  const [getData, setGetData] = useState([]);

  const [valueForHolder, setValueForHolder] = useState("");
  const [divCode, setDivCode] = useState(0);
  const [validateTwo, setValidateTwo] = useState(true);
  const [disableThree, setdisableThree] = useState(false);
  const [clearLast, setClearLast] = useState(false);

  const handleClose = (dc) => {
    setShow(false);
    setDivCode(dc);
    setValidateTwo(false);
    setClearLast(false);
  };

  const handleShow = () => {
    setShow(true);
    setClearLast(true);
    if (valueForHolder === "") {
      handleData();
    }
  };

  useEffect(() => {
    if (disabledOther) {
      setValueForHolder("");
      setGetData("");
    }
  }, [disabledOther]);
  useEffect(() => {
    if (valueForHolder === "") {
      setdisableThree(true);
    } else {
      setdisableThree(false);
    }
  }, [valueForHolder]);

  useEffect(() => {
    if (clearOnReselect) {
      setValueForHolder("");
      setGetData("");
    }
  }, [clearOnReselect]);

  /* for clearing the selected fields on reselect */
  useEffect(() => {
    if (!clearAllField) {
      setGetData("");
      setValueForHolder("");
    }
  }, [clearAllField]);
 

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
        // console.log("response data in formTwo:-", response.data.data);
        setGetData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChangedValue = (e) => {
    setValueForHolder(e.target.value);
    setdisableThree(false);
  };
  const handleClearField = (e) => {
    setValueForHolder("");
    setGetData("");
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <InputGroup className="mb-3" style={{ width: "300px", margin: "5px" }}>
          <Form.Control
            aria-describedby="basic-addon1"
            value={valueForHolder}
            onClick={handleShow}
            className="mb-3"
            disabled={disableSecond}
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
        <Modal.Header>
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
            ></InputGroup.Text>
          </InputGroup>
          {getData &&
            getData.map((item, i) => (
             

              <div key={i}>
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value={item.division_name}
                  onChange={handleChangedValue}
                  onClick={() => handleClose(item.division_code)}
                  className="roundCheckbox"
                  defaultChecked={item.division_name === valueForHolder}
                />
                <label htmlFor="vehicle1" style={{ margin: "2px" }}>
                  {item.division_name}
                </label>
                <hr></hr>
              </div>
            ))}
        </Modal.Body>
        <Modal.Footer>
        
        </Modal.Footer>
      </Modal>
      <FormThree
        divCode={divCode}
        dist_id={dist_id}
        validateTwo={validateTwo}
        disabledOther={disabledOther}
        disableThree={disableThree}
        clearLast={clearLast}
      />
    </>
  );
};

export default FormTwo;
