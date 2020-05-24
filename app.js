const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const url =
    "mongodb+srv://dickson:123@hackathon-tbobj.mongodb.net/test?retryWrites=true&w=majority";
let db;

app.use(bodyParser.json());

app.set("port", process.env.PORT || 3000);

//CORS
app.use(express.static(__dirname), function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.post("/register", function (request, response) {
    register(request.body)
        .then(() => {
            response.status(200).send("Registration successful!");
        })
        .catch((error) => {
            response.statusMessage = error.message;
            response.status(400).end();
        });
});

app.post("/login", function (request, response) {
    login(request.body)
        .then(() => {
            response.status(200).send("Login successful!");
        })
        .catch((error) => {
            response.statusMessage = error.message;
            response.status(401).end();
        });
});

app.listen(app.get("port"));

MongoClient.connect(url, {
    useUnifiedTopology: true,
})
    .then((cluster) => {
        db = cluster.db("database");
        console.log("Connection successful!");
    })
    .catch((error) => {
        throw error;
    });

async function register(data) {
    try {
        if (await exists(data.email)) {
            throw Error("Account already exists!");
        }
        await db.collection("users").insertOne(data);
        return;
    } catch (error) {
        throw error;
    }
}

async function login(data) {
    try {
        let find = await db.collection("users").findOne({
            $and: [
                { email: { $eq: data.email } },
                { password: { $eq: data.password } },
            ],
        });
        if (!find) {
            throw Error("Login failed!");
        }
        return find;
    } catch (error) {
        throw error;
    }
}

async function exists(email) {
    return await db.collection("users").findOne({ email: { $eq: email } });
}

// async function getFoods(pet) {
//     let query = {};
//     query["pets." + pet] = { $exists: true };
//     try {
//         let result = await db.find(query);
//         //db find returns a cursor object, need to convert it to an array
//         return result.toArray();
//     } catch (error) {
//         throw error;
//     }
// }
