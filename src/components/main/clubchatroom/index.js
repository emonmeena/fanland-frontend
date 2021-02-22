import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import "./index.css";

const socket = io.connect("http://localhost:4000");

export default function ClubChatRoom({ userName, userProfilePic }) {
  const { chatRoomId } = useParams();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const textChange = (e) => {
    setMessage(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (message !== "") {
      socket.emit("chat-message", {
        authorImage: userProfilePic,
        author: userName,
        message: message,
      });
      setChats([
        ...chats,
        { authorImage: userProfilePic, author: userName, message: message },
      ]);
      setMessage("");
    }
  };

  const getChatsfromApi = (chatRoomId) => {
    setChats(chatsData);
  };

  useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (loading) {
      socket.emit("user-active", {
        userName: userName,
        chatRoomId: chatRoomId,
      });
      getChatsfromApi(chatRoomId);
      setLoading(false);
    }

    socket.on("user-online", (activeUser) => {
      console.log(
        activeUser.userName,
        " is online on chatRoom ",
        activeUser.chatRoomId
      );
      setOnlineUsers([...onlineUsers, activeUser.userName]);
      // to be updated
    });

    socket.on("receive-message", (chat) => {
      setChats([
        ...chats,
        {
          authorImage: chat.authorImage,
          author: chat.author,
          message: chat.message,
        },
      ]);
    });
    if (messageContainer)
      messageContainer.scrollTo(0, messageContainer.scrollHeight);
  }, [chatRoomId, chats, loading, userName, onlineUsers]);

  return !loading ? (
    <div className="">
      <div className="row">
        <div className="col-10">
          <div className="bg-color-tertiary p-2 mx-2 mt-3"> nnkn</div>
          <div
            className="overflow-auto px-1 chat-box bg-color-primary mx-2"
            id="message-container"
          >
            {chats.map((chat, index) => {
              // let type = chat.author === userName ? "send" : "receive";
              return (
                <div key={index} className={`message-box py-2 px-1 d-flex`}>
                  <img
                    src={chat.authorImage}
                    alt="Profile"
                    height="46"
                    style={{ borderRadius: "50%" }}
                    className="mx-1"
                  />
                  <p className="fs-smaller px-3">
                    <Link className="link link-hover-underline">
                      <span className="fw-bolder text-white fs-medium">
                        {chat.author}
                      </span>
                    </Link>
                    <span className="fs-smallest px-2"> Today, 6 PM</span>
                    <br />
                    {chat.message}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="m-2">
            <form action="#" onSubmit={onFormSubmit} id="send-container">
              <div className="d-flex bg-color-secondary px-2 pt-1">
                <button className="bg-color-secondary border-0">
                  <i class="fas fa-photo-video text-white"></i>
                </button>
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
          </div>
        </div>
        <div className=" col-2 bg-color-secondary border-right custom-border-right mt-3  pt-2 px-4">
          <div className="custom-border-bottom">
            <p className="fs-small py-1">Members</p>
          </div>
          <div className="pt-3 participants-container overflow-auto">
            {chatsData.map((item) => {
              return (
                <div className="d-flex py-2">
                  <div>
                    <img
                      src={
                        "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png"
                      }
                      alt="Profile"
                      height="30"
                      style={{ borderRadius: "50%" }}
                    />
                    <span class="dot dot-active"></span>
                  </div>
                  <div>
                    <p className="fs-smaller px-2 pt-1">
                      <Link className="link link-hover-underline text-white">
                        MiyMaayami
                      </Link>
                      <span className="fs-smallest px-2"> 1 hour</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <Spinner animation="border" role="status"></Spinner>
    </div>
  );
}

const chatsData = [
  {
    authorImage: "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png",
    author: "Mayank",
    message: "This message was sent by you!!",
  },
  {
    authorImage: "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png",
    author: "Mayank",
    message: "This message was sent by you!!",
  },
  {
    authorImage: "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png",
    author: "Mayank",
    message: "This message was sent by you!!",
  },
  {
    authorImage: "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png",
    author: "Mayank",
    message: "This message was sent by you!!",
  },
  {
    authorImage: "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png",
    author: "Mayank",
    message: "This message was sent by you!!",
  },
  {
    authorImage: "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png",
    author: "Mayank",
    message: "This message was sent by you!!",
  },
  {
    authorImage: "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png",
    author: "Mayank",
    message: "This message was sent by you!!",
  },
  {
    authorImage: "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png",
    author: "Mayank",
    message: "This message was sent by you!!",
  },
  {
    authorImage: "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png",
    author: "Mayank",
    message: "This message was sent by you!!",
  },
  {
    authorImage: "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png",
    author: "Mayank",
    message: "This message was sent by you!!",
  },
  {
    authorImage: "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png",
    author: "Mayank",
    message: "This message was sent by you!!",
  },
  {
    authorImage: "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png",
    author: "Mayank",
    message: "This message was sent by you!!",
  },
  {
    authorImage: "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png",
    author: "Mayank",
    message: "This message was sent by you!!",
  },
  {
    authorImage: "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png",
    author: "Mayank",
    message: "This message was sent by you!!",
  },
  {
    authorImage: "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png",
    author: "Mayank",
    message: "This message was sent by you!!",
  },
  {
    authorImage: "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png",
    author: "Mayank",
    message: "This message was sent by you!!",
  },
  {
    authorImage: "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png",
    author: "Mayank",
    message: "This message was sent by you!!",
  },
  {
    authorImage: "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png",
    author: "Mayank",
    message: "This message was sent by you!!",
  },
  {
    authorImage: "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png",
    author: "Mayank",
    message: "This message was sent by you!!",
  },
  {
    authorImage: "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png",
    author: "Mayank",
    message: "This message was sent by you!!",
  },
  {
    authorImage: "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png",
    author: "Mayank",
    message: "This message was sent by you!!",
  },
  {
    authorImage: "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png",
    author: "Mayank",
    message: "This message was sent by you!!",
  },
  {
    authorImage: "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png",
    author: "Mayank",
    message: "This message was sent by you!!",
  },
  {
    authorImage: "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png",
    author: "Mayank",
    message: "This message was sent by you!!",
  },
  {
    authorImage: "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png",
    author: "Mayank",
    message: "This message was sent by you!!",
  },
];
