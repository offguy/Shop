const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db')

// const masterRouter = require('./controllers/masterRouter');
const ProductsController = require('./controllers/productsController');
const customersController = require('./controllers/customersController');
const purchasesController = require('./controllers/purchasesController');

const app = express();
const PORT = 3000;

connectDB()
/* Middlewares */

// Cross-Origin Resource Sharing (CORS) is a mechanism that gives permission for one origin (domain) to access another origin
app.use(cors());

// Parse incoming request bodies in a middleware before the handlers, available under the 'req.body' property
app.use(express.json());
app.use('/products',ProductsController );
app.use('/purchases',purchasesController );
app.use('/customers',customersController );


app.listen(PORT, () => {
  console.log(`app is listening at http://127.0.0.1:${PORT}`);
});
