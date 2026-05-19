const { ObjectId } = require('mongodb');
const { obtenerDB } = require('../config/db');

const obtenerTodosLosUsuarios = async (req, res) => {
    try {
        const db = obtenerDB();
        const usuarios = await db.collection('users').find({}, { projection: { password: 0 } }).toArray();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la lista de usuarios" });
    }
};

const actualizarRolUsuario = async (req, res) => {
    try {
        const db = obtenerDB();
        const id = req.params.id;
        const { role } = req.body; // Solo dejaremos que el admin cambie el rol

        const resultado = await db.collection("users").updateOne(
            { _id: new ObjectId(id) },
            { $set: { role: role } }
        );
        if (resultado.matchedCount === 0) return res.status(404).json({ error: "Usuario no encontrado" });
        res.json({ mensaje: "Rol actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar usuario" });
    }
};

const borrarUsuario = async (req, res) => {
    try {
        const db = obtenerDB();
        const id = req.params.id;
        const resultado = await db.collection("users").deleteOne({ _id: new ObjectId(id) });
        if (resultado.deletedCount === 0) return res.status(404).json({ error: "Usuario no encontrado" });
        res.json({ mensaje: "Usuario eliminado" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar usuario" });
    }
};

module.exports = { obtenerTodosLosUsuarios, actualizarRolUsuario, borrarUsuario };