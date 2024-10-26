import { useEffect, useState } from "react"
import { Axios } from "../../../Api/Axios";
import {  TOPRATED} from "../../../Api/Api";
import Skelton from "../skelton/Skelton";
import Toprated from "./Toprated";

function Showtorated() {
    const [products,setproducts]=useState([]);
    const [loading,setloading]=useState(true)

    useEffect(()=>{
        Axios.get(`${TOPRATED}`).then((res)=>setproducts(res.data)).finally(()=>setloading(false))
    },[])
    console.log(products)

    const productShow=products.map((product)=><Toprated title={product.title} description={product.description}
     img={product.images[0].image} discount={product.discount} price={product.price} rating={product.rating
    }
    id={product.id}
    />)

  return (
    <div className="col-md-6 col-12"  >
      <div className="border border-primary" >
      <h1 className="text-white bg-primary text-center">Top Rated </h1>
    <div className="d-flex flex-column align-items-stretch justify-content-center  px-4 flex-wrap mt-3 row-gap-2">
        {loading ? 
          <>
            <Skelton length='4' height='300px' classes='col-lg-6 col-md-6 col-12'/>
          </>
        : productShow}
    </div>
      </div>
    </div>
  )
}

export default Showtorated