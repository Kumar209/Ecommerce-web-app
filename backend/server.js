require('dotenv').config({path: "./config/.env"})
const app = require("./app");
const port = process.env.PORT || 5000;
var colors = require('colors');
const connectDatabase = require("./db/Database.js");
// const cloudinary = require("cloudinary");

// Handling uncaught Exception  like you have written sdkfjl in any of the file
process.on("uncaughtException",(err) =>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server for Handling uncaught Exception`);
})

// config  if you use config here it will not work because u r importing port above
// if(process.env.NODE_ENV!=="PRODUCTION"){
// require("dotenv").config({
//     path:"backend/config/.env"
// })}

// connect database
connectDatabase();

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// })

// create server
const server = app.listen(port ,() =>{
    console.log(`Server is working on http://localhost:${port}`.green.bold)
})


// Unhandled promise rejection like mongodb failed to connect
process.on("unhandledRejection", (err) =>{
    console.log(`Shutting down server for ${err.message}`);
    console.log(`Shutting down the server due to Unhandled promise rejection`);
    server.close(() =>{
        process.exit(1);
    });
});