const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db');

const ProductsController = require('./controllers/productsController');
const customersController = require('./controllers/customersController');
const purchasesController = require('./controllers/purchasesController');
const authController = require('./controllers/authController');
const { checkToken } = require('./services/authService');

const app = express();
const PORT = 3000;

connectDB();

/* Middleware */

// Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming request bodies
app.use(express.json());

// Middleware to check token for routes other than auth
app.use((req, res, next) => {
    if (req.path.startsWith('/auth')) {
        // Skip token check for auth routes
        next();
    } else {
      console.log(req.headers);
        const token = req.headers['authorization'];
        console.log(token)
        if (!token) {
            return res.status(401).json({ error: 'Access denied. No access token provided.' });
        } else {
            checkToken(token)
                .then(() => {
                    // Token is valid, proceed to the next middleware/route handler
                    next();
                })
                .catch((error) => {
                    return res.status(401).json({ error: error.message });
                });
        }
    }
});

/* Routes */

app.use('/auth', authController);
app.use('/products', ProductsController);
app.use('/purchases', purchasesController);
app.use('/customers', customersController);

app.listen(PORT, () => {
    console.log(`app is listening at http://127.0.0.1:${PORT}`);
});
