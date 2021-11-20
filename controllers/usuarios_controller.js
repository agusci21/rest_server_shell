const { response, request } = require('express') // Opcional por la falta de tipado estricto de JS
const bcryptjs = require('bcryptjs')
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
  const { nombre, correo, password, rol } = req.body
  const usuario = new Usuario({ nombre, correo, password, rol })

  

  const existeEmail = await Usuario.findOne({ correo })
  if (existeEmail) {
    return res.status(400).json({
      msg: 'El correo ya existe',
    })
  }

  const salt = bcryptjs.genSaltSync()

  usuario.password = bcryptjs.hashSync(password, salt)

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
