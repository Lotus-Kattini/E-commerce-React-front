import { useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import ImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";
import { Axios } from "../../../Api/Axios";
import { PRO } from "../../../Api/Api";
import { FaRegStar, FaStar } from "react-icons/fa";
import { LiaCartPlusSolid } from "react-icons/lia";



function SingleProduct() {
    const [products,setProducts]=useState([])
    const [images,setImages]=useState([])
    const {id}=useParams()

    const starsRound=Math.round(products.rating)
    const stars=Math.min(starsRound,5);
    const goldstars=Array.from({length:stars}).map((index)=><FaStar style={{color:'gold'}} key={index}/>)
    const emptystars=Array.from({length:5-stars}).map((index)=><FaRegStar key={index}/>)

    useEffect(()=>{
        Axios.get(`${PRO}/${id}`)
        .then((data)=>{setProducts(data.data[0])
            setImages(data.data[0].images.map((img)=>{return {original:img.image,thumbnail:img.image}}))

        })
        .catch((err)=>console.log(err))
    },[])

    
  return (
    <Container className="mt-5">
        <div className="d-flex align-items-start flex-wrap ">
            <div className="col-lg-4 col-md-6 col-12">
        <ImageGallery items={images} />

            </div>
            <div className="col-lg-8 col-md-6 col-12">
                <div className="ms-5">

                <h1>{products.title}</h1>
                <p style={{color:'gray'}} >{products.About}</p>
                <h3 className="fw-normal">{products.discription}</h3>
                <div className="d-flex align-items-center justify-content-between mt-3 border-top">
                        <div>
                            {goldstars}
                            {emptystars}
                            <div className="d-flex align-items-center gap-3">
                                <h5 className="m-0 text-primary">{products.discount}$</h5>
                                <h6 className="m-0" style={{color:'gray',textDecoration:'line-through'}}>
                                    {products.price}$
                                </h6>
                            </div>
                        </div>
                        <div className="py-1 border rounded">
                            <LiaCartPlusSolid style={{width:'30px',height:'20px'}}/>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </Container>
  )
}

export default SingleProduct