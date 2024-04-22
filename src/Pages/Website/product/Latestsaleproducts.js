import { useEffect, useState } from "react"
import { Axios } from "../../../Api/Axios";
import { LatestProducts} from "../../../Api/Api";
import Producthome from "./Producthome";
import { Container } from "react-bootstrap";
import Skelton from "../skelton/Skelton";

function Latestsaleproducts() {
    const [products,setproducts]=useState([]);
    const [loading,setloading]=useState(true)

    useEffect(()=>{
        Axios.get(`${LatestProducts}`).then((res)=>setproducts(res.data)).finally(()=>setloading(false))
    },[])
    console.log(products)

    const productShow=products.map((product)=><Producthome col='3' title={product.title} description={product.description} img={product.images[0].image} discount={product.discount} price={product.price} rating={product.rating
    }/>)

  return (
    <Container  >
      <h1 className="text-white">Latest Sale Products</h1>
    <div className="d-flex align-items-stretch justify-content-center flex-wrap mt-3 row-gap-2">
        {loading ? 
          <>
            <Skelton length='4' height='300px' classes='col-lg-3 col-md-6 col-12'/>
          </>
        : productShow}
    </div>
    </Container>
  )
}

export default Latestsaleproducts