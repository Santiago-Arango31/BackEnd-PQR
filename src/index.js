const express = require("express");
const routes = require("./routes/routes")


const app = express()
const PORT = 4000

// end-points
app.use(routes)

app.listen(PORT)
console.log('server on port', PORT)