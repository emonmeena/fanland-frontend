import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
  useRouteMatch,
} from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import "./index.css";
import ClubPage from "./clubpage";
import ClubChatRoom from "./clubchatroom";
import CreateFanClub from "./createFanClub";
import Home from "./home";

const routes = [
  {
    path: "",
    exact: true,
    main: () => <Home title="Home" endpoint="#" tags={["Followed by You"]} />,
  },
  {
    path: "/explore",
    main: () => <Home title="Explore" endpoint="#" tags={["Recomended"]} />,
  },
  {
    path: "/user_admin_clubs",
    main: () => <h2>Your admin clubs</h2>,
  },
  {
    path: "/clubs/:clubId",
    main: () => <ClubPage />,
  },
  {
    path: "/chats/:chatRoomId",
    main: () => (
      <ClubChatRoom
        userName={"Mayank"}
        userProfilePic={
          "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png"
        }
      />
    ),
  },
  {
    path: "/create/fanclub",
    main: () => <CreateFanClub />,
  },
];

export default function Main({ isUserLoggedIn }) {
  let { path, url } = useRouteMatch();
  useEffect(() => {}, []);

  const history = useHistory();
  return (
    <Router>
      <div
        className="main-container text-white"
        style={{ backgroundColor: "black" }}
      >
        <div className="container-fluid">
          <div className="row" style={{ height: "100vh" }}>
            {/* Column 1 */}
            <div className="col-1 bg-color-secondary p-0">
              <div className="py-3">
                <div className="px-3 mb-3">
                  <Link to={url} className="link">
                    <i className="fas fa-home icon-style"></i>
                    Home
                  </Link>
                </div>
                <div className="px-3 mb-3">
                  <Link to={`${url}/explore`} className="link">
                    <i className="far fa-compass icon-style"></i> Explore
                  </Link>
                </div>
              </div>
              <div className="px-3 fs-secondary">
                <div>
                  <p>Fan Clubs</p>
                </div>
                <div className="my-1">
                  <Link to="#" className="link fw-bold">
                    Made by You
                  </Link>
                </div>
                <div className="my-1">
                  <Link to="#" className="link fw-bold">
                    Recent
                  </Link>
                </div>
                <div className="my-1">
                  <Link to="#" className="link fw-bold">
                    Starred
                  </Link>
                </div>
                <div>
                  <Link className="link fw-bold"> </Link>
                </div>
              </div>
              <div className="position-absolute col-1" style={{ bottom: 0 }}>
                <Link to="/create/fanclub" className="link">
                  <div className="custom-border-top py-3 px-3">
                    <i className="fas fa-plus-circle icon-style fa-2x"></i>
                    New Club
                  </div>
                </Link>
              </div>
            </div>
            {/* Column 2 */}
            <div className="col-10 bg-color-primary">
              <div className="d-flex justify-content-between px-1 py-2">
                <div className="d-flex">
                  <div className="py-1">
                    <button
                      className="bg-color-primary border-0"
                      onClick={() => history.goBack()}
                    >
                      <i class="fas fa-chevron-left icon-style-2"></i>
                    </button>
                    <button
                      className="bg-color-primary border-0"
                      onClick={() => history.goForward()}
                    >
                      <i class="fas fa-chevron-right icon-style-2"></i>
                    </button>
                  </div>
                  <div className="mx-4">
                    <button
                      className="border-0 fs-small mt-1 btn-hover-stop"
                      style={{
                        borderTopLeftRadius: "10px",
                        borderBottomLeftRadius: "10px",
                      }}
                    >
                      <i className="fas fa-search"></i>
                    </button>
                    <input
                      type="text"
                      className="search-box border-0"
                      placeholder="search"
                      style={{
                        fontSize: "14px",
                        borderTopRightRadius: "10px",
                        borderBottomRightRadius: "10px",
                      }}
                    ></input>
                  </div>
                </div>
                <div className="d-flex px-3">
                  <img
                    src="https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png"
                    alt="Profile"
                    height="30"
                    style={{ borderRadius: "50%" }}
                    className="mx-2"
                  />
                  <Link to="#" className="link-2">
                    <p className="pt-1 px-1">Maayami</p>
                  </Link>
                  <button className="pt-1 px-2 bg-color-primary border-0">
                    <i className="fas fa-chevron-down icon-style-2"></i>
                  </button>
                </div>
                {/* incomplete */}
              </div>
              <Switch>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={path+route.path}
                    exact={route.exact}
                    children={<route.main />}
                  />
                ))}
              </Switch>
            </div>
            <div className="col-1 bg-color-secondary"></div>
          </div>
        </div>
      </div>
    </Router>
  );
}
