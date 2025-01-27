import express from "express"
import "dotenv/config";
import connectDB from "./DB/index.js";
import  categoryRouter from "./routes/category.routes.js";
import  subcategoryRouter from "./routes/subcategory.routes.js";
import  itemsRouter from "./routes/items.routes.js";


const app = express();


// use middleware to parse json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/",(req, res)=>{
    res.send("Hello World Server Setup")
})

// Routing 
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/subcategory", subcategoryRouter);
app.use("/api/v1/item", itemsRouter);

app.listen(3000, ()=>{
    connectDB();
    console.log("App is listen on port 3000")
})