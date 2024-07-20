/* eslint-disable no-unused-vars */
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [logoutApi, { isError, isLoading, isSuccess }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      navigate("/");
      toast.success(`Bye ${userInfo.name}`);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <Navbar expand="md" collapseOnSelect className="navbar">
      <LinkContainer to="/">
        <Navbar.Brand>SmartMeter</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          {userInfo ? (
            <NavDropdown
              title={userInfo.name}
              id="username"
              className="ms-auto"
            >
              <LinkContainer to="/profile">
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>
                <FaSignOutAlt /> Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaSignInAlt /> Sign In
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/register">
                <Nav.Link>
                  <FaSignOutAlt /> Sign Up
                </Nav.Link>
              </LinkContainer>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
