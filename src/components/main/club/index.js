import React from "react";
import { Link } from "react-router-dom";
import "./club.css";

export default function Club({ imageurl, clubName, clubDes, clubId }) {
  return (
    <div className="club-layout my-2">
      <Link to={`/clubs/${clubId}`} className="club-layout">
        <div
          className="club-image-div"
          style={{
            backgroundImage: `url(${imageurl})`,
          }}
        ></div>
      </Link>
      <div className="mt-2">
        <h6 className="fw-bold mb-1">
          <p>{clubName}</p>
        </h6>
        <p className="text-white-50 small-text">{clubDes}</p>
      </div>
    </div>
  );
}
