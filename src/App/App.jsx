import React, { Component } from "react";
import "./App.css";
import { Navbar, ListGroup } from "react-bootstrap";
import { FaHeadphones } from "react-icons/fa";
import Axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      artist: "",
      title: "",
      lyrics: "",
      songs: []
    };
  }

  componentDidMount() {
    this.setState({
      artist: "Vampire Weekend",
      songs: [
        { id: 1, title: "Horchata" },
        { id: 2, title: "White Sky" },
        { id: 3, title: "Holiday" },
        { id: 4, title: "California English" },
        { id: 5, title: "Taxi Cab" },
        { id: 6, title: "Run" },
        { id: 7, title: "Cousins" },
        { id: 8, title: "Giving Up The Gun" },
        { id: 9, title: "Diplomat's son" },
        { id: 10, title: "I Think Ur a Contra" }
      ]
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { title } = this.state;
    if (title !== prevState.title) {
      this.getLyrics();
    }
  }

  getLyrics() {
    const { artist, title } = this.state;
    Axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`)
      .then(response => this.setState({ lyrics: response.data.lyrics }))
      .catch(error => console.log(error));
  }

  titleIsValid = title => {
    return typeof songtitle === "string" && title.length > 0;
  };

  handleClickTitle(title = "") {
    if (!this.titleIsValid) return;
    this.setState({ title });
  }

  render() {
    const { artist, lyrics, songs } = this.state;

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
            <ListGroup.Item
              key={song.id}
              action
              onClick={() => this.handleClickTitle(song.title)}
            >
              {song.title}
            </ListGroup.Item>
          ))}
        </ListGroup>

        <div>
          <pre>{lyrics}</pre>
        </div>
      </div>
    );
  }
}

export default App;
