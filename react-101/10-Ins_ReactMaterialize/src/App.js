import React, { Component } from 'react';
import {Navbar, NavItem, Row, Input, Carousel} from 'react-materialize';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar brand='Materialize is Awesome' right>
          <NavItem href='get-started.html'>Getting started</NavItem>
          <NavItem href='components.html'>Components</NavItem>
        </Navbar>
        <Row>
          <Input placeholder="Placeholder" s={6} label="First Name" />
          <Input s={6} label="Last Name" />
          <Input s={12} label="disabled" defaultValue="I am not editable" disabled />
          <Input type="password" label="password" s={12} />
          <Input type="email" label="Email" s={12} />
        </Row>;
        <Carousel images={[
          'https://lorempixel.com/250/250/nature/1',
          'https://lorempixel.com/250/250/nature/2',
          'https://lorempixel.com/250/250/nature/3',
          'https://lorempixel.com/250/250/nature/4',
          'https://lorempixel.com/250/250/nature/5'
        ]} />
      </div>
    );
  }
}

export default App;
