const { response } = require('express')
const { model } = require('mongoose')
const { subirArchivo } = require('../helpers')
const { Usuario, Producto } = require('../models')

const cargarArchivo = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({
      msg: 'No se seleccionaros archivos',
    })
    return
  }

  try {
    //const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos')
    const nombre = await subirArchivo(req.files, undefined, 'imgs')
    res.json({ nombre })
  } catch (error) {
    res.status(400).json({ msg: error })
  }
}

const actualizarImagen = async (req, res = response) => {
  const { coleccion, id } = req.params

  let modelo
  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id)

      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con ID: ${id}`,
        })
      }

      break

    case 'productos':
      modelo = await Producto.findById(id)

      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con ID: ${id}`,
        })
      }
      break

    default:
      return res.status(500).json({
        msg: 'No se ha validado esto',
      })
      break
  }

  const nombre = await subirArchivo(req.files, undefined, coleccion)
  modelo.img = nombre

  await modelo.save()

  return res.json(modelo)
}

module.exports = { cargarArchivo, actualizarImagen }