const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')

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

router.post('/', (req, res) => {
  res.status(200).json({
    msg: 'post',
  })
})

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
