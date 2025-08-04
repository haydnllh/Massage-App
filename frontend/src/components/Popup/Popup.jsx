import React from "react";
import "./popup.scss";
import { useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Popup(props) {
  useEffect(() => {
    props.trigger
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "");

    return () => {
      document.body.style.overflow = "";
      if (props.onClose) props.onClose();
    };
  }, [props.trigger]);

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button
          className="close-btn"
          onClick={() => {
            props.setTrigger(false);
          }}
        >
          <FaTimes id="popup-cross" />
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}
