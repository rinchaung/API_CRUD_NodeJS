const News = require('../models/News');

// Getting all news
const getAll = async (req, res) => {
    try {
        const news = await News.find({});
        res.json(news); 
    }catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Getting one news
const getById = async (req, res) => {
    res.json(res.news);
}

// Creating one news
const createByNews = async (req, res) => {
    const data = req.body;

    const news = new News({
        author: data.author,
        title: data.title,
        content: data.content
    })

    try {
        const savedNews = await news.save();
        res.status(201).json(savedNews);
    }catch (err) {
        res.status(400).json({ message: err.message });
    }

}

// Updating one news
const updateByNews = async (req, res) => {
    if(req.body.author != null && req.body.author != null && req.body.author){
        res.news.author = req.body.author;
        res.news.title = req.body.title;
        res.news.content = req.body.content;
    }
    
    try {
        // Save datas from user
        await res.news.save();
        // And Update news object
        const updateNews = await News.findByIdAndUpdate(req.params.id);
        res.json(updateNews);
    }catch (err) {
        res.status(400).json({ message: `Please fill all fields ${err.message}` });
    }  
}

// Deleting one news
const deleteByNews = async (req, res) => {
    try {
        await News.findByIdAndDelete(req.params.id);
        res.json({ message: 'News deleted successfully' });
    }catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getById,
    createByNews,
    updateByNews,
    deleteByNews
}