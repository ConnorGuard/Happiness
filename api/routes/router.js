//create router
const express = require('express');
const router = express.Router();

//get controllers
const RankingsController = require('../controller/rankings');
const CountriesController = require('../controller/countries');
const FactorsController = require('../controller/factors');
const UserController = require('../controller/user');

//jwt
const JWT = require('../jwt/ensureToken');

//ENDPOINTS

//home
router.get('/', (req, res)=>{
    res.sendStatus(200)
});

//data
router.get('/rankings', RankingsController.getRankings);

router.get('/countries', CountriesController.getCountries);

router.get('/factors/:year', JWT.ensureToken, FactorsController.getFactors);

//user
router.post('/user/register', UserController.Register);

router.post('/user/login', UserController.Login);

//profile
router.get('/user/:email/profile', JWT.ensureToken, UserController.getProfile);

router.put('/user/:email/profile',  JWT.ensureToken, UserController.updateProfile);

//Forbidden
router.get('/:NotFound', (req, res)=>{
  res.sendStatus(404)
});

module.exports = router;