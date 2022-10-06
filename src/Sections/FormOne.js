import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  ListGroup,
  Modal,
} from "react-bootstrap";
import { ImCross } from "react-icons/im";

import { useSelector } from "react-redux";
import FormTwo from "./FormTwo";

const FormOne = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [valueForHolder, setValueForHolder] = useState("");
  const [dist_id, setDistID] = useState(0);
  const [validate, setValidate] = useState(true);
  const [clearField, setClearField] = useState(false);
  const [clearData,setClearData]=useState(false);
  
  // console.log("dist_id in useState:-", dist_id);
  const Token = useSelector((state) => state.Auth);
  //   console.log("Auth in FormOne:-", Token);
  const handleData = () => {
    axios
      .get(
        `https://alkemapi.indusnettechnologies.com/api/distributor/distributor_list/E?dn=&page_no=${1}`,
        {
          headers: { Authorization: `Bearer ${Token}` },
        }
      )
      .then(function (response) {
        // console.log("response data in formOne:-", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   console.log("data in useState:-", data.data);
  const handleClose = (dist_id) => {
    setShow(false);
    setValidate(false);
    setDistID(dist_id);
    setClearField(true);
    // console.log("handleClose:-", dist_id);
  };
 
  const handleShow = () => {
    setShow(true);
    handleData();
     setClearField(false);
     setClearData(false)
  };
  const handleChangedValue = (e) => {
    // console.log("targeted value:-", e.target.value);
    setValueForHolder(e.target.value);
  };
  const handleClearField = (e) => {
    setValueForHolder("");
    setClearData(true);
    // console.log("clicked");
  };
   useEffect(() => {
     if (clearData) {
       setData("");
     }
   }, [clearData]);
  return (
    <Container>
      <InputGroup className="mb-3" style={{ width: "300px", margin: "5px" }}>
        <Form.Control
          type="text"
          autoFocus
          value={valueForHolder}
          onClick={handleShow}
          aria-describedby="basic-addon1"
          className="mb-3"
          placeholder="Select Distributor"
        />
        <InputGroup.Text
          id="basic-addon1"
          style={{ height: "38px" }}
          onClick={() => handleClearField()}
        >
          <ImCross />
        </InputGroup.Text>
      </InputGroup>

      {/* Modal start here */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Distributor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Search Your Division"
            className="mb-3"
          />
          {data.data &&
            data.data.map((item, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value={item.customer_name}
                  onChange={handleChangedValue}
                  onClick={(e) => handleClose(item.customer_code)}
                  className="roundCheckbox"
                />
                <label for="vehicle1" style={{ margin: "2px" }}>
                  {item.customer_name}-{item.customer_code}-
                  <span>({item.location})</span>
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
      <FormTwo
        dist_id={dist_id}
        validate={validate}
        clearField={clearField}
        clearData={clearData}
      />
    </Container>
  );
};

export default FormOne;
