const { Router } = require('express')
const { check } = require('express-validator')
const {
  crearCategorias,
  obtenerCategorias,
  obtenerCategoria,
} = require('../controllers/categorias')
const { existeCategoriaPorId } = require('../helpers/db-validators')
const { validarJWT } = require('../middlewares')

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

router.put('/:id', (req, res) => {
  res.status(200).json({
    msg: 'put',
  })
})

router.delete('/:id', (req, res) => {
  res.status(200).json({
    msg: 'delete',
  })
})

module.exports = router
