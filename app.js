const express = require("express")
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser");
const PORT = process.env.port || 5000;
const fs = require("fs");
const path = require("path");

const mongoose = require("mongoose")
const mongoUrl = require("./keys")
mongoose.connect(mongoUrl);

app.use(bodyParser.json());

app.use(cors())

const DataSchema = new mongoose.Schema({
    // Your schema definition here
    end_year: {
        type: String,
        required: false,
    },
    intensity: {
        type: Number,
        required: false,
    },
    sector: {
        type: String,
        required: false,
    },
    topic: {
        type: String,
        required: false,
    },
    insight: {
        type: String,
        required: false,
    },
    url: {
        type: String,
        required: false,
    },
    region: {
        type: String,
        required: false,
    },
    start_year: {
        type: String,
        required: false,
    },

    impact: {
        type: String,
        required: false,
    },
    added: {
        type: Date,
        required: false,
    },
    published: {
        type: Date,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    relevance: {
        type: Number,
        required: false,
    },
    pestle: {
        type: String,
        required: false,
    },
    source: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: false,
    },
    likelihood: {
        type: Number,
        required: false,
    },
});
const DataModel = mongoose.model("Data", DataSchema);

// Endpoint to upload JSON data
app.post("/upload", async (req, res) => {

    try {
        const jsonData = req.body;

        // Validate JSON data (optional, based on your needs)

        await DataModel.insertMany(jsonData);

        res.status(200).send("Data uploaded successfully");
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// Endpoint to read JSON file and upload its content to MongoDB

app.get("/uploadData", async (req, res) => {
    console.log("get request to upload data")
    try {
        const filePath = path.join(__dirname, "jsondata.json"); // Replace with your JSON file's path
        const rawContent = fs.readFileSync(filePath);
        const jsonData = JSON.parse(rawContent);
        await DataModel.deleteMany();
        await DataModel.insertMany(jsonData);
        const data = await DataModel.find({});
        res.status(200).json({ message: "data uplodaed" });
        // res.status(200).send("data successfully uploaded from file to");
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

app.get("/getdata", async (req, res) => {
    try {
        const data = await DataModel.find({})

        res.json({ data })

    }

    catch { res.status(500).json(err => console.log(err)) }
})



mongoose.connection.on('connected', () => {
    console.log("succceesfully connected to mongoDb !")
})
mongoose.connection.on("error", () => {
    console.log("not connected ")
})


app.use(express.static(path.join(__dirname, "./frontend/build")))

app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "./frontend/build/index.html"),
        function (err) {
            res.status(500).send(err)
        }
    )
})

app.listen(PORT, () => {
    console.log("server is running", PORT)
})
