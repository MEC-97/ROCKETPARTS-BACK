const {ManagementClient} = require ("auth0")
const { User } = require('../db.js');

const auth00 = new ManagementClient({
  domain: "dev-jzsyp78gzn6fdoo4.us.auth0.com",
  clientId: "bZrOYlhECm7soRu6DG6b8Dqf2pOecaoZ",
  clientSecret: "P_8ofgCKtq5v3vIXPfYd2v0Ado7lt5fQhC6egfI83hVQXm7_4aOGp-bIvjZaDgGo",
  scope: "read:users"
})

getAllUsers = async () => {
  try {
    return await auth00
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
};


//prueba para obtener por sub
const obtenerUserPorSub = async (req, res) => {
  const sub = req.user.sub;
  try {
    const user = await User.findOne({ where: { sub }});
    if (user){
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error){
    res.status(500).json({ message: error.message });
  }
};

//

const obtenerUserPorId = async (req, res) => {
  const id = req.params.id;
  try{
      const user = await User.findByPk(id);
      if (user) {
          res.json(user);
      } 
      else{
          res.status(404).json({error: "User not found"})
      }
  }catch(error){
      res.status(500).json({ message: error.message });
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

    console.log("User creado")
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error al crear un nuevo usuario:', error);
    res.status(500).json({ error: 'Error al crear un nuevo usuario' });
  }
}

async function actualizarUser(req, res) {
  const {id} = req.params;
  const { email, nombre, nickname, direccion, telefono, fechaNacimiento } = req.body
  const updates = req.body;
  try{
    const user = await User.findByIdAndUpdate(id, updates, {new: true});
    if(!user){
      return res.status(404).json({ message: "User no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ nessage: "Error al actualizar el User", error: error.message});
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

  module.exports = { getUsers, getUsersAuth0, obtenerUserPorId, obtenerUserPorSub, crearUser, actualizarUser};
