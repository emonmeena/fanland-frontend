import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Link, useParams } from "react-router-dom";
import { Spinner, Dropdown } from "react-bootstrap";
import "./index.css";
import { useAuth } from "../../auth/useAuth";
import djangoRESTAPI from "../../api/djangoRESTAPI";

const socket = io.connect("http://localhost:4000");

export default function ClubChatRoom() {
  const [viewpoint, setView] = useState(0);
  const [fanclub, setFanclub] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [clubMmebers, setClubMembers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [isImageMessage, setIsImageMessage] = useState(false);
  const [isMember, setisMember] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSocketOn, setSocket] = useState(false);
  const [image, setImage] = useState(null);
  const [file, setImageFile] = useState(null);
  const { chatRoomId } = useParams();

  let auth = useAuth();
  let userId = auth.user.id;
  let userName = auth.user.user_name;
  let userProfilePic = auth.user.user_profile_image;

  useEffect(() => {
    if (viewpoint === 0 && !fanclub) {
      getFanclub();
    } else if (viewpoint === 1) {
      if (!isSocketOn) handleSocketConnection();
      scroll();
    }
  }, [chatRoomId, viewpoint, fanclub]);

  const textChange = (e) => {
    setMessage(e.target.value);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (message || file) {
      let form_data = new FormData();
      form_data.append("chatroom_id", chatRoomId);
      form_data.append("author_image", userProfilePic);
      form_data.append("author_name", userName);
      form_data.append("author_id", userId);
      form_data.append("is_image_message", isImageMessage);
      if (isImageMessage) form_data.append("media", file, file.name);
      form_data.append("message", message);

      await djangoRESTAPI
        .post(`chats/${chatRoomId}/`, form_data, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          let sampleChat = {
            id: res.data.id,
            author_id: userId,
            chatroom_id: chatRoomId,
            author_name: userName,
            author_image: userProfilePic,
            message: message,
            media: res.data.media,
            is_image_message: isImageMessage,
          };
          socket.emit("chat-message", sampleChat);
          setChatMessages((data) => [...data, sampleChat]);
        })
        .catch((err) => console.log(err));

      setMessage("");
      setIsImageMessage(false);
      setImageFile(null);
      setImage(null);
      scroll();
    }
  };

  const getFanclub = async () => {
    await djangoRESTAPI
      .get(`fanclubs/${chatRoomId}`)
      .then(async (res) => {
        await djangoRESTAPI
          .get(`chats/${chatRoomId}`)
          .then((res) => setChatMessages(res.data));
        res.data.members.map(async (userId) => {
          await djangoRESTAPI
            .get(`userdetails_basic/${userId}`)
            .then((userdetailBasic) => {
              setClubMembers((members) => [...members, userdetailBasic.data]);
            })
            .catch((err) => console.log(err));
        });
        setFanclub(res.data);
        setIsAdmin(res.data.admin_members.includes(userId));
        setisMember(res.data.members.includes(userId));
        setView(1);
      })
      .catch((err) => {
        console.log(err);
        setView(2);
      });
  };

  const handleSocketConnection = () => {
    socket.emit("user-active", {
      userName: userName,
      chatRoomId: chatRoomId,
    });
    socket.on("user-online", (activeUser) => {
      setOnlineUsers([...onlineUsers, activeUser.userName]);
    });

    socket.on("receive-message", (chat) => {
      setChatMessages((data) => [...data, chat]);
      scroll();
    });
    socket.on("to-delete-chat", (chatId) => {
      let chatComponent = document.getElementById(chatId);
      chatComponent.innerHTML = "This message was deleted";
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
    setIsImageMessage(true);
  };

  const scroll = () => {
    let messageContainer = document.getElementById("message-container");
    messageContainer.scrollTo(0, messageContainer.scrollHeight);
  };

  const joinUser = () => {
    setisMember(true);
    // update require
  };

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

  const banUser = async (userId) => {
    await djangoRESTAPI.get(`fanclubs/${chatRoomId}`).then(async (res) => {
      await djangoRESTAPI.put(`fanclubs/${res.data.id}/`, {
        banned_users: [...res.data.banned_users, userId],
      });
    });
  };

  const deleteChat = async (chatId) => {
    await djangoRESTAPI
      .delete(`chat/${chatId}`)
      .then(() => {
        let chatComponent = document.getElementById(chatId);
        chatComponent.classList.add("d-none");
        socket.emit("chat-delete", { chatroomId: chatRoomId, chatId: chatId });
      })
      .catch((err) => console.log(err));
  };

  const ComponentChat = ({ chat }) => {
    return (
      <div
        id={chat.id}
        className={`message-box py-2 px-1 d-flex justify-content-between`}
      >
        <div className="d-flex">
          <img
            src={chat.author_image}
            alt="Profile"
            height="46"
            style={{ borderRadius: "50%" }}
            className="mx-1"
          />
          <p className="fs-smaller px-3">
            <Link
              to={`/app/users/${chat.author_id}`}
              className="link link-hover-underline"
            >
              <span className="fw-bolder text-white fs-medium">
                {chat.author_name}
              </span>
            </Link>
            <span className="fs-smallest px-2">
              {" "}
              {chat.date}, {chat.time}{" "}
            </span>
            <br />
            {chat.is_image_message ? (
              <div>
                <img
                  className="my-2"
                  style={{ maxHeight: "300px" }}
                  src={`http://localhost:8000${chat.media}`}
                />
              </div>
            ) : (
              ""
            )}
            {chat.message ? chat.message : ""}
          </p>
        </div>
        {chat.author_id === userId || isAdmin ? (
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
                <Dropdown.Item
                  onClick={() => deleteChat(chat.id)}
                  className="fs-secondary"
                >
                  Delete Post
                </Dropdown.Item>
                {isAdmin && userId != fanclub.creator ? (
                  <Dropdown.Item
                    onClick={() => banUser(userId)}
                    className="fs-secondary"
                  >
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
              {chatMessages.map((chat) => {
                return <ComponentChat key={chat.id} chat={chat} />;
              })}
            </div>
            {isImageMessage ? (
              <div
                className="mx-2 position-absolute p-2 bg-color-tertiary"
                style={{ bottom: 60 }}
              >
                <div className="d-flex justify-content-between">
                  <p className="fw-bold">Image Preview</p>
                  <button
                    className="bg-color-tertiary text-white"
                    onClick={() => {
                      setIsImageMessage(false);
                      setImageFile(null);
                    }}
                  >
                    <i className="fa fa-times"></i>
                  </button>
                </div>
                <img
                  className="my-2"
                  style={{ maxHeight: "300px" }}
                  src={image}
                />
                <p className="fs-small fs-secondary">
                  Press enter to upload the selected image to the fanland
                  server.
                </p>
              </div>
            ) : (
              <p></p>
            )}
            <div className="m-2">{functionsix()}</div>
          </div>
          <div className=" col-2 bg-color-secondary border-right custom-border-right mt-3  pt-2 px-4">
            <div className="custom-border-bottom">
              <p className="fs-small py-1">Members</p>
            </div>
            <div className="pt-3 participants-container overflow-auto">
              {clubMmebers.map((item) => {
                return (
                  <div className="d-flex py-2 member-box" key={item.user_id}>
                    <div>
                      <img
                        src={item.user_profile_image}
                        alt="Profile"
                        height="30"
                        style={{ borderRadius: "50%" }}
                      />
                      <span className="dot dot-active"></span>
                    </div>
                    <div>
                      <p className="fs-smaller px-2 pt-1">
                        <Link
                          to={`/app/users/${item.user_id}`}
                          className="link link-hover-underline text-white"
                        >
                          {item.user_name}
                        </Link>
                        <span className="fs-smallest px-2"> 1 hour</span>
                      </p>
                    </div>
                    {isAdmin && userId != item.user_id ? (
                      <div className="pt-1 member-options">
                        <i className="fas fa-user-plus"></i>
                        <button
                          className="bg-color-secondary"
                          onClick={() => banUser(item.user_id)}
                        >
                          <i className="fas fa-ban px-lg-2 fs-secondary "></i>
                        </button>
                      </div>
                    ) : (
                      <div></div>
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
