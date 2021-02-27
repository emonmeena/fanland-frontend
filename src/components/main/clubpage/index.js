import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchData } from "../../api/fakeDataAPI";
import { fetchUserClubs } from "../../api/fakeUserAPI";
import Club from "../club";
import ClubNotFound from "../clubNotFound";

export default function ClubPage() {
  const [fanclub, setFanclub] = useState(null);
  const [moreClubsdata, setMoreData] = useState([]);
  const [viewpoint, setView] = useState(0);
  const { clubId } = useParams();

  const fetchClub = (cb) => {
    let sampleClub = fetchData(clubId);
    if (!sampleClub) {
      setView(2);
    } else {
      setFanclub(sampleClub);
      fetchMoreClubs(sampleClub.admin);
      setView(1);
    }
  };

  const fetchMoreClubs = (admin) => {
    let sampleData = [];
    let sampleMoreClubNames = fetchUserClubs(admin, "adminClubs");

    sampleMoreClubNames = sampleMoreClubNames.slice(0, 6);

    sampleMoreClubNames.map((clubId) => {
      let sampleClub = fetchData(clubId);
      sampleData.push(sampleClub);
    });

    setMoreData(sampleData);
    console.log(sampleData);
  };

  useEffect(() => {
    fetchClub();
  }, []);

  const viewNotFound = () => {
    return <ClubNotFound />;
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
                  backgroundImage: `url("https://static.toiimg.com/thumb/msid-65705780,imgsize-105691,width-800,height-600,resizemode-75/65705780.jpg")`,
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
                    created by
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
                <div className="pt-3">
                  <button className="btn rounded p-2 bg-color-green text-white scale">
                    Follow Club
                  </button>
                  <button className="border-0 bg-color-primary fs-primary text-white mx-3 scale">
                    <i className="far fa-heart"></i>
                  </button>
                  <Link to={`/app/chats/${clubId}`}>
                    <button className="border-0 bg-color-primary fs-primary text-white scale">
                      <i className="fas fa-comments"></i>
                      <span className="mx-2">Conversations</span>
                    </button>
                  </Link>
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
              {fanclub.topFans.map((fan, index) => {
                return (
                  <div className="my-2" key={index}>
                    <div className="d-flex">
                      <img
                        src="https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png"
                        alt="Profile"
                        height="30"
                        // style={{ borderRadius: "50%" }}
                        // className=""
                      />
                      <Link to={`/app/users/${fan}`} className="link-2 mx-2">
                        <p className="pt-1 px-1">{fan}</p>
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
                More by <span className="text-white"> {fanclub.admin} </span>
              </p>
              <Link
                to={`/app/users/${fanclub.admin}`}
                className="link-2 text-white"
              >
                See All
              </Link>
            </div>
            <div className="d-flex flex-nowrap">
              {moreClubsdata.map((dataItem, index) => {
                <Club
                  key={index}
                  clubName={dataItem.name}
                  clubDes={dataItem.des}
                  clubId={dataItem.id}
                  imageurl={dataItem.image}
                />;
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
