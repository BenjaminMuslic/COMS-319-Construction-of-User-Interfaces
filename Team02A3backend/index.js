/*
Kareem Eljaam & Benjamin Muslic
Professor Aldaco
COMS/SE319
Spring 2023
*/

// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Product = require("./dataSchema.js");

// Use express middleware for parsing JSON and handling CORS
app.use(express.json());
app.use(cors());

// Serve static files from public and images directories
app.use(express.static("public"));
app.use("/images", express.static("images"));

// Connect to the MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/reactdata",
    {
        dbName: "reactdata",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

// Define the port and host for the server to listen on
const port = process.env.PORT || 4000;
const host = "localhost";

// GET route to fetch all products
app.get("/", async (req, resp) => {
    const query = {};
    const allProducts = await Product.find(query);
    console.log(allProducts);
    resp.send(allProducts);
});

// GET route to fetch a single product by its ID
app.get("/:id", async (req, resp) => {
    const id = req.params.id;
    const query = { _id: id };
    const oneProduct = await Product.findOne(query);
    console.log(oneProduct);
    resp.send(oneProduct);
});

// POST route to insert a new product
app.post("/insert", async (req, res) => {
    console.log(req.body);
    const p_id = req.body._id;
    const ptitle = req.body.title;
    const pprice = req.body.price;
    const pdescription = req.body.description;
    const pcategory = req.body.category;
    const pimage = req.body.image;
    const prate = req.body.rating.rate;
    const pcount = req.body.rating.count;

    const formData = new Product({
        _id: p_id,
        title: ptitle,
        price: pprice,
        description: pdescription,
        category: pcategory,
        image: pimage,
        rating: { rate: prate, count: pcount },
    });
    try {
        // await formData.save();
        await Product.create(formData);
        const messageResponse = { message: `Product ${p_id} added correctly` };
        res.send(JSON.stringify(messageResponse));
    } catch (err) {
        console.log("Error while adding a new product:" + err);
    }
});

// DELETE route to remove a product by its ID
app.delete("/delete", async (req, res) => {
    console.log("Delete :", req.body);
    try {
        const query = { _id: req.body._id };
        await Product.deleteOne(query);
        const messageResponse = {
            message: `Product ${req.body._id} deleted correctly`,
        };
        res.send(JSON.stringify(messageResponse));
    } catch (err) {
        console.log("Error while deleting :" + p_id + " " + err);
    }
});

// PUT route to update a product's information
app.put("/update", async (req, res) => {
    try {
      const updatedProduct = req.body;
      const query = { _id: updatedProduct._id };
      await Product.findOneAndUpdate(query, updatedProduct, { new: true });
      const messageResponse = {
        message: `Product ${updatedProduct._id} updated correctly`,
      };
      res.send(JSON.stringify(messageResponse));
    } catch (err) {
      console.log("Error while updating product: " + err);
    }
  });

// Start the server and listen for incoming requests
app.listen(port, () => {
    console.log(`App listening at http://%s:%s`, host, port);
});