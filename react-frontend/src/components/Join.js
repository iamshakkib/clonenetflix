import React, { Component } from "react";
import UserApiService from "../apis/UserApiService";

class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
    };
  }
  //sign up method
  JoinUser = () => {
    console.log("Sign Up!");
    let user = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
    };
    UserApiService.joinUser(user)
      .then((res) => {
        console.log(res.data);
        if (res.data === 0) {
          alert("Membership failed! same ID exists");
        } else {
          let userid = res.data;
          //After saving the user information in the session, it is sent to the home path.
          alert("Membership successful");
          sessionStorage.setItem("user", userid);
          window.location.href = "http://localhost:3000";
        }
      })
      .catch((err) => console.log(err));
  };
  //User information handler
  joinInfoHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <div style={{ flex: 1 }}>
        {/* <h1 style={{color: 'red' , marginTop: 10, marginLeft: 0, fontFamily: 'fantasy'}}>NETFLIX</h1> */}
        <div
          className="container"
          style={{
            justifyItems: "center",
            alignItems: "center",
            width: "500px",
            marginTop: "18vh",
          }}
        >
          <div className="row">
            <div className="col">
              <div style={{ margin: 20 }}>
                <p style={{ fontWeight: "bold", fontSize: 18, color: "white" }}>
                Set up your email and password and start your membership.
                </p>
                <p style={{ color: "white" }}>
                    Sign up for Netflix in just a few more steps!
                  <br />
                  All complicated steps have been eliminated.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input
                name="email"
                placeholder="email"
                type="text"
                className="form-control"
                value={this.state.email}
                onChange={(e) => this.joinInfoHandler(e)}
                style={{ margin: 20 }}
              />
              <input
                name="password"
                placeholder="Password"
                type="password"
                className="form-control"
                value={this.state.password}
                onChange={(e) => this.joinInfoHandler(e)}
                style={{ margin: 20 }}
              />
              <input
                name="name"
                placeholder="Name"
                type="text"
                className="form-control"
                value={this.state.name}
                onChange={(e) => this.joinInfoHandler(e)}
                style={{ margin: 20 }}
              />
              <button
                type="button"
                onClick={() => this.JoinUser()}
                className="btn btn-block"
                style={{
                  margin: 20,
                  backgroundColor: "red",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                다음
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Join;
