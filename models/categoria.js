const { Schema, model } = require('mongoose')

const CategoriaSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'El Nombre es obligatorio'],
  },

  estado: {
    type: Boolean,
    default: true,
    require: [true, 'El estado es obligatorio'],
  },

  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    require: true,
  },
})

module.exports = model('Categoria', CategoriaSchema)
