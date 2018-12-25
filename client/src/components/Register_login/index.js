import React, { Component } from "react";
import MyButton from "../utils/buttons";
import Login from "./login";
class RegisterLogin extends Component {
  render() {
    return (
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <div className="left">
              <h1>New Customers</h1>
              <p>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                used in laying out print, graphic or web designs. The passage is
                attributed to an unknown typesetter in the 15th century who is
                thought to have scrambled parts of Cicero's De Finibus Bonorum
                et Malorum for use in a type specimen book.
              </p>
              <MyButton
                type="default"
                title="Create an account"
                linkTo="/register"
                addStyles={{
                  margin: "10px 0 0 0"
                }}
              />
            </div>
            <div className="right">
              <h2>Register customers</h2>
              <p>If you have an account please log in.</p>
              <Login />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterLogin;
