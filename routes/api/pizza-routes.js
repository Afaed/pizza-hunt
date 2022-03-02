const router = require('express').Router();
const {
    getAllPizza,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza
} = require('../../controllers/pizza-controller');
const { update } = require('../../models/Pizza');
//set up and get all and post at /api/pizzas

router
.route('/')
.get(getAllPizza)
.post(createPizza);

//set up get one, put, and delete at /api/pizzas'/ :id
router
.route('/:id')
.get(getPizzaById)
.put(updatePizza)
.delete(deletePizza);

module.exports = router; 
