import express from 'express';
import fetch from 'node-fetch';
const solarSystem = (await import('npm-solarsystem')).default;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

//Root route
app.get('/', async (req, res) => {

   let riResponse = await fetch("https://pixabay.com/api/?key=20426927-497d14db9c234faf7d0df8317&q=solarsystem");
   let riData = await riResponse.json();
   let randomImageURL = riData.hits[0].largeImageURL;
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