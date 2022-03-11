import express from "express";

const app = express();

app.use(express.static("../client/dist/"));

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on https://localhost:${server.address().port}`);
});