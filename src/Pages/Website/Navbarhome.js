import { CgProfile } from "react-icons/cg";
import { Navbar, Nav, Form, FormControl, Button, Container} from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { CAT, } from "../../Api/Api";
import { Link } from "react-router-dom";
import './Home.css'
import Stringslice from "../../helpers/Stringslice";
import Skeleton from "react-loading-skeleton";
import Skelton from "./skelton/Skelton";
function Navbarhome() {

    const [categories,setcategories]=useState([])
    const [loading,setloading]=useState(true);

    useEffect(()=>{
        Axios.get(`${CAT}`).then((res)=>setcategories(res.data.slice(-8))).finally(()=>setloading(false))
    },[])



    const categoryShow=categories.map((category)=><Link to={`/category/${category.id}`} className="text-white text-decoration-none category-title ">
        {Stringslice(category.title,14)}
    </Link>)


  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{display:'flex',flexDirection:'column',gap:'0.7rem'}}>
        <Container>
          <Navbar.Brand >
            <Link to={'/'}>
              <img src={require('../../Assets/logoLK.png')} alt='logo' width={80}/>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"className='justify-content-between' >
            <Nav className="mr-auto">
              {/* <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link> */}
            </Nav>
            <Form inline className='d-flex align-items-center gap-2'>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-primary">Search</Button>
            </Form>
            <Nav>
              <Nav.Link href="#cart"><Link to={'/cart'} className="text-white"><FaShoppingCart style={{fontSize:'1.5rem'}}/></Link></Nav.Link>
              <Nav.Link href="#sign-in"><Link to={'/profile'} className="text-white"><CgProfile style={{fontSize:'1.5rem'}}/></Link></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
          <div className="mt-1">
            <div className="text-white d-flex align-items-center justify-content-start gap-5 flex-wrap">
              {loading ?<>
                <Skelton length='8' height="30px" width="80px" classes=''/>
              </> : categoryShow}
            <Link to={'/categories'} className="text-white text-decoration-none category-title">
              Show All
            </Link>
            </div>
          </div>
      </Navbar>
  )
}

export default Navbarhome