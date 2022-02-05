const pool = require('../db')

// configuracion de controladores 

const getAllUsers = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM usuarios")
        //console.log(result)
        if (result.rows.length > 0) {
            return res.status(200).json(result.rows)
        } else {
            return res.status(404).json( {message : "Usuarios no encontrados "} )
        }
    } catch (error) {
        next(error) 
    }
}

module.exports = { getAllUsers }