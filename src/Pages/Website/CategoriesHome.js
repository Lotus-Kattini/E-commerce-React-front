import { useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { CAT } from "../../Api/Api";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Stringslice from "../../helpers/Stringslice";
import Skeleton from "react-loading-skeleton";
import Skelton from "./skelton/Skelton";
function CategoriesHome() {
    const [categories,setcategories]=useState([])
    const [loading,setloading]=useState(true);


    useEffect(()=>{
        Axios.get(`${CAT}`).then((res)=>setcategories(res.data)).finally(()=>setloading(false))
    },[])

    const categoryShow=categories.map((category)=>
    <div className="col-lg-2 col-md-6 col-12 bg-transparant border-0">
        <div className="m-1 bg-white border d-flex align-items-center justify-content-start gap-3 rounded py-2 h-100">
            <img className="ms-3" width={'50px'} src={category.image} alt="category image"/>

            <Link to={`/category/${category.id}`} className="text-black text-decoration-none">
        {Stringslice(category.title,12)}
    </Link>

        </div>
    </div>)
  return (
    <>
    <div className="bg-secondary py-5">
        <Container>
            <div className="d-flex align-items-stretch justify-content-center row-gap-2 flex-wrap">
                {loading ? 
                    <>
                        <Skelton length='15' height="70px" classes="col-lg-2 col-md-6 col-12"/>
                    </>
                : categoryShow}
            </div>
        </Container>
    </div>
    </>
  )
}

export default CategoriesHome