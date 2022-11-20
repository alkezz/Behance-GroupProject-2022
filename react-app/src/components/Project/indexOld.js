import React from "react";
import {
  useHistory,
  useParams
} from "react-router-dom";
import './Project.css'

function Modal() {
  let history = useHistory();
  let { id } = useParams();

  let back = e => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <div className="one" onClick={back}>
      <div className="modal">
        <img src="https://source.unsplash.com/450x450?music%20festival" />
        <button type="button" onClick={back}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal
