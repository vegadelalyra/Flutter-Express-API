const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Product = require('./product');

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

const productData = [];

// connect to mongoose
mongoose.set('strictQuery', true);
mongoose.connect(
  'mongodb+srv://lyradeperseo:123@cluster0.lp2o40n.mongodb.net/flutter?retryWrites=true&w=majority&appName=Cluster0'
);

// post api

app.post('/api/product', async (req, res) => {
  console.log('PRODUCT ADDED!', req.body);

  let data = Product(req.body);

  try {
    let dataToStore = await data.save();
    res.status(200).json(dataToStore);
  } catch (error) {
    res.status(400).json({
      status: error.message,
    });
  }

  // const pdata = {
  //   id: productData.length + 1,
  //   pname: req.body.pname,
  //   pprice: req.body.pprice,
  //   pdesc: req.body.pdesc,
  // };

  // productData.push(pdata);
  // console.log('Response!!', pdata);

  // res.status(200).send({
  //   status_code: 200,
  //   message: 'Product added successfully',
  //   product: pdata,
  // });
});

// get api

app.get('/api/product', async (req, res) => {
  console.log('GET - PRODUCTS');

  try {
    let data = await Product.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }

  // if (productData.length > 0) {
  //   res.status(200).send({
  //     status_code: 200,
  //     products: productData,
  //   });
  // } else {
  //   res.status(200).send({
  //     status_code: 200,
  //     products: [],
  //   });
  // }
});

app.get('/api/product/:id', async (req, res) => {
  console.log('GET - PRODUCTS');

  try {
    let data = await Product.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }

  // if (productData.length > 0) {
  //   res.status(200).send({
  //     status_code: 200,
  //     products: productData,
  //   });
  // } else {
  //   res.status(200).send({
  //     status_code: 200,
  //     products: [],
  //   });
  // }
});

// update api

app.patch('/api/product/:id', async (req, res) => {
  let id = req.params.id;
  let updatedData = req.body;
  let options = { new: true };

  try {
    const data = await Product.findByIdAndUpdate(id, updatedData, options);

    res.send(data);
  } catch (error) {
    res.send(error.message);
  }
  // let id = req.params.id * 1;
  // let productToUpdate = productData.find(p => p.id == id);
  // let index = productData.indexOf(productToUpdate);

  // productData[index] = req.body;

  // console.log('EDIT - PRODUCT', productToUpdate);

  // res.status(200).send({
  //   status: 'success',
  //   message: 'Product updated',
  // });
});

app.delete('/api/product/:id', async (req, res) => {
  let id = req.params.id;

  try {
    const data = await Product.findByIdAndDelete(id);
    res.json({ status: `Deleted the product ${data.pname} from database` });
  } catch (error) {
    res.json(error.message);
  }

  // let id = req.params.id * 1;
  // let productToUpdate = productData.find(p => p.id == id);
  // let index = productData.indexOf(productToUpdate);

  // console.log(id);

  // console.log('DELETE - PRODUCT', productToUpdate);
  // productData.splice(index, 1);

  // res.status(204).send({
  //   status: 'success',
  //   message: 'Product deleted',
  // });
});

app.listen(2000, () => {
  console.log('Connected to server at port 2000');
});

mongoose.connection.on('connected', () => console.log('Connected to MongoDB!'));
