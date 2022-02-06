const pool = require('../db')

// configuracion de controladores 

const getAllReclamos = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM Reclamos")
        //console.log(result)
        if (result.rows.length > 0) {
            return res.status(200).json(result.rows)
        } else {
            return res.status(404).json( {message : "Reclamos no encontrados "} )
        }
    } catch (error) {
        next(error) 
    }
}

const getReclamosByRadicadoId = async (req, res, next) => {
    const{ radicadoId } = req.params
    try {
        const result = await pool.query("SELECT * FROM Reclamos WHERE id_radicado = ($1)",[radicadoId])
        if (result.rows.length > 0) {
            return res.status(200).json(result.rows)
        } else {
            return res.status(404).json( {message : "Reclamo no encontrado "} )
        }
    } catch (error) {
        next(error)
    }
}

const createReclamo = async (req, res, next) => {
    const reclamo = req.body
    const auxDate = new Date().toISOString()
    try {
        const result = await pool.query("INSERT INTO public.Reclamos(id_radicado, reclamo, fecha_creacion) VALUES ( $1, $2, $3) RETURNING* ",[reclamo.id_radicado, reclamo.reclamo, auxDate])
        if (result.rows.length > 0) {
            return res.status(201).json(result.rows[0])
        } else {
            return res.status(404).json( {message : "Reclamo no encontrado "} )
        }
    } catch (error) {
        next(error)
    }

}

const updateReclamo = async (req, res, next) => {
    const { id } = req.params
    const { tipo, reclamo } = req.body
    const auxDate = new Date().toISOString()
    try {
        const result = await pool.query("UPDATE Reclamos SET tipo = ($1), fecha_modificacion = ($2) , reclamo = ($3) WHERE id_Reclamo = ($4) RETURNING* ",[ tipo, auxDate, reclamo, id])
        if (result.rows.length > 0) {
            return res.status(200).json(result.rows[0])
        } else {
            return res.status(404).json( {message : "Reclamo no encontrado "} )
        }
    } catch (error) {
        next(error) 
    }
}

module.exports = { getAllReclamos, getReclamosByRadicadoId, createReclamo, updateReclamo }