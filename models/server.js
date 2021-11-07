const express = require('express')
const app = express()

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT

    //MIDDLEWARES
    this.middlewares()

    //Rutas

    this.routes()
  }

  middlewares() {
    //Directorio publico
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.get('/', (req, res) => {
      res.send('Hola mundo')
    })
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Puerto Corriendo en el puerto: ${this.port}`)
    })
  }
}

module.exports = Server
