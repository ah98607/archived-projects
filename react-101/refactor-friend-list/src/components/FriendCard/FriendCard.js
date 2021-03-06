import React from "react";
import "./FriendCard.css";
const FriendCard = props =>
  <div className="card">
    <div className="img-container">
      <img alt={props.name} src={props.image} />
    </div>
    <div className="content">
      <ul>
        <li>
          <strong>Name:</strong> {props.name}
        </li>
        <li>
          <strong>Occupation:</strong> {props.occupation}
        </li>
        <li>
          <strong>Address:</strong> {props.address}
        </li>
      </ul>
    </div>
    <span className="remove" onClick={() => props.removeFriendById(props.id)}>𝘅</span>
  </div>;
export default FriendCard;