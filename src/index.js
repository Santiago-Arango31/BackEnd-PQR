const express = require("express");
const morgan = require("morgan");
const routes = require("./routes/routes")
const cors = require("cors");


const app = express()
const PORT = 4000
const corsOptions = {
  origin: "http://localhost:8081"
};

// middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors(corsOptions));


// end-points
app.use(routes)
app.use((err, req, res, next) => {
    return res.status(500).json( {error : err.message } )
})

app.listen(PORT)
console.log('server on port', PORT)