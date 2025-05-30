import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import Spinner from "./components/spinner";
import MovieCard from "./components/MovieCard";

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

  const fetchMovie = async () => {
    try {
      setIsLoading(true)
      setErrorMessage("")
      
      const endpoint = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc"
      
        // .then((res) => res.json())
        // .then((res) => console.log(res))
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

    } catch (error) {
      console.error(error)
      setErrorMessage("Error fetching movie. Please try again later.");
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMovie()
  }, []);

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
        <section className="all-movies">
          <h2 className="mt-[40px]">All Movies</h2>
          {isLoading? (
            <Spinner />
          ): errorMessage ?(
            <p className="text-red-500" >{errorMessage}</p>
          ): (
            <ul>
              {movieList.map((movie) => {
                return (
                  // <p className="text-white" key={keycount++}>{movie.title}</p>
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
