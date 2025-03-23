const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    title: String,
    description1: String,
    description2: String,
    price: Number,
    deliveryFee: String,
    imageURL: String,
    offerBanner: String,
    rating: Number,
    category: String
});

const TestModel = mongoose.model("products", TestSchema);

module.exports = TestModel;