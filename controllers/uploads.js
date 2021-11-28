const { response } = require('express')

const cargarArchivo = (req, res = response) => {
  res.json({
    msg: 'Cargar Archivo',
  })
}

module.exports = { cargarArchivo }
