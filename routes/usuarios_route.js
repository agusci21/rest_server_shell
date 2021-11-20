const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar_campos')
const role = require('../models/role')
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
  [
    check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
    check(
      'password',
      'La contraseña es obligatorio y debe ser mayor a 6 caracteres',
    ).isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('rol', 'No es un Rol valido').isIn(['ADMIN_ROL', 'USER_ROL']),
    //check('role').custom(async (role = '') => {
    //  const existeRol = await Role.findOne({ role })
    //  if (!existeRol) {
    //    throw new Error(`El rol: ${role}, no esta permitido`)
    //  }
    //}),
    validarCampos,
  ],
  usuariosPost,
)

router.delete('/', usuariosDelete)

router.patch('/', usuariosPatch)

module.exports = router
