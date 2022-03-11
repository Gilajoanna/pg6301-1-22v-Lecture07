import express, {Router} from "express";
import * as path from "path";

const app = express();

function MoviesApi() {
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

app.use("/api/movies", MoviesApi());

app.use(express.static("../client/dist/"));
app.use((req, res, next) => {
    if(req.method === "GET" && !req.path.startsWith("/api")) {
        return res.sendFile(path.resolve("../client/dist/index.html"));
    } else {
        next();
    }
});

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on https://localhost:${server.address().port}`);
});