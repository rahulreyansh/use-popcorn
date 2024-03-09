import { useEffect, useState } from "react";

const KEY = "f4c8a5be";
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(
    function () {
      // const controller = new AbortController();
      async function fetchMoves() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
            // { signal: controller.signal }
          );
          if (!res.ok) {
            throw new Error("Something went wrong with fetching movies");
          }
          const data = await res.json();
          if (data.Response === "False") {
            console.log("Inn");
            throw new Error("Movie not found");
          }
          setMovies(data.Search);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMoves();
      // return function () {
      //   controller.abort();
      // };
    },
    [query]
  );
  return { movies, isLoading, error };
}
