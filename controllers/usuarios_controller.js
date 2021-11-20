const { response, request } = require('express') // Opcional por la falta de tipado estricto de JS
const Usuario = require('../models/usuario')

const usuariosGet = (req = request, res = (response = response)) => {
  const { a, b, nombre = 'Sin nombre' } = req.query
  res.json({
    msg: 'Get api -----> Controlador',
    a,
    b,
    nombre,
  })
}

const usuariosPost = async (req, res) => {
  const body = req.body
  const usuario = new Usuario(body)

  await usuario.save()

  res.json({
    msg: 'Post api -----> Controlador',
    usuario,
  })
}

const usuariosPut = (req, res) => {
  const { id } = req.params
  res.json({
    msg: 'Put api -----> Controlador',
    id,
  })
}

const usuariosDelete = (req, res) => {
  res.json({
    msg: 'Delete api -----> Controlador',
  })
}

const usuariosPatch = (req, res) => {
  res.json({
    msg: 'Patch api -----> Controlador',
  })
}

module.exports = {
  usuariosGet,
  usuariosPatch,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
}
