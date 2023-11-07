const guestsModel = require("") //put the module selected


// GET - get all guests
const getAllGuests = async () => {
    try {
        // const allGuests = await ---> insert the correct query & model parameters
        return { status: true, all_guests: allGuests };
    } catch (error) {
        return { status: false, theError: error };
    }

}


// GET - get guest by exernal ID
const getGuestById = async (id) => {
    try {
        // const guest = await ---> insert the correct query & model parameters
        return { status: true, chosen_guest: guest };
    } catch (error) {
        return { status: false, theError: error };
    }

}


// POST - create a new guest doucument
const addGuest = async (guestObj) => {
    try {
        // const guest = ---> insert the correct query & model parameters
        // await ---> insert the correct query & model parameters for saving to database
        //const updtdGuestsList = await ---> insert the correct query & model parameters for update list
        return { status: true, guests_List: updtdGuestsList }
    } catch (error) {
        return { status: false, theError: error };
    }

}


// DELETE - delete guest
const removeGuest = async (id) => {
    try {

        //find and delete the guest:
        //const guestToRmove = await ---> insert the correct query & model parameters

        return { status: true, Deleted_guest: guestToRmove }  //return deleted guest

    } catch (error) {
        return { status: false, theError: error };
    }
}

module.exports = { getAllGuests, getGuestById, addGuest, removeGuest }

