
const express = require("express")
const cors = require("cors")


// require("./DB/config")
const app = express()
const port = 8000

// Middlewares
// will parse every json from req.body onto a JS object
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// guest Router 
const guestsRouter = require("./Routers/guestsRouter_POST_ONLY")
app.use("/guests", guestsRouter)

// //host Router
// const hostsRouter = require("./Routers/hostsRouter")
// app.use("/hosts", hostsRouter)



// localhost:8000/
app.listen(port, () => {
    console.log("Server is running on port " + port);
})
