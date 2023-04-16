const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use(session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true,}));

// app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

// app.use("/customer/auth/*", function auth(req,res,next){
// //Write the authenication mechanism here
//     console.log(req.session);
//     if (req.session.username) {
//         console.log(`Found User Session`);
//         next();
//     } else {
//         res.redirect('/login');
//     }
// });
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
