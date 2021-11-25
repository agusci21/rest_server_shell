const { response } = require('express')
const { ObjectId } = require('mongoose').Types
const { Usuario } = require('../models/index')

const coleccionesPermitidas = ['usuarios', 'categorias', 'productos', 'roles']

const buscarUsuarios = async (termino = '', res = response) => {
  const esMongoId = ObjectId(termino)

  if (esMongoId) {
    const usuario = await Usuario.findById(termino)
    res.json({
      results: usuario ? [usuario] : [],
    })
  }
}

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params
  if (!coleccionesPermitidas.includes(coleccion)) {
    res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
    })
  }

  switch (coleccion) {
    case 'usuarios':
      buscarUsuarios(termino, res)
      break
    case 'categorias':
      break
    case 'productos':
      break

    default:
      res.status(500).json({
        msg: 'Problemas con la busqueda',
      })
  }
}

module.exports = { buscar }
