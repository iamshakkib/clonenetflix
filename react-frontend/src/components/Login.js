/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "../styles/Login.css";
import { Redirect } from "react-router-dom";
import UserApiService from "../apis/UserApiService";

function Login({ authenticated, location }) {
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");

  const handleLoginOk = async () => {
    console.log(email);
    console.log(passWord);
    if (email === "") {
      alert("Enter your email!");
      return;
    } else if (passWord === "") {
      alert("Please enter a password!");
      return;
    }
    //Create user object
    let user = {
      email: email,
      passWord: passWord,
    };
    //login method
    login(user);
  };

  //Implement the login method
  const login = (user) => {
    console.log("User information entered", user);
    UserApiService.loginOk(user)
      .then((res) => {
        // console.log(res.data);
        let userid = res.data;
        //Delete existing values ​​if they exist
        sessionStorage.removeItem("user");
        // console.log(res.data);
        //Save only userid value in user information! No need for the rest!
        sessionStorage.setItem("user", userid);
        alert("login succeed");
        //Send to home path when login is successful
        window.location.href = "http://localhost:3000";
      })
      .catch((err) => {
        console.error("UserApiService.loginOk error :", err);
        alert("Email or password does not match. \nPlease enter it again!");
        setEmail("");
        setPassWord("");
      });
  };

  const { from } = location.state || { from: { pathname: "/" } };
  if (authenticated) return <Redirect to={from} />;

  return (
    <div className="outer">
      <div className="inner">
        <h3 style={{ color: "white" }}>로그인</h3>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email Address"
            name="email"
            id="email"
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
          />
        </div>

        <div className="form-group">
          <input
            type="passWord"
            className="form-control"
            placeholder="passWord"
            name="passWord"
            id="passWord"
            value={passWord}
            onChange={({ target: { value } }) => setPassWord(value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-lg btn-block"
          style={{ backgroundColor: "red", color: "white" }}
          onClick={handleLoginOk}
        >
          LOGIN
        </button>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
        <p style={{ marginTop: 150 }}>
          {/* Facebook login request address! */}
          <a
            href="https://www.facebook.com/v2.11/dialog/oauth?client_id=770894283636482&redirect_uri=http://localhost:8090/user/auth/facebook"
            style={{ color: "#646564" }}
          >
            log in with facebook
          </a>
        </p>
        <div className="row">
          <p className="col-sm-6" style={{ fontSize: 13, color: "gray" }}>
            Netflix Not a member?
          </p>
          <h5
            className="col-sm-6"
            style={{ fontWeight: "bold", marginBottom: 100 }}
          >
            <a href="/join" style={{ color: "white" }}>
            Sign up now
            </a>
          </h5>
        </div>
      </div>
    </div>
  );
}

export default Login;
