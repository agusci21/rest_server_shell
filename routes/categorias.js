const { Router } = require('express')
const { check } = require('express-validator')
const { crearCategorias } = require('../controllers/categorias')
const { validarJWT } = require('../middlewares')

const { validarCampos } = require('../middlewares/')

const router = Router()

router.get('/', (req, res) => {
  res.status(200).json({
    msg: 'Get',
  })
})

router.get('/:id', (req, res) => {
  res.status(200).json({
    msg: 'Get',
  })
})

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
