const { Usuario, Role, Categoria } = require('../models/')

const esRoleValido = async (rol = '') => {
  const existeRol = await Role.findOne({ rol })
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`)
  }
}

const emailExiste = async (correo = '') => {
  // Verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo })
  if (existeEmail) {
    throw new Error(`El correo: ${correo}, ya está registrado`)
  }
}

const existeUsuarioPorId = async (id) => {
  // Verificar si el correo existe
  const existeUsuario = await Usuario.findById(id)
  if (!existeUsuario) {
    throw new Error(`El id no existe ${id}`)
  }
}

const existeCategoriaPorId = async (id) => {
  const existeCategoria = await Categoria.findById(id)
  if (!existeCategoria) {
    throw new Error('La categoria no existe')
  }
}

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoriaPorId,
}
