import {Router} from "express";

export function MoviesApi(mongoDatabase) {
    const router = new Router();

    router.get("/", async (req, res) => {
        const movies = await mongoDatabase.collection("movies")
            .find({
                countries: {
                    $in: ["Sweden"],
                },
                year: {
                    $gte: 1991,
                }
            })
            .sort({
                metacritic: -1
            }
            )
            .map(({title, year, plot, poster}) =>
                ({title, year, plot, poster}))
            .limit(100)
            .toArray();
        res.json(movies);
    });

    router.post("/new", async (req, res) => {
        const { title, year, countries, plot } = req.body;
        const result = await mongoDatabase.collection("movies").insertOne({
            title,
            year,
            countries,
            plot
        });
        console.log({ result })
        res.sendStatus(200);
    });

    return router;
}