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
    // ESTO ES UN ENDPOINT

    this.app.get('/api', (req, res) => {
      res.json({
        // ok: true, Resp.body(statusCode = 200) => peticion ok
        msg: 'Peticion Get a mi API',
      })
    })

    this.app.put('/api', (req, res) => {
      res.json({
        // ok: true, Resp.body(statusCode = 200) => peticion ok
        msg: 'Peticion Put a mi API',
      })
    })

    this.app.post('/api', (req, res) => {
      res.json({
        // ok: true, Resp.body(statusCode = 200) => peticion ok
        msg: 'Peticion Post a mi API',
      })
    })

    this.app.delete('/api', (req, res) => {
      res.json({
        // ok: true, Resp.body(statusCode = 200) => peticion ok
        msg: 'Peticion Delete a mi API',
      })
    })
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Puerto Corriendo en el puerto: ${this.port}`)
    })
  }
}

module.exports = Server
