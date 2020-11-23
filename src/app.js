const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viesPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viesPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'チビマル'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: '僕について',
        name: 'チビマル'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'お役にたつヘルプページです。',
        title: 'ヘルプページ',
        name: 'チビマル'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
      return res.send({
        error: '正確な住所を入力して下さい。'
      })
    }

    geocode(req.query.address, (error,{ latitude, longtitude, location } = {}) => {
      if (error) {
          return res.send({ error })
      }

      forecast(latitude, longtitude, (error, forecastData) => {
        if (error) {
          return res.send({ error })
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        })


      })

    })
      
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
      return res.send({
        error: 'お探しのキーワードを入力して下さい。'
      })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'チビマル',
    errorMessage: 'ヘルプページが見つかりません。'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'チビマル',
    errorMessage: 'ページが見つかりません。'
  })
})

app.listen(port, () => {
    console.log('Server is up on port port.' + port)
})

