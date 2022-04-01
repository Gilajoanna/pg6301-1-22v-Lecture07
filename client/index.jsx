import * as React from "react";
import {useState} from "react";
import * as ReactDOM from "react-dom";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {ListMovies} from "./listMovies";

function FrontPage() {
    return (
        <div>
            <h1>Movie Database</h1>
            <ul>
                <li><Link to={"/movies"}>List Movies</Link></li>
                <li><Link to={"/movies/new"}>Add new movie</Link></li>
            </ul>
        </div>
    );
}

async function fetchJSON(url) {
    const res = await fetch(url)
    if(!res.ok) {
        throw new Error(`Failed to load ${res.status}: ${res.statusText}`);
    }
    return await res.json();
}

async function postJSON(url, body) {
    const response = await fetch(url, {
        method: "post",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if(!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`)
    }
}

function AddNewMovie() {
    const [title, setTitle] = useState("");
    const [year, setYear] = useState();
    const [country, setCountry] = useState("");
    const [plot, setPlot] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        await postJSON("/api/movies/new", {
            title,
            year,
            countries: [country],
            plot
        });
        setTitle("");
        setYear("");
        setPlot("");
        setCountry("");
    }

    return (
        <div>
            <h1>Add new movie</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type={"text"} name={"title"} onChange={e => setTitle(e.target.value)}/>
                </div>
                <div>
                    <label>Year:</label>
                    <input type={"number"} name={"year"} onChange={e => setYear(e.target.value)}/>
                </div>
                <div>
                    <label>Country:</label>
                    <input type={"text"} name={"country"} onChange={e => setCountry(e.target.value)}/>
                </div>
                <div>
                    <label>Plot:</label>
                    <textarea name={"plot"} onChange={e => setPlot(e.target.value)}/>
                </div>
                <div>
                    <button type={"submit"}>Submit</button>
                </div>
            </form>
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
                <Route path={"/"} element={<FrontPage/>}/>
                <Route path={"/movies"} element={<ListMovies listMovies={listMovies}/>}/>
                <Route path={"/movies/new"} element={<AddNewMovie/>}/>
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<Application />,
    document.getElementById("app")
);