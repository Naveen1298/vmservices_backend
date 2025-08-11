const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TestModel = require('./models/Test');
const UserModel = require('./models/User');
const ContactModel = require('./models/Contact');

const app = express();
app.use(express.json());
app.use(cors());

// mongoose.connect('mongodb://127.0.0.1:27017/test_db');
// mongoose.connect('mongodb+srv://vmservices:zFUmjTuBOnUnzjA4@cluster1.o76gc.mongodb.net/test_db');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/addProduct', (req, res) => {
    TestModel.create(req.body)
        .then(product => res.json(product))
        .catch(er => res.json(er))
});

app.post('/contact', (req, res) => {
    ContactModel.create(req.body)
        .then(contact => res.json(contact))
        .catch(er => res.json(er))
});

app.get('/products', async (req, res) => {
    try {
        const products = await TestModel.find({});
        // const products = await TestModel.find({}).sort({_id: -1});
        res.json(products);
    } catch (er) {
        res.status(500).json({ message: er?.message });
    }
});

app.get('/feedbacks', async (req,res) => {
    try {
        const feedBackList = await ContactModel.find({});
        res.json(feedBackList);
    } catch (er) {
        res.status(500).json({ message: err?.message });
    }
});

app.get('/products/:productName', async (req, res) => {
    try {
        const { productName } = req.params;

        const product = await TestModel.findOne({ title: productName });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (er) {
        res.status(500).json({ message: er?.message });
    }
});

app.put('/updateProduct/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedProduct = await TestModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }   // Return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (er) {
        res.status(500).json({ message: er?.message });
    }
});

app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await TestModel.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the item' });
  }
});


// app.post('/signin', (req, res) => {
//     UserModel.create(req.body)
//         .then(product => res.json(product))
//         .catch(er => res.json(er))
// });

app.post('/signin', async (req, res) => {
    try {
        const { user_email, password } = req?.body;
        if (!user_email || !password) {
            return res.status(400).json({ message: 'Email and Password are required' });
        }
        const user = await UserModel.findOne({ user_email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid Email' });
        }
        const bytes = CryptoJS.AES.decrypt(password, process.env.REACT_APP_SECRET_KEY);
        const passwordCheck = bytes?.toString(CryptoJS.enc.Utf8);
        if (user?.password !== passwordCheck) {
            return res.status(401).json({ message: 'Invalid Password' });
        }

        res.status(200).json({ message: 'Sign-in successful', user: user?.user_email });
    } catch (er) {
        res.status(500).json({ message: 'Error during sign-in', er });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is ruuning 5000");
});