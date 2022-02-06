const pool = require('../db')

// configuracion de controladores 

const getAllRespuestas = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM respuestas_administrativa")
        //console.log(result)
        if (result.rows.length > 0) {
            return res.status(200).json(result.rows)
        } else {
            return res.status(404).json( {message : "Respuestas Administrativas no encontradas "} )
        }
    } catch (error) {
        next(error) 
    }
}

const getRespuestasByRadicadoId = async (req, res, next) => {
    const{ radicadoId } = req.params
    try {
        const result = await pool.query("SELECT * FROM respuestas_administrativa WHERE id_radicado = ($1)",[radicadoId])
        if (result.rows.length > 0) {
            return res.status(200).json(result.rows)
        } else {
            return res.status(404).json( {message : "Reclamo no encontrado "} )
        }
    } catch (error) {
        next(error)
    }
}

module.exports = { getAllRespuestas,getRespuestasByRadicadoId }