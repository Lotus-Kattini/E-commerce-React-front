// import { Container } from "react-bootstrap"
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { LiaCartPlusSolid } from "react-icons/lia";
import Stringslice from "../../../helpers/Stringslice";
import { NavLink } from "react-bootstrap";

function Producthome(props) {
    console.log(props)
    const starsRound=Math.round(props.rating)
    const stars=Math.min(starsRound,5);
    const goldstars=Array.from({length:stars}).map((index)=><FaStar style={{color:'gold'}} key={index}/>)
    const emptystars=Array.from({length:5-stars}).map((index)=><FaRegStar key={index}/>)

  return (
            <NavLink to={`/product/${props.id}`} className={`col-lg-${props.col} col-md-6 col-12`}>
                <div className="rounded m-1 border p-3 h-100 d-flex flex-column justify-content-between" style={{backgroundColor:'#fff'}}>
                    <div>
                        <p style={{color:'gray'}} className="text-truncate">{Stringslice(props.title,20)}</p>
                        <p>{Stringslice(props.description,40)}</p>
                        <div className="px-5 py-4 position-relative">
                        {props.discount && <p className="m-0 position-absolute top-0 start-0 bg-primary rounded-circle text-white text-uppercase d-inline-block text-center"
                            style={{width:'50px',height:'50px',lineHeight:'50px'}}>
                                sale
                            </p>}
                            {/* <img src={props.img} alt="img" className="img-fluid" style={{width:'100%',height:'100%', lineHeight:'100%'}}/> */}
                            <div className="w-100"
                                style={{backgroundImage:`url(${props.img})`,
                                        backgroundPosition:'center',
                                        backgroundSize:'cover',
                                        width:'100%',
                                        height:'170px'
                                        }}
                            >
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-3 border-top">
                        <div>
                            {goldstars}
                            {emptystars}
                            <div className="d-flex align-items-center gap-3">
                                <h5 className="m-0 text-primary">{props.discount}$</h5>
                                <h6 className="m-0" style={{color:'gray',textDecoration:'line-through'}}>
                                    {props.price}$
                                </h6>
                            </div>
                        </div>
                        <div className="py-1 border rounded">
                            <LiaCartPlusSolid style={{width:'30px',height:'20px'}}/>
                        </div>
                    </div>
                </div>
            </NavLink>
  )
}

export default Producthome