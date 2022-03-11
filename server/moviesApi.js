import {Router} from "express";

const movies = [
    {
        title: "Movie 1",
    },
    {
        title: "Movie 2",
    },
]

export function MoviesApi(mongoDatabase) {
    const router = new Router();

    router.get("/", async (req, res) => {
        const movies = await mongoDatabase.collection("movies").find().toArray();
        res.json(movies);
    });

    router.post("/new", (req, res) => {
        res.sendStatus(500);
    });

    return router;
}