import mongoose from 'mongoose';
import { Router } from 'express';
import Restaurant from '../model/restaurant';

export default ({ config, db }) => {
    let api = Router();

    // v1/restaurant/add
    
    // POST method
    api.post('/add', (req, res) => {
        let newRest = new Restaurant();
        newRest.name = req.body.name;

        newRest.save(err => {
            if(err){
                res.send(err);
            } else {
                res.json({ message: 'Restaurant saved successfully.' });
            }
        });
    });

    // v1/restaurant/

    // GET method
    api.get('/', (req,res) => {
        Restaurant.find({}, (err, restaurants) => {
            if(err){
                res.send(err);
            } else{
                res.json(restaurants);
            }
        });
    });

    // v1/restaurant/:id

    // GET method returning single object
    api.get('/:id', (req,res) => {
        Restaurant.findById(req.params.id, (err, restaurant) => {
            if(err){
                res.send(err);
            } else{
                res.json(restaurant);
            }
        });
    });

    // PUT method to update
    api.put('/:id', (req,res) => {
        Restaurant.findById(req.params.id, (err, restaurant) => {
            if(err){
                res.send(err);
            } else{
                restaurant.name = req.body.name;
                restaurant.save(err => {
                    if(err){
                        res.send(err);
                    } else{
                        res.json({ message: "Restaurant info udpated." });
                    }
                });
            }
        });
    });

    api.delete('/:id', (req,res) => {
        Restaurant.remove({
            _id: req.params.id
        }, (err, restaurant) => {
            if(err){
                res.send(err);
            } else {
                res.json({ message: "Restaurant successfully removed." });
            }
        });
    });

    return api;
}