import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';



export default class GenreForm extends Component {
    constructor(props) {
        super(props);

        this.onChangeGenre = this.onChangeGenre.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            genre: ''
        }
    }

    

    onChangeGenre(e) {
        this.setState({
            genre: e.target.value
        })
    }


    onSubmit(e) {
        e.preventDefault();

        const savedGenre = {
            genre: this.state.genre
        }

        console.log(savedGenre);

        axios.post('http://localhost:3001/genres/', savedGenre)
        .then(res => console.log(res.data));

        this.setState({
            genre: ''
        })
    }

    render() {
        return (
          <div>
            <h3>pick a genre</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>genre:</label>
                <input type="text"
                    required
                    className="form-control-md"
                    value={this.state.genre}
                    onChange={this.onChangeGenre}
                    />
              </div>
              <div className="form-group">
                <input type="submit" value="PICK" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
      }


}