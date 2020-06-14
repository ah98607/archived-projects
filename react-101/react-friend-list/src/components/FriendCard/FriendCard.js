import React from "react";
import "./SpongeBobCard.css";
import "./MrKrabsCard.css";
import "./SquidwardCard.css";

const FriendCard = (character) =>
  <div className="card">
    <div className="img-container">
      <img
        alt={character.name}
        src={character.image}
      />
    </div>
    <div className="content">
      <ul>
        <li>
          <strong>Name:</strong>{character.name}
        </li>
        <li>
          <strong>Occupation:</strong>{character.occupation}
        </li>
        <li>
          <strong>Location:</strong>{character.location}
        </li>
      </ul>
    </div>
  </div>;

export default FriendCard;
