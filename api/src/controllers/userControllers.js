const { User } = require('../db');

const getUsers = async (req, res) => {
  try {
      const users = await User.findAll();
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ message: error.message });
  } 
};


const obtenerUserPorId = async (req, res) => {
  try{
      const user = await User.findByPk(id);
      if (user) {
          res.json(user);
      } 
      else{
          res.status(404).json({error: "Usuario no encontrado"})
      }
  }catch(error){
      res.status(500).json({ message: error.message });
  }
}

const crearUser = async (req, res) => {
  const { email, name, nickname, picture, sub, password, fechaNacimiento, direccion, telefono} = req.body
  const user = req.body
  try{
      if(!name || !email || !nickname || !password || !fechaNacimiento || !telefono){
          res.status(422).json({ message: "Falta info"})
      }
      else {
          User.create({user})
          .then((createdUser) => {
              res.status(200).json({message:"usuario creado :)"})
          })
          .catch((error) => {
              then(res.status(400).json({msg: error}))
          })
      }
  } catch (error) {
      res.status(500).json({error : error.message})
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
