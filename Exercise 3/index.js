import mysql from 'mysql2/promise'
import {config} from 'dotenv'
config()

const pool = mysql.createPool({
    hostname:process.env.HOSTNAME,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})

const getUsers = async()=>{
    let [data] = await pool.query('SELECT * FROM users')
    return data
}
// console.log(await getUsers());

const getProducts = async()=>{
    let [data] = await pool.query('SELECT * FROM products')
    return data
}
// console.log(await getProducts());

const removeProducts = async(product_code)=>{
    let [data] = await pool.query('DELETE FROM products WHERE product_code = ?', [product_code])
    return data
}
// console.log(await removeProducts('baro1'));

const insertFood = async(product_code, product_name, product_price, product_quantity)=> {
    let [data] = await pool.query('INSERT into products (product_code, product_name, product_price, product_quantity) VALUES (?,?,?,?)',[product_code, product_name, product_price, product_quantity])
    return data    
}
// console.log(await insertFood('burg1', 'Burger King', '129.99', 2));

const updateProducts = async(product_name, product_code)=> {
    let [data] = await pool.query('UPDATE products SET product_name = ? WHERE product_code = ?',[product_name,product_code])
    return data
}
// console.log(await updateProducts('Omo', 'sunl1'));
