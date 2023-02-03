const express = require('express');
const app = express();
const createRouter = require('./helpers/create_router.js');
// const cors = require('cors');

const dummyData = [
    {name: "SpiderMan", speed: 90, strength: 15,intelligence: 80, },
    {name: "Godzilla", speed: 45, strength: 95,intelligence: 75, },
    {name: "King Kong", speed: 65, strength: 85, intelligence: 55, } ,
    {name: "Jooooooohn Cena", speed: 24, strength: 99, intelligence: 40}
]

app.use(express.json());
// app.use(cors());



// define routes
const cardsRouter = createRouter(dummyData);

app.use('/api/cards', cardsRouter);


app.listen(9000, function () {
    console.log(`App running on port ${ this.address().port }`);
});


