import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    id_tmdb: {
      type: Number,
      unique: true,
    },
    movie_title: { type: String },
    year: { type: Number },
    descr: { type: String },
    poster_img: { type: String },
    long_img: { type: String },
    vote: { type: Number }
  },
});

export default Movie;
