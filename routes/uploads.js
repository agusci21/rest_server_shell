const { Router } = require('express')
const { check } = require('express-validator')

const { cargarArchivo, actualizarImagen } = require('../controllers/uploads')
const { coleccionesPermitidas } = require('../helpers')
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router()

router.post('/', cargarArchivo)
router.put('/:coleccion/:id', [
    check('id', 'El id debe ser un MongoId').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios', 'productos'])),
    validarCampos
], actualizarImagen)

module.exports = router
