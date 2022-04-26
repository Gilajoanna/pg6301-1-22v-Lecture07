import * as React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ListMovies } from "./listMovies";
import { useContext, useState } from "react";

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

function FormInput({ label, value, onChangeValue }) {
  return (
    <div>
      <label>{label}</label>{" "}
      <input
        type={"text"}
        name={"title"}
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
      />
    </div>
  );
}

export function AddNewMovie() {
  const { createMovie } = useContext(MovieApiContext);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(0);
  const [country, setCountry] = useState("");
  const [plot, setPlot] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await createMovie({ title, year, plot, country });

    setTitle("");
    setYear("");
    setPlot("");
    setCountry("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Add new movie</h1>

        <FormInput label={"Title:"} value={title} onChangeValue={setTitle} />
        <FormInput label={"Year:"} value={year} onChangeValue={setYear} />
        <FormInput
          label={"Country:"}
          value={country}
          onChangeValue={setCountry}
        />
        <FormInput label={"Plot:"} value={plot} onChangeValue={setPlot} />
        <button type={"submit"}>Submit</button>
      </form>
    </div>
  );
}

export const MovieApiContext = React.createContext({
  async listMovies(country) {
    return fetchJSON(`/api/movies?country=${country}`);
  },
  async createMovie(movie) {
    postJSON("/api/movies", movie);
  },
});

export async function postJSON(url, body) {
  const response = await fetch(url, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
}

export async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load ${res.status}: ${res.statusText}`);
  }
  return await res.json();
}

export function Application() {
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
