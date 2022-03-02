const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')
const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: [],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],//need to tell monggose to expect an objectid and tell its data is coming from the comment model
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

const Pizza = model('Pizza', PizzaSchema);
PizzaSchema.virtual('commentCount').get(function () {
    return this.comments.length;
})
//export the Pizza Model
module.exports = Pizza; 