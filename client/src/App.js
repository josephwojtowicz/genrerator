import { useCallback, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Credentials } from './Credentials'
import { DropdownButton, Dropdown, Row } from 'react-bootstrap';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import GenreList from './components/GenreList'

const App = () => {

  const spotify = Credentials();  

  console.log('RENDERING APP.JS');

  const [token, setToken] = useState(''); 
  const [filter, setFilter] = useState('');
  const [filterToSend, setFilterToSend] = useState('')
  const [items, setItems] = useState([]);
  const [genre, setGenre] = useState({genre: ''});
  const [data, getGenreData] = useState({genre: ''});
  console.log('token', token)
  console.log('filter', filter)
  console.log('items', items)
  console.log('genre', genre)
  //when the app loads, request a token from spotify
  //and save it to state.


 
  useEffect(async() => {
    const response = await axios('https://accounts.spotify.com/api/token', {
        headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    setToken(response.data.access_token)
    //empty array dependency = this runs once on load
  },[])

  const handleChange = (e) => {
    setGenre({genre: e.target.value})
  }

  const onSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/genres/', genre)
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
    setGenre({genre:''})
  };


  const handleSearch = async (e) => {
    //preventDefault keeps page from rerendering and bad things happening
    e.preventDefault()
    console.log('filter', filter)
    //call axios with filter and token from state
    const response = await axios(`https://api.spotify.com/v1/search?q=genre:"${filter}"&type=artist`, {
      method: 'GET', 
      headers: { 'Authorization' : 'Bearer ' + token}
    })
    //set response into state
    setItems(response.data.artists.items)
    }

  const searchAndHandle = (e) => {
    handleSearch(e);
    handleChange(e);
    onSubmit(e);
  }

  const filterAndHandle = (e) => {
    setFilter(e.target.value);
    handleChange(e);
  }


  return (
    <Router>
   
    <div className="App" >
        <h1>genrerator</h1>
        <br></br>
       <Container fluid="sm">
        <Row>
        <Col sm={8}>
        <form>
          <p>search for a genre of music you enjoy</p>
          <input type="text" value={setGenre.genre} onChange={(e) => filterAndHandle(e)}/>
          <br></br>
          <p>or pick one here</p>
          <select value="this.target.value" onChange={(e) => setFilter(e.target.value)}>
            <option value="genre">choose one!</option>
            <option value="nz indie">nz indie</option>
            <option value="highlife">highlife</option>
            <option value="c86">c86</option>
            <option value="chopped and screwed">chopped and screwed</option>
            <option value="nwobhm">nwobhm</option>
            <option value="library music">library music</option>
          </select>
          <br></br>
          <br></br>
          <input type="submit" name="genre" value={setGenre.genre} onClick={(e) => searchAndHandle(e)} />
        </form>
        <br></br>
        <div>
          {items.map(item => 
            <div className="list-group">
              <Button variant="outline-secondary-md"
              key={0}
              id={item.name}>
                {item.name}
              </Button>
            </div>
          )}
        </div>
        </Col>

        <Col sm={2}>
        <div>
        <GenreList />
        </div>
        </Col>

        </Row>
      </Container> 
      </div>
      
    </Router>
  );
}

export default App;