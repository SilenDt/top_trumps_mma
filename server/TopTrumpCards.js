use TopTrumpCards;
db.dropDatabase()

db.superHeroCards.insertMany([
    {name: "Evil Emporer Zurg", speed: 12, strength: 73, intelligence: 49, url: "https://i.insider.com/617c0b4e1037b1001814efeb?width=1000&format=jpeg&auto=webp", url_2: "https://static.wikia.nocookie.net/disney/images/c/c5/Toy-story2-disneyscreencaps.com-8243.jpg/revision/latest?cb=20130508003153"},
    {name: "Buzz Lightyear",    speed: 51, strength: 37, intelligence: 35, url: "https://upload.wikimedia.org/wikipedia/en/b/b4/Buzz_Lightyear.png" },
    {name: "Dr Strange",        speed: 21, strength: 78, intelligence: 92, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdaKrB5MdLBZk-3obCJN-OHJeZ3enzKqC-yA&usqp=CAU"},
    {name: "A common toirtoise",speed: 1, strength: 4, intelligence: 80, url: "https://www.thepetexpress.co.uk/blog-admin/wp-content/uploads/2011/08/tortoise-2.jpg"},
    {name: "Magnus Carlsen",    speed: 19, strength: 8, intelligence: 98, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyvTA5ttAxX0zopCV1Rlh2g_e37NbZC4sP5g&usqp=CAU"},
    {name: "Tasmanian Devil",   speed: 44, strength: 40, intelligence: 2, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH57bAGIFRW6N4nNGlB1b2n0mbdELWmRdU1Q&usqp=CAU"},
    {name: "Road Runner",       speed: 96, strength: 6, intelligence: 84, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfkwicm-hj7QWWsoA5y-X5k7ruooy-4o2Jbg&usqp=CAU"},
    {name: "Godzilla", speed: 45, strength: 95,intelligence: 75, },
    {name: "King Kong", speed: 65, strength: 85, intelligence: 55, }
])