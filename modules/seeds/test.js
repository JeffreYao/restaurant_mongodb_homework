//import modules
const mongoose = require("mongoose")
const Restaurant = require("../restaurant.js")
// const restaurantJson = require("../restaurant.json")
// const restaurantResults = restaurantJson.results

mongoose.connect('mongodb://127.0.0.1/Restaurant', { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('db error :(')
})

db.once('open', () => {
  console.log('db connected:)')
  let req.body.id = "5dd1eb3aed58fd5d0c0a7a6a"
  let req.body.category = "台灣味"
  app.post('/restaurants/:id/edit', (req, res) => {
    console.log(req.body.category)
    // res.send('修改餐廳 頁面')
    Restaurant.findById(id, (err, restaurant) => {
      if (err) return console.error(err)
      restaurant.name = req.body.name
      restaurant.category = req.body.category
      restaurant.image = req.body.image
      restaurant.location = req.body.location
      restaurant.phone = req.body.phone
      restaurant.google_map = req.body.google_map
      restaurant.rating = req.body.rating
      restaurant.description = req.body.description

      console.log(restaurant)
      restaurant.save((err) => {
        if (err) return console.error(err)
        return res.redirect(`/restaurants/${req.params.id}`)
      })
    })
    console.log('done!')
  })
})