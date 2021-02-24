import React, { useEffect, useState } from "react";
import Club from "../club";
import { useAuth } from "../../auth/useAuth";
import { fetchData } from "../../api/fakeDataAPI";

export default function DefaultPreview({ title, endPoint, tags }) {
  const auth = useAuth();
  const [data, setData] = useState([]);

  const fetchClubs = () => {
    let clubIds = [];
    let sampleData = [];

    switch (endPoint) {
      case "followingClubs":
        clubIds = ["dark_knights", "bollywood_2021"];
        break;
      case "adminClubs":
        clubIds = ["andhadhun_baatein", "the_mib_force", "cats_only"];
        break;
      case "likedClubs":
        clubIds = ["new_club_erena"];
        break;

      default:
        break;
    }

    clubIds.map((clubId) => {
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
      <div className="py-5">
        <p className="pt-5 fs-large fw-bolder">{title}</p>
      </div>
      <div>
        <p className="fw-bold pb-1">{tags[0]}</p>
        <div className="custom-border-top pt-3">
          <div className="clubs-container">
            {/* {data.map((dataItem, index) => (
              <Club
                key={index}
                clubName={dataItem.name}
                clubDes={dataItem.des}
                clubId={dataItem.id}
                imageurl={dataItem.image}
              />
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}
