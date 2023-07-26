import React from "react";

const FeedOption = ({ Icon, title, color }) => {
  const className = `flex items-center ${color} py-1 px-2 hover:bg-gray-200 rounded-md text-sm`
  return (
    <button className={className}>
      <Icon />
      <span className="max-[400px]:hidden pl-2 font-semibold">{title}</span>
    </button>
  );
};

export default FeedOption;
