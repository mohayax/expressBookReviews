const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }))

const verifyToken = (token) => {
    try {
        jwt.verify(token, 'fingerprint_customer');
        return true;
    } catch (err) {
        return false;
    }
}

app.use("/customer/auth/*", function auth(req, res, next) {
    //Write the authenication mechanism here
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7);
        if (verifyToken(token)) {
            next();
        } else {
            res.status(401).send("Invalid token");
        }
    } else {
        res.status(401).send("Authorization header missing or invalid");
    }
});
const PORT = 5000;
app.use("/customer", customer_routes);

app.use("/", genl_routes);
app.listen(PORT, () => console.log("Server is running"));