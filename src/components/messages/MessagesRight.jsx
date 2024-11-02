import React from "react";
import NetworkDetailsCard from "../network/NetworkDetailsCard";
import PremiumCard from "../home/PremiumCard";

const MessagesRight = () => {
  return (
    <div className="messages-right-section">
      <NetworkDetailsCard />
      <PremiumCard />
    </div>
  );
};

export default MessagesRight;
