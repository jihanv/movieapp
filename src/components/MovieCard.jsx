import React from "react";

const MovieCard = (props) => {
  return (
    <div className="movie-card">
      <img
        src={
          props.movie.poster_path
            ? `http://image.tmdb.org/t/p/w500/${props.movie.poster_path}`
            : "/movieapp/no-movie.png"
        }
        alt={props.movie.title}
      />
      <div className="mt-4">
        <h3>{props.movie.title}</h3>
        <div className="content">
          <div className="rating">
            <img src="/movieapp/star.svg" alt="Star Icon" />
            <p>{props.movie.vote_average ? props.movie.vote_average.toFixed(1) : "N/A"}</p>
          </div>
          <span>•</span>
          <p className="lang">{props.movie.original_language}</p>
          <span>•</span>
          <p className="year">{props.movie.release_date? props.movie.release_date.split("-")[0] : "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
