import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Club from "../club";
import PageNotFound from "../pageNotFound";
import { useAuth } from "../../auth/useAuth";
import { Dropdown } from "react-bootstrap";
import djangoRESTAPI from "../../api/djangoRESTAPI";

export default function ClubPage() {
  const [fanclub, setFanclub] = useState(null);
  const [moreClubsdata, setMoreData] = useState([]);
  const [topFans, setTopFans] = useState([]);
  const [viewpoint, setView] = useState(0);
  const [joinState, setJoinState] = useState("Join Club");
  const [activeState, setActiveState] = useState("active");
  const [isLiked, setisLiked] = useState(false);
  const [isMember, setisMember] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [creator, setCreator] = useState(null);
  const { clubId } = useParams();

  let auth = useAuth();

  const fetchClub = async () => {
    await djangoRESTAPI
      .get(`fanclubs/${clubId}`)
      .then(async (res) => {
        setFanclub(res.data);
        await djangoRESTAPI
          .get(`userdetails/${res.data.creator}/user_name`)
          .then((response) => setCreator(response.data));
        await djangoRESTAPI
          .get(`userdetails/${auth.user.id}/liked_clubs`)
          .then((likedClubs) => {
            setisLiked(likedClubs.data.includes(res.data.id));
          });
        setIsAdmin(res.data.admin_members.includes(auth.user.id));
        fetchTopFans(res.data.top_fans);
        fetchMoreClubs(res.data.creator);
        if (res.data.members.includes(auth.user.id)) {
          setisMember(true);
          setJoinState("Leave Club");
          setActiveState("not-active");
        }
        setView(1);
      })
      .catch((err) => {
        console.log(err);
        setView(2);
      });
  };
  const fetchTopFans = (topFanIds) => {
    topFanIds.map(async (fanId) => {
      await djangoRESTAPI.get(`userdetails_basic/${fanId}`).then((res) => {
        setTopFans((data) => [...data, res.data]);
      });
    });
  };
  const fetchMoreClubs = async (creator) => {
    await djangoRESTAPI
      .get(`fanclubs_basic/created_by/${creator}`)
      .then((res) => setMoreData(res.data.slice(0, 6)));
  };

  useEffect(() => {
    setTopFans([]);
    setView(0);
    fetchClub();
  }, [clubId]);

  const handleLikeClub = () => {
    setisLiked(!isLiked);
  };

  const handleJoinButtonClick = () => {
    if (isMember) {
      setisMember(false);
      setActiveState("active");
      setJoinState("Join Club");
    } else {
      setActiveState("not-active");

      setJoinState("Leave CLub");
      setisMember(true);
    }
  };

  const viewNotFound = () => {
    return <PageNotFound />;
  };

  const viewMain = () => {
    return (
      <div className="px-3 pt-3">
        <div className="top-clubpage">
          <div className="row">
            <div className="col-2">
              <div
                className="club-image-container"
                style={{
                  backgroundImage: `url(http://localhost:8000${fanclub.image})`,
                }}
              ></div>
            </div>
            <div className="col-9 d-flex">
              <div className="align-self-end">
                <div>
                  <p className="fw-bolder fs-larger">{fanclub.name}</p>
                </div>
                <div>
                  <p className="fs-secondary">
                    {fanclub.des} <br />
                    created by{" "}
                    <Link
                      to={`/app/users/${fanclub.creator}`}
                      className="link-2 text-white"
                    >
                      {creator}
                    </Link>
                    {","}
                    <i className="fas fa-users mx-1"></i>
                    {fanclub.members.length}
                  </p>
                </div>
                <div className="pt-3 d-flex">
                  <button
                    onClick={handleJoinButtonClick}
                    className={`btn rounded-pill p-2 px-3 ${activeState}`}
                  >
                    {joinState}
                  </button>
                  <div className="d-flex mx-3">
                    <button
                      className="border-0 bg-color-primary fs-primary text-white scale"
                      onClick={handleLikeClub}
                    >
                      {isLiked ? (
                        <i className="fas fa-heart"></i>
                      ) : (
                        <i className="far fa-heart"></i>
                      )}
                    </button>
                    <Link to={`/app/chats/${clubId}`}>
                      <button className="border-0 bg-color-primary fs-primary pt-2 mx-2 text-white scale">
                        <i className="fas fa-comments"></i>
                      </button>
                    </Link>
                    {isAdmin ? (
                      <div className="pt-2">
                        <Dropdown>
                          <Dropdown.Toggle
                            bsPrefix="bg-color-primary text-white rounded-circle px-1 border"
                            as="button"
                            id="dropdown-basic"
                          >
                            <i className="fas fa-ellipsis-h"></i>
                          </Dropdown.Toggle>

                          <Dropdown.Menu bsPrefix="bg-color-tertiary mt-2">
                            <Dropdown.Item
                              href="#/action-1"
                              className="fs-secondary"
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              href="#/action-2"
                              className="fs-secondary"
                            >
                              Settings
                            </Dropdown.Item>
                            <Dropdown.Item
                              href="#/action-3"
                              className="fs-secondary"
                            >
                              Delete Fanclub
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-4">
            <div className="custom-border-bottom py-2">
              <p>
                <i className="far fa-gem"></i> Top Fans
              </p>
            </div>
            <div className="py-2">
              {topFans.slice(0, 5).map((fan, index) => {
                return (
                  <div className="my-2" key={fan.user_id}>
                    <div className="d-flex">
                      <img
                        src={`${fan.user_profile_image}`}
                        alt="Profile"
                        height="30"
                      />
                      <Link
                        to={`/app/users/${fan.user_id}`}
                        className="link-2 mx-2"
                      >
                        <p className="pt-1 px-1">{fan.user_name}</p>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="pt-4">
            <div className="d-flex justify-content-between custom-border-bottom py-2">
              <p className="fs-secondary">
                Fanclubs by <span className="text-white"> {creator} </span>
              </p>
              <Link
                to={`/app/users/${fanclub.creator}`}
                className="link-2 text-white"
              >
                See All
              </Link>
            </div>
            <div className="d-flex flex-nowrap col-6">
              {moreClubsdata.map((dataItem, index) => {
                return (
                  <div
                    key={dataItem.id}
                    className={`px-${index === 0 ? 0 : 3} py-3`}
                  >
                    <Club
                      clubName={dataItem.name}
                      clubDes={dataItem.des}
                      clubId={dataItem.id}
                      imageurl={dataItem.image}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };
  switch (viewpoint) {
    case 1:
      return viewMain();

    case 2:
      return viewNotFound();

    default:
      return <div>Loading...</div>;
  }
}
