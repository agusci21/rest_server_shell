const { Router } = require('express')
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

router.put('/', usuariosPut)

router.post('/', usuariosPost)

router.delete('/', usuariosDelete)

router.patch('/', usuariosPatch)

module.exports = router
