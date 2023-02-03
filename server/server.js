const express = require('express');
const app = express();
app.use(express.json());
const createRouter = require('./helpers/create_router.js');
const MongoClient = require('mongodb').MongoClient;
// const cors = require('cors');

// const dummyData = [
//     {name: "SpiderMan", speed: 90, strength: 15,intelligence: 80, },
//     {name: "Godzilla", speed: 45, strength: 95,intelligence: 75, },
//     {name: "King Kong", speed: 65, strength: 85, intelligence: 55, } ,
//     {name: "Jooooooohn Cena", speed: 24, strength: 99, intelligence: 40}
// ]

// app.use(cors());


// database = TopTrumpsCards
// collection = superHeroCards
MongoClient.connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true })
.then((client) => {
    const db = client.db("TopTrumpCards")
    const cards = db.collection("superHeroCards")
    const cardsRouter = createRouter(cards);
    app.use("/api/cards", cardsRouter)
})
.catch(console.error)

// const db = client.db('games_hub');
//     const gamesCollection = db.collection('games');
//     const gamesRouter = createRouter(gamesCollection);


app.listen(9000, function () {
    console.log(`App running on port ${ this.address().port }`);
});


