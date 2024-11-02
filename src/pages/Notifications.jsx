import React from "react";
import "../components/notifications/notifications.css";
import TopNav from "../components/topnav/TopNav";
import NotificationsRight from "../components/notifications/NotificationsRight";
import NotificationsLeft from "../components/notifications/NotificationsLeft";
import NotificationsMid from "../components/notifications/NotificationsMid";
// import { useSelector } from "react-redux";

const Notifications = () => {
  // const { user } = useSelector((state) => state.user);
  
  return (
    <>
      <TopNav />
      <div className="notifications-page">
        <div className="notifications-left">
          <NotificationsLeft/>
        </div>
        <div className="notifications-middle">
          <NotificationsMid/>
        </div>
        <div className="notifications-right">
          <NotificationsRight/>
        </div>
      </div>
    </>
  );
};

export default Notifications;
