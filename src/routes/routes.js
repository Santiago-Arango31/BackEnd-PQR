const { Router } = require("express");
const { getAllRadicados, getRadicadosByUserId, createRadicado, updateRadicado } = require("../controller/radicados.controller")
const { getAllReclamos, getReclamosByRadicadoId, createReclamo, updateReclamo } = require("../controller/reclamos.controller")
const router = Router()


/*
// comprobar conexión a la base de datos
router.get('/', async (req,res) => {
    const result = await pool.query('SELECT NOW()')
    console.log(result)
    res.json('Conexión exitosa') 
})
*/


// Configuración end point radicados de quejas y peticiones
router.get('/radicados', getAllRadicados)
router.get('/radicados/:userId', getRadicadosByUserId)
router.post('/radicados', createRadicado)
router.put('/radicados/:id', updateRadicado)


// Configuración end point de reclamos
router.get('/reclamos', getAllReclamos)
router.get('/Reclamos/:radicadoId', getReclamosByRadicadoId)
router.post('/Reclamos', createReclamo)
router.put('/Reclamos/:id', updateReclamo)


module.exports = router
