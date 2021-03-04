import React, { Component } from 'react';
import axios from 'axios';

export default class GenreList extends React.Component {
    state = {
        genres: []
    }

    componentDidMount() {
        axios.get(`http://localhost:3001/genres/`)
          .then(res => {
            const genres = res.data;
            this.setState({ genres });
          })
      }

    render() {
        return (
            <div>
                <h5>your favs</h5>
                { this.state.genres.map(genre => <div>{genre.genre}</div>)}
            </div>
        )
    }
}