const pool = require('../db')

// configuracion de controladores 

const getAllRadicados = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM RadicadosPQ")
        //console.log(result)
        if (result.rows.length > 0) {
            return res.status(200).json(result.rows)
        } else {
            return res.status(404).json( {message : "Radicados no encontrados "} )
        }
    } catch (error) {
        next(error) 
    }
}

const getRadicadosByUserId = async (req, res, next) => {
    const{ userId } = req.params
    try {
        const result = await pool.query("SELECT * FROM RadicadosPQ WHERE id_usuario = ($1)",[userId])
        if (result.rows.length > 0) {
            return res.status(200).json(result.rows[0])
        } else {
            return res.status(404).json( {message : "Radicado no encontrado "} )
        }
    } catch (error) {
        next(error)
    }
}

const createRadicado = async (req, res, next) => {
    const radicado = req.body
    const auxDate = new Date().toISOString()
    try {
        const result = await pool.query("INSERT INTO public.RadicadosPQ(id_usuario, tipo, fecha_creacion, fecha_modificacion, contenido) VALUES ( $1, $2, $3, $4, $5) RETURNING* ",[radicado.id_usuario, radicado.tipo, auxDate, auxDate, radicado.contenido])
        if (result.rows.length > 0) {
            return res.status(201).json(result.rows[0])
        } else {
            return res.status(404).json( {message : "Radicado no encontrado "} )
        }
    } catch (error) {
        next(error)
    }

}

const updateRadicado = async (req, res, next) => {
    const { id } = req.params
    const { tipo, contenido } = req.body
    const auxDate = new Date().toISOString()
    try {
        const result = await pool.query("UPDATE RadicadosPQ SET tipo = ($1), fecha_modificacion = ($2) , contenido = ($3) WHERE id_radicado = ($4) RETURNING* ",[ tipo, auxDate, contenido, id])
        if (result.rows.length > 0) {
            return res.status(200).json(result.rows[0])
        } else {
            return res.status(404).json( {message : "Radicado no encontrado "} )
        }
    } catch (error) {
        next(error) 
    }
}

module.exports = { getAllRadicados, getRadicadosByUserId, createRadicado, updateRadicado }