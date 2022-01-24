import React, { Component } from "react";
import "../styles/App.css";
import SearchBar from "../components/SearchBar";
import UserApiService from "../apis/UserApiService";

class MainNavbar extends Component {
  //Logout Func
  onLogout = () => {
    UserApiService.logoutOK()
      .then((res) => {
        let status = res.status;
        console.log(res.status);
        if (status === 200) {
          alert("Logout done!");
          sessionStorage.removeItem("user");
          window.location.href = "http://localhost:3000";
        }
      })
      .catch((err) => {
        console.error("UserApiService error : ", err);
        alert("Logout error \nPlease try again👻");
      });
  };
  render() {
    return (
      <div className="mainNavbar">
        <nav className="navbar">
          <ul className="nav justify-content-start">
            {/* <!-- Brand --> */}
            <a
              className="navbar-brand"
              href="/"
              style={{ color: "red", fontFamily: "fantasy", fontSize: 25 }}
            >
              NETFLIX
            </a>

            <li className="nav-item">
              <a className="nav-link" href="/" style={{ color: "white" }}>
              home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/movie" style={{ color: "white" }}>
              movie
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="/newContent"
                style={{ color: "white" }}
              >
                NEW! Today's trending content
              </a>
            </li>
            <li className="nav-item">
              {(sessionStorage.getItem('user') !== null) ?
              <a
                className="nav-link"
                href="/myContent"
                style={{ color: "white" }}
              >
                My Favorite Content
              </a>
              : ''
              } 
            </li>
          </ul>
          <ul className="nav justify-content-end">
            <li>
              {/* <SearchBar handleSubmit={this.handleSubmit} handleChange={this.handleChange} /> */}
              <SearchBar />
            </li>
            <li className="nav-item">
              <div>
                {sessionStorage.getItem("user") == null ? (
                  <a
                    className="nav-link"
                    href="/login"
                    style={{ color: "white" }}
                  >
                    login
                  </a>
                ) : (
                  <a
                    className="nav-link"
                    href="/logout"
                    onClick={this.onLogout}
                    style={{ color: "white" }}
                  >
                    Log out
                  </a>
                )}
              </div>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default MainNavbar;
