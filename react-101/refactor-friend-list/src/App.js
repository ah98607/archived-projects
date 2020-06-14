import React from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import friends from "./friends.json";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentFriends: friends
    };
    this.removeFriendById = this.removeFriendById.bind(this);
  }
  removeFriendById(id) {
    const newFriends = this.state.currentFriends.filter(person => {
      if (person.id != id) {
        console.log(`Find the one (${id}) to be removed.`);
        return true;
      }
    });
    //const newFriends = this.state.currentFriends.filter(friend => friend.id !== id);

    // Set this.state.friends equal to the new friends array
    this.setState({currentFriends: newFriends});
  }
  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <h1 className="title">Friends List</h1>
        {this.state.currentFriends.map(person =>
          <FriendCard
            removeFriendById={this.removeFriendById}
            id={person.id}
            key={person.id}
            name={person.name}
            image={person.image}
            occupation={person.occupation}
            location={person.location}
          />
        )}
      </Wrapper>
    );
  }
}

/*const App = () =>
  <Wrapper>
    {friends.map((person) => {
      return <FriendCard
        name={person.name}
        image={person.image}
        occupation={person.occupation}
        location={person.location}
      />
    })}
  </Wrapper>;*/

export default App;
