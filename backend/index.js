import 'dotenv/config';
import express from 'express';
import productRoutes from './routes/productsRoutes.js';
import userRoute from './routes/userRoutes.js'
import connectDB from './db/connection.js';
const app = express();
const port = process.env.PORT || 3000;

connectDB();


app.get('/', (req, res) => {
  res.send("Clothing Store API is running");
});

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

console.log("done")

