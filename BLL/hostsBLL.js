const hostsModel = require("") //put the module selected


// GET - get all hosts
const getAllHosts = async () => {
    try {
        // const allHosts = await ---> insert the correct query & model parameters
        return { status: true, all_Hosts: allHosts };
    } catch (error) {
       return { status: false, theError: error };
    }

}


// GET - get host by exernal ID
const getHostById = async (id) => {
    try {
        // const host = await ---> insert the correct query & model parameters
        return { status: true, chosen_Host: host };
    } catch (error) {
       return { status: false, theError: error };
    }

}


// POST - create a new host doucument
const addHost = async (hostObj) => {
    try {
        // const host = ---> insert the correct query & model parameters
        // await ---> insert the correct query & model parameters for saving to database
        //const updtdHostsList = await ---> insert the correct query & model parameters for update list
        return  { status: true, Hosts_List: updtdHostsList } 
    } catch (error) {
       return { status: false, theError: error };
    }

}



// DELETE - delete host
const removeHost = async (id) => {
    try {

 //find and delete the host:
        //const hostToRmove = await ---> insert the correct query & model parameters

        return { status: true, Deleted_Host: hostToRmove }  //return deleted host

    } catch (error) {
        return { status: false, theError: error };
    }
}

module.exports = { getAllHosts, getHostById, addHost, removeHost }

