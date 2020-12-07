import React from "react";
function Menu() {
  return (
    <div>
      <button>Save</button> {JSON.stringify(Date())} <button>Cancel</button>
    </div>
  );
}
export default Menu;
