import React, { useEffect, useState } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import Club from "../club";
import { useAuth } from "../../auth/useAuth";
import { fetchData } from "../../api/fakeDataAPI";
import { fetchUserClubs } from "../../api/fakeUserAPI";

export default function DefaultPreview({ title, endpoint, tags }) {
  let { url } = useRouteMatch();
  const auth = useAuth();
  const [data, setData] = useState([]);

  const fetchClubs = () => {
    let sampleData = [];
    let clubNames = fetchUserClubs(auth.user.userName, endpoint);

    clubNames.map((clubId) => {
      let sampleClub = fetchData(clubId);
      sampleData.push(sampleClub);
    });
    setData(sampleData);
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  return (
    <div className="px-3 overflow-auto container-home">
      <div>
        <p className="pt-5 fs-large fw-bolder ">{title}</p>
      </div>
      <div>
        {tags ? (
          <div className="d-flex my-4">
            {tags.map((tag, index) => {
              let link = index === 0 ? url : url + "/" + tag.tagId;
              return (
                <NavLink
                  exact
                  key={index}
                  to={link}
                  className="link mx-2 text-white py-1"
                  activeClassName="tag-navlink-active"
                >
                  {tag.tagTitle}
                </NavLink>
              );
            })}
          </div>
        ) : (
          <div className="py-3"></div>
        )}
        {/* <p className="fw-bold pb-1"></p> */}
        <div className="custom-border-top pt-3">
          <div className="clubs-container">
            {data.map((dataItem, index) => (
              <Club
                key={index}
                clubName={dataItem.name}
                clubDes={dataItem.des}
                clubId={dataItem.id}
                imageurl={dataItem.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
