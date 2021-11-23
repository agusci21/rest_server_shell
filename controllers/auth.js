const { response, request, json } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')

const { generarJWT } = require('../helpers/generar-jwt')
const { googleVerify } = require('../helpers/google-verify')
const usuario = require('../models/usuario')

const login = async (req, res = response) => {
  const { correo, password } = req.body

  try {
    // Verificar si el email existe
    const usuario = await Usuario.findOne({ correo })
    if (!usuario) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - correo',
      })
    }

    // SI el usuario está activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - estado: false',
      })
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password)
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - password',
      })
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id)

    res.json({
      usuario,
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Hable con el administrador',
    })
  }
}

const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body

  try {
    //const googleUser = await googleVerify(id_token)
    const { nombre, img, correo } = await googleVerify(id_token)
    //console.log(nombre, img, correo)

    let usuario = await Usuario.findOne({ correo })

    if (!usuario) {
      const data = {
        nombre,
        correo,
        password: '',
        rol: 'USER_ROLE',
        img,
        google: true,
      }

      usuario = new Usuario(data)
      usuario.save()
    }

    if (!usuario.estado) {
      return res.status(400).json({
        msg: 'Usuario ya borrado',
      })
    }

    const token = await generarJWT(usuario.id)

    res.json({
      usuario,
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      ok: false,
      msg: 'El token es inverificable',
    })
  }
}

module.exports = {
  login,
  googleSignIn,
}
