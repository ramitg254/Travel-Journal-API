const express =require('express')
const router =express.Router()

const {
    getAllDestinations,
    getDestination,
    addDestination,
    updateDestination,
    deleteDestination,
}=require('../controllers/Destinations')

router.route('/').post(addDestination).get(getAllDestinations)
router.route('/:id').get(getDestination).delete(deleteDestination).patch(updateDestination)

module.exports=router