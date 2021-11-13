const express = require('express')
const cors = require('cors')
const app = express()

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.usuariosPath = '/api/usuarios'

    //MIDDLEWARES
    this.middlewares()

    //Rutas

    this.routes()
  }

  middlewares() {
    //Directorio publico
    this.app.use(cors())
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
