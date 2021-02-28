import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUser } from "../../api/fakeUserAPI";
import { fetchData } from "../../api/fakeDataAPI";
import PageNotFound from "../pageNotFound";
import Club from '../club'

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [userClubs, setUserClubs] = useState(null);
  const [viewpoint, setView] = useState(0);
  let { userName } = useParams();

  const fetchUserDetails = () => {
    let user = fetchUser(userName);
    if (!user) {
      setView(2);
    } else {
      setUser(user);
      fetchAdminClubsData(user);
      setView(1);
    }
  };

  const fetchAdminClubsData = (user) => {
    let sampleUserClubs = [];
    user.adminClubs.map((clubId) => {
      let club = fetchData(clubId);
      if (club) sampleUserClubs.push(club);
    });
    setUserClubs(sampleUserClubs);
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userName]);

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
                  backgroundImage: `url(${user.profileImageUrl})`,
                }}
              ></div>
            </div>
            <div className="col-9 d-flex">
              <div className="align-self-end">
                <div>
                  <p className="fw-bolder fs-larger">{userName}</p>
                </div>
                <div>
                  <p className="fs-secondary">
                    {user.email}
                  </p>
                </div>
                {/* update here */}
              </div>
            </div>
          </div>
          {/* update here */}
          <div className="pt-4">
            <div className="d-flex justify-content-between custom-border-bottom py-2">
              <p className="fs-secondary">
                Fanclubs by <span className="text-white"> {userName} </span>
              </p>
            </div>
            <div className="d-flex flex-nowrap col-6">
            {userClubs.map((dataItem, index) => {
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
