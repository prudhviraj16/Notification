import React, { useEffect, useState } from "react";
import Message from "../../img/message.svg";
import Settings from "../../img/settings.svg";
import "./navbar.css";

const Navbar = ({ socket }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    socket.on("getNotification", (data) => {
      console.log(data);
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  const displayNotifications = ({ senderName, type }) => {
    let action;

    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }

    return (
      <span className="notification">{`${senderName} ${action} your post`}</span>
    );
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  return (
    <div className="navbar">
      <div className="logo">Jwala App</div>
      <div className="icons">
        <div className="icon">
          <i className="bi bi-bell-fill" onClick={() => setOpen(!open)}></i>
          {notifications.length > 0 && (
            <div className="counter">{notifications.length}</div>
          )}
        </div>
        <div className="icon">
          {/* <i clas="bi bi-bell-fill"></i> */}
          <img src={Message} alt="" className="iconImg" />
        </div>
        <div className="icon">
          {/* <i class="bi bi-bell-fill"></i> */}
          <img src={Settings} alt="" className="iconImg" />
        </div>
      </div>
      {open && (
        <div className="notifications">
          {notifications.map((n, index) => (
            <>
              <p key={index}>{displayNotifications(n)}</p>
              
            </>
          ))}
          {notifications.length > 0 ? <button className="nButton" onClick={handleRead}>
                Mark as Read
              </button> : 'No notifications'}
        </div>
      )}
    </div>
  );
};

export default Navbar;
