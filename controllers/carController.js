const express = require('express')
const Car = require('../models/Car')

const getAllCars = async (req,res) => {

    try {
        const data = await Car.find()
        res.json(data)
    } catch (error) {
        res.json(errorMessage = error)
    }
}

const createCar = async (req,res) => {

    try {
        const newCar = req.body
        //console.log(newCar)
        const insertCar = await Car.create(newCar)
        res.json(msg = "Data inserted")
    } catch (error) {
        res.json(errorMessage = error)
    }
}

const deleteSingleCar = async (req,res) => {
    try{
        const id = req.body.buttonID
        let deleteReq = await Car.findByIdAndDelete(id)
        res.json({deleteReq})
    }catch(e){
        res.json({e})
    }
}

const editSingleCar = async (req,res) => {
    try{
        const idParam = req.params
        const newData = req.body
        console.log(idParam)
        console.log(newData)
        // let editReq = await Car.findByIdAndUpdate(id)
        // res.json({editReq})
    }catch(e){
        res.json({e})
    }
}

module.exports = [getAllCars,createCar,deleteSingleCar]