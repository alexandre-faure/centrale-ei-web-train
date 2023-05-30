import './Caroussel.css';
import { useRef } from 'react';
import Movie from '../Movie/Movie';

function Caroussel({ movies, setCurrentMovie, genre }) {
  const carousselContainer = useRef(null);
  const caroussel = useRef(null);

  const scrollPrevious = () => {
    const scroll = carousselContainer.current.scrollLeft;
    const length = window.innerWidth*(15.5+0.625)/100;
    const pos = Math.round(scroll / length);
    carousselContainer.current.scrollTo({
      left: (pos-1)*length,
      behavior: 'smooth'
    });
  }

  const scrollNext = () => {
    const scroll = carousselContainer.current.scrollLeft;
    const length = window.innerWidth*(15.5+0.625)/100;
    const pos = Math.round(scroll / length);
    carousselContainer.current.scrollTo({
      left: (pos+1)*length,
      behavior: 'smooth'
    });
  }

  return (
    <div>
      <h2 className="h2-genre">{genre}</h2>
      <div ref={carousselContainer} className="caroussel-container">
        <div ref={caroussel} className="movies-parent">
          {movies.length > 1 ?
            movies.map((movie, index) => {
              return <Movie key={index} movie={movie} setCurrentMovie={setCurrentMovie} />;
            })
            : <p>Bad request, any movy could be found.</p>
          }
        </div>
      </div>
      {movies.length > 1 ?
        <div className="nav-caroussel">
          <button className="previous-button" onClick={scrollPrevious}><i className="icon-chevron_left"></i></button>
          <button className="next-button" onClick={scrollNext}><i className="icon-chevron_right"></i></button>
        </div> :
        <div></div>
      }
    </div>
  );
}

export default Caroussel;