import './FullPreview.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function FullPreview({ currentMovie, setCurrentMovie }) {
    const [showFullText, setShowFullText] = useState(false);
    const [showFullPreview, setShowFullPreview] = useState("none");
    const [movie, setMovie] = useState(false);
    const [seen, setSeen] = useState(false);
    const [inList, setInList] = useState(false);
    const [like, setLike] = useState(false);

    const loadMovie = () => {
        if (currentMovie){
            axios
            .get(`https://api.themoviedb.org/3/movie/${currentMovie}?api_key=522d421671cf75c2cba341597d86403a`)
            .then((response) => {
                // Do something if success
                console.log(response)
                setMovie(response.data)
                setShowFullPreview("block")
            })
            .catch((error) => {
                // Do something if call failed
                console.log(error)
            });
        }
        else{
            console.log("No movie selected.")
        }
      };

    useEffect(loadMovie, [currentMovie]);

    const toggleShowFullText = () => {
        setShowFullText(!showFullText);
      };
    
    const closeFullPreview = () => {
        setShowFullPreview("none");
        setShowFullText(false);
        setLike(false);
        setInList(false);
        setSeen(false);
        document.body.style.overflowY = 'auto';
        setCurrentMovie(false);
    }

    const changeSeen = () => {
        setSeen(!seen);
    }

    const changeInList = () => {
        setInList(!inList);
    }

    const changeLike = () => {
        if (like == "like"){
            setLike(false)
        }
        else{
            setLike("like");
        }
    }

    const changeDislike = () => {
        if (like == "dislike"){
            setLike(false)
        }
        else{
            setLike("dislike");
        }
    }
    
  return (
    <div className="bkg-full-preview" style={{display: showFullPreview}}>
        <div className="full-preview">
            <div className="affiche-full-preview">
                <img src={movie ? "https://image.tmdb.org/t/p/original" + movie.poster_path : ""}></img>
            </div>
            <div className="content-full-preview">
                <div id="close-full-preview">
                    <button onClick={closeFullPreview}>
                        <i className='icon-cross_mark'></i>
                    </button>
                </div>

                
                <h2>{movie ? (movie.title) : ("Titre")}</h2>
                
                <p className="date-full-preview">{movie ? (movie.release_date.substring(0,4)) : ("Date")}</p>

                <p className="note-full-preview">
                    { // Full stars
                    [...Array(Math.floor(movie ? (movie.vote_average) : (10)))].map((_, index) => (
                        <i key={index} className="icon-star"></i>
                      ))}
                    { // Half star
                    movie ? (
                        Math.abs(movie.vote_average - Math.floor(movie.vote_average) - 0.5) <= 0.25 ? (
                            <i className="icon-star_half"></i>
                        ) : (
                        movie.vote_average - Math.floor(movie.vote_average) - 0.5 > 0.25 ? (
                            <i className="icon-star"></i>
                        ) : (
                        <i></i>
                    ))) : (
                        <i></i>
                    )}
                    { // Empty stars
                    [...Array(movie ? 10 - Math.floor(movie.vote_average) - (movie.vote_average%1 >= .25)*1 : 0)].map((_, index) => (
                        <i key={index} className="icon-star_empty"></i>
                      ))}
                    &nbsp;&nbsp;({movie ? Math.round(movie.vote_average *10 ) / 10 : 10}/10)
                </p>
                
                {movie ? (
                    movie.overview.length <= 350 ? (
                        <p className='descr-full-preview'>{movie.overview}</p>
                    ) : (
                        showFullText ? (
                            <p className='descr-full-preview'>{movie.overview}
                            <button className="button-moins" onClick={toggleShowFullText}><i className="icon-chevron_left"></i> Voir moins</button>
                            </p>
                        ) : (
                            <p className='descr-full-preview'>{movie.overview.slice(0, 350)}...
                            <button className="button-plus" onClick={toggleShowFullText}><i className="icon-chevron_right"></i> Voir plus</button>
                            </p>
                    ))) : (
                    <p className='descr-full-preview'>Description</p>
                )}
                <div id="container-bandeau-bas-full-preview">
                    <div className="bandeau-bas-full-preview">
                        <div>
                            <button id="add-to-list" onClick={changeInList} className={inList ? "in-list" : ""}><i className="icon-check"></i></button>
                        </div>
                        <div>
                            <button id="seen" onClick={changeSeen} className={seen ? "seen" : ""}><i className="icon-eye"></i></button>
                        </div>
                        <div>
                            <button id="like" onClick={changeLike} className={like == "like" ? "like" : ""}><i className="icon-heart"></i></button>
                            <button id="dislike" onClick={changeDislike} className={like == "dislike" ? "dislike" : ""}><i className="icon-heart_broken"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default FullPreview;