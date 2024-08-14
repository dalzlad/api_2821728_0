const Vehicle = require('../models/vehicle')

//Get all documents from Vehicle
const getVehicle = async(req, res) => {
    const vehicles = await Vehicle.find() //Get all vehicles
    res.json(vehicles)
}

//Post Create a document in the collection Vehicle
const postVehicle = async(req, res) => {
    const body = req.body //Get the body send from postman or a form
    let msg = 'Vehicle inserted succesful'
    try {
        const vehicle = new Vehicle(body)//Create the object Vehicle in RAM
        vehicle.price = 8888
        await vehicle.save() //Insert object at the collection
    } catch (error) {
        msg = error
    }
    res.json({msg:msg})
}

const putVehicle = async(req, res) =>{
    const {plate, color, model} = req.body //Destructuring
    let msg = 'Vehicle updated succesful'
    try {
        await Vehicle.findOneAndUpdate({plate:plate},{color:color,model})
    } catch (error) {
        msg = error
    }
    res.json({msg:msg})
}

const deleteVehicle = async(req, res) => {
    const _id = req.params.id //Get param _id
    try {
        await Vehicle.findByIdAndDelete({_id:_id}) //Delete object by id
        res.json('Vehicle deleted successfully!')
    } catch (error) {
        res.status(500).json(error, {msg:'There was problem deleting the vehicle'})
    }
}

module.exports = {  //Export functions
    getVehicle,
    postVehicle,
    putVehicle,
    deleteVehicle
}

//9-8-2024
/*
Brayan 
Jose Rivera
Miguel
*/