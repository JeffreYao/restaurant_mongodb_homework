const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = 3000
const Restaurant = require('./modules/restaurant')


// -- 設定mongoose --
// 連線至本地端資料庫
mongoose.connect('mongodb://localhost/Restaurant', { useNewUrlParser: true })
// 獲取connection 
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongoDB error:(')
})
// 連線正常
db.once('open', () => {
  console.log('mongoDB connected:)')
})

// 設定body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// 設定handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// 餐廳首頁
app.get('/', (req, res) => {
  Restaurant.find((err, restaurants) => {
    console.log("todoList!!", restaurants)
    if (err) return console.error(err)
    return res.render('index', { restaurants, css: 'index.css' })
    // return res.send('restaurant=>index')
  })
})


// 列出全部餐廳
app.get('/restaurants', (req, res) => {
  return res.redirect('/')
})

// 顯示一筆餐廳的詳細內容
app.get('/restaurants/:id', (req, res) => {
  // res.send('顯示Todo 的詳細內容')
  Restaurant.findById(req.params.id, (err, restaurant) => {
    return res.render('detail', { restaurant, css: 'detail.css' })
  })
})



// 刪除餐廳
app.post('/restaurants/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})


// search bar
app.get('/search', (req, res) => {
  console.log('req==>', req.query)//查看keyword
  Restaurant.find((err, restaurants) => {
    const restaurantSearch = restaurants.filter(function (restaurant) {
      return restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase())
    })
    // console.log(restaurantSearch) 
    // console.log("todoList!!", restaurants)
    if (err) return console.error(err)
    return res.render('index', { restaurants: restaurantSearch, keyword: req.query.keyword, css: 'index.css' })
    // return res.send('restaurant=>index')
  })
})





app.listen(port, () => {
  console.log(`web on ${port}`)
})

