const path = require('path')

const { response } = require('express')

const cargarArchivo = (req, res = response) => {
  let sampleFile

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({
      msg: 'No se seleccionaros archivos',
    })
    return
  }

  const { archivo } = req.files
  const nombreCortado = archivo.name.split('.')
  const extencion = nombreCortado[nombreCortado.length - 1]

  const extencionesValidas = ['png', 'jpg', 'jpeg', 'gif']

  if (!extencionesValidas.includes(extencion)) {
    return res.status(400).json({
      msg: `La extencion ${extencion} no es permitida, Las extenciones validas son: ${extencionesValidas}`,
    })
  }

  res.json({ extencion })

  /*const uploadPath = path.join(__dirname, '../uploads/' + archivo.name)

  archivo.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({err})
    }

    res.json({msg: 'Archivo subido a: ' + uploadPath})
  })*/
}

module.exports = { cargarArchivo }
