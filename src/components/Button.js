import React from "react";
import classNames from "classnames";
import "components/Button.scss";
//creates and assigns class to buttons
export default function Button(props) {
   let buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   });
   return <button disabled={props.disabled} onClick={props.onClick} className={buttonClass}>{props.children}</button>;
};