import React from "react";
// nodejs library that concatenates strings
import classnames from "classnames";
// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";
import logo from 'Broadband/media/logo.png'
import { Link } from 'react-router-dom';
import { UserAuthenticated } from 'constants/index';

function DemoNavbar(props) {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  //const [loginStatus, onLoginChangeStatus] = React.useState(dynamicElements);
  

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  /*React.useEffect(() => {
      const onLogin = () => {
          if(getLoginStatus()){
              onLoginChangeStatus(dynamicElements);
          }
      }
      onLogin();
  },[]);*/

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            href="/home"
            title="MyTelstra Home"
          ><img src={logo} className="logo" alt="logo"></img>
            MyTelstra
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            <NavItem>
              {localStorage.getItem(UserAuthenticated)?
                <NavLink
                  data-placement="bottom"
                  href="/mobile"
                  title="Mobile"
                >Mobile
                </NavLink>
                :
                <NavLink
                  data-placement="bottom"
                  href="/mobile/plans"
                  title="Mobile"
                >Mobile
                </NavLink>}
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="/Broadband"
                title="Broadband"
              >Broadband
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="/Shop"
                title="Shop"
              >Shop
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
              {localStorage.getItem(UserAuthenticated) ? (<Link
                title="Cart"
                to = {{pathname: '/Cart', authenticated: props.authenticated}}
              >
                <i className="nc-icon nc-cart-simple" />
              </Link>):(<div></div>) }
              </NavLink>
            </NavItem>
            <NavItem>
                <NavLink>
                {localStorage.getItem(UserAuthenticated) ? (<Link
            title="Profile" to = {{pathname: '/profile', authenticated: props.authenticated, currentUser: props.user}}>
        <i className="nc-icon nc-circle-10" />
        </Link>):(<div></div>) }
                </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default DemoNavbar;

