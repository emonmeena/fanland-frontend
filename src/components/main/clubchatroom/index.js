import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Link, useParams } from "react-router-dom";
import { Dropdown, Spinner } from "react-bootstrap";
import "./index.css";
import { useAuth } from "../../auth/useAuth";
import { fetchData } from "../../api/fakeDataAPI";
import { Chat } from "@material-ui/icons";

const socket = io.connect("http://localhost:4000");

export default function ClubChatRoom() {
  const [viewpoint, setView] = useState(0);
  const [fanclub, setFanclub] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [isMember, setisMember] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [isSocketOn, setSocket] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [image, setImage] = useState(null);
  const { chatRoomId } = useParams();

  let auth = useAuth();
  let userName = auth.user.userName;
  let userProfilePic = auth.user.profileImageUrl;

  const textChange = (e) => {
    setMessage(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (message !== "") {
      console.log(image, " File: ");
      socket.emit("chat-message", {
        authorImage: userProfilePic,
        author: userName,
        message: message,
      });
      // queryselector

      let sampleChat = {
        author: userName,
        authorImage: userProfilePic,
        date: "",
        message: message,
      };
      setFanclub({ ...fanclub, chats: [...fanclub.chats, sampleChat] });
      setMessage("");
    }
  };

  const getFanclub = () => {
    let sampleClub = fetchData(chatRoomId);
    if (sampleClub) {
      let adminBool = sampleClub.adminMembers.includes(userName);
      let memberBool = sampleClub.members.some(
        (member) => member.userName === userName
      );
      setFanclub(sampleClub);
      setAdmin(adminBool);
      setisMember(memberBool);
      setView(1);
    } else setView(2);
  };

  const handleSocketConnection = () => {
    socket.emit("user-active", {
      userName: userName,
      chatRoomId: chatRoomId,
    });
    socket.on("user-online", (activeUser) => {
      setOnlineUsers([...onlineUsers, activeUser.userName]);
      // to be updated
    });

    socket.on("receive-message", (chat) => {
      // queryselector
      let sampleChat = {
        authorImage: chat.authorImage,
        author: chat.author,
        message: chat.message,
      };
      setFanclub({ ...fanclub, chats: [...fanclub.chats, sampleChat] });
    });
    setSocket(true);
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

  const scroll = () => {
    let messageContainer = document.getElementById("message-container");
    messageContainer.scrollTo(0, messageContainer.scrollHeight);
  };

  const joinUser = () => {
    setisMember(true);
    // update require
  };

  useEffect(() => {
    if (viewpoint === 0) {
      getFanclub();
    } else if (viewpoint === 1) {
      if (!isSocketOn) handleSocketConnection();
      scroll();
    }
  }, [chatRoomId, viewpoint, fanclub]);

  const functionsix = () => {
    if (isMember)
      return (
        <form action="#" onSubmit={onFormSubmit} id="send-container">
          <div className="d-flex bg-color-secondary px-2 pt-1">
            <label
              htmlFor="photo-upload"
              className="bg-color-secondary border-0"
            >
              <i className="fas fa-photo-video text-white"></i>
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={photoUpload}
            />
            <input
              type="text"
              id="messageInput"
              className="form-control bg-color-tertiary border-0 message-input text-white"
              placeholder="Message"
              value={message}
              onChange={textChange}
            />
          </div>
        </form>
      );
    else {
      return (
        <div className="d-flex bg-color-secondary">
          <button
            className="bg-color-yellow border-0 p-2 rounded-pill"
            onClick={joinUser}
          >
            Join now
          </button>
          <p className="mx-3 pt-2 fs-yellow">
            You need to be a member of this club to send a message.
          </p>
        </div>
      );
    }
  };

  const ComponentChat = ({ chat }) => {
    return (
      <div className={`message-box py-2 px-1 d-flex justify-content-between`}>
        <div className="d-flex">
          <img
            src={chat.authorImage}
            alt="Profile"
            height="46"
            style={{ borderRadius: "50%" }}
            className="mx-1"
          />
          <p className="fs-smaller px-3">
            <Link
              to={`/app/users/${chat.author}`}
              className="link link-hover-underline"
            >
              <span className="fw-bolder text-white fs-medium">
                {chat.author}
              </span>
            </Link>
            <span className="fs-smallest px-2"> Today, 6 PM</span>
            <br />
            {chat.message}
          </p>
        </div>
        {chat.author === userName || isAdmin ? (
          <div className="pt-2 chat-option px-4">
            <Dropdown>
              <Dropdown.Toggle
                bsPrefix="chat-option text-white px-1 border-0"
                as="button"
                id="dropdown-basic"
              >
                <i className="fas fa-ellipsis-h"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu align="left" bsPrefix="bg-color-secondary">
                <Dropdown.Item href="#/action-1" className="fs-secondary">
                  Remove Post
                </Dropdown.Item>
                {isAdmin ? (
                  <Dropdown.Item href="#/action-2" className="fs-secondary">
                    Ban {chat.author}
                  </Dropdown.Item>
                ) : (
                  <div></div>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  };

  const viewMain = () => {
    return (
      <div>
        <div className="row">
          <div className="col-10">
            <div className="bg-color-tertiary p-2 mx-2 mt-3">
              {fanclub.name}
            </div>
            <div
              className="custom-overflow py-2 chat-box bg-color-primary mx-2"
              id="message-container"
            >
              {fanclub.chats.map((chat, index) => {
                // let type = chat.author === userName ? "send" : "receive";
                return <ComponentChat key={index} chat={chat} />;
              })}
            </div>
            <div className="m-2">{functionsix()}</div>
          </div>
          <div className=" col-2 bg-color-secondary border-right custom-border-right mt-3  pt-2 px-4">
            <div className="custom-border-bottom">
              <p className="fs-small py-1">Members</p>
            </div>
            <div className="pt-3 participants-container overflow-auto">
              {fanclub.members.map((item, index) => {
                return (
                  <div className="d-flex py-2 member-box" key={index}>
                    <div>
                      <img
                        src={item.profileImageUrl}
                        alt="Profile"
                        height="30"
                        style={{ borderRadius: "50%" }}
                      />
                      <span className="dot dot-active"></span>
                    </div>
                    <div>
                      <p className="fs-smaller px-2 pt-1">
                        <Link
                          to={`/app/users/${item.userName}`}
                          className="link link-hover-underline text-white"
                        >
                          {item.userName}
                        </Link>
                        <span className="fs-smallest px-2"> 1 hour</span>
                      </p>
                    </div>
                    {!isAdmin ? (
                      <div></div>
                    ) : (
                      <div className="fs-secondary pt-1 member-options">
                        <i className="fas fa-user-plus"></i>
                        <i className="fas fa-ban px-lg-2"></i>
                      </div>
                    )}
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
      return <div>Something went wrong, please try after some time.</div>;
    default:
      return (
        <div>
          <Spinner animation="border" role="status"></Spinner>
          <p className="fs-primary fs-medium px-3">Loading...</p>
        </div>
      );
  }
}
