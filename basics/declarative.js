// Switch statement
var quan = 90;
switch (quan) {
    case 9:
        console.log('w1');
        break;
    case 10:
        console.log('w2');
        break;
    case 90:
        console.log('real 90');
        break;
    default:
        console.log('ios');
}

// Map and forEach methods on arrays
let p = ["uti", "riz", "e"];
const arr = p.filter(x => (x.length > 2));
console.log(arr);

// Reduce method to sum array elements
var arr1 = [2, 20, 9, 7, 90];
function declrfnred() {
    var res = arr1.reduce(function (acc, item) {
        acc += item;
        return acc;
    }, 0);
    console.log(res);
}
declrfnred();

// Reduce method to multiply array elements
function declrfnred() {
    var res = arr1.reduce(function (acc, item) {
        acc *= item;
        return acc;
    }, 9);
    console.log(res);
}
declrfnred();

// Reduce method to concatenate array elements into a string
var str = ["rizwan", "is", "pagla", "diwana"];
function decstrred() {
    var ans = str.reduce(function (acc, item) {
        acc = acc + item + ' ';
        return acc;
    }, "");
    console.log(ans);
}
decstrred();
const express = require('express');
const cors = require('cors');
require('./config');
const userfileRef = require('./users');
const Product = require('./product');

const Jwt = require('jsonwebtoken');
const { LEGAL_TCP_SOCKET_OPTIONS } = require('mongodb');
const jwtKey = 'e-comm';

const app = express();
app.use(cors());
app.use(express.json());
// In the post route, I am adding comments to understand properly the working of route
// Handling POST requests to the '/register' endpoint for registration signup
app.post('/register/', async (req, resp) => {
    // Creating a new user instance with the data from the request body
    let userRef = new userfileRef(req.body);
    // Saving the new user to the database
    let result = await userRef.save();
    // For the sign up registration API, removing the password in response
    result = result.toObject();
    delete result.password;
    Jwt.sign({ result }, jwtKey, { expiresIn: '2h' }, (err, token) => {
        if (err) {
            resp.send({ result: "Something went wrong,Please try again after sometime!" });
        }
        resp.send({ result, auth: token });
    })

    console.log(result);
    // Sending the result back as the response

})

// Route handler for user login
app.post('/login', async (req, resp) => {
    // Check if both email and password are provided in the request body
    if (req.body.email && req.body.password) {
        // Find the user in the database based on the provided email and password
        let user = await userfileRef.findOne(req.body).select("-password");
        // We should not include the password in the response to enhance security so select() used
        // Respond with the request body, which typically contains user credentials

        if (user) {
            // Generate a JWT token for the user's authentication                                     // If the user is found in the database
            Jwt.sign({ user }, jwtKey, { expiresIn: '2h' }, (err, token) => {
                if (err) {                           // If there's an error while generating the token
                    resp.send({ result: "something went wrong,Please try again" })
                }
                resp.send({ user, auth: token });  // Respond with the user object (excluding the password) and the JWT token
            })

        }
        // If the user is not found in the database
        else {
            resp.send({ result: "User not found" }); // Respond with a message indicating that the user was not found
        }

    } else {
        // If either email or password is missing in the request body
        // Respond with a message indicating that both email and password are required
        resp.send({ result: "Provide both email and password" });
    }
})
// making API for add product
app.post('/add-product', verifyToken, async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);

})

app.get('/products', verifyToken ,async (req, resp) => {
    let products = await Product.find();
    if (products.length > 0) {
        resp.send(products);
    } else {
        resp.send({ result: "No products found" });
    }
})

app.delete('/product/:id',verifyToken ,async (req, resp) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result);
})

app.get('/product/:id', async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result);
    } else {
        resp.send({ "result": "No record found" })
    }
})
app.put('/product/:id',verifyToken, async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    resp.send(result);
})

// This endpoint handles GET requests to search for products based on a key
// app.get('/search/:key', verifyToken ,async (req, resp) => {
//     // Use async/await to ensure asynchronous execution
//     // Search for products matching the provided key using MongoDB's Product model
//     let result = await Product.find({
//         "$or": [
//             { name: { $regex: req.params.key } }
//         ]
//     });
//     resp.send(result);
// })
//explaination of last search api
// Using $or operator to find documents where 'name' matches the regex pattern specified by the 'key' parameter
// Additional $or conditions can be added here if needed
app.get('/search/:key', verifyToken, async (req, resp) => {

    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } }
        ]
    });
    resp.send(result);
})

//middleware
function verifyToken(req, resp, next) {
    let token = req.headers['authorization'];

    if (token) {
        token = token.split(' ')[1];
        console.log("middleware called", token);
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                resp.status(401).send({ result: "Please provide valid token" });
            } else {
                next();
            }
        })

    } else {
        resp.status(403).send({ result: "Please add token with header" });
    }

}

app.listen(3200);
