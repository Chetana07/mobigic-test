import React from "react";
import "../register.css";
import { Link } from "react-router-dom";

import { Form } from "react-bootstrap";
import Logo from "../assets/img/Logo.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      email: "",
      password: "",
      repassword: "",
      error: {
        fnameerr: "",
        emailerr: "",
        pwassworderr: "",
        repassworderr: "",
      },
    };
  }
  handleChange = (a) => {
    const input = a.target;
    const nm = input.name;
    const patternemail = /^[A-za-z0-9.]{5,}@[a-z0-9]{3,}\.[a-z]{3,}$/;
    const patternpwd =
      /^[A-Za-z@!#$%.]{1,}[A-Za-z@!#$%.]{2,}[A-Za-z@!#$%*.]{3,}$/;
    let val;
    let error = this.state.error;
    if (nm === "fname") {
      val = input.value;
      if (val.length < 6) {
        error.fnameerr = "Too short first Name";
      } else {
        error.fnameerr = "";
      }
    } else {
      if (nm === "email") {
        val = input.value;
        if (!patternemail.test(val)) {
          error.emailerr = "Invalid Email";
        } else {
          error.emailerr = "";
        }
      } else {
        if (nm === "password") {
          val = input.value;
          if (!patternpwd.test(val)) {
            error.passworderr = "Invalid Password";
          } else {
            error.passworderr = "";
          }
        } else {
          if (nm === "repassword") {
            val = input.value;
            if (this.state.password != val) {
              error.repassworderr = "Password Not Equal";
            } else {
              error.repassworderr = "";
            }
          }
        }
      }
    }
    this.setState({ error, [nm]: val });
  };
  submitForm = async (e) => {
    e.preventDefault();
    //console.log(this.state);
    let data = {
      u_fname: this.state.fname,
      u_lname: this.state.lname,
      u_phone: this.state.contactno,
      u_address: this.state.address,
      u_email: this.state.email,
      u_password: this.state.password,
    };

    await axios
      .post(process.env.REACT_APP_BASE_URL + "/user/adduser", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        this.setState({ st: resp.data, success: true });
        window.location.href = "/login";
      })
      .catch((error) => {
        alert("Error: " + error);
      });
  };
  render() {
    return (
      <div className="register">
        <Link to="/">
          {/* <HomeIcon className='register_homeIcon' /> */}
          <img className="login_img" src={Logo} alt="logo" />
        </Link>
        <div className="register_container">
          <h1>User Sign-up</h1>
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              name="fname"
              value={this.state.fname}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>Retype-Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Retype-Password"
              name="repassword"
              value={this.state.repassword}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Link to="register">
              <button
                className="innerbutton"
                type="submit"
                onClick={this.submitForm}
              >
                Sign Up
              </button>
            </Link>
            <br />
          </Form.Group>
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Link to="/login">
              <button className="innerbutton">
                <ArrowBackIcon />
                Back
              </button>
            </Link>
            <br />
          </Form.Group>
          <span>
            {this.state.error.emailerr}
            {this.state.error.fnameerr}
            {this.state.error.lnameerr}
            {this.state.error.addresserr}
            <br />
            {this.state.error.pwderr}
            {this.state.error.contactnoerr}
          </span>
        </div>
      </div>
    );
  }
}
