import { Router } from "express";

export function MoviesApi(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const movies = await mongoDatabase
      .collection("movies")
      .find({
        title: { $eq: "Force Majeure" },
        countries: {
          $in: ["Sweden"],
        },
        year: {
          $eq: 2014,
        },
      })
      .sort({
        metacritic: -1,
      })
      .map(({ title, year, plot, poster }) => ({ title, year, plot, poster }))
      .limit(100)
      .toArray();
    res.json(movies);
  });

  router.post("/", (req, res) => {
    const { title, country, year } = req.body;
    const result = mongoDatabase.collection("movies").insertOne({
      title,
      countries: [country],
      year,
    });
    res.sendStatus(200);
  });

  return router;
}
