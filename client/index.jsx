import * as React from "react";
import * as ReactDOM from "react-dom";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";

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

function useLoading(loadingFunction) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [data, setData] = useState();

    //Denna funktionen säger att vi nu är i färd med och laste, så ska vi sätta resultatet
    //av loadingFunctionen. Vi måste vänta till loadingFunktionen är färdig.
    //Om det kommer en fel så ska vi sätta och hantera den felen
    //Vi är sen färdiga med och laste och sätter loading till false.
    async function load() {
        try {
            setLoading(true);
            setData(await loadingFunction());
        } catch(error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }
    //Utför load funktionen blir kallad.
    useEffect(() => {
        load();
    }, []);

    return { loading, error, data };
}

async function fetchJSON(url) {
    const res = await fetch(url)
    if(!res.ok) {
        throw new Error(`Failed to load ${res.status}: ${res.statusText}`);
    }
    return await res.json();
}

function MovieCard({ movie: {title, plot, poster} }) {
    return <div>
        <h3>{ title }</h3>
        {poster && <img src={ poster } width={100} alt={"Movie Poster"}/>}
        <div>{ plot }</div>
    </div>;
}

function ListMovies() {
    const { loading, error, data } = useLoading(async () =>
        fetchJSON("/api/movies")
    );

    //När vi laddar ska vi visa en loading page
    if(loading) {
        return <div>Loading...</div>;
    }

    if(error) {
        return (
            <div>
            <h1>Error</h1>
            <div>{error.toString()}</div>
        </div>
        );
    }

    return (
        <div>
            <h1>Movies in database</h1>
                {data.map((movie) => (
                    <MovieCard key={movie.title} movie={movie}/>
                ))}
        </div>
    );
}

function AddNewMovie() {
    return (
        <form>
            <h1>Add new movie</h1>
        </form>
    );
}

function Application() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<FrontPage/>}/>
                <Route path={"/movies"} element={<ListMovies/>}/>
                <Route path={"/movies/new"} element={<AddNewMovie/>}/>
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<Application />,
    document.getElementById("app")
);