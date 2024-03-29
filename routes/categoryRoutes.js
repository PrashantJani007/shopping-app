const router = require('express').Router();
const {createCategory,getCategories} = require('../controllers/categoryController');
router.post('/category',createCategory);
router.get('/categories',getCategories);
module.exports = router;