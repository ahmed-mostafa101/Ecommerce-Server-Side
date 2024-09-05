const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const productsRoutes = require('./routes/productsRoutes');

const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use('/user', userRoutes);
app.use('/user/cart', cartRoutes);
app.use('/products', productsRoutes);
app.use('/user/orders', ordersRoutes);


mongoose.connect(`mongodb+srv://am369707369:%23aHmed%2A369%2A%23@cluster0.7tyc6.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => {
    console.log('Connected to db successfully...');
    app.listen(3000, () => {
      console.log('I am listening on port 3000...');
    });
  })
  .catch((error) => {
    console.log('Error happened in db...', error);
  })
