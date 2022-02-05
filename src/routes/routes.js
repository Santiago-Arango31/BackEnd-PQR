// Configuración  end point
const { Router } = require("express");
const router = Router()


// comprobar conexión a la base de datos
router.get('/task', async (req,res) => {
    const result = await pool.query('SELECT NOW()')
    console.log(result)
    res.json('get task') 
})


// router.get('/task', getAllTasks)

// router.get('/task/:id', getTask)

// router.post('/task', createTask)

// router.delete('/task/:id', deleteTask)

// router.put('/task/:id', updateTask)

module.exports = router
