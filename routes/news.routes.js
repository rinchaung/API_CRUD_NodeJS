const express = require('express');
const router = express.Router();
const News = require('../models/News');
const newsController = require('../controllers/newsController');

// Middleware
async function newsMiddleware(req, res, next) {
    let news;
    try{
        news = await News.findById(req.params.id);
        if(news == null){
            return res.status(404).json({ message: 'News not found' });
        }
    }catch(err){
        return res.status(500).json({ message: err.message });
    }

    res.news = news;
    next();
}

// Routes
router.get('/', newsController.getAll);
router.get('/:id', newsMiddleware, newsController.getById); // Get news by id
router.post('/create_news', newsController.createByNews); // Create news
router.patch('/update_news/:id', newsMiddleware, newsController.updateByNews);// Update news
router.delete('/delete_news/:id', newsMiddleware, newsController.deleteByNews);// Delete news


module.exports = router;

