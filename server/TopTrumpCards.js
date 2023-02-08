use TopTrumpCards;
db.dropDatabase()


db.superHeroCards.insertMany([{
    name: "SpiderMan",
    bio: "Bitten by a radioactive spider, Peter Parker's arachnid abilities give him amazing powers he uses to help others",
    speed: 30,
    strength: 15,
    intelligence: 80, 
    url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoQo4Gq2WQq8xrvH6yOqvmcH9FCVTcLN-LsA&usqp=CAU"
}, 
{
    name: "Shrek",
    bio: "Though surly, dangerous, cynical, misanthropic, and venomously cranky, Shrek is peaceful and does not care to hurt anyone, but just wants to live in solitude and be left alone",
    speed: 30,
    strength: 80,
    intelligence: 50, 
    url:"https://cdn.mos.cms.futurecdn.net/5YVuVeN368xwysZG6fUjwV-480-80.jpg"
},
{
    name: "Beyonce",
    bio: "bee-ON-say. adopted an alter ego, Sasha Fierce, to overcome stage fright. Her success has made her a cultural icon and earned her the nickname 'Queen Bey'",
    speed: 30,
    strength: 80,
    intelligence: 80, 
    url:"https://readdork.com/wp-content/uploads/2022/07/Beyonce-Renaissance-scaled.webp"
},
{
    name: "Godzilla", 
    bio: "Godzilla is a prehistoric reptilian monster awakened and empowered by nuclear radiation",
    speed: 30, 
    strength: 95,
    intelligence: 75, 
    url:"https://ychef.files.bbci.co.uk/976x549/p01z7psn.jpg"
},
{
    name: "King Kong", 
    bio: "Kong is the last surviving member of a species of huge apes known as kongs that once were numerous on Skull Island",
    speed: 30, 
    strength: 85, 
    intelligence: 55,
    url:"https://images.mubicdn.net/images/cast_member/364593/cache-145581-1463669218/image-w856.jpg"

},
{
    name: "Yoda", 
    bio: "a legendary Jedi Master and stronger than most in his connection with the Force. Small in size but wise and powerful",
    speed: 30, 
    strength: 60, 
    intelligence: 100,
    url:"https://thesmallscreensociety.files.wordpress.com/2020/05/81l74srlenl._sl1500_.jpg?w=640   " 
},
{
    name: "Chun Li", 
    bio: "She works for Interpol and seeks revenge for the death of her father at the hands/feet of the villainous M. Bison",
    speed: 30, 
    strength: 70, 
    intelligence: 60, 
    url:"https://static.miraheze.org/greatcharacterswiki/f/fd/Chyu.jpg"
},
{
    name: "Mokujin", 
    speed:30, 
    strength: 75, 
    intelligence: 30, 
    url:"https://upload.wikimedia.org/wikipedia/en/3/31/Mokujin_Tekken.png"
},
{
    name: "Yoshi", 
    speed: 30, 
    strength: 35, 
    intelligence: 30, 
    url:"https://i.ebayimg.com/images/g/C6oAAMXQq8BQ8XIO/s-l1600.jpg"
},
{
    name: "Sonic", 
    speed: 95, 
    strength: 20, 
    intelligence: 50,
    url:"https://mario.wiki.gallery/images/thumb/b/ba/Sonic_SSBU.png/1200px-Sonic_SSBU.png" 
},
{
    name: "Rayman", 
    speed: 30, 
    strength: 20, 
    intelligence: 50, 
    url:"https://cdn.imgbin.com/4/16/13/imgbin-rayman-origins-rayman-legends-rayman-3-hoodlum-havoc-rayman-raving-rabbids-2-others-5UPuxMXf3tVczkWb2w2E6sULC.jpg"
},

{
    name: "Evil Emporer Zurg", 
    speed: 12, 
    strength: 73, 
    intelligence: 49, 
    url: "https://i.insider.com/617c0b4e1037b1001814efeb?width=1000&format=jpeg&auto=webp", url_2: "https://static.wikia.nocookie.net/disney/images/c/c5/Toy-story2-disneyscreencaps.com-8243.jpg/revision/latest?cb=20130508003153"},

{
    name: "Buzz Lightyear",    
    speed: 51,
    strength: 37, 
    intelligence: 35, 
    url: "https://upload.wikimedia.org/wikipedia/en/b/b4/Buzz_Lightyear.png" },

{
    name: "Dr Strange",        
    speed: 21, strength: 78, 
    intelligence: 92, 
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdaKrB5MdLBZk-3obCJN-OHJeZ3enzKqC-yA&usqp=CAU"},

{
    name: "A common toirtoise",
    speed: 1, 
    strength: 4, 
    intelligence: 80, 
    url: "https://www.thepetexpress.co.uk/blog-admin/wp-content/uploads/2011/08/tortoise-2.jpg"},
{
    name: "Magnus Carlsen",    
    speed: 19, 
    strength: 8, 
    intelligence: 98, 
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyvTA5ttAxX0zopCV1Rlh2g_e37NbZC4sP5g&usqp=CAU"},

{
    name: "Tasmanian Devil",   
    speed: 44, 
    strength: 40, 
    intelligence: 2, 
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH57bAGIFRW6N4nNGlB1b2n0mbdELWmRdU1Q&usqp=CAU"},

{name: "Road Runner",       
speed: 96, 
strength: 6, 
intelligence: 84, 
url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfkwicm-hj7QWWsoA5y-X5k7ruooy-4o2Jbg&usqp=CAU"},



{name: "Harry Potter",       
speed: 30, 
strength: 45, 
intelligence: 60, 
url: "https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTc0MzY1Mjc2Nzg2MTQwODA2/the-best-and-worst-book-to-film-harry-potter-characters.jpg"
},

{name: "Voldemort",       
speed: 25, 
strength: 50, 
intelligence: 75, 
url: "https://cdn11.bigcommerce.com/s-ydriczk/products/89127/images/93849/Lord-Voldemort-Harry-Potter-Official-cardboard-cutout-buy-now-at-starstills__74553.1582849830.450.659.jpg?c=2"
},

{name: "Dhalsim",       
speed: 30, 
strength: 60, 
intelligence: 85, 
url: "https://w7.pngwing.com/pngs/866/236/png-transparent-capcom-dalsim-street-fighter-ii-the-world-warrior-dhalsim-magic-the-gathering-light-on-life-the-yoga-journey-to-wholeness-inner-peace-and-ultimate-freedom-street-fighter-video.png"
},

{name: "Poison Ivy",  
bio: "a misanthropic botanist and biochemist who possesses a poisonous touch, enhanced physical abilities, and a supernatural control over plant life",     
speed: 25, 
strength: 45, 
intelligence: 60, 
url: "https://mediaproxy.tvtropes.org/width/350/https://static.tvtropes.org/pmwiki/pub/images/42310620.jpeg"
},

])