import React, { useState, useEffect } from "react";
import Search from "./components/Search";

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

  const fetchMovie = async () => {
    try {
      fetch(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
        options
      )
        .then((res) => res.json())
        .then((res) => console.log(res));
    } catch (error) {
      console.error(error)
      setErrorMessage("Error fetching movie. Please try again later.");
    }
  };

  useEffect(() => {
    console.log(API_KEY);
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
          <h2>All Movies</h2>
        </section>
        {errorMessage!=="" && <p className="text-red-500" >{errorMessage}</p> }
      </div>
    </div>
  );
};

export default App;
