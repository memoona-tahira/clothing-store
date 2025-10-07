import express from 'express';
import productRoutes from './routes/productsRoutes.js';
const app = express()
const port = 3000



app.get('/', (req, res) => {
  res.send("Clothing Store API is running");
});

app.use('/api/v1/products', productRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

