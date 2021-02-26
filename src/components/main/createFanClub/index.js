import React, { useState } from "react";
import { Modal } from "react-bootstrap";

export default function CreateFanClub(props) {
  const [clubTitle, setTitle] = useState("");
  const [clubDes, setDes] = useState("");
  const [clubImage, setImage] = useState("");

  const createClub = () => {};

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
            <div
              className="club-image-container bg-color-secondary"
              style={{
                backgroundImage: `${clubImage}`,
              }}
            >              
            </div>
          </div>
          <div className="col-8">
            <form>
              <div className="form-group">
                <label htmlFor="clubName">
                  <p className="fs-secondary">Name</p>{" "}
                </label>
                <input
                  type="text"
                  id="clubName"
                  className="form-control mt-1"
                  placeholder="My awesome fanclub"
                  required
                  value={clubTitle}
                  onChange={(e) => setTitle(e.target.value)}
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
                  onChange={(e) => setDes(e.target.value)}
                  rows={5}
                ></textarea>
              </div>
            </form>
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="bg-color-green border-0 p-2 px-3 rounded mt-3 text-white"
              onClick={createClub}
            >
              CREATE
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
