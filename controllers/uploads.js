const { response } = require('express')
const { subirArchivo } = require('../helpers')

const cargarArchivo = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({
      msg: 'No se seleccionaros archivos',
    })
    return
  }

  const nombre = await subirArchivo(req.files)
  res.json({ nombre })
}

module.exports = { cargarArchivo }
