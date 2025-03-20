const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TestModel = require('./models/Test');

const app = express();
app.use(express.json());
app.use(cors());

// mongoose.connect('mongodb://127.0.0.1:27017/test_db');
mongoose.connect('mongodb+srv://vmservices:zFUmjTuBOnUnzjA4@cluster1.o76gc.mongodb.net/test_db');

app.post('/addProduct', (req, res) => {
    TestModel.create(req.body)
        .then(product => res.json(product))
        .catch(er => res.json(er))
});

app.get('/products', async (req, res) => {
    try {
        const products = await TestModel.find({});
        res.json(products);
    } catch (er) {
        res.status(500).json({ message: er?.message });
    }
});

app.listen(5000, () => {
    console.log("Server is ruuning 5000");
});