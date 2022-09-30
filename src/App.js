import "./App.css";
import Login from "./components/Login";
import Container from "react-bootstrap/Container";


import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <Container className="App">
      <Routes>
        
        <Route path="/" element={<Login />} />

        <Route path="/home" element={<PrivateRoute Component={Dashboard} />} />
      </Routes>
    </Container>
  );
}

export default App;
