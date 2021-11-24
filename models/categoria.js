const { Schema, model } = require('mongoose')

const CategoriaSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'El Nombre es obligatorio'],
    unique: true,
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

CategoriaSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject()
  return data
}

module.exports = model('Categoria', CategoriaSchema)
