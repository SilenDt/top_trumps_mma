use TopTrumpCards;
db.dropDatabase()

db.superHeroCards.insertMany([{
    name: "SpiderMan",
    speed: 90,
    strength: 15,
    intelligence: 80, 
}, 
{name: "Godzilla", speed: 45, strength: 95,intelligence: 75, },
{name: "King Kong", speed: 65, strength: 85, intelligence: 55, }
])