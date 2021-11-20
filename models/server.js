const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')
const app = express()

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.usuariosPath = '/api/usuarios'

    //DB
    this.conectarDB()

    //MIDDLEWARES
    this.middlewares()

    //Rutas

    this.routes()
  }

  async conectarDB() {
    await dbConnection()
  }

  middlewares() {
    //Cors
    this.app.use(cors())

    //Parseo y lectura del body
    this.app.use(express.json())

    //Directorio publico
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.usuariosPath, require('../routes/usuarios_route'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Puerto Corriendo en el puerto: ${this.port}`)
    })
  }
}

module.exports = Server
