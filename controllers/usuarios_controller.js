const { response } = require('express') // Opcional por la falta de tipado estricto de JS

const usuariosGet = (req, res = response) => {
  res.json({
    // ok: true, Resp.body(statusCode = 200) => peticion ok
    msg: 'Get api -----> Controlador',
  })
}

const usuariosPost = (req, res) => {
  res.json({
    msg: 'Post api -----> Controlador',
  })
}

const usuariosPut = (req, res) => {
  res.json({
    msg: 'Put api -----> Controlador',
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
