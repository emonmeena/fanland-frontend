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
import { useAuth } from "../auth/useAuth";
import { Dropdown } from "react-bootstrap";

const routes = [
  {
    path: "",
    exact: true,
    main: () => (
      <DefaultPreview title="Home" endpoint="followingClubs" tags={null} />
    ),
  },
  {
    path: "/explore",
    main: () => (
      <DefaultPreview
        title="Explore"
        endpoint="interest"
        tags={[
          { tagTitle: "All", tagId: "" },
          { tagTitle: "Suggested", tagId: "suggested" },
        ]}
      />
    ),
  },
  {
    path: "/recent",
    main: () => (
      <DefaultPreview title="Recent" endpoint="recentClubs" tags={null} />
    ),
  },
  {
    path: "/made_by_me",
    main: (name) => (
      <DefaultPreview
        title={`Made by ${name}`}
        endpoint="adminClubs"
        tags={null}
      />
    ),
  },
  {
    path: "/liked",
    main: () => (
      <DefaultPreview title="Liked Clubs" endpoint="likedClubs" tags={null} />
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
    main: () => <ClubChatRoom />,
  },
];

export default function Main() {
  const auth = useAuth();
  let { path, url } = useRouteMatch();
  const [modalShow, setModalShow] = useState(false);
  const history = useHistory();

  const editProfile = () => {
    console.log("editProfile()");
  };

  const logout = () => {
    console.log("logout()");
  };

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
                  <p className="px-3 fs-smaller">Fanclubs</p>
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
                    to={`${url}/made_by_me`}
                    className="link fw-bold px-3"
                    activeClassName="link-nav-active"
                  >
                    Made by You
                  </NavLink>
                </div>
                <div className="my-1">
                  <NavLink
                    to={`${url}/liked`}
                    className="link fw-bold px-3"
                    activeClassName="link-nav-active"
                  >
                    Liked Clubs
                  </NavLink>
                </div>
              </div>
              <div className="position-absolute col-1" style={{ bottom: 0 }}>
                <button
                  className="bg-color-secondary"
                  onClick={() => setModalShow(true)}
                >
                  <div className="custom-border-top py-3 px-lg-3 px-1 text-white">
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
                    src={auth.user.profileImageUrl}
                    alt="Profile"
                    height="30"
                    style={{ borderRadius: "50%" }}
                    className="mx-2"
                  />
                  <Link
                    to={`/app/users/${auth.user.userName}`}
                    className="link-2"
                  >
                    <p className="pt-1 px-1">{auth.user.userName}</p>
                  </Link>
                  {/* <button className="pt-1 px-2 bg-color-primary border-0">
                    <i className="fas fa-chevron-down icon-style-2"></i>
                  </button> */}
                  <div className="pt-1">
                    <Dropdown>
                      <Dropdown.Toggle
                        bsPrefix="bg-color-primary text-white px-1"
                        as="button"
                        id="dropdown-basic"
                      >
                        <i className="fas fs-secondary fa-chevron-down icon-style-2"></i>
                      </Dropdown.Toggle>

                      <Dropdown.Menu bsPrefix="bg-color-tertiary">
                        <Dropdown.Item
                          onClick={editProfile}
                          className="fs-secondary"
                        >
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item href="#" className="fs-secondary">
                          Settings
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={logout}
                          className="fs-secondary"
                        >
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                {/* incomplete */}
              </div>
              <Switch>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={path + route.path}
                    exact={route.exact}
                    children={route.main(auth.user.userName)}
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
