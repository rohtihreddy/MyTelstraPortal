/*!

=========================================================
* Paper Kit React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { contains } from "jquery";
import React from "react";

// reactstrap components
import { Button, Container } from "reactstrap";

// core components

function LandingPageHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth < 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(" + require("assets/img/telstra.png").default + ")",
        }}
        className="page-header"
        data-parallax={true}
        ref={pageHeader}
      >
        <div className="filter" />
        <Container>
          <div className="motto text-center">
            <h1 className="presentation-title">TelStore</h1>
          
            <br />
            <div class="d-flex justify-content-sm-center mb-5">
            <Button
              href="/login"
              className="btn-default"
              color="neutral"
              outline
            >
              Login

            </Button>
            <Button
              href="/signin"
              className="btn-default invisible"
              color="neutral"
              target="_blank"
              outline
            >
              Login
            </Button>
            <Button className="btn-default" href="/signup" color="neutral" type="button" outline>
              Signup
            </Button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default LandingPageHeader;
