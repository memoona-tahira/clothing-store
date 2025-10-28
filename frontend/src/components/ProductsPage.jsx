import { useSearchParams } from 'react-router-dom'; // hook to read URL query params
import { useEffect, useState } from 'react';
import ProductsOverview from './ProductsOverview'
import axios from 'axios'; 

function ProductsPage(){
 const [products, setProducts] = useState([]);


const [searchParams] = useSearchParams();
  const catValue = searchParams.get('cat');




 useEffect(() => {
     const fetchProducts = async () => {
      if(catValue !== null)  {
        const response = await axios.get(`http://localhost:3000/api/v1/products?catagory=${catValue}`);
        setProducts(response.data.products);
      }
 }
    fetchProducts();    
 }, [catValue]);

    return(
        <div>
        <h1>hello {catValue}</h1>
        <div className='products-grid'>
             {products.map(product => (
               <ProductsOverview key={product._id} product={product} />
             ))}
        </div>
       
       
      </div>
    );

}
export default ProductsPage;