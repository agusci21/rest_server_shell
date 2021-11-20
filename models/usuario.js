
const {Schema, model} = require('mongoose')

const UsuarioSchema = Schema({
    
    nombre: {
        type: String,
        require:[true, 'El nombre es obligatorio']
    },

    correo:{
        type: String,
        require: [true, 'El correo es obligatorio'],
        unique: true
    },

    password:{
        type: String,
        require: [true, 'La contraseña es obligatoria'],
    },

    imagen:{
        type: String,
    },

    rol:{
        type: String,
        require: true,
        enum: ['ADMIN_ROL', 'USER_ROL'],
    },

    estado:{
        type: Boolean,
        default: true
    },

    google:{
        type: Boolean,
        default: false
    },

})

module.exports = model('Usuario', UsuarioSchema)