const { Router } = require('express')
const { check } = require('express-validator')
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require('../controllers/usuarios_controller')

const router = Router()

// ESTO ES UN ENDPOINT

router.get('/', usuariosGet)

router.put('/:id', usuariosPut)

router.post(
  '/',
  [check('correo', 'El correo no es valido').isEmail()],
  usuariosPost,
)

router.delete('/', usuariosDelete)

router.patch('/', usuariosPatch)

module.exports = router
