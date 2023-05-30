import './FetchMovies.css';
import { useRef } from 'react';
import Movie from '../Movie/Movie';

function FetchMovies({ movies, setCurrentMovie, genre }) {

  return (
    <div>
      <h2 className="h2-genre">{genre}</h2>
      <div className="movies-parent-research">
        {movies.length > 1 ?
          movies.map((movie, index) => {
            return <Movie key={index} movie={movie} setCurrentMovie={setCurrentMovie} />;
          })
          : <p>Bad request, any movie could be found...</p>
        }
      </div>
    </div>
  );
}

export default FetchMovies;