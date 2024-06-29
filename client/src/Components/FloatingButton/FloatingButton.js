import React from "react";
import "./FloatingButton.css"
//font-awesome icons are imported, npm install is required
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
//declaring the icon to be used
let element = <FontAwesomeIcon icon={faPlus} />

function FloatingButton() {
  return (
    //Button to fetch the form when clicked on
    <div>
      <a href="/inputMemory" class="float">
        <i class="fa fa-plus my-float"></i>
      </a>
    </div>
  );
}

export default FloatingButton;
