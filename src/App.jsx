import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import Spinner from "./components/spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [errorMessage, setErrorMessage] = useState("")

  const [movieList, setMovieList] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  const [debouncedSearchTerm, setDebounceSearchTerm] = useState("")

  const [trendingMovies, setTrendingMovies] = useState([])

  useDebounce(() => setDebounceSearchTerm(searchTerm), 1000, [searchTerm])

  const fetchMovie = async (query="") => {
    try {
      setIsLoading(true)
      setErrorMessage("")
      
      const endpoint = query
      ? `https://api.themoviedb.org/3/search/movie?query=${encodeURI(query)}`
      : "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc"
        const response = await fetch(endpoint, options)
        
        if(!response.ok){
          throw new Error("Failed to fetch movies")
        }

        const data = await response.json()

        if(data.Response === false){
          setErrorMessage(data.Error || "Failed to fetch movies")
          setMovieList([])
          return
        }

        setMovieList(data.results || [])

        if(query && data.results.length > 0 ) {
          await updateSearchCount(query, data.results[0])
        }

    } catch (error) {
      console.error(error)
      setErrorMessage("Error fetching movie. Please try again later.");
    } finally {
      setIsLoading(false)
    }
  }

  const loadTrendingMovies = async () => {
    try{
      const movies = await getTrendingMovies()
      setTrendingMovies(movies)

    } catch (error) {
      console.error("Error fetching trending movies.", error)
    }
  }

  useEffect(() => {
    fetchMovie(debouncedSearchTerm)
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies()
  }, [])

  return (
    <div>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="/movieapp/hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </h1>
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => {
                  return(
                    <li key={movie.$id}>
                      <p>{index + 1}</p>
                      <img src={movie.poster_url} alt={movie.title}/>
                    </li>
                  )
              })}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>All Movies</h2>
          {isLoading? (
            <Spinner />
          ): errorMessage ?(
            <p className="text-red-500" >{errorMessage}</p>
          ): (
            <ul>
              {movieList.map((movie) => {
                return (
                  <MovieCard key={movie.id} movie={movie}/>
                )
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default App;
