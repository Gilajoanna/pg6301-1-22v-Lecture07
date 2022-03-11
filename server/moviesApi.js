import {Router} from "express";

export function MoviesApi() {
    const router = new Router();

    router.get("/", (req, res) => {
        res.json([
            {
                title: "Movie 1",
            },
        ])
    });

    router.post("/new", (req, res) => {
        res.sendStatus(500);
    });

    return router;
}