import React, { useEffect, useState } from "react";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotificationApi,
} from "../../helper/apis";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const NOTIF_ICONS = {
  connection_request: { icon: "fa-user-plus", color: "#0a66c2" },
  connection_accepted: { icon: "fa-user-check", color: "#057642" },
  follow: { icon: "fa-user-plus", color: "#915cd4" },
  post_like: { icon: "fa-thumbs-up", color: "#0a66c2" },
  post_comment: { icon: "fa-comment", color: "#e68523" },
  story_reply: { icon: "fa-reply", color: "#e16087" },
  game_invite: { icon: "fa-gamepad", color: "#e91e63" },
};

const getNotifLink = (notification) => {
  switch (notification.type) {
    case "connection_request":
      return "/network";
    case "connection_accepted":
    case "follow":
      return `/profile/${notification.sender?._id}`;
    case "post_like":
    case "post_comment":
      return notification.referenceId ? `/post?id=${notification.referenceId}` : null;
    case "game_invite":
      return "/games";
    case "story_reply":
      return "/";
    default:
      return null;
  }
};

const getNotifBtnLabel = (type) => {
  switch (type) {
    case "connection_request":
      return "View Requests";
    case "connection_accepted":
    case "follow":
      return "View Profile";
    case "post_like":
    case "post_comment":
      return "View Post";
    case "game_invite":
      return "View Invitation";
    default:
      return null;
  }
};

const NotificationsMid = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState("all"); // "all" | "unread"

  const fetchNotifications = async () => {
    try {
      const res = await getNotifications(dispatch);
      if (res?.status === "success") {
        setNotifications(res.notifications);
        setUnreadCount(res.unreadCount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.log(error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const res = await markAllNotificationsRead();
      if (res?.status === "success") {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
        setUnreadCount(0);
        toast.success("All notifications marked as read");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const was = notifications.find((n) => n._id === id);
      const res = await deleteNotificationApi(id);
      if (res?.status === "success") {
        setNotifications((prev) => prev.filter((n) => n._id !== id));
        if (was && !was.isRead) setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotifClick = async (notification) => {
    if (!notification.isRead) {
      await handleMarkAsRead(notification._id);
    }
    const link = getNotifLink(notification);
    if (link) navigate(link);
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    const weeks = Math.floor(days / 7);
    return `${weeks}w ago`;
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const displayed = filter === "unread"
    ? notifications.filter((n) => !n.isRead)
    : notifications;

  return (
    <div className="notifications-middle-section box-shadow">
      {/* Header */}
      <div className="notif-header">
        <div className="notif-header-left">
          <h3>Notifications</h3>
          {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
        </div>
        {unreadCount > 0 && (
          <button className="notif-mark-all-btn" onClick={handleMarkAllRead}>
            <i className="fa fa-check-double"></i> Mark all read
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="notif-filters">
        <button
          className={`notif-filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`notif-filter-btn ${filter === "unread" ? "active" : ""}`}
          onClick={() => setFilter("unread")}
        >
          Unread {unreadCount > 0 && `(${unreadCount})`}
        </button>
      </div>

      {/* Notification list */}
      <div className="all-notifications">
        {displayed.length === 0 ? (
          <div className="notif-empty">
            <i className="fa fa-bell-slash"></i>
            <p>{filter === "unread" ? "No unread notifications" : "No notifications yet"}</p>
          </div>
        ) : (
          displayed.map((notification) => {
            const typeInfo = NOTIF_ICONS[notification.type] || { icon: "fa-bell", color: "#666" };
            const btnLabel = getNotifBtnLabel(notification.type);
            const messageText = notification.message
              ?.replace(notification.sender?.fullName, "")
              .trim();

            return (
              <div
                className={`notification-item ${!notification.isRead ? "unread" : ""}`}
                key={notification._id}
                onClick={() => handleNotifClick(notification)}
              >
                {/* Unread indicator dot */}
                {!notification.isRead && <div className="notif-unread-dot" />}

                {/* Avatar with type badge */}
                <div className="notif-avatar-wrap">
                  <Link
                    to={`/profile/${notification.sender?._id}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={
                        notification.sender?.profileUrl ||
                        "https://res.cloudinary.com/demmiusik/image/upload/v1711703262/s66xmxvaoqky3ipbxskj.jpg"
                      }
                      alt={notification.sender?.fullName}
                      className="notif-avatar"
                    />
                  </Link>
                  <div
                    className="notif-type-badge"
                    style={{ backgroundColor: typeInfo.color }}
                  >
                    <i className={`fa ${typeInfo.icon}`}></i>
                  </div>
                </div>

                {/* Content */}
                <div className="notif-content">
                  <p className="notif-message">
                    <strong>{notification.sender?.fullName}</strong> {messageText}
                  </p>
                  <span className="notif-time">{getTimeAgo(notification.createdAt)}</span>
                  {btnLabel && (
                    <Link
                      to={getNotifLink(notification)}
                      className="notif-action-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {btnLabel}
                    </Link>
                  )}
                </div>

                {/* Actions */}
                <div className="notif-actions">
                  <button
                    className="notif-delete-btn"
                    title="Delete notification"
                    onClick={(e) => handleDelete(e, notification._id)}
                  >
                    <i className="fa fa-xmark"></i>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default NotificationsMid;
