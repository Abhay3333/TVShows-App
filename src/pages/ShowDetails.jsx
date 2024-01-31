import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingFormVisible, setBookingFormVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [submittedDetails, setSubmittedDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => {
        setShow(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleBookNow = () => {
    setBookingFormVisible(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem("userName", userName);
    localStorage.setItem("userEmail", userEmail);

    setSubmittedDetails({
      userName: localStorage.getItem("userName"),
      userEmail: localStorage.getItem("userEmail"),
    });

    setBookingFormVisible(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!show) {
    return <div>No show found.</div>;
  }

  return (
    <div className="container mx-auto h-screen p-10 flex bg-blue-950 justify-center items-center">
      <div className="mr-8 ">
        <img
          src={show.image ? show.image.medium : "placeholder-url.jpg"}
          alt={show.name}
          className="mb-4 rounded h-96 w-[670px] ml-4 "
        />
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-4 text-white">{show.name}</h2>

        <div className="flex items-center mb-2">
          <p className="text-white mr-4">Language: {show.language}</p>
          <p className="text-white mr-4">Genres: {show.genres.join(", ")}</p>
          <p className="text-white">Rating: {show.rating.average}</p>
        </div>

        <p
          className="text-white"
          dangerouslySetInnerHTML={{ __html: show.summary }}
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleBookNow}
        >
          Book Now
        </button>

        {bookingFormVisible && (
          <div className="mt-4 justify-center items-center">
            <form onSubmit={handleFormSubmit}>
              <input type="hidden" name="movieName" value={show.name} />

              <label className="block mb-2 text-white">Movie Name:</label>
              <input
                type="text"
                value={show.name}
                readOnly
                className="mb-2 p-2 border border-gray-300 rounded"
              />

              <label className="block mb-2 text-white">Your Name:</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="mb-2 p-2 border border-gray-300 rounded"
              />

              <label className="block mb-2 text-white">Email:</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
                className="mb p-2 border border-gray-300 rounded "
              />

              <button
                type="submit"
                className="bg-blue-900 text-white px-4 py-2 rounded ml-3 text-center"
              >
                Submit
              </button>
            </form>
          </div>
        )}

        {submittedDetails && (
          <div className="mt-4 text-center">
            <h3 className="text-xl font-semibold mb-2 text-white">
              Submitted Details:
            </h3>
            <p className="text-white">Name: {submittedDetails.userName}</p>
            <p className="text-white">Email: {submittedDetails.userEmail}</p>

            <p className="text-white">Movie: {show.name}</p>
            <p className="text-white">Language: {show.language}</p>
            <p className="text-white">Genres: {show.genres.join(", ")}</p>
            <p className="text-white">Rating: {show.rating.average}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowDetails;
