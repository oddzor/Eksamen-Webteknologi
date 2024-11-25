const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes'); 
const adminRoutes = require('./src/routes/adminRoutes'); 
const productRoutes = require('./src/routes/productsRoutes'); 
const orderRoutes = require('./src/routes/ordersRoutes'); 

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/api', authRoutes); 
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes); 
app.use('/api/orders', orderRoutes); 

app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(`Registered route: ${middleware.route.path}`);
  }
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running!' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;