const express = require('express');
const departBLL = require("../BLLs/departBLL")
const router = express.Router()

// localhost:8000/hosts

//GET - get all host
router.get("/", async (req, res) => {
    try {

    } catch (error) {

    }

})



// GET - get host by exernal ID & all its employees .
router.get("/:DepartId", async (req, res) => {
    try {
        const { DepartId } = req.params

        //validation --> good request?
        if (!DepartId) {
            return res.status(400).json("Bad request. Please try again")
        }
        const host = await departBLL.getDepartById(DepartId) //get the host
        const emps = await departBLL.getAllDprtsEmps(DepartId) //get all employees of the host

        //validation --> right details?
        if (!host) {
            return res.status(404).json("host not found")
        }
        if (emps.length <= 0) {
            return res.status(404).json("Employees not found")
        }

        //success
        const dprtAndemps = { host, emps }
        return res.status(200).json(dprtAndemps)

    } catch (error) {
        return res.status(500).json({ error })
    }

})



// POST - create a new host doucument
router.post("/", async (req, res) => {
    try {
        //validation  --> good body?
        if (!req.body) {
            return res.status(400).json("Please provide a valid data to the request")
        }

        const newDepart = req.body
        const allDeparts = await departBLL.getAllhosts()
        const isAdded = await departBLL.addhost(newDepart)


        //validation  --> host added? 
        if (isAdded.length <= allDeparts.length || allDeparts.length <= 0) {
            return res.status(404).json("FAILED to add depratment");
        }

        //success
        return res.status(201).json({ msg: "New host added!", isAdded })

    } catch (error) {
        return res.status(500).json({ error })
    }
})



// DELETE - remove host & employees association using external ID
router.delete("/:DepartId", async (req, res) => {
    try {
        //validation ---> bad request
        if (!req.params) {
            return res.status(400).json("Please provide a valid data to the request")
        }
        const { DepartId } = req.params

        const isDeleted = await departBLL.removehost(DepartId)

        //validation ---> deletion successful?
        if (isDeleted.status !== true) {
            return res.status(404).json({ error: "Deletion failed" })
        }
        
        //success
        return res.status(200).json(isDeleted);

    } catch (error) {
        return res.status(500).json({ error })
    }
})

module.exports = router