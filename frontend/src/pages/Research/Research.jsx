import './Research.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import FetchMovies from '../../components/FetchMovies/FetchMovies';
import FullPreview from '../../components/FullPreview/FullPreview';

function Research() {
  const [movieName, setMovieName] = useState('');
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(0);

  const loadMovies = (query) => {
    axios
      .get(`https://api.themoviedb.org/3/search/movie?api_key=522d421671cf75c2cba341597d86403a&query=${query}`)
      .then((response) => {
        // Do something if success
        setMovies(response.data.results)
      })
      .catch((error) => {
        // Do something if call failed
        console.log(error)
      });
  };

  const changeQueryMovie = (query) => {
    setMovieName(query)
    if (query != ""){
      loadMovies(query)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ma filmothèque</h1>
        <div id="searchBar">
          <i id="loupeSearch" className='icon-magnifying'></i>
          <input id="searchMovie"
          placeholder='Title of the movie...'
          value={movieName}
          onChange={e => {
            changeQueryMovie(e.target.value)}
            }></input>
        </div>
        {movieName != "" ?
          <FetchMovies movies={movies} setCurrentMovie={setCurrentMovie} genre={"Research results"} />
          :
          <div>
            <br/>
            <div>Search your favourite movies...</div>
          </div>
        }
      </header>
      <FullPreview currentMovie={currentMovie}  setCurrentMovie={setCurrentMovie}/>
    </div>
  );
}

export default Research;
