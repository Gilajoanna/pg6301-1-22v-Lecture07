import * as React from "react";
import { useState } from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ListMovies } from "./listMovies";
import { fetchJSON } from "./fetchJSON";
import { postJSON } from "./postJSON";
import { AddNewMovie } from "./addMovie";

function FrontPage() {
  return (
    <div>
      <h1>Movie Database</h1>
      <ul>
        <li>
          <Link to={"/movies"}>List Movies</Link>
        </li>
        <li>
          <Link to={"/movies/new"}>Add new movie</Link>
        </li>
      </ul>
    </div>
  );
}

function Application() {
  async function listMovies() {
    return await fetchJSON("/api/movies");
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route
          path={"/movies"}
          element={<ListMovies listMovies={listMovies} />}
        />
        <Route path={"/movies/new"} element={<AddNewMovie />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
