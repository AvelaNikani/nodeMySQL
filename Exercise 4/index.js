import mysql from 'mysql2/promise'
import express from 'express'
import {config} from 'dotenv'
config()

const PORT = process.env.PORT || 3002

const pool = mysql.createPool({
    hostname:process.env.HOSTNAME,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})

//a. Create a function that returns all the users.
const getemployees = async ()=> {
    let [data] = await pool.query('SELECT * FROM employees')
    return data
}
// console.log(await getemployees());
//create a function that get 1 employee
const get1employee = async (employee_id)=> {
    let [data] = await pool.query('SELECT * FROM employees WHERE employee_id= ?',[employee_id])
    return data
}
//console.log( await get1employee(2));
//Create a function/ query that adds a new employee and then returns all the
//employees so you can see if the data was added.
const insertemployee= async (first_name,last_name,email,phone_number,department,salary) => {
    let [data]= await pool.query('INSERT INTO `pick_n_steal`.`employees` (`first_name`,`last_name`,`email`,`phone_number`,`department`,`salary`) VALUES(?,?,?,?,?,?)', [first_name,last_name,email,phone_number,department,salary])
    //return await getemployees()//allows us to see updated
}
//console.log(await insertemployee('Siya','kholani','siya@example.com','555-5544','IT',8000.00))
//Create a function/ query that will remove an employee from the table based on their
//employee id and then returns all the employees so you can see if the data was
//removed.
const deleteEmployee= async (employee_id) => {
    let [data]= await pool.query('DELETE FROM employees WHERE employee_id =?',[employee_id])
    return await getemployees()//allows us to see updated
}
//console.log(await deleteEmployee(2));
//Create a function/ query that will be able to update all the values of an employee
//based on their employee id and then returns the employees new data that was
//edited.
const updateEmployee= async (first_name,last_name,email,phone_number,department,salary,employee_id) => {
    let [data]= await pool.query('UPDATE employees SET `first_name` =?,`last_name`=?,`email`=?,`phone_number`=?,`department`=?,`salary`=? WHERE employee_id=?',[first_name,last_name,email,phone_number,department,salary,employee_id])
    return await getemployees()//allows us to see updated
}
// console.log(await updateEmployee('LeBron', 'James', 'LeBron.James@example.com','555-2323', 'Basketball', 190000.00,7))