const express = require('express')
require('dotenv').config()
const dbConnection = require('../database/config')
const {getVehicle, postVehicle, putVehicle} = require('../controllers/vehicleController')

class Server{
    constructor(){
        this.app = express() //is an attribute
        this.listen() //method listen()
        this.dbConnection() //method dbConnection()
        this.pathVehicle = '/api/Vehicle' //Ruta publica de la api. Is an attribute
        this.route() //Is a method
    }

    async dbConnection(){
        await dbConnection()
    }

    route(){
        this.app.use(express.json()) //Emplear json al req body
        this.app.get(this.pathVehicle, getVehicle) //Call to vehicleController
        this.app.post(this.pathVehicle, postVehicle) //Call to vehicleController
        this.app.put(this.pathVehicle, putVehicle)
    }

    listen(){
        this.app.listen(process.env.PORT, () =>{
            console.log(`Server is runnig on port: ${process.env.PORT}`)
        })
    }
}

module.exports = Server //Export the class Server