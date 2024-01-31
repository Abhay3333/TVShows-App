import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShowDetails from "./pages/ShowDetails";
import Home from "./pages/Home";
import Header from "./components/Header";
const App = () => {
  return (
    <div>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show/:id" element={<ShowDetails />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
