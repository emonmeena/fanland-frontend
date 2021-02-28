import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { AddClubData } from "../../api/fakeDataAPI";

export default function CreateFanClub(props) {
  const [clubTitle, setTitle] = useState("");
  const [clubDes, setDes] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [clubImage, setImage] = useState(
    "https://img.washingtonpost.com/rf/image_1484w/WashingtonPost/Content/Blogs/celebritology/Images/Film_Review_Dark_Knight_Rises-085d2-4549.jpg?uuid=ryK-otD1EeGt8tVushDNzQ"
  );
  const [clubID, setClubID] = useState("");
  let auth = useAuth();
  let userName = auth.user.userName;

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || {
    from: { pathname: `/app/clubs/${clubID}` },
  };

  const createClubId = (str) => {
    str = str.trim();
    str = str.toLowerCase();
    str = str.replace(/ /g, "_");
    setClubID(str);
  };

  const resetStates = () => {
    setTitle("");
    setDes("");
    setImage("");
    setImage(
      "https://img.washingtonpost.com/rf/image_1484w/WashingtonPost/Content/Blogs/celebritology/Images/Film_Review_Dark_Knight_Rises-085d2-4549.jpg?uuid=ryK-otD1EeGt8tVushDNzQ"
    );
  };

  const createClub = (e) => {
    e.preventDefault();
    let sampleClub = {};
    sampleClub.name = clubTitle;
    sampleClub.des = clubDes;
    sampleClub.image = clubImage;
    sampleClub.id = clubID;
    sampleClub.topFans = [
      {
        userName: "Maayami",
        profileImageUrl:
          "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png",
      },
    ];
    sampleClub.admin = userName;
    sampleClub.members = [
      {
        userName: "Maayami",
        profileImageUrl:
          "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png",
      },
    ];
    sampleClub.chats = [
      {
        authorImage: "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png",
        author: "Mayank",
        profileImageUrl:
          "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png",

        message: `${auth.user.userName}, joined the room`,
        date: "",
      },
    ];

    AddClubData(sampleClub);
    resetStates();
    props.onHide();
    history.replace(from);
  };

  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setImageFile(file);
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      contentClassName="bg-color-primary text-white px-3 py-3"
    >
      <div className="d-flex px-2">
        <div className="col-11 text-center">
          <p className="fw-bold fs-5">Create Fanclub</p>
        </div>
        <div className="col-1 text-end">
          <button className="bg-color-primary" onClick={() => props.onHide()}>
            <i className="fas fa-times fs-primary"></i>
          </button>
        </div>
      </div>
      <Modal.Body>
        <div className="row">
          <div className="col-4">
            <label htmlFor="photo-upload" className="w-100">
              <div
                className="club-image-container"
                style={{
                  backgroundImage: `url(${clubImage})`,
                }}
              ></div>
            </label>
            <input id="photo-upload" type="file" onChange={photoUpload} />
          </div>
          <div className="col-8">
            <form onSubmit={createClub}>
              <div className="form-group">
                <label htmlFor="clubName">
                  <p className="fs-secondary">Name</p>
                </label>
                <input
                  type="text"
                  id="clubName"
                  className="form-control mt-1"
                  placeholder="My awesome fanclub"
                  required
                  value={clubTitle}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    createClubId(e.target.value);
                  }}
                />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="clubDes">
                  <p className="fs-secondary">Description</p>
                </label>
                <textarea
                  type="text"
                  id="clubDes"
                  className="form-control mt-1"
                  placeholder="Give your fanclub a catchy description."
                  value={clubDes}
                  required
                  onChange={(e) => setDes(e.target.value)}
                  rows={5}
                ></textarea>
              </div>
              <div className="mx-md-5 px-md-3 pt-2">
                <button
                  type="submit"
                  className="bg-color-green border-0 p-2 px-3 rounded mt-3 text-white"
                >
                  CREATE
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
