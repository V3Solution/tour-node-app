const mongoose = require('mongoose');
const joi = require('joi');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A tour must have a name..."],
        unique: true,
        minlength: 3,
        trim: true
    },
    duration: {
        type: Number,
        required: [true, "Duration Must required"]
    },
    maxGroupSize: {
        type: Number,
        required: [true, "Enter Max Group Size"]
    },
    difficulty: {
        type: String,
        required: [true, "enter difficulty of your tour..."]
    },
    ratingAverage: {
        type: Number,
        required: [true, "enter average rating..."],
        default: 4.5
    },
    ratingQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, "A tour must have the price..."]
    },
    priceDiscount: Number,
    summery: {
        type: String,
        required: [true, "a tour must have description..."],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    // imageCover: {
    //     type: String,
    //     required: [true, "must have cover image..."]
    // },
    imagesTag: {
        type: [String]
    },
    createAtDate: {
        type: Date,
        default: Date.now()
    },
    startDates:{
    type:[Date]
}
})

const Tour = mongoose.model('Tour', tourSchema);

function validateTour(tour) {
    const schema = {
        name: joi.string().required().min(3).trim(true),
        duration: joi.number().required(),
        maxGroupSize: joi.number().required(),
        difficulty: joi.string().required(),
        ratingAverage: joi.number().default(4.5),
        ratingQuantity: joi.number().default(0),
        price: joi.number().required(),
        priceDiscount: joi.number(),
        summery: joi.string().required().trim(true),
        description: joi.string().trim(true),
        imageCover: joi.string().required(),
        imagesTag: joi.array(),
        startDates: joi.array()
    }
    return joi.validate(tour, schema);
}

exports.Tour = Tour;
exports.validateTour = validateTour;