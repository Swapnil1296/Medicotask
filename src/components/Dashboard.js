import axios from "axios";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import FormOne from "../Sections/FormOne";

const Dashboard = () => {
  const data = useSelector((state) => state.Auth);
  // console.log("Auth is :-", data);

  useEffect(() => {
      axios.get('https://alkemapi.indusnettechnologies.com/api/cms/banner/E', 
                { headers: {"Authorization" : `Bearer ${data}`}})
              .then(function (response) {
                // console.log(response.data);
             
              }).catch((error) => {
                console.log(error);
            })
          },[]);
  return (
    <>
      <h5 style={{margin:"10px", color:"blueviolet"}}> Your Logged in successfully</h5>
      <FormOne/>
     
    </>
  );
};

export default Dashboard;
