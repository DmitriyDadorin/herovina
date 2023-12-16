import express from 'express';
import { Pool } from 'pg';

const app = express();
const port = 3001;

// Database connection configuration
const pool = new Pool({
  user: 'your_username',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

// Middleware for parsing JSON in the request body
app.use(express.json());

// Controller for creating an order
app.post('/createOrder', async (req, res) => {
  try {
    const { productName, quantity } = req.body;

    const result = await pool.query(
      'INSERT INTO orders (product_name, quantity) VALUES ($1, $2) RETURNING *',
      [productName, quantity]
    );

    const createdOrder = result.rows[0];

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Controller for getting the order list
app.get('/orderList', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders');
    const orderList = result.rows;

    res.json(orderList);
  } catch (error) {
    console.error('Error fetching order list:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
