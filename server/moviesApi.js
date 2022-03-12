import {Router} from "express";

export function MoviesApi(mongoDatabase) {
    const router = new Router();

    router.get("/", async (req, res) => {
        const movies = await mongoDatabase.collection("movies")
            .find({
                countries: {
                    $in: ["Ukraine"],
                },
                year: {
                    $gte: 2000,
                }
            })
            .sort({
                metacritic: -1,
            })
            .map(({title, year, plot, poster}) =>
                ({title, year, plot, poster}))
            .limit(100)
            .toArray();
        res.json(movies);
    });

    router.post("/new", (req, res) => {
        res.sendStatus(500);
    });

    return router;
}