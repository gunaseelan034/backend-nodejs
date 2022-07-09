const express = require('express');
const router = express.Router();
const controller = require('../controller/user.contrl');

router.post('/sendotp', () => {});

router.post('/verifyotp', () => {});

router.post('/create', controller.createUser);

router.get('/get', controller.getUser);

router.get('/getbyid/:id', controller.getUserById);

router.put('/updatestatus', controller.updateapplicationStatus);


module.exports = router;