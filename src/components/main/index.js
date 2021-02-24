import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useRouteMatch,
  NavLink,
} from "react-router-dom";
import "./index.css";
import ClubPage from "./clubpage";
import ClubChatRoom from "./clubchatroom";
import CreateFanClub from "./createFanClub";
import DefaultPreview from "./defaultPreview";
import ProfilePage from "./profilePage";

const routes = [
  {
    path: "",
    exact: true,
    main: () => (
      <DefaultPreview title="Home" urlEndpoint="#" tags={["Followed by You"]} />
    ),
  },
  {
    path: "/explore",
    main: () => (
      <DefaultPreview title="Explore" urlEndpoint="#" tags={["Recomended"]} />
    ),
  },
  {
    path: "/made_by_me",
    main: () => (
      <DefaultPreview
        title="Made by Me"
        urlEndpoint="#"
        tags={["Recomended"]}
      />
    ),
  },
  {
    path: "/recent",
    main: () => (
      <DefaultPreview title="Recent" urlEndpoint="#" tags={["Recomended"]} />
    ),
  },
  {
    path: "/liked",
    main: () => (
      <DefaultPreview title="Liked" urlEndpoint="#" tags={["Recomended"]} />
    ),
  },
  {
    path: "/clubs/:clubId",
    main: () => <ClubPage />,
  },
  {
    path: "/users/:userName",
    main: () => <ProfilePage />,
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

export default function Main() {
  let { path, url } = useRouteMatch();
  const [modalShow, setModalShow] = useState(false);
  const history = useHistory();
  return (
    <Router>
      <CreateFanClub show={modalShow} onHide={() => setModalShow(false)} />
      <div
        className="main-container text-white"
        style={{ backgroundColor: "black" }}
      >
        <div className="container-fluid">
          <div className="row" style={{ height: "100vh" }}>
            {/* Column 1 */}
            <div className="col-1 bg-color-secondary p-0">
              <div className="py-3">
                <div className="mb-3">
                  <NavLink
                    exact
                    to={"/app"}
                    className="link px-3 py-1"
                    activeClassName="link-nav-active"
                  >
                    <i className="fas fa-home icon-style"></i>
                    Home
                  </NavLink>
                </div>
                <div className="mb-3">
                  <NavLink
                    to={`${url}/explore`}
                    className="link px-3 py-1"
                    activeClassName="link-nav-active"
                  >
                    <i className="far fa-compass icon-style"></i> Explore
                  </NavLink>
                </div>
              </div>
              <div className="fs-secondary">
                <div>
                  <p className="px-3">Fan Clubs</p>
                </div>
                <div className="my-1">
                  <NavLink
                    to={`${url}/made_by_me`}
                    className="link fw-bold px-3"
                    activeClassName="link-nav-active"
                  >
                    Made by You
                  </NavLink>
                </div>
                <div className="my-1">
                  <NavLink
                    to={`${url}/recent`}
                    className="link fw-bold px-3"
                    activeClassName="link-nav-active"
                  >
                    Recent
                  </NavLink>
                </div>
                <div className="my-1">
                  <NavLink
                    to={`${url}/liked`}
                    className="link fw-bold px-3"
                    activeClassName="link-nav-active"
                  >
                    Liked
                  </NavLink>
                </div>
              </div>
              <div className="position-absolute col-1" style={{ bottom: 0 }}>
                <button
                  className="bg-color-secondary"
                  onClick={() => setModalShow(true)}
                >
                  <div className="custom-border-top py-3 px-3 text-white">
                    <i className="fas fa-plus-circle icon-style fa-2x"></i>
                    New Club
                  </div>
                </button>
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
                      <i className="fas fa-chevron-left icon-style-2 nav-btn-hover"></i>
                    </button>
                    <button
                      className="bg-color-primary border-0"
                      onClick={() => history.goForward()}
                    >
                      <i className="fas fa-chevron-right icon-style-2 nav-btn-hover"></i>
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
                  <Link to={`/app/users/${"Maayami"}`} className="link-2">
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
                    path={path + route.path}
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
