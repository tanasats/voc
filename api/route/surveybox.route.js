const express = require('express');
const router = express.Router();
const { authJwt } = require("../middleware/auth");
const surveyboxController = require('../controller/surveybox.controller')

router.get('/',surveyboxController.getpage);
// router.post('/',surveyboxController.insert);
// router.put('/',surveyboxController.update);
// router.delete('/:id',surveyboxController.delete);


module.exports = router;