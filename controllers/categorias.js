const { response } = require('express')
const { Categoria } = require('../models')

const crearCategorias = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase()
  const categoriaDb = await Categoria.findOne({ nombre })

  if (categoriaDb) {
    res.status(400).json({
      msg: `La Categoria ${nombre} ya existe`,
    })
  }

  const data = {
    nombre,
    usuario: req.usuario._id,
  }

  const categoria = new Categoria(data)

  await categoria.save()

  res.status(201).json(categoria)
}

module.exports = { crearCategorias }
