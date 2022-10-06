import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import Products from "./Products";
import { ImCross } from "react-icons/im";
const FormThree = ({
  divCode,
  dist_id,
  validateTwo,
  clearField,
  clearData,
}) => {
  // console.log("divCode in formthree:--", divCode, dist_id);
  const [show, setShow] = useState(false);
  const [getData, setGetData] = useState('');
  
  // console.log('getData is :-',getData[0])
  const [valueForHolder, setValueForHolder] = useState("");
  const [cfaNumber, setCfaNum] = useState(0);
  const [validateThree, setValidateThree] = useState(true);
  const handleClose = (cfa) => {
    setShow(false);
    setCfaNum(cfa);
    setValidateThree(false);
  };
  const handleShow = () => {
    setShow(true);
    // if (!validateTwo) {
    //   // handleData();
    // }
  };
  useEffect(() => {
    if (clearField) {
      setValueForHolder("");
    }
  }, [clearField]);
  const Token = useSelector((state) => state.Auth);

  useEffect(() => {
    const handleData = () => {
      axios
        .get(
          `https://alkemapi.indusnettechnologies.com/api/feed/dist_depot/E?dist_id=${dist_id}&dc=${divCode}`,
          {
            headers: { Authorization: `Bearer ${Token}` },
          }
        )
        .then(function (response) {
          setGetData(response.data.data);
          const value = response.data.data[0];
          console.log("value location_name:-",value.location_name);
          setValueForHolder(value.location_name);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (divCode) {
      handleData();
    }
  }, [divCode]);

  const handleChangedValue = (e) => {
    setValueForHolder(e.target.value);
  };
  const handleClearField = (e) => {
    setValueForHolder("");
  };
  useEffect(() => {
    if (clearData || clearField) {
      setValueForHolder("");
    }
  }, [clearData, clearField]);
  return (
    <>
      <InputGroup className="mb-3" style={{ width: "300px", margin: "5px" }}>
        <Form.Control
          aria-describedby="basic-addon1"
          value={valueForHolder}
          onClick={handleShow}
          className="mb-3"
          placeholder="Select Depot"
          disabled={validateTwo}
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
        <Modal.Header closeButton>
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
                />
                <label for="vehicle1" style={{ margin: "2px" }}>
                  {item.location_name}
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
      <Products
        divCode={divCode}
        dist_id={dist_id}
        cfaNumber={cfaNumber}
        validateThree={validateThree}
        clearField={clearField}
        clearData={clearData}
        valueForHolder={valueForHolder}
      />
    </>
  );
};

export default FormThree;
