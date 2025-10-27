import express from 'express';
import fetch from 'node-fetch';
const solarSystem = (await import('npm-solarsystem')).default;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

//Main route
app.get('/', async (req, res) => {

   let riResponse = await fetch("https://pixabay.com/api/?key=20426927-497d14db9c234faf7d0df8317&per_page=50&orientation=horizontal&q=solar system");
   let riData = await riResponse.json();
   let randomNumber = Math.floor(Math.random() * riData.hits.length);
   let randomImageURL = riData.hits[randomNumber].largeImageURL;
   console.log(randomImageURL);

   res.render('home.ejs', {randomImageURL});
});

//Planet route All in one
app.get('/planet', (req, res) => {
   let planet_name = req.query.planetName;
   let planetInfo = solarSystem[`get${planet_name}`]();
   //console.log(planetInfo);
   res.render('planetInfo.ejs', {planetInfo, planet_name});
});

// Sun route
app.get('/sun.ejs', (req, res) => {
   let sunInfo = solarSystem.getSun();
   res.render('sun.ejs', {sunInfo});
});


// NASAPOD route
app.get('/NASAPOD.ejs', (req, res) => {
   res.render('NASAPOD.ejs');
});

// Ineffecient method
// //Mercury route
// app.get('/mercury', (req, res) => {
//    let planetInfo = solarSystem.getMercury();
//    console.log(planetInfo);
//    res.render('mercury.ejs', {planetInfo});
// });

// //Venus route
// app.get('/venus', (req, res) => {
//    let planetInfo = solarSystem.getVenus();
//    console.log(planetInfo);
//    res.render('venus.ejs', {planetInfo});
// });

app.listen(3000, () => {
   console.log('server started');
});