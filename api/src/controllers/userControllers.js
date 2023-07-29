const { User } = require('../db.js');

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
};


const obtenerUserPorId = async (req, res) => {
  const { id } = req.params;

  try{
    const respuesta = await User.findByPk(id)
    if(!respuesta){
        return res.status(404).json({mensaje: "Usuario no encontrado"});
    }
    const { name, nickname, email, picture, password, fechaNacimiento, direccion, telefono} = usuario
    const usuario = { id, name, nickname, email, picture, password, fechaNacimiento, direccion, telefono}
    res.json(usuario);
    console.log(JSON.stringify(respuesta))
  } catch (error) {
    console.log(error);
    res.status(500).json({mensaje: "Error al obtener el usuario"})
  }
}

const crearUser = async (req, res) => {
  try{
    const { name, nickname, email, picture, password, fechaNacimiento, direccion, telefono } = req.body
    
    const newUser = await User.create({
        name, 
        nickname, 
        email, 
        picture, 
        password, 
        fechaNacimiento, 
        direccion, 
        telefono 
    });
    console.log(Object.keys(newUser))
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error al crear un nuevo usuario:', error);
    res.status(500).json({ error: 'Error al crear un nuevo usuario' });
  }
}

// async function actualizarUsuario(req, res) {
//   const { id } = req.params;
//   const { email, nombre, nickname, direccion, telefono, fechaNacimiento } = req.body
//   try {
//     const usuario = await User.findByPk(id) 
//     if (!usuario) {
//       return res.status(404).json({ mensaje: 'Usuario no encontrado' });
//     usuario.nombre = nombre || usuario.nombre;
//     usuario.direccion = direccion || usuario.direccion;
//     usuario.telefono = telefono || usuario.telefono;
//     usuario.fechaNacimiento = fechaNacimiento || usuario.fechaNacimient
//     await usuario.save();
//     res.json(usuario);
//     }
//   } catch (error) {
//     console.error('Error al actualizar el usuario:', error);
//     res.status(500).json({ mensaje: 'Error del servidor' });
//     }
//   }

  module.exports = { getUsers, obtenerUserPorId , crearUser};
