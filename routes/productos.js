const { Router } = require('express')
const { check } = require('express-validator')
const {
  crearProductos,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
  crearProducto,
} = require('../controllers/productos')
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators')
const { validarJWT, esAdminRole } = require('../middlewares')

const { validarCampos } = require('../middlewares/')

const router = Router()

router.get('/', obtenerProductos)

router.get(
  '/:id',
  [
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto,
)

router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es Obligatoria').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearProducto,
)

router.put(
  '/:id',
  [
    validarJWT,
    //check('categoria', 'La categoria es Obligatoria').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
  ],
  actualizarProducto,
)

router.delete(
  '/:id',
  [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
  ],
  borrarProducto,
)

module.exports = router
