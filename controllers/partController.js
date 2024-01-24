const Part = require('../models/Part')
 
const getAllParts = async (req,res) => {

    try {
        const parts = await Part.find()
        res.json(parts) 
    } catch (error) {
        res.json({error})
    }
    
}

const createPart = async (req,res) => {

    try {
        const newPart = req.body
        const addPart = await Part.create(newPart)
        res.json({addPart})
    } catch (error) {
        res.json({error})
    }
    
}

module.exports = [getAllParts, createPart]