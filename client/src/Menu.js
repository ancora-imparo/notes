import React from "react";

const Menu = (props) => {
  const {noteSelected} = props;
  const checkCreated = noteSelected ? noteSelected.created : " ";
  return (
    <div>
      <button>Cancel</button> {checkCreated} <button>Save</button>
    </div>
  );
}
export default Menu;
