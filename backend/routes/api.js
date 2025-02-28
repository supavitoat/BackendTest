const express = require('express');
const rateLimit = require('express-rate-limit');


const apiLimiter = rateLimit({
    windowMs: 1000*60*3,
    max: 100,
    message: "Too many requests from this IP, please try again after 3 minutes"
});

const router = express.Router();
const customerData = require('../controllers/data');

router.post('/users', apiLimiter, customerData.createUser);
router.put('/users/:id', apiLimiter, customerData.updateUser);
router.delete('/users/:id', apiLimiter, customerData.deleteUser);
router.get('/users', apiLimiter, customerData.getUsers);
router.get('/users/:id', apiLimiter, customerData.getUserByID);

module.exports = router;
