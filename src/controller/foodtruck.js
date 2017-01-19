import mongoose from 'mongoose';
import { Router } from 'express';
import FoodTruck from '../model/foodtruck';
import Review from '../model/review';

export default ({ config, db }) => {
    let api = Router();

    // v1/foodtruck/add
    
    // POST method
    api.post('/add', (req, res) => {
        let newFoodTruck = new FoodTruck();
        newFoodTruck.name = req.body.name;
        newFoodTruck.foodType = req.body.foodType;
        newFoodTruck.avgcost = req.body.avgcost;
        newFoodTruck.geometry.coordinates = req.body.geometry.coordinates;

        newFoodTruck.save(err => {
            if(err){
                res.send(err);
            } else {
                res.json({ message: 'Food Truck saved successfully.' });
            }
        });
    });

    // v1/foodtruck/

    // GET method
    api.get('/', (req,res) => {
        FoodTruck.find({}, (err, foodTrucks) => {
            if(err){
                res.send(err);
            } else{
                res.json(foodTrucks);
            }
        });
    });

    // v1/foodtruck/:id

    // GET method returning single object
    api.get('/:id', (req,res) => {
        FoodTruck.findById(req.params.id, (err, foodTruck) => {
            if(err){
                res.send(err);
            } else{
                res.json(foodTruck);
            }
        });
    });

    // GET method for returning food types
    api.get('/foodtype/:foodtype', (req,res) => {
        FoodTruck.find({ foodType: req.params.foodtype }, (err, foodTrucks) => {
            if(err){
                res.send(err);
            } else{
                res.json(foodTrucks);
            }
        });
    });

    // PUT method to update
    api.put('/:id', (req,res) => {
        FoodTruck.findById(req.params.id, (err, foodTruck) => {
            if(err){
                res.send(err);
            } else{
                foodTruck.name = req.body.name;
                foodTruck.foodType = req.body.foodType;
                foodTruck.avgcost = req.body.avgcost;
                foodTruck.geometry.coordinates = req.body.geometry.coordinates;

                foodTruck.save(err => {
                    if(err){
                        res.send(err);
                    } else{
                        res.json({ message: "Food truck info udpated." });
                    }
                });
            }
        });
    });

    api.delete('/:id', (req,res) => {
        FoodTruck.remove({
            _id: req.params.id
        }, (err, foodtruck) => {
            if(err){
                res.send(err);
            } else {
                res.json({ message: "Food Truck successfully removed." });
            }
        });
    });

    // add review for a specific food truck id
    
    // v1/foodtruck/reviews/add:id
    api.post('/reviews/add/:id', (req,res) => {  
        FoodTruck.findById(req.params.id, (err, foodTruck) => {
            if(err){
                res.send(err);
            } else{
                let newReview = new Review();

                newReview.title = req.body.title;
                newReview.text = req.body.text;
                newReview.foodTruck = foodTruck._id;
                newReview.save((err, review) => {
                    if(err){
                        res.send(err);
                    } else{
                        foodTruck.reviews.push(newReview);
                        foodTruck.save(err => {
                            if(err) {
                                res.send(err);
                            } else{
                                res.json({ message: 'Food truck review saved' });
                            }
                        });
                    }
                });
            }
        });
    });

    // get reviews for a specific food truck id

    // v1/foodtruck/reviews/:id
    api.get('/reviews/:id', (req, res) => {
        Review.find( { foodTruck: req.params.id }, (err, reviews) => {
            if(err){
                res.send(err);
            } else{
                res.json(reviews);
            }
        }); 
    });

    return api;
}