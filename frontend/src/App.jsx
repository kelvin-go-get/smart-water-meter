import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

const App = () => {
  return (
    <>
      <div className="app-container">
        <Header />
        <Container className="my-2">
          <Outlet />
        </Container>
        <ToastContainer />
      </div>
    </>
  );
};

export default App;
