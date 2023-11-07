const express = require('express');
const departBLL = require("../BLLs/departBLL")
const router = express.Router()

// localhost:8000/guests

//GET - get all guest
router.get("/", async (req, res) => {
    try {
        const employees = await empsBLL.getAllGuests()
        res.status(200).json(employees)

    } catch (error) {
        res.status(500).json({ error })
    }

})



// GET - get guest by exernal ID & all its employees .
router.get("/:DepartId", async (req, res) => {
    try {
        const { DepartId } = req.params

        //validation --> good request?
        if (!DepartId) {
            return res.status(400).json("Bad request. Please try again")
        }
        const guest = await departBLL.getDepartById(DepartId) //get the guest
        const emps = await departBLL.getAllDprtsEmps(DepartId) //get all employees of the guest

        //validation --> right details?
        if (!guest) {
            return res.status(404).json("guest not found")
        }
        if (emps.length <= 0) {
            return res.status(404).json("Employees not found")
        }

        //success
        const dprtAndemps = { guest, emps }
        return res.status(200).json(dprtAndemps)

    } catch (error) {
        return res.status(500).json({ error })
    }

})



// POST - create a new guest doucument
router.post("/", async (req, res) => {
    try {
        //validation  --> good body?
        if (!req.body) {
            return res.status(400).json("Please provide a valid data to the request")
        }

        const newDepart = req.body
        const allDeparts = await departBLL.getAllguests()
        const isAdded = await departBLL.addguest(newDepart)


        //validation  --> guest added? 
        if (isAdded.length <= allDeparts.length || allDeparts.length <= 0) {
            return res.status(404).json("FAILED to add depratment");
        }

        //success
        return res.status(201).json({ msg: "New guest added!", isAdded })

    } catch (error) {
        return res.status(500).json({ error })
    }
})



// DELETE - remove guest & employees association using external ID
router.delete("/:DepartId", async (req, res) => {
    try {
        //validation ---> bad request
        if (!req.params) {
            return res.status(400).json("Please provide a valid data to the request")
        }
        const { DepartId } = req.params

        const isDeleted = await departBLL.removeguest(DepartId)

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