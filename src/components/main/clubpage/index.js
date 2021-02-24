import React from "react";
import { Link, useParams } from "react-router-dom";

export default function ClubPage() {
  const { clubId } = useParams();
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
            <div class="align-self-end">
              <div>
                {/* <p className="fs-small">Fanclub</p> */}
                <p className="fw-bolder fs-larger">MIB Force</p>
              </div>
              <div>
                <p className="fs-secondary">
                  description of the fanclub <br />
                  created by {/* <span> */}
                  <Link to={`/app/users/Maayami`} className="link-2 text-white">
                    Maayami
                  </Link>
                  {","}
                  <i className="fas fa-users mx-1"></i>
                  328 Members
                  {/* </span> */}
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
              {" "}
              <i class="far fa-gem"></i> Top Fans
            </p>
          </div>
          <div className="py-2">
            {topFans.map((fan, index) => {
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
          <div className="custom-border-bottom py-2">
            <p className="fs-secondary"> More by  <span className="text-white">Maayami</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

const topFans = ["Alan1619", "poby1", "maayami"];
