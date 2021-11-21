const { response } = require('express')
const Usuario = require('../models/usuario')
const bcryptjs= require('bcryptjs')

const login = async (req, res = response) => {
  const { correo, password } = req.body

  try {
    //Email existente
    const usuario = await Usuario.findOne({correo})
    if(!usuario){
        return res.status(400).json({
            msg:'Usuario o contraseña invalidos - correo'
        })
    }
    //Usuario activo
    if(!usuario.estado){
        return res.status(400).json({
            msg : 'Usuario o contraseña invalidos - estado: false'
        })
    }
    //verificar contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password)
    if(!validPassword){
        return res.status(400).json({
            msg:'Usuario o contraseña invalidos - contraseña'
        })
    }
    //generar JWT

    return res.json({
      msg: 'Login okay',
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      msg: 'Algo Salio mal',
    })
  }
}

module.exports = {
  login,
}
