//Sammy Hu, Web Dev Odd 7-8, 1/18/23
const express = require("express");
const app = express();
app.use(express.json())

//=========== ROUTES FOR HTTP GET REQUESTS ==========
app.get("/", (req, res) => {
    res.send("Welcome to music app")
});
const genres = [
    { id: 1, name: "pop" },
    { id: 2, name: "hip hop" },
    { id: 3, name: "rock" },
    { id: 4, name: "classical"}
]
app.get("/api/genres", (req, res) => {
    res.send(genres)
})
app.get("/api/genres/:id", (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id))
    if (!genre) {
        res.status(404).send("The genre with the given ID was not found")
        return
    }
    res.send(genre);
})

//=========== ROUTES FOR HTTP POST REQUESTS ==========
app.post("/api/genres", (req, res) => {
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    if (req.body.name.length > 3) {
        genres.push(genre)
    }
    else {
        res.status(400).send("Name of the genre should have a minimum length of 3 characters")
    }
    res.send(genre)
})


//=========== ROUTES FOR HTTP PUT REQUESTS ==========
app.put("/api/genres/:id", (req,res)=> {
    const genre = {
        id: req.body.id,
        name: req.body.name
    }
    if (req.body.id > genres.length) {
        res.status(404).send("No genre found")
    }
    else if (req.body.name.length < 3) {
        res.status(400).send("Name is required and The name has to be at least three character long")
    }
    else {
        genres.splice(req.body.id-1,1, genre);
    }
    res.send(genre);

})

//=========== ROUTES FOR HTTP DELETE REQUESTS ==========
app.delete("/api/genres/:id", (req, res) => {
    const genre = genres[req.body.id - 1]
    if (req.body.id > genres.length) {
        res.status(400).send("Bad request")
    }
    else {
        genres.splice(genres.indexOf(genre), 1)
    }
    res.send(genre)
})
app.listen(3000, () => {
    console.log("Listening on port 3000 ...")
})