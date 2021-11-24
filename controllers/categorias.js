const { response, request } = require('express')
const { Categoria } = require('../models')

const obtenerCategorias = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query
  const query = { estado: true }

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .populate('usuario', 'nombre')
      .skip(Number(desde))
      .limit(Number(limite)),
  ])

  res.json({
    total,
    categorias,
  })
}

const obtenerCategoria = async (req = request, res = response) => {
  const { id } = req.params
  const categoria = await Categoria.findById(id).populate('usuario', 'nombre')
  res.json(categoria)
}

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

const actualizarCategoria = async (req, res = response) => {
  const { id } = req.params
  const { estado, usuario, ...data } = req.body

  data.nombre = data.nombre.toUpperCase()
  data.usuario = req.usuario._id
  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true })

  res.json(categoria)
}

const borrarCategoria = async (req, res = response) => {
  const { id } = req.params
  const categoriaBorrada = await Categoria.findByIdAndUpdate(
    id,
    {
      estado: false,
    },
    { new: true },
  )
  res.json(categoriaBorrada)
}

module.exports = {
  crearCategorias,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
}
