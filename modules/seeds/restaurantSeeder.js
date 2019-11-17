//import modules
const mongoose = require("mongoose")
const Restaurant = require("../restaurant.js")
const restaurantJson = require("../restaurant.json")
const restaurantResults = restaurantJson.results

mongoose.connect('mongodb://127.0.0.1/Restaurant', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection

db.on('error', () => {
  console.log('db error :(')
})

db.once('open', () => {
  console.log('db connected:)')

  for (var i = 0; i < restaurantResults.length; i++) {
    Restaurant.create({
      name: restaurantResults[i].name,
      name_en: restaurantResults[i].name_en,
      category: restaurantResults[i].category,
      image: restaurantResults[i].image,
      location: restaurantResults[i].location,
      phone: restaurantResults[i].phone,
      google_map: restaurantResults[i].google_map,
      rating: restaurantResults[i].rating,
      description: restaurantResults[i].description
    })
  }
  console.log('done!')
})