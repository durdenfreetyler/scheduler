import React from "react";
import classNames from "classnames";
import "components/Button.scss";

//  Renders a button with different styles based on props passed in, including a confirm or danger style, and disables the button when a 'disabled' prop is true.

export default function Button(props) {
  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
