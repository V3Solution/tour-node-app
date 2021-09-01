const express = require('express');
const {
    Tour,
    validateTour
} = require('../Models/tourModel');


const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // Filtering
        const queryObj = {...req.query}
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach(el => delete queryObj[el])
        //Advance Filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        console.log(JSON.parse(queryStr))
        const query = await Tour.find(JSON.parse(queryStr));

        // Sorting
        // if (req.query.sort) {
        //     const sortBy = req.query.sort.split(',').join('');
        //     console.log(sortBy)
        //     query = query.sort(req.query.sort)
        //     query= query.sort(sortBy);
        // }

        //Limiting


        const result = await query;
        res.status(200).json({
            status: "success",
            totalLenght: result.length,
            result

        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
});
router.post('/', async (req, res) => {
    try {
        const {
            error
        } = validateTour(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const tourData = new Tour({
            name: req.body.name,
            duration: req.body.duration,
            maxGroupSize: req.body.maxGroupSize,
            difficulty: req.body.difficulty,
            ratingAverage: req.body.ratingAverage,
            ratingQuantity: req.body.ratingQuantity,
            price: req.body.price,
            priceDiscount: req.body.priceDiscount,
            summery: req.body.summery,
            description: req.body.description,
            imageCover: req.body.imageCover,
            imagesTag: req.body.imagesTag,
            startDates: req.body.startDates
        });
        await tourData.save()
        res.status(201).json({
            status: "Success",
            data: {
                tour: tourData
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        console.log(req.query)
        const result = await Tour.findById(req.params.id)
        if (!result) res.status(404).send('Object Related That ID Not Found...')
        res.status(200).json({
            status: "success",
            totalLenght: result.length,
            dataa: {
                result
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const result = await Tour.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).send('Object Related That ID Not Found...');
        res.status(200).json({
            status: "success",
            data: {
                result
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const {
            error
        } = validateTour(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const result = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!result) return res.status(404).send('Object Related That ID Not Found...');

        res.status(200).json({
            status: 'scuccess',
            data: {
                result
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }

})

module.exports = router;