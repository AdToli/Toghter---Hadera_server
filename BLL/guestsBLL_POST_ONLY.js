const guestsModel = require("") //put the module selected


// POST - create a new guest doucument
const addGuest = async (guestObj) => {
    try {
        // const guest = await ---> insert the correct query & model parameters
        //const updtdGuestsList = await ---> insert the correct query & model parameters for update list
        return  { status: true, guests_List: updtdGuestsList } 
    } catch (error) {
       return { status: false, theError: error };
    }

}

module.exports = { addGuest  }

