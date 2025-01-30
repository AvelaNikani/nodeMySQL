import mysql from "mysql2/promise"; // Import MySQL library with promise support
import express from "express"; // Import Express framework
import { config } from "dotenv"; // Import dotenv for environment variables
config(); // Load environment variables from .env file

// Create a MySQL connection pool
const pool = mysql.createPool({
    hostname: process.env.HOSTNAME, // Database hostname from environment variable
    user: process.env.USER, // Database username from environment variable
    password: process.env.PASSWORD, // Database password from environment variable
    database: process.env.DATABASE // Database name from environment variable
});

const PORT = process.env.PORT || 3003; // Set the server port, defaulting to 3003 if not provided
const app = express(); // Initialize Express app
app.use(express.json()); // Middleware to parse JSON request bodies

// Route to get all products (2a)
app.get('/products', async (req, res) => {
    res.json({
        products: await getProducts()
    });
});

// Route to get a single product by product_code (2b)
app.get('/products/:product_code', async (req, res) => {
    res.json({
        products: await getSingleProduct(req.params.product_code)
    });
});

// Route to add a new product (2c)
app.post('/products', async (req, res) => {
    let { product_code, product_name, product_price, product_quantity } = req.body; // Extract data from request body
    res.json({
        products: await insertNewProduct(product_code, product_name, product_price, product_quantity)
    });
});

// Route to delete a product by product_code (2d)
app.delete('/products/:product_code', async (req, res) => {
    res.json({
        products: await removeProduct(req.params.product_code)
    });
});

// Route to update a product by product_code (2e)
app.patch('/products/:product_code', async (req, res) => {
    let { product_name } = req.body; // Extract updated product name from request body
    res.json({
        products: await updateProducts(product_name, req.params.product_code)
    });
});

// Route to get all users (3f)
app.get('/users', async (req, res) => {
    res.json({
        users: await getUsers()
    });
});

// Route to get a single user by ID (3g)
app.get('/users/:id', async (req, res) => {
    res.json({
        users: await getSingleUser(req.params.id)
    });
});

// Route to add a new user (3h)
app.post('/users', async (req, res) => {
    let { id, email, first_name, last_name, password } = req.body; // Extract data from request body
    res.json({
        users: await insertNewUser(id, email, first_name, last_name, password)
    });
});

// Route to delete a user by ID (3i)
app.delete('/users/:id', async (req, res) => {
    res.json({
        users: await removeUser(req.params.id)
    });
});

// Start the server
app.listen(PORT, () => {
    console.log('http://localhost:'+PORT);
});

// Function to retrieve all products from the database
const getProducts = async () => {
    let [data] = await pool.query('SELECT * FROM products');
    return data;
};

// Function to retrieve a single product by product_code
const getSingleProduct = async (product_code) => {
    let [data] = await pool.query('SELECT * FROM products WHERE product_code = ?', [product_code]);
    return data;
};

// Function to insert a new product into the database
const insertNewProduct = async (product_code, product_name, product_price, product_quantity) => {
    await pool.query('INSERT INTO products (product_code, product_name, product_price, product_quantity) VALUES (?, ?, ?, ?)', [product_code, product_name, product_price, product_quantity]);
    return await getProducts(); // Return updated list of products
};

// Function to remove a product from the database
const removeProduct = async (product_code) => {
    await pool.query('DELETE FROM products WHERE product_code = ?', [product_code]);
    return await getProducts(); // Return updated list of products
};

// Function to update a product's name in the database
const updateProducts = async (product_name, product_code) => {
    await pool.query('UPDATE products SET product_name = ? WHERE product_code = ?', [product_name, product_code]);
    return await getProducts(); // Return updated list of products
};

// Function to retrieve all users from the database
const getUsers = async () => {
    let [data] = await pool.query('SELECT * FROM users');
    return data;
};

// Function to retrieve a single user by ID
const getSingleUser = async (id) => {
    let [data] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return data;
};

// Function to insert a new user into the database
const insertNewUser = async (id, email, first_name, last_name, password) => {
    await pool.query('INSERT INTO users (id, email, first_name, last_name, password) VALUES (?, ?, ?, ?, ?)', [id, email, first_name, last_name, password]);
    return await getUsers(); // Return updated list of users
};

// Function to remove a user from the database
const removeUser = async (id) => {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return getUsers(); // Return updated list of users
};
