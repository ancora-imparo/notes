import React from "react";

const Menu = (props) => {
  const { noteSelected } = props;
  let options = {
    hour: "2-digit",
    minute: "2-digit",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const checkCreated = noteSelected
    ? new Date(noteSelected.created).toLocaleString("en-US", options, {
        hour12: true,
      })
    : " ";
  return (
    <div>
      <button>Cancel</button> {checkCreated}{" "}
      <button style={{ float: "right" }}>Save</button>
    </div>
  );
};
export default Menu;
