use TopTrumpCards;
db.dropDatabase()


db.smallSuperHeroCards.insertMany([{
    name: "SpiderMan",
    speed: 30,
    strength: 15,
    intelligence: 90, 
    url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoQo4Gq2WQq8xrvH6yOqvmcH9FCVTcLN-LsA&usqp=CAU"
}, 
{
    name: "Shrek",
    speed: 30,
    strength: 80,
    intelligence: 50, 
    url:"https://cdn.mos.cms.futurecdn.net/5YVuVeN368xwysZG6fUjwV-480-80.jpg"
},
{
    name: "Beyonce",
    speed: 30,
    strength: 85,
    intelligence: 80, 
    url:"https://readdork.com/wp-content/uploads/2022/07/Beyonce-Renaissance-scaled.webp"
},
{
    name: "Godzilla", 
    speed: 30, 
    strength: 95,
    intelligence: 15, 
    url:"https://ychef.files.bbci.co.uk/976x549/p01z7psn.jpg"
}])