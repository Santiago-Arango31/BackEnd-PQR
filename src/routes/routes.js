// Configuración  end point
const { Router } = require("express");
const pool = require('../db')
const router = Router()

// comprobar conexión a la base de datos
router.get('/', async (req,res) => {
    const result = await pool.query('SELECT NOW()')
    console.log(result)
    res.json('get task') 
})


module.exports = router
