import './Home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Caroussel from '../../components/Caroussel/Caroussel';
import FullPreview from '../../components/FullPreview/FullPreview';

function Home() {
  const [currentMovie, setCurrentMovie] = useState(0);
  const [genres, setGenres] = useState([]);
  const [moviesGenre, setMoviesGenre] = useState({});

  const loadPopularMovies = () => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a`)
      .then((response) => {
        // Do something if success
        setMoviesGenre(moviesGenre => ({...moviesGenre,
          ["-1"]: {id:"-1", name:"Popular movies", movies:response.data.results}}))
        })
      .catch((error) => {
        // Do something if call failed
        console.log(error)
      });
  };

  useEffect(loadPopularMovies, []);

  const loadGenres = () => {
    axios
      .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=522d421671cf75c2cba341597d86403a`)
      .then((response) => {
        // Do something if success
        setGenres(response.data.genres)
      })
      .catch((error) => {
        // Do something if call failed
        console.log(error)
      });
  };

  useEffect(loadGenres, []);

  const loadMoviesByGenre = () => {
    genres.map((genre) => {
      axios
        .get(`https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&api_key=522d421671cf75c2cba341597d86403a`)
        .then((response) => {
          setMoviesGenre(moviesGenre => ({...moviesGenre,
                                          [genre.id]: {id:genre.id, name:genre.name, movies:response.data.results}}))
          console.log(moviesGenre)
        })
        .catch((error) => {
          // Do something if call failed
          console.log(error)
        });
    })
  }

  useEffect(loadMoviesByGenre, [genres]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ma filmothèque</h1>
        {Object.entries(moviesGenre).map(([key,value]) => {
            return <Caroussel key={key} movies={value.movies} setCurrentMovie={setCurrentMovie}  genre={value.name}/>
        })}
      </header>
      <FullPreview currentMovie={currentMovie}  setCurrentMovie={setCurrentMovie}/>
    </div>
  );
}

export default Home;
