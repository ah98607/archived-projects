import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import {Navbar, NavItem, Row, Col, Button, Input, Carousel} from "react-materialize";
import Search from "./components/Search.js";
import SearchedNews from "./components/SearchedNews.js";
import SavedNews from "./components/SavedNews.js";

class App extends Component {

  constructor() {
    super();
    this.state = {
      searchResult: [],
      savedArticles: [],
      topic: "",
      startYear: "",
      endYear: ""
    };
  }

  componentDidMount() {
    fetch("/get_saved_articles").then(data => data.json()).then(data => {
      this.setState({savedArticles: data});
      console.log("Load saved articles");
      console.log(this.state.savedArticles);
    });
  };

  handleInputChange = event => {

    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });

    console.log(`State topic is ${this.state.topic}`);
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("Seach for" + this.state.topic);

    if (this.state.startYear.length != 4 || this.state.endYear.length != 4) {
      alert("Please enter your start/end year like YYYY");
    }
    else if (this.state.topic.indexOf(" ") >= 0) {
      alert("Please use one word for the topic.");
    }
    else {
      //fetch("/123").then(res => res.json()).then(users => this.setState({users}));
      fetch("/search_nyt", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: this.state.topic,
          startYear: this.state.startYear,
          endYear: this.state.endYear
        })
      }).then(data => data.json()).then(articles => {
        this.setState({searchResult: articles});
        console.log(this.state.searchResult);
      });
    }
  };

  handleSaveButtonClicked = (title, link) => {
    console.log("Trying to save article with title " + title);
    fetch("/save_article", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        link: link
      })
    }).then(data => data.json()).then(data => {
      console.log("post request of saving an article completed.");
      window.location.reload();
    });
  };

  handleRemoveButtonClicked = (title) => {
    console.log("Trying to remove article with title " + title);
    fetch("/remove_article", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title
      })
    }).then(data => data.json()).then(data => {
      console.log("post request of remove an article completed.");
      window.location.reload();
    });
  };

  render = () => {
    console.log("Rendering");
    return (
      <div className="App">
        <Row>
          <h3>New York Times Article Scrubber</h3>
          <h4>Search and annotate articles of interest</h4>
        </Row>
        <Row>
          <Search
            topic={this.state.topic}
            startYear={this.state.startYear}
            endYear={this.state.endYear}
            handleInputChange={this.handleInputChange}
            handleFormSubmit={this.handleFormSubmit}
          />
        </Row>
        <Row>
          <h4>Saved Articles</h4>
          {this.state.savedArticles.map((article, i) =>
          <div key={article.id}>
            <SavedNews articleTitle={article.title} articleLink={article.link}/>
            <Button waves="red" onClick={() => this.handleRemoveButtonClicked(article.title, article.link)}>Remove</Button>
          </div>
          )}
        </Row>
        <Row>
          <h4>Searched Result</h4>
          {this.state.searchResult.map((article, i) =>
          <div key={article.id}>
            <SearchedNews articleTitle={article.title} articleLink={article.link}/>
            <Button waves="light" onClick={() => this.handleSaveButtonClicked(article.title, article.link)}>Save</Button>
          </div>
          )}
        </Row>
      </div>
    );
  }
}

export default App;
