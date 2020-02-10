import React, { Component } from "react";
import "./App.css";
import { Navbar, ListGroup } from "react-bootstrap";
import { FaHeadphones } from "react-icons/fa";

class App extends Component {
  constructor() {
    super();
    this.state = {
      artist: "",
      songs: []
    };
  }

  componentDidMount() {
    this.setState({
      artist: "Vampire Weekend",
      songs: [
        { id: 1, name: "Horchata" },
        { id: 2, name: "White Sky" },
        { id: 3, name: "Holiday" },
        { id: 4, name: "California English" },
        { id: 5, name: "Taxi Cab" },
        { id: 6, name: "Run" },
        { id: 7, name: "Cousins" },
        { id: 8, name: "Giving Up The Gun" },
        { id: 9, name: "Diplomat's son" },
        { id: 10, name: "I Think Ur a Contra" }
      ]
    });
  }

  render() {
    const { artist, songs } = this.state;

    return (
      <div>
        <Navbar variant="dark" bg="primary">
          <Navbar.Brand>
            <FaHeadphones /> LYRICAL
          </Navbar.Brand>
          <Navbar.Text className="w-100 text-right text-uppercase font-weight-bold">
            Artist: {artist}
          </Navbar.Text>
        </Navbar>

        <ListGroup>
          {songs.map(song => (
            <ListGroup.Item action key={song.id}>
              {song.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default App;
