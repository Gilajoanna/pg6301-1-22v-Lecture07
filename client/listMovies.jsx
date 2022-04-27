import * as React from "react";
import { useLoading } from "./useLoading";

function MovieCard({ movie: { title, year, plot, poster } }) {
  return (
    <div>
      <h3>
        {title} ({year})
      </h3>
      {poster && <img src={poster} width={100} alt={"Movie Poster"} />}
      <div>{plot}</div>
    </div>
  );
}

export function ListMovies({ listMovies }) {
  const { loading, error, data } = useLoading(listMovies);

  //När vi laddar ska vi visa en loading page
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div id="error-text">{error.toString()}</div>
      </div>
    );
  }

  return (
    <div>
      <h1>Movies in database</h1>

      {data.map((movie) => (
        <MovieCard key={movie.title} movie={movie} />
      ))}
    </div>
  );
}
