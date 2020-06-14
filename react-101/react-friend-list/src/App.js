import React from "react";
import Wrapper from "./components/Wrapper";

// should be replaced
import SpongeBobCard from "./components/SpongeBobCard";
import SquidwardCard from "./components/SquidwardCard";
import MrKrabsCard from "./components/MrKrabsCard";

import FriendCard from "./components/FriendCard";

import "./App.css";
import friendInfo from "./friends.json"

console.log(friendInfo[0]);

const App = () =>
  <Wrapper>
    <h1 className="title">Friends List</h1>
    {friendInfo.map((person, i) => {
    	return <FriendCard key={friendInfo[i].id} name={friendInfo[i].name} image={friendInfo[i].image} occupation={friendInfo[i].occupation} location={friendInfo[i].location}/>
    })}
  </Wrapper>;

export default App;
