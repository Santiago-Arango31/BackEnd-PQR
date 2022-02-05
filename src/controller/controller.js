const pool = require('../db')

// configuracion de controladores 

const getAllTasks = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM tasks")
        //console.log(result)
        if (result.rows.length > 0) {
            return res.status(200).json(result.rows)
        } else {
            return res.status(404).json( {message : "Tareas no encontradas "} )
        }
    } catch (error) {
        next(error) 
    }
}

const getTask = async (req, res, next) => {
    const taskId = req.params.id
    try {
        const result = await pool.query("SELECT * FROM tasks WHERE id = ($1)",[taskId])
        if (result.rows.length > 0) {
            return res.status(200).json(result.rows[0])
        } else {
            return res.status(404).json( {message : "Tarea no encontrada "} )
        }
    } catch (error) {
        next(error)
    }
}

const createTask = async (req, res, next) => {
    const task = req.body
    try {
        const result = await pool.query("INSERT INTO tasks (title, description) VALUES ($1,$2) RETURNING* ",[task.title, task.description])
        if (result.rows.length > 0) {
            return res.status(201).json(result.rows[0])
        } else {
            return res.status(404).json( {message : "Tarea no encontrada "} )
        }
    } catch (error) {
        next(error)
    }

}

const deleteTask = async (req, res, next) => {
    const taskId = req.params.id
    try {
        // const result = await pool.query("DELETE FROM tasks WHERE id = ($1) RETURNING*",[taskId])
        const result = await pool.query("DELETE FROM tasks WHERE id = ($1)",[taskId])
        if (result.rowCount > 0) {
            return res.sendStatus(204)
        } else {
            return res.status(404).json( {message : "Tarea no encontrada "} )
        }
    } catch (error) {
        next(error) 
    }
}

const updateTask = async (req, res, next) => {
    const { id } = req.params
    const { title, description } = req.body
    try {
        const result = await pool.query("UPDATE tasks SET title = ($1), description = ($2) WHERE id = ($3) RETURNING*",[ title, description, id])
        if (result.rows.length > 0) {
            return res.status(200).json(result.rows[0])
        } else {
            return res.status(404).json( {message : "Tarea no encontrada "} )
        }
    } catch (error) {
        next(error) 
    }
}

module.exports = { getAllTasks, getTask, createTask, deleteTask, updateTask }