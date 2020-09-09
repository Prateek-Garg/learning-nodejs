const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./util/forecast')
const geocode = require('./util/geocode')

console.log(__dirname)
console.log(path.join(__dirname, "../public"))

const app = express()
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsDirectory = path.join(__dirname, "../templates/partials")

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsDirectory)

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {~
    res.render('index', {
        title: 'Home Page',
        body: 'This is the home page body'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page title',
        body: 'This is the help page body.'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        body: 'About page body section'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
       return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address, (error, response) => {
        if(error) {
            return res.send({
                error: error
            })
        }

        forecast(response.Latitude, response.Longitude, (e, r) =>{
            if(e) {
                return res.send({
                    error: e
                })
            }

            res.send({
                temperature: r.temperature,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*',(req, res) => {
    res.render('error', {
        title: 'Error Page',
        error: 'Help article not found'
    })
})

app.get('*',(req, res) => {
    res.render('error', {
        title: 'Error Page',
        error: 'My 404 page'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running')
})