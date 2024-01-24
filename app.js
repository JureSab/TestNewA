const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const [getAllCars,createCar,deleteSingleCar] = require('./controllers/carController')
const [getAllParts, createPart] = require('./controllers/partController')

const app = express()

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/public/homepage.html')
})

app.get('/cars',getAllCars)
app.post('/cars',createCar)
app.post('/cars/delete',deleteSingleCar)

app.get('/parts',getAllParts)
app.post('/parts',createPart)


mongoose.connect('mongodb+srv://admin:admin123@cluster0.9qiie4f.mongodb.net/SPApp').then(() => {
    app.listen(5001,() => {
        console.log('DB Conected server running on http://localhost:5001')
    })
}).catch((error) => {
    console.log(error)
})