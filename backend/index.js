import 'dotenv/config';
import express from 'express';
import productRoutes from './routes/productsRoutes.js';
import userRoute from './routes/userRoutes.js'
import sizesRoutes from './routes/sizesRoutes.js'
import connectDB from './db/connection.js';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 3000;

connectDB();
app.use(cors());

app.use('/images', express.static('images'));


app.get('/', (req, res) => {
  res.send("Clothing Store API is running");
});

app.use('/api/v1/products', productRoutes);
// add api for sizes
// create roouter for size
// size route () only get / method
app.use('/api/v1/sizes' ,sizesRoutes );

app.use('/api/v1/users', userRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

console.log("done")

