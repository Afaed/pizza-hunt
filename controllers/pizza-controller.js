const { Pizza } = require ('../models');

const pizzaController = {
    //the functions will go in here as methods
    //get all pizzas
    //The first method, getAllPizza(), will serve as the callback function for the GET /api/pizzas route. Similar to 
    getAllPizza(req, res) {
        Pizza.find({})
        .populate({
            path: 'comments',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },
    //get pizza by id
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
        .populate({
            path: 'comments',
            select: '-__v'
        })
        .select('-__v')
        .then(dbPizzaData => {
            //of no pizza send 404
            if (!dbPizzaData) {
                res.status(404).json({ message: 'No pizza found with this id!' })
                return
            }
            res.json(dbPizzaData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json.err
        })
    },
    //createPizza
    createPizza ({ body }, res) {
        Pizza.create(body)
        .them(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(400).json(err));
    },
    //update pizza by id
    updatePizza({ params, body }, res) {
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new : true})
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: 'No pizza found with this id!'})
                return;
            }
            res.json(dbPizzaData)
        })
        .catch(err => res.status(400).json(err))
    },
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: 'no pizza found with this id!'})
                return;
            }
            res.json(dbPizzaData)
        })
        .catch( err => res.status(400).json(err))
    }
}

Pizza.find({})
.populate({
    path: 'comments',
    select: '-__v'
    //Note that we also used the select option inside of populate(), so that we can tell Mongoose that we don't care about the __v field on comments either. The minus sign - in front of the field indicates that we don't want it to be returned. If we didn't have it, it would mean that it would return only the __v field.
})
.select('__v')
.then(dbPizzaData => res.json(dbPizzaData))
module.exports = pizzaController;