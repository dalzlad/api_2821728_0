const express = require('express')
require('dotenv').config()
const dbConnection = require('../database/config')
const {getVehicle, postVehicle, putVehicle, deleteVehicle} = require('../controllers/vehicleController')

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
        this.app.delete(this.pathVehicle+'/:id', deleteVehicle)
    }

    listen(){
        this.app.listen(process.env.PORT, () =>{
            console.log(`Server is runnig on port: ${process.env.PORT}`)
        })
    }
}

module.exports = Server //Export the class Server



/*
Crear un nuevo proyecto para una API REST que permita registrar los datos de un empleado. 
los datos son:
Numero Documento, Nombres, Fecha Ingreso, Fecha Retiro, Salario, DiasLaborados, Cesantias.

Los dias laborados deben ser calculados en la api.
Las Cesantias se calculan en el método POST y corresponden a la formula:
Salario * DiasLaborados / 360

Métodos: GET y POST

Si a las 11:30 a.m no hay avance para mañana traer:
la api rest de empleados + 5 api rest de su proyecto y exponerlas a sus compañeros.
*/

