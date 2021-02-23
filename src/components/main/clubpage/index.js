import React from "react";
import { Link, useParams } from "react-router-dom";
import "./clubpage.css";

export default function ClubPage() {
  const { clubId } = useParams();
  return (
    <div className="px-3 pt-3">
      <div className="top-clubpage">
        <div className="row">
          <div className="col-2">
            <div
              className="clubpage-image-div"
              style={{
                backgroundImage: `url("https://static.toiimg.com/thumb/msid-65705780,imgsize-105691,width-800,height-600,resizemode-75/65705780.jpg")`,
              }}
            ></div>
          </div>
          <div className="col-9">
            {clubId}
            <div>
              <Link to={`/app/chats/${clubId}`}>Open chats</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
