const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TestModel = require('./models/Test');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/addProduct', (req, res) => {
    TestModel.create(req.body)
        .then(product => res.json(product))
        .catch(er => res.json(er))
});

app.get('/products', async (req, res) => {
    try {
        const products = await TestModel.find({}).sort({_id: -1});
        res.json(products);
    } catch (er) {
        res.status(500).json({ message: er?.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is ruuning 5000");
});
