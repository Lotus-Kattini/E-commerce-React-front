import { useEffect, useState } from "react"
import { Axios } from "../../../Api/Axios";
import { Latest, LatestProducts} from "../../../Api/Api";
import Skelton from "../skelton/Skelton";
import Producthome from "./Producthome";
function Showlatestproducts() {
    const [products,setproducts]=useState([]);
    const [loading,setloading]=useState(true)

    useEffect(()=>{
        Axios.get(`${Latest}`).then((res)=>setproducts(res.data)).finally(()=>setloading(false))
    },[])
    console.log(products)

    const productShow=products.map((product)=><Producthome col='6' title={product.title} description={product.description} img={product.images[0].image} discount={product.discount} price={product.price} rating={product.rating
    }/>)

  return (
    <div className="col-md-6 col-12">
        <div className="ms-md-3">

      <h1 className="text-white">Latest Products</h1>
    <div className="d-flex align-items-stretch justify-content-center flex-wrap mt-3 row-gap-2">
        {loading ? 
          <>
            <Skelton length='4' height='300px' classes='col-md-6 col-12'/>
          </>
        : productShow}
    </div>
    </div>

    </div>
  )
}

export default Showlatestproducts