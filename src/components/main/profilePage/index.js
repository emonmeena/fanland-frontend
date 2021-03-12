import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUser } from "../../api/fakeUserAPI";
import { fetchData } from "../../api/fakeDataAPI";
import PageNotFound from "../pageNotFound";
import Club from "../club";
import djangoRESTAPI from "../../api/djangoRESTAPI";

export default function ProfilePage() {
  const [user, setUser] = useState({});
  const [userClubs, setUserClubs] = useState([]);
  const [viewpoint, setView] = useState(0);
  let { userId } = useParams();

  const fetchUserDetails = async () => {
    djangoRESTAPI
      .get(`userdetails/${userId}`)
      .then((res) => {
        fetchAdminClubsData();
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchAdminClubsData = async () => {
    djangoRESTAPI
      .get(`fanclubs_basic/created_by/${userId}`)
      .then((res) => {
        setUserClubs(res.data);
        setView(1);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

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
                  backgroundImage: `url(http://localhost:8000${user.user_profile_image})`,
                }}
              ></div>
            </div>
            <div className="col-9 d-flex">
              <div className="align-self-end">
                <div>
                  <p className="fw-bolder fs-larger">{user.user_name}</p>
                </div>
                <div>
                  <p className="fs-secondary">{user.user_status}</p>
                </div>
                {/* update here */}
              </div>
            </div>
          </div>
          {/* update here */}
          <div className="pt-4">
            <div className="d-flex justify-content-between custom-border-bottom py-2">
              <p className="fs-secondary">
                Fanclubs by{" "}
                <span className="text-white"> {user.user_name} </span>
              </p>
            </div>
            <div className="d-flex flex-nowrap col-6">
              {userClubs.map((dataItem, index) => {
                return (
                  <div key={dataItem.id} className={`px-${index === 0 ? 0 : 3} py-3`}>
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
