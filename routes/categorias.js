const { Router } = require('express')
const { check } = require('express-validator')
const {
  crearCategorias,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require('../controllers/categorias')
const { existeCategoriaPorId } = require('../helpers/db-validators')
const { validarJWT, esAdminRole } = require('../middlewares')

const { validarCampos } = require('../middlewares/')

const router = Router()

router.get('/', obtenerCategorias)

router.get(
  '/:id',
  [
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
  ],
  obtenerCategoria,
)

router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
    validarCampos,
  ],
  crearCategorias,
)

router.put(
  '/:id',
  [
    validarJWT,
    check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
  ],
  actualizarCategoria,
)

router.delete(
  '/:id',
  [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
  ],
  borrarCategoria,
)

module.exports = router
