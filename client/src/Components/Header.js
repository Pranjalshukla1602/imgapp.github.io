import logo from "../logo.png";
import "../App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { ImUnderline } from "react-icons/im";

function Header() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img class="logo" src={logo} alt="LOGO" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto font-sans gap-2 ">
            <Nav.Link href="/album">Gallery</Nav.Link>
            <Nav.Link href="/inputMemory"> Upload </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}
export default Header;
