import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ShowMovies = () => {
  const [shows, setShows] = useState([]);
  const [clickedShow, setClickedShow] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.tvmaze.com/search/shows?q=all")
      .then((response) => setShows(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleShowClick = (showId) => {
    setClickedShow(showId);
  };

  return (
    <div className="container mx-auto h-100% p-4 bg-blue-950">
      <h2 className="text-3xl font-bold mb-4 text-white">TV Shows</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
        {shows.map((show) => (
          <Link
            to={`/show/${show.show.id}`}
            className="flex-shrink-0"
            key={show.show.id}
          >
            <li
              className={`p-4 rounded shadow-md flex items-center bg-blue-800 ${
                clickedShow === show.show.id ? "animate-bounce" : ""
              }`}
              onClick={() => handleShowClick(show.show.id)}
            >
              <img
                src={
                  show.show.image
                    ? show.show.image.medium
                    : "placeholder-url.jpg"
                }
                alt={show.show.name}
                className="mr-4 rounded"
                style={{ width: "100px", height: "150px" }}
              />

              <div className="text-white">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  {show.show.name}
                </h3>
                <p className="text-sm sm:text-base text-white">
                  Language: {show.show.language}
                </p>
                <p className="text-sm sm:text-base text-white">
                  Genres: {show.show.genres.join(", ")}
                </p>
                <p className="text-sm sm:text-base text-white">
                  Rating: {show.show.rating.average}
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ShowMovies;
