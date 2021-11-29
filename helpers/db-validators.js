const { Usuario, Role, Categoria, Producto } = require('../models/')

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

const existeProductoPorId = async (id) => {
  const existeProducto = await Producto.findById(id)
  if (!existeProducto) {
    throw new Error('El producto no existe')
  }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
  const incluida = colecciones.includes(coleccion)
  if(!incluida){
    throw new Error(
      `La coleccion: ${coleccion}, no esta permitida, las colecciones permitidas son: ${colecciones}`
    )
  }
  return true
}

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoriaPorId,
  existeProductoPorId,
  coleccionesPermitidas,
}
