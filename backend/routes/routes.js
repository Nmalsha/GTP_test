const express = require('express');
const dataController = require('../src/Controller/dataController')
const userController = require('../src/Controller/userController')
const router = express.Router();

// router.route('/user/signup').post(userController.signupUser);
router.route('/user/signup').post(userController.createUser);
// router.post('/user/signup', userController.createUser);
 router.route('/user/login').post(userController.loginUser);
 router.route('/user/getAllUsers').get(userController.getAllUsers);
router.route('/data/getAllDatas').get(dataController.getAllDatas);
router.route('/data/create').post(dataController.createData);
router.route('/data/edit').patch(dataController.updateData);
router.route('/data/delete/:id').delete(dataController.deleteData);

module.exports = router;