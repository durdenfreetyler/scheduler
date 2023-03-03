import React from "react";

//The component is used to render a placeholder view when there is no data to display.

function Empty(props) {

  return (

    <main className="appointment__add">

      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />

    </main>
    
  );
}

export default Empty;
