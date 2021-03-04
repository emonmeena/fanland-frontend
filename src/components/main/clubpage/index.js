import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchData } from "../../api/fakeDataAPI";
import { fetchUserClubs } from "../../api/fakeUserAPI";
import Club from "../club";
import PageNotFound from "../pageNotFound";
import { useAuth } from "../../auth/useAuth";
import { Dropdown } from "react-bootstrap";

export default function ClubPage() {
  const [fanclub, setFanclub] = useState(null);
  const [moreClubsdata, setMoreData] = useState([]);
  const [viewpoint, setView] = useState(0);
  const [joinState, setJoinState] = useState("Join Club");
  const [activeState, setActiveState] = useState("active");
  const [isLiked, setisLiked] = useState(false);
  const [isMember, setisMember] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { clubId } = useParams();

  let auth = useAuth();

  const fetchClub = () => {
    let sampleClub = fetchData(clubId);
    if (!sampleClub) {
      setView(2);
    } else {
      fetchMoreClubs(sampleClub.admin);
      setFanclub(sampleClub);
      let memberBool = sampleClub.members.some(
        (member) => member.userName === auth.user.userName
      );
      let adminBool = sampleClub.adminMembers.includes(auth.user.userName);
      setIsAdmin(adminBool);
      setisMember(memberBool);
      if (memberBool) {
        setJoinState("Leave Club");
        setActiveState("not-active");
      }
      setView(1);
    }
  };

  const fetchMoreClubs = (admin) => {
    let sampleMoreData = [];
    let sampleMoreClubNames = fetchUserClubs(admin, "adminClubs");
    let sampleLikedClubs = fetchUserClubs(auth.user.userName, "likedClubs");
    let likedBool = sampleLikedClubs.includes(clubId);

    sampleMoreClubNames = sampleMoreClubNames.slice(0, 6);

    sampleMoreClubNames.map((clubId) => {
      let sampleClub = fetchData(clubId);
      sampleMoreData.push(sampleClub);
    });
    setisLiked(likedBool);
    setMoreData(sampleMoreData);
  };

  useEffect(() => {
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
                  backgroundImage: `url(${fanclub.image})`,
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
                      to={`/app/users/${fanclub.admin}`}
                      className="link-2 text-white"
                    >
                      {fanclub.admin}
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
                  <button
                    className="border-0 bg-color-primary fs-primary text-white mx-3 scale"
                    onClick={handleLikeClub}
                  >
                    {isLiked ? (
                      <i className="fas fa-heart"></i>
                    ) : (
                      <i className="far fa-heart"></i>
                    )}
                  </button>
                  <Link to={`/app/chats/${clubId}`}>
                    <button className="border-0 bg-color-primary fs-primary pt-2 text-white scale">
                      <i className="fas fa-comments"></i>
                      <span className="mx-2">Conversations</span>
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
          <div className="pt-4">
            <div className="custom-border-bottom py-2">
              <p>
                <i className="far fa-gem"></i> Top Fans
              </p>
            </div>
            <div className="py-2">
              {fanclub.topFans.slice(0, 5).map((fan, index) => {
                return (
                  <div className="my-2" key={index}>
                    <div className="d-flex">
                      <img
                        src={fan.profileImageUrl}
                        alt="Profile"
                        height="30"
                        // style={{ borderRadius: "50%" }}
                        // className=""
                      />
                      <Link
                        to={`/app/users/${fan.userName}`}
                        className="link-2 mx-2"
                      >
                        <p className="pt-1 px-1">{fan.userName}</p>
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
                Fanclubs by{" "}
                <span className="text-white"> {fanclub.admin} </span>
              </p>
              <Link
                to={`/app/users/${fanclub.admin}`}
                className="link-2 text-white"
              >
                See All
              </Link>
            </div>
            <div className="d-flex flex-nowrap col-6">
              {moreClubsdata.map((dataItem, index) => {
                return (
                  <div key={index} className={`px-${index === 0 ? 0 : 3} py-3`}>
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
