import mongoose from 'mongoose';
import { Router } from 'express';
import FoodTruck from '../model/foodtruck';

export default ({ config, db }) => {
    let api = Router();

    // v1/foodtruck/add
    
    // POST method
    api.post('/add', (req, res) => {
        let newFoodTruck = new FoodTruck();
        newFoodTruck.name = req.body.name;

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

    // PUT method to update
    api.put('/:id', (req,res) => {
        FoodTruck.findById(req.params.id, (err, foodTruck) => {
            if(err){
                res.send(err);
            } else{
                foodTruck.name = req.body.name;
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

    return api;
}