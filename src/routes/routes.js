const { Router } = require("express");
const { getAllRadicados, getRadicadosByUserId, createRadicado, updateRadicado } = require("../controller/radicados.controller")
const { getAllReclamos, getReclamosByRadicadoId, createReclamo, updateReclamo } = require("../controller/reclamos.controller")
const  { getAllRespuestas,getRespuestasByRadicadoId } = require("../controller/respuestaAdministrativa.controller")
const { getAllUsers } = require("../controller/usuarios.controller")
const router = Router()


/*
// comprobar conexión a la base de datos
router.get('/', async (req,res) => {
    const result = await pool.query('SELECT NOW()')
    console.log(result)
    res.json('Conexión exitosa') 
})
*/


// Configuración end points radicados de quejas y peticiones
router.get('/radicados', getAllRadicados)
router.get('/radicados/:userId', getRadicadosByUserId)
router.post('/radicados', createRadicado)
router.put('/radicados/:id', updateRadicado)


// Configuración end points de reclamos
router.get('/reclamos', getAllReclamos)
router.get('/reclamos/:radicadoId', getReclamosByRadicadoId)
router.post('/reclamos', createReclamo)
router.put('/reclamos/:id', updateReclamo)

// Configuración end point de usuario
router.get('/usuarios', getAllUsers)


// Configuración end points de reclamos
router.get('/respuesta', getAllRespuestas)
router.get('/respuesta/:radicadoId', getRespuestasByRadicadoId)

module.exports = router
