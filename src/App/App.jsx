import React, { Component } from "react";
import "./App.css";
import {
  Navbar,
  ListGroup,
  Alert,
  Button,
  Row,
  Col,
  Container
} from "react-bootstrap";
import { FaHeadphones, FaBackward, FaCompactDisc } from "react-icons/fa";
import { TiGroupOutline } from "react-icons/ti";
import Axios from "axios";
import styled from "styled-components";
import CoverContra from "./images/Cover_contra.jpg";

class App extends Component {
  constructor() {
    super();
    this.state = {
      artist: "",
      album: "",
      title: "",
      lyrics: "",
      songs: [],
      error: false,
      errorMessage: ""
    };
  }

  componentDidMount() {
    this.setState({
      artist: "Vampire Weekend",
      album: "Contra",
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
    if (title.length > 1 && title !== prevState.title) {
      this.getLyrics();
    }
  }

  getLyrics() {
    const { artist, title } = this.state;
    Axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`)
      .then(response => this.setState({ lyrics: response.data.lyrics }))
      .catch(error => {
        this.setState({ error: true, errorMessage: error.response.data.error });
      });
  }

  titleIsValid = title => {
    return typeof songtitle === "string" && title.length > 0;
  };

  handleClickTitle(title = "") {
    if (!this.titleIsValid) return;
    this.setState({ title });
  }

  clearSongState() {
    this.setState({
      title: "",
      lyrics: ""
    });
  }

  handleClickBack() {
    this.clearSongState();
  }

  clearError() {
    this.setState({ error: false, errorMessage: "" });
  }

  render() {
    const {
      artist,
      album,
      title,
      lyrics,
      songs,
      error,
      errorMessage
    } = this.state;

    const AlbumCoverImage = styled.img`
      max-width: 100%;
      padding: 1rem;
    `;

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

        <Container>
          <h1 className="sr-only">Lyrical</h1>

          {error && (
            <Alert
              variant="primary"
              onClose={() => this.clearError()}
              dismissible
              className="my-3"
            >
              {errorMessage}
            </Alert>
          )}

          <div className="m-1 m-md-3">
            <Row>
              <Col>
                <AlbumCoverImage src={CoverContra} />
              </Col>
              <Col>
                <Row className="text-uppercase my-3 h-100 d-flex flex-column">
                  <Col className="d-flex flex-column justify-content-center my-3 text-right">
                    <p>
                      <FaCompactDisc /> {album}
                    </p>
                    <p>
                      <TiGroupOutline /> {artist}
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>

            {!lyrics && (
              <ListGroup className="">
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
            )}
          </div>

          {lyrics && (
            <div className="m-3">
              <Button
                variant="primary"
                className="my-1"
                onClick={() => this.handleClickBack()}
              >
                <FaBackward /> Back
              </Button>

              <h2 className="text-uppercase font-weight-bold">{title}</h2>

              <pre className="my-3 text-secondary">{lyrics}</pre>
            </div>
          )}
        </Container>
      </div>
    );
  }
}

export default App;
