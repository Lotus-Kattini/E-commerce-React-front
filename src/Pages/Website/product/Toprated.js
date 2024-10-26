// import { Container } from "react-bootstrap"
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { LiaCartPlusSolid } from "react-icons/lia";
import Stringslice from "../../../helpers/Stringslice";
import { NavLink } from "react-bootstrap";

function Toprated(props) {
    console.log(props)
    const starsRound=Math.round(props.rating)
    const stars=Math.min(starsRound,5);
    const goldstars=Array.from({length:stars}).map((index)=><FaStar style={{color:'gold'}} key={index}/>)
    const emptystars=Array.from({length:5-stars}).map((index)=><FaRegStar key={index}/>)

  return (
            <NavLink to={`/product/${props.id}`} className="">
                <div className="m-1 border-bottom w-100 p-3 h-100 d-flex justify-content-between">
                        <div className="w-50"
                                style={{backgroundImage:`url(${props.img})`,
                                        backgroundPosition:'center',
                                        backgroundSize:'cover',
                                        width:'100%',
                                        height:'170px',
                                        marginRight:'1.2rem'
                                        }}
                            >
                        </div>
                    <div >
                    <div>
                        <p style={{color:'gray'}} className="text-truncate">{Stringslice(props.title,20)}</p>
                        <p>{Stringslice(props.description,40)}</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-3">
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
                </div>
            </NavLink>
  )
}

export default Toprated