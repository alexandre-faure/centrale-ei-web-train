import './Movie.css';

function Movie({ movie, setCurrentMovie }) {

  const printFullPreview = () => {
    console.log("Full preview of "+ movie.id)
    document.body.style.overflowY = 'hidden';
    setCurrentMovie(movie.id)
  }

  return (
    <div className="movie-preview" id={"preview" + movie.id}
    style = {{backgroundImage: `url(${"https://image.tmdb.org/t/p/original" + movie.poster_path})`}}
    onClick={printFullPreview}>
        <div key={movie.id} className="movie-short-desc">
          <div>
            <p className='preview-title'>{movie.title}</p>
            <p className='preview-date'>{movie.hasOwnProperty("release_date") ? movie.release_date.substring(0,4) : ""}</p>
          </div>
        </div>
    </div>
  );
}

export default Movie;